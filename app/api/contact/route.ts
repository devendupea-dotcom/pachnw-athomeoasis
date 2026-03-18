import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { siteConfig } from "@/src/siteConfig";

export const runtime = "nodejs";

type ContactPayload = {
  name?: string;
  phone?: string;
  email?: string;
  location?: string;
  projectType?: string;
  otherProjectType?: string;
  message?: string;
  company?: string;
};

function getTrimmedValue(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function normalizeEnvValue(value: string | undefined) {
  if (!value) {
    return "";
  }

  const trimmed = value.trim();

  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1).trim();
  }

  return trimmed;
}

function getTransport() {
  const smtpUrl = normalizeEnvValue(process.env.SMTP_URL) || normalizeEnvValue(process.env.EMAIL_SERVER);

  if (smtpUrl) {
    return nodemailer.createTransport(smtpUrl);
  }

  const host = normalizeEnvValue(process.env.SMTP_HOST);
  const port = Number(normalizeEnvValue(process.env.SMTP_PORT) || "587");
  const user = normalizeEnvValue(process.env.SMTP_USER);
  const pass = normalizeEnvValue(process.env.SMTP_PASS);

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: normalizeEnvValue(process.env.SMTP_SECURE) === "true",
    auth: {
      user,
      pass,
    },
  });
}

async function submitViaFormSubmit(payload: {
  name: string;
  phone: string;
  email: string;
  location: string;
  selectedProjectType: string;
  message: string;
  origin: string;
  referer: string;
}) {
  const endpoint = `https://formsubmit.co/ajax/${encodeURIComponent(siteConfig.contactEmail.toLowerCase())}`;
  const body = new URLSearchParams({
    name: payload.name,
    phone: payload.phone,
    email: payload.email,
    location: payload.location || "Not provided",
    projectType: payload.selectedProjectType,
    message: payload.message,
    _subject: `New website lead: ${payload.selectedProjectType}`,
    _cc: siteConfig.adminEmail,
    _replyto: payload.email,
    _template: "table",
  });

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Origin: payload.origin,
      Referer: payload.referer,
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body: body.toString(),
  });

  const contentType = response.headers.get("content-type") ?? "";
  const responsePayload = contentType.includes("application/json")
    ? ((await response.json()) as { success?: string | boolean; message?: string })
    : { message: await response.text() };

  if (!response.ok || responsePayload.success === false || responsePayload.success === "false") {
    const failureMessage =
      responsePayload.message || `FormSubmit fallback failed with ${response.status}.`;

    throw new Error(failureMessage.slice(0, 400));
  }

  return responsePayload;
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ message: "Invalid form submission." }, { status: 400 });
  }

  const name = getTrimmedValue(payload.name);
  const phone = getTrimmedValue(payload.phone);
  const email = getTrimmedValue(payload.email);
  const location = getTrimmedValue(payload.location);
  const projectType = getTrimmedValue(payload.projectType);
  const otherProjectType = getTrimmedValue(payload.otherProjectType);
  const message = getTrimmedValue(payload.message);
  const company = getTrimmedValue(payload.company);

  if (company) {
    return NextResponse.json({
      message: "Thanks for reaching out. Peter will contact you shortly.",
    });
  }

  if (!name || !phone || !email || !projectType || !message) {
    return NextResponse.json(
      { message: "Please add your name, phone, email, project type, and message." },
      { status: 400 },
    );
  }

  const selectedProjectType = projectType === "Other" && otherProjectType ? otherProjectType : projectType;
  const requestOrigin = request.headers.get("origin") ?? `https://${siteConfig.domain}`;
  const requestReferer = request.headers.get("referer") ?? `${requestOrigin}/`;

  try {
    const transport = getTransport();

    if (!transport) {
      throw new Error("SMTP transport unavailable");
    }

    await transport.sendMail({
      from:
        normalizeEnvValue(process.env.EMAIL_FROM) ||
        normalizeEnvValue(process.env.SMTP_FROM) ||
        `PACH NW Website <no-reply@${siteConfig.domain.replace(/^www\./, "")}>`,
      to: process.env.CONTACT_TO ?? siteConfig.contactEmail,
      cc: siteConfig.adminEmail,
      replyTo: `${name} <${email}>`,
      subject: `New website lead: ${selectedProjectType}`,
      text: [
        "New website lead",
        "",
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Email: ${email}`,
        `Project type: ${selectedProjectType}`,
        `Neighborhood / city: ${location || "Not provided"}`,
        "",
        "Project details:",
        message,
      ].join("\n"),
      html: `
        <h2>New website lead</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Project type:</strong> ${escapeHtml(selectedProjectType)}</p>
        <p><strong>Neighborhood / city:</strong> ${escapeHtml(location || "Not provided")}</p>
        <p><strong>Project details:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
      `,
    });

    return NextResponse.json({
      message: "Thanks for reaching out. Peter will contact you shortly.",
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Primary contact mail transport failed.", {
        message: error.message,
        stack: error.stack,
      });
    } else {
      console.error("Primary contact mail transport failed.", { error });
    }

    try {
      await submitViaFormSubmit({
        name,
        phone,
        email,
        location,
        selectedProjectType,
        message,
        origin: requestOrigin,
        referer: requestReferer,
      });

      console.info("Contact form delivered through FormSubmit fallback.", {
        to: siteConfig.contactEmail,
        cc: siteConfig.adminEmail,
      });

      return NextResponse.json({
        message: "Thanks for reaching out. Peter will contact you shortly.",
      });
    } catch (fallbackError) {
      if (fallbackError instanceof Error) {
        console.error("Contact form fallback failed.", {
          message: fallbackError.message,
          stack: fallbackError.stack,
        });
      } else {
        console.error("Contact form fallback failed.", { fallbackError });
      }

      return NextResponse.json(
        {
          message: "Something went wrong sending your request. Please call or text Peter directly.",
        },
        { status: 500 },
      );
    }
  }
}

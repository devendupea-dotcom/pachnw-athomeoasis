"use client";

import { type ChangeEvent, type FormEvent, useState } from "react";

type FormState =
  | { tone: "idle"; message: string }
  | { tone: "error" | "success"; message: string };

const initialState: FormState = {
  tone: "idle",
  message: "Tell Peter about the project, the city, and the best way to reach you.",
};

const projectTypes = [
  "Retaining Walls",
  "Patios and Hardscaping",
  "Permaculture / Edible Landscapes",
  "Other",
] as const;

export function ContactForm() {
  const [state, setState] = useState<FormState>(initialState);
  const [projectType, setProjectType] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleProjectTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setProjectType(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: formData.get("name")?.toString().trim() ?? "",
      phone: formData.get("phone")?.toString().trim() ?? "",
      email: formData.get("email")?.toString().trim() ?? "",
      location: formData.get("location")?.toString().trim() ?? "",
      projectType: formData.get("projectType")?.toString().trim() ?? "",
      otherProjectType: formData.get("otherProjectType")?.toString().trim() ?? "",
      message: formData.get("message")?.toString().trim() ?? "",
      company: formData.get("company")?.toString().trim() ?? "",
    };

    if (!payload.name || !payload.phone || !payload.email || !payload.projectType || !payload.message) {
      setState({
        tone: "error",
        message: "Please add your name, phone, email, project type, and message.",
      });
      return;
    }

    if (payload.projectType === "Other" && !payload.otherProjectType) {
      setState({
        tone: "error",
        message: "Please add the project type you want help with.",
      });
      return;
    }

    setIsSubmitting(true);
    setState({ tone: "idle", message: "Sending your request..." });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        setState({
          tone: "error",
          message: result.message ?? "Something went wrong. Please call or text Peter directly.",
        });
        return;
      }

      setState({
        tone: "success",
        message: result.message ?? "Thanks for reaching out. Peter will contact you shortly.",
      });
      setProjectType("");
      form.reset();
    } catch {
      setState({
        tone: "error",
        message: "Something went wrong. Please call or text Peter directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <input
        name="company"
        type="text"
        autoComplete="off"
        tabIndex={-1}
        className="contact-form-honeypot"
        aria-hidden="true"
      />

      <div className="form-grid">
        <label>
          <span>Name</span>
          <input name="name" type="text" autoComplete="name" placeholder="Your name" required />
        </label>

        <label>
          <span>Phone</span>
          <input name="phone" type="tel" autoComplete="tel" placeholder="(253) 555-5555" required />
        </label>

        <label>
          <span>Email</span>
          <input name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
        </label>

        <label>
          <span>Project Type</span>
          <select name="projectType" value={projectType} onChange={handleProjectTypeChange} required>
            <option value="" disabled>
              Choose one
            </option>
            {projectTypes.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>Neighborhood or City</span>
          <input
            name="location"
            type="text"
            autoComplete="address-level2"
            placeholder="Tacoma, Gig Harbor, Puyallup..."
          />
        </label>

        {projectType === "Other" ? (
          <label>
            <span>Other project type</span>
            <input name="otherProjectType" type="text" placeholder="What do you need help with?" required />
          </label>
        ) : null}
      </div>

      <label>
        <span>Message</span>
        <textarea
          name="message"
          rows={6}
          placeholder="Tell Peter what you want to change, where the project is, and what problem needs to be solved."
          required
        />
      </label>

      <div className="form-actions">
        <button type="submit" className="button button-primary" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Get a Quote"}
        </button>
      </div>

      <div
        className={`form-note is-${state.tone}`}
        role={state.tone === "error" ? "alert" : "status"}
        aria-live="polite"
      >
        {state.tone === "success" ? <strong>Request received.</strong> : null}
        <span>{state.message}</span>
      </div>
    </form>
  );
}

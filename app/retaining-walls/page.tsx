import type { Metadata } from "next";
import { ServicePageTemplate } from "@/src/components/ServicePageTemplate";
import { getServicePage } from "@/src/content/services";

const service = getServicePage("retaining-walls")!;

export const metadata: Metadata = {
  title: "Retaining Walls",
  description:
    "Retaining wall construction by PACH NW At Home Oasis for South Sound homeowners who need grade control, clean structure, and a finished wall that fits the property.",
};

export default function RetainingWallsPage() {
  return <ServicePageTemplate service={service} />;
}

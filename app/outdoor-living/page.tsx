import type { Metadata } from "next";
import { ServicePageTemplate } from "@/src/components/ServicePageTemplate";
import { getServicePage } from "@/src/content/services";

const service = getServicePage("outdoor-living")!;

export const metadata: Metadata = {
  title: "Outdoor Living Spaces",
  description:
    "Outdoor living spaces by PACH NW At Home Oasis, designed for gathering, comfort, and a calmer natural relationship with the yard.",
};

export default function OutdoorLivingPage() {
  return <ServicePageTemplate service={service} />;
}

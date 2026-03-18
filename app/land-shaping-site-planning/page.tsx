import type { Metadata } from "next";
import { ServicePageTemplate } from "@/src/components/ServicePageTemplate";
import { getServicePage } from "@/src/content/services";

const service = getServicePage("land-shaping-site-planning")!;

export const metadata: Metadata = {
  title: "Drainage and Site Work",
  description:
    "Drainage-aware site work, grading, site planning, and prep work by PACH NW At Home Oasis for South Sound properties that need the ground organized before finish work begins.",
};

export default function LandShapingSitePlanningPage() {
  return <ServicePageTemplate service={service} />;
}

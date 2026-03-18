import type { Metadata } from "next";
import { ServicePageTemplate } from "@/src/components/ServicePageTemplate";
import { getServicePage } from "@/src/content/services";

const service = getServicePage("landscape-construction")!;

export const metadata: Metadata = {
  title: "Landscape Construction",
  description:
    "Landscape construction by PACH NW At Home Oasis for South Sound homeowners who need retaining walls, patios, grading, and planting built as one connected project.",
};

export default function LandscapeConstructionPage() {
  return <ServicePageTemplate service={service} />;
}

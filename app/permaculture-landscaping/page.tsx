import type { Metadata } from "next";
import { ServicePageTemplate } from "@/src/components/ServicePageTemplate";
import { getServicePage } from "@/src/content/services";

const service = getServicePage("permaculture-landscaping")!;

export const metadata: Metadata = {
  title: "Permaculture / Edible Landscapes",
  description:
    "Permaculture and edible landscape projects by PACH NW At Home Oasis, combining useful planting, habitat, and whole-site planning for Pacific Northwest yards.",
};

export default function PermacultureLandscapingPage() {
  return <ServicePageTemplate service={service} />;
}

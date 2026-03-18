import type { Metadata } from "next";
import { ServicePageTemplate } from "@/src/components/ServicePageTemplate";
import { getServicePage } from "@/src/content/services";

const service = getServicePage("patios-pavers")!;

export const metadata: Metadata = {
  title: "Patios and Hardscaping",
  description:
    "Patios and hardscaping by PACH NW At Home Oasis for South Sound homeowners who want cleaner outdoor gathering space and better yard use.",
};

export default function PatiosPaversPage() {
  return <ServicePageTemplate service={service} />;
}

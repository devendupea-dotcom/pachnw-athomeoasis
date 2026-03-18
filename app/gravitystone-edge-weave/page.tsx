import type { Metadata } from "next";
import { GravityStoneStylePage } from "@/src/components/GravityStoneStylePage";
import { getGravityStoneStyle } from "@/src/content/retainingWallSystems";

const style = getGravityStoneStyle("gravitystone-edge-weave")!;

export const metadata: Metadata = {
  title: "GravityStone Edge Weave",
  description:
    "Learn how Peter installs the GravityStone Edge Weave wall style for retaining wall projects that need structural credibility and a more crafted finish.",
};

export default function GravityStoneEdgeWeavePage() {
  return <GravityStoneStylePage style={style} />;
}

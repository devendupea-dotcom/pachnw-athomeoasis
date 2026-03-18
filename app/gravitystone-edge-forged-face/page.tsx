import type { Metadata } from "next";
import { GravityStoneStylePage } from "@/src/components/GravityStoneStylePage";
import { getGravityStoneStyle } from "@/src/content/retainingWallSystems";

const style = getGravityStoneStyle("gravitystone-edge-forged-face")!;

export const metadata: Metadata = {
  title: "GravityStone Edge Forged Face",
  description:
    "Explore Peter's GravityStone Edge Forged Face retaining wall offering for projects that need more visual weight and finished-wall presence.",
};

export default function GravityStoneEdgeForgedFacePage() {
  return <GravityStoneStylePage style={style} />;
}

import type { Metadata } from "next";
import { GravityStoneStylePage } from "@/src/components/GravityStoneStylePage";
import { getGravityStoneStyle } from "@/src/content/retainingWallSystems";

const style = getGravityStoneStyle("gravitystone-edge-standard-edge")!;

export const metadata: Metadata = {
  title: "GravityStone Edge Standard Edge",
  description:
    "See Peter's GravityStone Edge Standard Edge retaining wall page for cleaner, calmer wall styling and contractor-focused installation context.",
};

export default function GravityStoneEdgeStandardEdgePage() {
  return <GravityStoneStylePage style={style} />;
}

export const gravityStoneSpecsUrl = "https://www.westblocksystems.com/gravitystone-edge";

const gravityStoneJobImages = {
  overview: "/projects/gravity stone edge/75cbcd_daeb952def4144878f39323dcd23a8bd~mv2_d_2848_2136_s_2.jpg.avif",
  weavePrimary: "/projects/gravity stone edge/75cbcd_351d514695334962b1e237dff0d1e106~mv2.jpg.avif",
  weaveSecondary: "/projects/gravity stone edge/75cbcd_a148e427a55146fba4df6df2751ff07b~mv2.jpg.avif",
  forgedPrimary: "/projects/gravity stone edge/75cbcd_c706ac2a7a9749cfa058fbeaf2f57251~mv2.jpg.avif",
  forgedSecondary: "/projects/gravity stone edge/75cbcd_a2dc823df03a4fa7a43c9413744bec8b~mv2.jpg.avif",
  standardPrimary: "/projects/gravity stone edge/75cbcd_5568b27c2a0d4732b8d2b289634fb48d~mv2.jpg.avif",
  standardSecondary: "/projects/gravity stone edge/75cbcd_791f06d62e7e44d6b058ec16060278f2~mv2.jpg.avif",
} as const;

export const gravityStoneProjectGallery = [
  {
    src: gravityStoneJobImages.overview,
    alt: "GravityStone Edge retaining wall project showing finished grade and installed wall runs",
  },
  {
    src: gravityStoneJobImages.weavePrimary,
    alt: "GravityStone Edge retaining wall installation with finished hardscape detailing",
  },
  {
    src: gravityStoneJobImages.weaveSecondary,
    alt: "GravityStone Edge retaining wall detail from Peter's finished project work",
  },
  {
    src: gravityStoneJobImages.forgedPrimary,
    alt: "GravityStone Edge retaining wall project showing stepped wall construction",
  },
  {
    src: gravityStoneJobImages.forgedSecondary,
    alt: "GravityStone Edge wall image showing finished structure and clean site fit",
  },
  {
    src: gravityStoneJobImages.standardPrimary,
    alt: "GravityStone Edge retaining wall project with a clean finished layout",
  },
  {
    src: gravityStoneJobImages.standardSecondary,
    alt: "GravityStone Edge retaining wall work installed as part of a finished landscape",
  },
] as const;

export type GravityStoneStyle = {
  slug: "gravitystone-edge-weave" | "gravitystone-edge-forged-face" | "gravitystone-edge-standard-edge";
  name: string;
  shortDescription: string;
  intro: string;
  description: string;
  installationBenefits: readonly string[];
  highlights: readonly string[];
  cardImage: string;
  cardImageAlt: string;
  wallImages: ReadonlyArray<{
    src: string;
    alt: string;
  }>;
};

export const gravityStoneSystemOverview = {
  title: "GravityStone Edge Retaining Wall Systems",
  intro:
    "GravityStone Edge gives Peter a versatile retaining wall platform for projects that need clean finished faces, reliable wall geometry, and a system that can support both visual quality and serious site work.",
  description:
    "This section is written from the installer side, not the manufacturer side. The goal is to show how Peter uses the system to solve grade changes, tiered yards, and polished hardscape conditions while still pointing homeowners to the official WestBlock specs for final technical reference.",
  talkingPoints: [
    "Good fit for projects where wall appearance matters as much as wall performance.",
    "Useful on projects that need corners, curves, terraces, and coordinated hardscape detailing.",
    "A strong option when the wall needs to feel deliberate and premium instead of purely utilitarian.",
    "Final engineering, drainage, and application details should always be confirmed against the official manufacturer specs.",
  ] as const,
} as const;

export const gravityStoneStyles: readonly GravityStoneStyle[] = [
  {
    slug: "gravitystone-edge-weave",
    name: "Edge Weave",
    shortDescription:
      "A more patterned, hand-shaped presentation for clients who want the wall face to add visual interest without losing structural discipline.",
    intro:
      "Edge Weave is the more expressive GravityStone Edge direction. Peter uses it when the retaining wall needs to read as part of the finished design instead of fading into the background.",
    description:
      "This look works well on prominent front-yard walls, terraced planting zones, and projects where the retaining structure is visible from primary living spaces. The appeal is in the richer surface rhythm: it feels crafted, not generic, while still delivering the kind of disciplined layout and sequencing that retaining wall work demands.",
    installationBenefits: [
      "Helps a visible retaining wall feel intentional rather than purely functional.",
      "Strong fit for tiered yards where the wall face becomes part of the landscape composition.",
      "Lets Peter deliver structural work with a more custom visual presence.",
    ] as const,
    highlights: ["Patterned face", "Focal walls", "Terraced planting"],
    cardImage: gravityStoneJobImages.weavePrimary,
    cardImageAlt: "GravityStone Edge retaining wall project with a more expressive face pattern",
    wallImages: [
      {
        src: gravityStoneJobImages.weaveSecondary,
        alt: "GravityStone Edge retaining wall detail showing a more patterned finished face",
      },
    ],
  },
  {
    slug: "gravitystone-edge-forged-face",
    name: "Forged Face",
    shortDescription:
      "A heavier, more stone-forward look for retaining walls that need weight, presence, and a more grounded visual character.",
    intro:
      "Forged Face is the direction Peter can use when the retaining wall needs more mass and texture. It gives the finished system a stronger structural presence without losing the cleaner feel of a professionally installed segmental wall.",
    description:
      "This style is well suited to larger grade changes, estate-style walls, and projects where the wall has to hold the site together visually as well as structurally. It pairs especially well with broader terraces, lawn transitions, and more substantial hardscape compositions.",
    installationBenefits: [
      "Ideal when the wall needs to look substantial and built with intent.",
      "Supports a stronger architectural edge on larger retaining wall runs.",
      "Works well where wall scale and site pressure demand visual confidence.",
    ] as const,
    highlights: ["Heavier texture", "Large runs", "Strong presence"],
    cardImage: gravityStoneJobImages.forgedPrimary,
    cardImageAlt: "GravityStone Edge retaining wall project with a heavier forged-face look",
    wallImages: [
      {
        src: gravityStoneJobImages.forgedSecondary,
        alt: "GravityStone Edge wall image showing a heavier, more grounded finished face",
      },
    ],
  },
  {
    slug: "gravitystone-edge-standard-edge",
    name: "Standard Edge",
    shortDescription:
      "The cleaner, calmer face option for projects that want straight geometry, understated texture, and a more architectural retaining wall finish.",
    intro:
      "Standard Edge is the most restrained GravityStone Edge presentation. Peter uses it when the wall should feel sharp, calm, and resolved without pulling too much attention away from the planting or surrounding architecture.",
    description:
      "It fits modern homes, straight retaining runs, and projects where the best wall is the one that feels composed and durable without trying too hard to perform visually. This is a strong option when the retaining wall is meant to support the landscape quietly and cleanly.",
    installationBenefits: [
      "Strong match for modern and more minimal homes.",
      "Good for straight retaining runs and cleaner project geometry.",
      "Lets planting, circulation, and outdoor living stay visually in front.",
    ] as const,
    highlights: ["Clean lines", "Architectural look", "Quiet confidence"],
    cardImage: gravityStoneJobImages.standardPrimary,
    cardImageAlt: "GravityStone Edge retaining wall project with a cleaner standard-edge finish",
    wallImages: [
      {
        src: gravityStoneJobImages.standardSecondary,
        alt: "GravityStone Edge wall image showing clean geometry and a calmer finished face",
      },
    ],
  },
] as const;

export const gravityStoneOverviewImage = gravityStoneJobImages.overview;

export function getGravityStoneStyle(slug: GravityStoneStyle["slug"]) {
  return gravityStoneStyles.find((style) => style.slug === slug);
}

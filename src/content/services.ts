import fs from "node:fs";
import path from "node:path";

export type ServiceSlug =
  | "retaining-walls"
  | "patios-pavers"
  | "landscape-construction"
  | "permaculture-landscaping"
  | "outdoor-living"
  | "land-shaping-site-planning";

export type ServicePageData = {
  slug: ServiceSlug;
  title: string;
  eyebrow: string;
  cardDescription: string;
  lead: string;
  intro: string;
  highlights: readonly string[];
  includes: readonly string[];
  whyItMatters: readonly string[];
  approach: readonly string[];
  cardImage: string;
  cardImageAlt: string;
  gallery: ReadonlyArray<{
    src: string;
    alt: string;
  }>;
  projectSequence?: ReadonlyArray<{
    label: string;
    src: string;
    alt: string;
  }>;
  relatedLinks?: ReadonlyArray<{
    href: string;
    label: string;
  }>;
};

function getProjectFolderGallery(
  folderName: string,
  serviceTitle: string,
  leadFileNames: readonly string[] = [],
) {
  const directory = path.join(process.cwd(), "public", "projects", folderName);

  if (!fs.existsSync(directory)) {
    return [] as const;
  }

  const files = fs
    .readdirSync(directory)
    .filter((file) => /\.(avif|webp|png|jpe?g)$/i.test(file))
    .filter((file) => !file.toLowerCase().includes("during"));

  const leadFileSet = new Set(leadFileNames);
  const orderedFiles = [
    ...leadFileNames.filter((file) => files.includes(file)),
    ...files.filter((file) => !leadFileSet.has(file)).sort((left, right) => left.localeCompare(right)),
  ];

  return orderedFiles.map((file, index) => ({
    src: `/projects/${folderName}/${file}`,
    alt: `${serviceTitle} project photo ${index + 1}`,
  }));
}

export const servicePages: readonly ServicePageData[] = [
  {
    slug: "retaining-walls",
    title: "Retaining Walls",
    eyebrow: "Structural retaining walls",
    cardDescription:
      "Owner-led retaining wall construction for grade changes, slope control, and cleaner usable yard space.",
    lead:
      "Retaining walls need more than block on a slope. They need layout, base prep, drainage, and a finished look that fits the property.",
    intro:
      "Peter brings more than 10 years of retaining wall experience to South Sound properties that need real grade control and a cleaner final result.",
    highlights: ["10+ years wall experience", "Base prep and drainage", "South Sound homes"] as const,
    includes: [
      "Structural retaining walls for grade control",
      "Tiered walls and terraces",
      "Drainage planning and wall layout",
      "Walls tied into stairs, patios, and planting",
      "Material and finish guidance",
    ] as const,
    whyItMatters: [
      "A well-built wall makes the property safer, cleaner, and more usable.",
      "It also creates the base for patios, planting, movement, and future landscape work.",
      "On South Sound lots, good retaining work protects both the yard and the finished look of the property.",
    ] as const,
    approach: [
      "Peter treats retaining walls as specialist work. Grade, drainage, and base preparation are handled before the wall face ever goes in.",
      "The goal is a wall that feels settled on the property, performs for the long term, and finishes the yard cleanly.",
    ] as const,
    cardImage: "/projects/retaining-walls/finishedwall.avif",
    cardImageAlt: "Finished retaining wall supporting a clean residential grade change",
    gallery: getProjectFolderGallery("retaining-walls", "Retaining Walls", ["finishedwall.avif"]),
    relatedLinks: [{ href: "/retaining-wall-systems", label: "See GravityStone wall systems" }] as const,
  },
  {
    slug: "patios-pavers",
    title: "Patios & Hardscaping",
    eyebrow: "Patios, pavers, and circulation",
    cardDescription:
      "Patios, pavers, steps, and hardscape work that make the yard easier to use and easier to enjoy.",
    lead:
      "Patios and hardscaping should improve how the yard works every day, not just add surface area.",
    intro:
      "Peter builds patios, paths, and hardscape layouts for South Sound homeowners who want cleaner movement, stronger outdoor use, and a finished landscape that feels intentional.",
    highlights: ["Patios, paths, and steps", "Built for daily use", "Clean house-to-yard flow"] as const,
    includes: [
      "Patios for seating and gathering",
      "Walkways, paths, and clean circulation",
      "Steps and grade transitions",
      "Material and layout guidance",
      "Hardscape planned to work with planting and future phases",
    ] as const,
    whyItMatters: [
      "Good hardscaping makes the yard easier to move through and easier to use year-round.",
      "A clean patio layout gives structure to the rest of the landscape and improves the feel of the property.",
      "Done well, it connects the house, the yard, and the way people actually spend time outside.",
    ] as const,
    approach: [
      "Peter keeps patio work tied to use first: where people walk, sit, gather, and step into the yard.",
      "The result should feel solid, calm, and appropriate for the site instead of overbuilt or disconnected.",
    ] as const,
    cardImage: "/projects/at-home-oasis/75cbcd_e43faf5545b448bca37d30359b2ba620~mv2.jpg.avif",
    cardImageAlt: "Patio and hardscape project with seating area and retaining wall",
    gallery: [
      {
        src: "/projects/at-home-oasis/75cbcd_e43faf5545b448bca37d30359b2ba620~mv2.jpg.avif",
        alt: "Finished patio and hardscape area designed for gathering",
      },
      {
        src: "/projects/at-home-oasis/75cbcd_a148e427a55146fba4df6df2751ff07b~mv2.jpg.avif",
        alt: "Hardscape wall and patio detail in a finished residential yard",
      },
      {
        src: "/projects/at-home-oasis/75cbcd_29f3fe8a4fa04c7bb2cb12874a79300d~mv2.jpg.avif",
        alt: "Outdoor hardscape layout with seating and planted edges",
      },
    ],
    relatedLinks: [{ href: "/outdoor-living", label: "See outdoor living spaces" }] as const,
  },
  {
    slug: "landscape-construction",
    title: "Landscape Construction",
    eyebrow: "Whole-yard build coordination",
    cardDescription:
      "Landscape construction that ties walls, patios, planting, grading, and outdoor use into one connected project.",
    lead:
      "Some yards need more than one service. Landscape construction brings the major pieces together under one practical build plan.",
    intro:
      "Peter uses this service for homeowners who want the work coordinated as one connected project instead of piecing walls, patios, site work, and planting together separately.",
    highlights: ["Walls and flatwork", "Site prep and finish work", "One coordinated plan"] as const,
    includes: [
      "Whole-yard construction planning",
      "Coordination between walls, patios, planting, and grading",
      "Site preparation and finish grading",
      "Paths, stairs, and usable outdoor zones",
      "Phased construction planning when needed",
    ] as const,
    whyItMatters: [
      "A connected plan usually builds cleaner and avoids expensive rework.",
      "It helps the finished yard feel intentional instead of assembled in unrelated phases.",
      "It keeps the structural work and the softer landscape work moving in the same direction.",
    ] as const,
    approach: [
      "Peter keeps the work practical and tied to the site, the budget, and how the homeowner wants the property to function.",
      "The goal is a clear build sequence and a finished landscape that reads as one complete space.",
    ] as const,
    cardImage: "/projects/at-home-oasis/75cbcd_29f3fe8a4fa04c7bb2cb12874a79300d~mv2.jpg.avif",
    cardImageAlt: "Finished landscape construction project with hardscape and planted outdoor space",
    gallery: [
      {
        src: "/projects/at-home-oasis/75cbcd_29f3fe8a4fa04c7bb2cb12874a79300d~mv2.jpg.avif",
        alt: "Landscape construction project with completed outdoor living space",
      },
      {
        src: "/projects/retaining-walls/finishedwall.avif",
        alt: "Landscape construction project with retaining wall and finished grade",
      },
      {
        src: "/projects/landform-solutions/landform1.avif",
        alt: "Landscape construction project with site shaping and grading work",
      },
    ],
    relatedLinks: [{ href: "/outdoor-living", label: "See outdoor living work" }] as const,
  },
  {
    slug: "permaculture-landscaping",
    title: "Permaculture / Edible Landscapes",
    eyebrow: "Useful planting and whole-site thinking",
    cardDescription:
      "Permaculture-minded planting, edible gardens, and useful landscapes built for Pacific Northwest properties.",
    lead:
      "Permaculture and edible landscape work should be practical, buildable, and tied to how the homeowner actually wants to live on the property.",
    intro:
      "Peter plans productive planting, edible gardens, native support, and outdoor structure as one connected system so the landscape can be useful, attractive, and easier to grow into over time.",
    highlights: ["Edible gardens", "Native and pollinator support", "PNW growing conditions"] as const,
    includes: [
      "Site review around sun, slope, and water movement",
      "Whole-yard planning for productive planting",
      "Edible garden planning and layout",
      "Native, pollinator, and habitat planting",
      "Raised beds, trellises, and garden structure",
      "Water-aware layout and phased plans",
    ] as const,
    whyItMatters: [
      "A good productive landscape does more than look nice. It gives the yard a job.",
      "Planning gardens, planting, habitat, and hardscape together usually creates a stronger long-term result.",
      "For South Sound properties, the best edible landscapes are shaped around real climate, drainage, and maintenance conditions.",
    ] as const,
    approach: [
      "Peter keeps productive landscape work practical and tied to the way the site actually behaves.",
      "The goal is a yard that feels natural, useful, and easier to live with as it matures.",
    ] as const,
    cardImage: "/projects/productive-landscapes/pumpkin patch.jpg.avif",
    cardImageAlt: "Productive edible landscape with food-producing planting in the Pacific Northwest",
    gallery: [
      ...getProjectFolderGallery("productive-landscapes", "Permaculture and Edible Landscapes", [
        "pumpkin patch.jpg.avif",
        "garden.avif",
      ]),
      ...getProjectFolderGallery("cultivated-gardens", "Permaculture and Edible Landscapes", [
        "11062b_e10a7e480ca24ac1b9804784b75aa783~mv2.jpg.avif",
      ]),
    ],
  },
  {
    slug: "outdoor-living",
    title: "Outdoor Living Spaces",
    eyebrow: "Gathering and everyday use",
    cardDescription:
      "Outdoor living spaces built for gathering, seating, and spending more time outside.",
    lead:
      "Outdoor living work should make the yard more comfortable to use, not just more finished to look at.",
    intro:
      "Peter builds outdoor living spaces for South Sound homeowners who want a patio-centered yard, a better gathering area, or a stronger connection between house, hardscape, and planting.",
    highlights: ["Gathering areas", "Seating and circulation", "Tied into planting and grade"] as const,
    includes: [
      "Patio-centered outdoor rooms",
      "Seating areas and gathering zones",
      "Hardscape that supports movement",
      "Transitions tied into walls, planting, and grade",
      "Layouts built for real daily use",
    ] as const,
    whyItMatters: [
      "A good outdoor living space changes how often the yard gets used.",
      "It gives the property a more complete, settled feeling.",
      "When the layout is right, the yard becomes easier to enjoy without feeling crowded or forced.",
    ] as const,
    approach: [
      "Peter keeps outdoor living work tied to the site and to how the homeowner wants to spend time outside.",
      "The goal is a relaxed finished space that feels natural with the rest of the landscape.",
    ] as const,
    cardImage: "/projects/at-home-oasis/75cbcd_29f3fe8a4fa04c7bb2cb12874a79300d~mv2.jpg.avif",
    cardImageAlt: "Outdoor living environment designed for gathering and daily use",
    gallery: getProjectFolderGallery("at-home-oasis", "Outdoor Living Spaces", [
      "75cbcd_29f3fe8a4fa04c7bb2cb12874a79300d~mv2.jpg.avif",
      "75cbcd_e43faf5545b448bca37d30359b2ba620~mv2.jpg.avif",
    ]),
    relatedLinks: [{ href: "/patios-pavers", label: "See patios and hardscaping" }] as const,
  },
  {
    slug: "land-shaping-site-planning",
    title: "Drainage & Site Work",
    eyebrow: "Groundwork before the finish work",
    cardDescription:
      "Drainage-aware site work, grading, and prep for yards that need the ground organized before the finished landscape goes in.",
    lead:
      "A lot of the best landscape work starts with the ground. Drainage-aware grading, shaping, and access work set the rest of the project up properly.",
    intro:
      "Peter handles drainage and site work for South Sound properties that need cleaner grade, better access, brush clearing, or a stronger base before walls, patios, or gardens are installed.",
    highlights: ["Drainage-aware grading", "Brush clearing and prep", "Base work before finishes"] as const,
    includes: [
      "Slope review and site layout",
      "Drainage-aware grading and water movement planning",
      "Grading for usable yard space",
      "Brush clearing and site prep",
      "Terrace and transition planning",
      "Preparation for walls, patios, and gardens",
    ] as const,
    whyItMatters: [
      "Good site work makes every later phase easier and cleaner.",
      "Problems with slope, drainage, access, and grade rarely get better by waiting.",
      "On South Sound lots, ground preparation is often the difference between a project that works and one that keeps fighting the site.",
    ] as const,
    approach: [
      "Peter treats drainage and site work as part of the finished outcome, not throwaway prep work.",
      "When the ground is shaped well first, the walls, patios, planting, and movement all fit the property better.",
    ] as const,
    cardImage: "/projects/landform-solutions/landform1.avif",
    cardImageAlt: "Drainage and site work project on a South Sound property",
    gallery: getProjectFolderGallery("landform-solutions", "Drainage and Site Work", [
      "landform1.avif",
      "housebefore.jpeg",
      "houseafter.jpeg",
      "91966f_04514acb8759499fac2efc0d34441978~mv2.jpg.avif",
    ]),
    projectSequence: [
      {
        label: "Before",
        src: "/projects/landform-solutions/housebefore.jpeg",
        alt: "Drainage and site work project before grading improvements",
      },
      {
        label: "After",
        src: "/projects/landform-solutions/houseafter.jpeg",
        alt: "Drainage and site work project after grading and finished site work",
      },
    ] as const,
  },
] as const;

export function getServicePage(slug: ServiceSlug) {
  return servicePages.find((service) => service.slug === slug);
}

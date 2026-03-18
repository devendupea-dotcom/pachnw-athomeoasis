import { readdir } from "node:fs/promises";
import path from "node:path";

type PortfolioSource = {
  folder: string;
  href: string;
  projectType: string;
  title: string;
  description: string;
};

type PortfolioGroupConfig = {
  key: string;
  title: string;
  intro: string;
  href: string;
  sources: readonly PortfolioSource[];
};

const portfolioGroupsConfig = [
  {
    key: "retaining-walls",
    title: "Retaining Walls",
    intro: "Structural wall work built to hold grade, clean up slopes, and make the yard more usable.",
    href: "/retaining-walls",
    sources: [
      {
        folder: "retaining-walls",
        href: "/retaining-walls",
        projectType: "Retaining Wall",
        title: "Retaining wall installation",
        description: "Structural wall work built to hold grade and create more usable yard space.",
      },
    ],
  },
  {
    key: "patios-outdoor-living",
    title: "Patios & Outdoor Living",
    intro: "Patios, seating areas, and finished outdoor spaces designed for gathering and everyday use.",
    href: "/outdoor-living",
    sources: [
      {
        folder: "at-home-oasis",
        href: "/outdoor-living",
        projectType: "Patio / Outdoor Living",
        title: "Patio and outdoor living area",
        description: "Hardscape and gathering areas designed for everyday use outside.",
      },
    ],
  },
  {
    key: "land-shaping-site-work",
    title: "Land Shaping & Site Work",
    intro: "Groundwork that organizes slope, access, and the next phase of the yard.",
    href: "/land-shaping-site-planning",
    sources: [
      {
        folder: "landform-solutions",
        href: "/land-shaping-site-planning",
        projectType: "Land Shaping / Site Work",
        title: "Land shaping and site work",
        description: "Groundwork that organizes slope, access, and the next phase of the yard.",
      },
    ],
  },
  {
    key: "permaculture-edible-landscapes",
    title: "Permaculture / Edible Landscapes",
    intro: "Useful planting, edible gardens, and productive landscape work shaped for Pacific Northwest properties.",
    href: "/permaculture-landscaping",
    sources: [
      {
        folder: "productive-landscapes",
        href: "/permaculture-landscaping",
        projectType: "Permaculture / Edible Landscape",
        title: "Productive landscape",
        description: "Useful planting and site planning shaped for Pacific Northwest conditions.",
      },
      {
        folder: "cultivated-gardens",
        href: "/permaculture-landscaping",
        projectType: "Permaculture / Edible Landscape",
        title: "Edible landscape build",
        description: "Structured planting areas built for food production, habitat, and long-term use.",
      },
    ],
  },
] as const satisfies readonly PortfolioGroupConfig[];

const portfolioSizePattern = ["large", "tall", "wide", "standard", "tall", "wide"] as const;

type PortfolioItemCore = {
  src: string;
  alt: string;
  href: string;
  projectType: string;
  title: string;
  description: string;
  location?: string;
  groupKey: string;
  groupTitle: string;
};

const portfolioOverrides: Record<
  string,
  Partial<Pick<PortfolioItemCore, "title" | "projectType" | "description" | "location">>
> = {
  "brushclearing.avif": {
    title: "Brush Clear",
    projectType: "Land Shaping / Site Work",
    description: "Brush clearing and site prep to open the property and prepare for future construction.",
  },
  "pumpkin patch.jpg.avif": {
    title: "Productive planting",
    description: "Food-producing landscape work that keeps the yard useful, seasonal, and attractive.",
  },
  "garden.avif": {
    title: "Garden beds",
    description: "Structured planting areas laid out for everyday use and long-term growth.",
  },
  "finishedwall.avif": {
    title: "Slope retaining wall",
    description: "Wall construction built to hold grade, organize the yard, and finish the edge cleanly.",
  },
  "houseafter.jpeg": {
    title: "Finished grade work",
    description: "Site shaping and yard organization completed for cleaner use and better flow.",
  },
} as const;

export type HomePortfolioItem = PortfolioItemCore & {
  size: (typeof portfolioSizePattern)[number];
};

export type HomePortfolioGroup = {
  key: string;
  title: string;
  intro: string;
  href: string;
  items: HomePortfolioItem[];
};

function isImageFile(filename: string) {
  return /\.(avif|webp|png|jpe?g|svg)$/i.test(filename);
}

function shouldHideFromPortfolio(filename: string) {
  const lower = filename.toLowerCase();
  return lower.includes("before") || lower.includes("during");
}

function applySizes(items: PortfolioItemCore[]): HomePortfolioItem[] {
  return items.map((item, index) => ({
    ...item,
    size: portfolioSizePattern[index % portfolioSizePattern.length],
  }));
}

function withoutSize(items: readonly HomePortfolioItem[]): PortfolioItemCore[] {
  return items.map(({ src, alt, href, projectType, title, description, location, groupKey, groupTitle }) => ({
    src,
    alt,
    href,
    projectType,
    title,
    description,
    location,
    groupKey,
    groupTitle,
  }));
}

export async function getHomePortfolioGroups(): Promise<HomePortfolioGroup[]> {
  const projectsDir = path.join(process.cwd(), "public", "projects");
  const seenFilenames = new Set<string>();
  const groups: HomePortfolioGroup[] = [];

  for (const group of portfolioGroupsConfig) {
    const collected: PortfolioItemCore[] = [];

    for (const source of group.sources) {
      let filenames: string[] = [];

      try {
        filenames = await readdir(path.join(projectsDir, source.folder));
      } catch {
        continue;
      }

      const filtered = filenames
        .filter(isImageFile)
        .filter((filename) => !shouldHideFromPortfolio(filename))
        .sort((left, right) => left.localeCompare(right));

      for (const filename of filtered) {
        const dedupeKey = filename.toLowerCase();

        if (seenFilenames.has(dedupeKey)) {
          continue;
        }

        seenFilenames.add(dedupeKey);

        const override = portfolioOverrides[dedupeKey];

        collected.push({
          src: `/projects/${source.folder}/${filename}`,
          alt: `${override?.title ?? source.title} project photo from PACH NW At Home Oasis`,
          href: source.href,
          projectType: override?.projectType ?? source.projectType,
          title: override?.title ?? source.title,
          description: override?.description ?? source.description,
          location: override?.location,
          groupKey: group.key,
          groupTitle: group.title,
        });
      }
    }

    if (!collected.length) {
      continue;
    }

    groups.push({
      key: group.key,
      title: group.title,
      intro: group.intro,
      href: group.href,
      items: applySizes(collected),
    });
  }

  return groups;
}

export async function getHomePortfolioItems(): Promise<HomePortfolioItem[]> {
  const groups = await getHomePortfolioGroups();
  return applySizes(groups.flatMap((group) => withoutSize(group.items)));
}

export async function getHomePortfolioPreviewItems(): Promise<HomePortfolioItem[]> {
  const groups = await getHomePortfolioGroups();
  const desiredCounts: Record<string, number> = {
    "retaining-walls": 2,
    "patios-outdoor-living": 2,
    "land-shaping-site-work": 1,
    "permaculture-edible-landscapes": 1,
  };

  const previewItems = groups.flatMap((group) => withoutSize(group.items.slice(0, desiredCounts[group.key] ?? 1)));

  return applySizes(previewItems);
}

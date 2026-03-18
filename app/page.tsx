import Image from "next/image";
import Link from "next/link";
import { Armchair, ArrowRight, Hammer, MapPin, Sprout, type LucideIcon } from "lucide-react";
import { ContactForm } from "@/src/components/ContactForm";
import { HeroImageCarousel } from "@/src/components/HeroImageCarousel";
import { HomePortfolioGallery } from "@/src/components/HomePortfolioGallery";
import { SiteFooter } from "@/src/components/SiteFooter";
import { SiteHeader } from "@/src/components/SiteHeader";
import { getHomePortfolioPreviewItems } from "@/src/content/homePortfolio";
import { siteConfig } from "@/src/siteConfig";

const heroPoints = [
  "Owner-led design and build",
  "10+ years experience",
  "Tacoma • Gig Harbor • Puyallup",
] as const;

const trustItems = [
  {
    title: "Owner-Led Projects",
    detail: "Peter handles the project from consultation through build.",
  },
  {
    title: "10+ Years Experience",
    detail: "Professional wall, hardscape, and landscape construction experience in the field.",
  },
  {
    title: "Built for PNW Conditions",
    detail: "Planned around slope, drainage, soil, and long-term durability.",
  },
  {
    title: "South Sound Service Area",
    detail: "Serving Tacoma, Gig Harbor, Puyallup, Lakewood, University Place, Olympia, and nearby communities.",
  },
] as const;

const heroSlides = [
  {
    src: "/brand/hero1.jpg.avif",
    alt: "Finished retaining wall and landscape construction project in the South Sound",
    label: "Retaining walls and finished outdoor structure",
  },
  {
    src: "/brand/hero2.jpg.avif",
    alt: "Patio and planted outdoor living project by PACH NW At Home Oasis",
    label: "Outdoor living with planted structure and finished hardscape",
  },
] as const;

const homeServices = [
  {
    title: "Retaining Walls",
    eyebrow: "Structural retaining walls",
    description: "Owner-led retaining wall construction for slope control, cleaner grade changes, and more usable yard space.",
    href: "/retaining-walls",
    image: "/projects/retaining-walls/finishedwall.avif",
    alt: "Finished retaining wall project in a residential yard",
    highlights: ["Grade control", "Drainage planning", "Tiered walls"] as const,
  },
  {
    title: "Patios & Hardscaping",
    eyebrow: "Patios, pavers, and circulation",
    description: "Patios, pavers, paths, and steps that make the yard easier to use every day and feel more finished.",
    href: "/patios-pavers",
    image: "/projects/at-home-oasis/75cbcd_e43faf5545b448bca37d30359b2ba620~mv2.jpg.avif",
    alt: "Patio and hardscaping project with seating area",
    highlights: ["Patios", "Paths", "Steps"] as const,
  },
  {
    title: "Permaculture / Edible Landscapes",
    eyebrow: "Useful planting and whole-site thinking",
    description: "Productive planting, edible gardens, and practical permaculture-minded landscapes built for the Pacific Northwest.",
    href: "/permaculture-landscaping",
    image: "/projects/productive-landscapes/pumpkin patch.jpg.avif",
    alt: "Productive edible landscape project in the Pacific Northwest",
    highlights: ["Edible gardens", "Native planting", "Whole-site planning"] as const,
  },
] as const;

type ProjectTier = {
  title: string;
  description: string;
  items: readonly string[];
  icon: LucideIcon;
  featured?: boolean;
};

const projectTiers: readonly ProjectTier[] = [
  {
    title: "Foundation Projects",
    description: "Simple, clean upgrades to refresh and improve your yard without a large investment.",
    items: ["Garden beds", "Planting", "Mulch / rock installs", "Basic yard cleanup"] as const,
    icon: Sprout,
  },
  {
    title: "Structural Solutions",
    description: "Fix grading, drainage, and structural issues while improving usability.",
    items: ["Retaining walls", "Drainage systems", "Land leveling", "Functional yard improvements"] as const,
    icon: Hammer,
  },
  {
    title: "Outdoor Living Spaces",
    description: "Full transformations designed for comfort, entertainment, and long-term value.",
    items: ["Paver patios", "Fire pits", "Outdoor living areas", "Complete backyard builds"] as const,
    icon: Armchair,
    featured: true,
  },
];

const featuredProjects = [
  {
    title: "Slope Stabilization Retaining Wall",
    href: "/retaining-walls",
    label: "Retaining Walls",
    problem: "A steep grade was limiting usable yard space and needed a cleaner structural solution.",
    solution: "Installed a retaining wall with layout, drainage planning, and a finished wall face that fit the property.",
    result: "The yard gained stronger grade control, cleaner edges, and more usable outdoor space.",
    images: [
      {
        src: "/projects/retaining-walls/finishedwall.avif",
        alt: "Finished retaining wall that stabilizes a residential slope",
      },
      {
        src: "/projects/retaining-walls/75cbcd_c706ac2a7a9749cfa058fbeaf2f57251~mv2.jpg.avif",
        alt: "Retaining wall detail showing finished block work and planting edge",
      },
    ],
  },
  {
    title: "Patio & Outdoor Living Area",
    href: "/patios-pavers",
    label: "Patios & Hardscaping",
    problem: "The yard needed a clearer place to gather, sit, and move comfortably outside.",
    solution: "Built a patio-centered outdoor area with finished hardscape, retaining structure, and stronger circulation.",
    result: "The property became easier to use for daily outdoor time, seating, and entertaining.",
    images: [
      {
        src: "/projects/at-home-oasis/75cbcd_29f3fe8a4fa04c7bb2cb12874a79300d~mv2.jpg.avif",
        alt: "Finished patio and outdoor living area with retaining wall seating",
      },
      {
        src: "/projects/at-home-oasis/75cbcd_e43faf5545b448bca37d30359b2ba620~mv2.jpg.avif",
        alt: "Outdoor living space with finished hardscape and seating layout",
      },
    ],
  },
  {
    title: "Grade Rework & Site Improvement",
    href: "/land-shaping-site-planning",
    label: "Drainage & Site Work",
    problem: "The site needed cleaner grade, better organization, and a stronger base before later landscape phases.",
    solution: "Reworked the property with grading, shaping, and cleaner site setup before finish work moved forward.",
    result: "The yard gained better access, better order, and a stronger starting point for the next phase of construction.",
    images: [
      {
        src: "/projects/landform-solutions/housebefore.jpeg",
        alt: "Residential yard before grade rework and site improvement",
      },
      {
        src: "/projects/landform-solutions/houseafter.jpeg",
        alt: "Residential yard after grade rework and site improvement",
      },
    ],
  },
] as const;

const whyChooseItems = [
  {
    title: "Owner-led from start to finish",
    detail: "You talk directly with Peter about the project, the site, and how the work will be built.",
  },
  {
    title: "10+ years of wall and hardscape experience",
    detail: "Real field experience in retaining walls, pavers, hardscape production, and residential construction.",
  },
  {
    title: "Built for slope, drainage, and grade",
    detail: "Projects are planned around the way South Sound properties actually behave over time.",
  },
  {
    title: "Residential project focus",
    detail: "The work is designed for how homeowners want to live in the yard, not just how it photographs.",
  },
  {
    title: "Natural layout thinking",
    detail: "The landscape is shaped to feel grounded, practical, and connected to the property.",
  },
  {
    title: "Clear local service area",
    detail: "Serving Tacoma, Gig Harbor, Puyallup, Lakewood, University Place, Olympia, and nearby communities.",
  },
] as const;

const reviewNotes = [
  {
    title: "Reviews are being added",
    detail: "Homeowner feedback from completed projects will be added here as the site continues to grow.",
  },
  {
    title: "Want references?",
    detail: "Ask Peter about similar wall, patio, site-work, or productive landscape projects during your consultation.",
  },
] as const;

const aboutHighlights = [
  {
    title: "Pacific Northwest roots",
    detail: "A background shaped by mountains, water, gardens, and the way outdoor spaces affect daily life here.",
  },
  {
    title: "Natural sciences perspective",
    detail: "Education and land-stewardship thinking that help projects fit the site instead of fighting it.",
  },
  {
    title: "Construction and development experience",
    detail: "Hands-on work in retaining walls, pavers, residential construction, and property development.",
  },
] as const;

const serviceAreaHighlights = [
  "Tacoma",
  "Gig Harbor",
  "Puyallup",
  "University Place",
  "Lakewood",
  "Olympia",
] as const;

const localProjectTypes = [
  "Retaining walls",
  "Patios and hardscaping",
  "Permaculture / edible landscapes",
] as const;

export default async function HomePage() {
  const portfolioPreviewItems = await getHomePortfolioPreviewItems();

  return (
    <>
      <SiteHeader />

      <main id="top">
        <section className="home-hero-section">
          <HeroImageCarousel slides={heroSlides}>
            <div className="home-hero-story">
              <p className="eyebrow">South Sound contractor</p>
              <h1>Retaining Walls, Patios &amp; Landscape Construction in the South Sound</h1>
              <p className="home-hero-lede">
                Owner-led design and build with 10+ years of experience serving Tacoma, Gig Harbor, Puyallup, and
                surrounding areas.
              </p>

              <div className="home-hero-points" aria-label="Hero trust points">
                {heroPoints.map((point) => (
                  <span key={point}>{point}</span>
                ))}
              </div>

              <div className="home-hero-actions">
                <Link href="/#contact" className="button button-primary">
                  Get a Quote
                </Link>
                <Link href="/portfolio" className="button button-secondary">
                  View Projects
                </Link>
              </div>
            </div>
          </HeroImageCarousel>
        </section>

        <section className="home-credibility-section">
          <div className="container credibility-row">
            {trustItems.map((item) => (
              <article key={item.title} className="credibility-item">
                <strong>{item.title}</strong>
                <span>{item.detail}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="section-shell" id="services">
          <div className="container">
            <div className="section-intro section-intro-wide">
              <p className="eyebrow">Services</p>
              <h2>Core work built around real property problems.</h2>
              <p>
                Three clear service paths for retaining walls, patios and hardscaping, and productive edible
                landscapes, with each one leading into a dedicated service page.
              </p>
            </div>

            <div className="home-service-grid">
              {homeServices.map((service) => (
                <article key={service.title} className="home-service-card">
                  <Link href={service.href} className="home-service-card-link">
                    <div className="home-service-card-image">
                      <Image
                        src={service.image}
                        alt={service.alt}
                        fill
                        sizes="(min-width: 1024px) 42vw, (min-width: 768px) 46vw, 100vw"
                        className="service-strip-photo"
                      />
                    </div>

                    <div className="home-service-card-copy">
                      <p className="mini-label">{service.eyebrow}</p>
                      <h3>{service.title}</h3>
                      <p>{service.description}</p>

                      <div className="home-service-card-points" aria-label={`${service.title} highlights`}>
                        {service.highlights.map((point) => (
                          <span key={point} className="home-service-card-point">
                            {point}
                          </span>
                        ))}
                      </div>

                      <span className="service-cta-link">
                        Learn More
                        <ArrowRight size={16} />
                      </span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell section-tinted" id="project-tiers">
          <div className="container">
            <div className="section-intro section-intro-wide">
              <p className="eyebrow">Project Tiers</p>
              <h2>Choose the level of project that fits your yard.</h2>
              <p>
                Start with a simpler refresh, solve a structural problem, or plan for a more complete outdoor living
                build. Every tier still leads straight to an estimate with Peter.
              </p>
            </div>

            <div className="project-tier-grid">
              {projectTiers.map((tier) => {
                const TierIcon = tier.icon;

                return (
                  <article
                    key={tier.title}
                    className={`project-tier-card${tier.featured ? " is-featured" : ""}`}
                  >
                    <div className="project-tier-head">
                      <span className="project-tier-icon" aria-hidden="true">
                        <TierIcon size={22} strokeWidth={2.1} />
                      </span>
                      <div className="project-tier-copy">
                        <p className="mini-label">Project Tier</p>
                        <h3>{tier.title}</h3>
                      </div>
                    </div>

                    <p>{tier.description}</p>

                    <ul className="project-tier-list">
                      {tier.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>

                    <Link href="/#contact" className="button button-secondary project-tier-cta">
                      Get Estimate
                      <ArrowRight size={16} />
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section-shell section-tinted" id="featured-projects">
          <div className="container featured-project-list">
            <div className="section-intro section-intro-wide">
              <p className="eyebrow">Featured Projects</p>
              <h2>Three examples of the problems solved on real properties.</h2>
              <p>Each project shows the issue on site, the work installed, and the result for the homeowner.</p>
            </div>

            {featuredProjects.map((project, index) => (
              <article
                key={project.title}
                className={`featured-project${index % 2 === 1 ? " featured-project-reverse" : ""}`}
              >
                <div className="featured-project-copy">
                  <p className="mini-label">{project.label}</p>
                  <h3>{project.title}</h3>

                  <div className="featured-project-step-list">
                    <div className="featured-project-step">
                      <span className="featured-project-step-label">Problem</span>
                      <p>{project.problem}</p>
                    </div>
                    <div className="featured-project-step">
                      <span className="featured-project-step-label">Solution</span>
                      <p>{project.solution}</p>
                    </div>
                    <div className="featured-project-step">
                      <span className="featured-project-step-label">Result</span>
                      <p>{project.result}</p>
                    </div>
                  </div>

                  <Link href={project.href} className="button button-secondary featured-project-link">
                    See Service
                    <ArrowRight size={16} />
                  </Link>
                </div>

                <div className="featured-project-media">
                  <div className="featured-project-primary">
                    <Image
                      src={project.images[0].src}
                      alt={project.images[0].alt}
                      fill
                      sizes="(min-width: 1024px) 42vw, 100vw"
                      className="featured-project-image"
                    />
                  </div>

                  <div className="featured-project-secondary">
                    {project.images.slice(1).map((image) => (
                      <div key={image.src} className="featured-project-secondary-item">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          sizes="(min-width: 1024px) 22vw, 100vw"
                          className="featured-project-image"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-shell" id="why-choose">
          <div className="container why-choose-layout">
            <div className="why-choose-copy">
              <div className="section-intro section-intro-tight">
                <p className="eyebrow">Why Homeowners Choose PACH NW</p>
                <h2>Owner-led work with real field experience and a calmer finished result.</h2>
              </div>
              <p>
                The focus is straightforward: solve the structural problem, build the outdoor space cleanly, and leave
                the property with a more settled, usable landscape.
              </p>
            </div>

            <div className="why-choose-grid">
              {whyChooseItems.map((item) => (
                <article key={item.title} className="why-choose-card">
                  <strong>{item.title}</strong>
                  <p>{item.detail}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="container review-note-shell">
            <div className="review-note-grid">
              {reviewNotes.map((item) => (
                <article key={item.title} className="review-note-card">
                  <p className="mini-label">Reviews</p>
                  <strong>{item.title}</strong>
                  <p>{item.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell section-tinted" id="portfolio">
          <div className="container portfolio-preview-shell">
            <div className="portfolio-preview-header">
              <div className="section-intro section-intro-wide">
                <p className="eyebrow">Portfolio</p>
                <h2>See more of the work.</h2>
                <p>
                  A curated preview of retaining walls, patios, outdoor living, site work, and productive landscape
                  projects, with the full grouped gallery on the portfolio page.
                </p>
              </div>

              <div className="cta-band-actions portfolio-preview-actions">
                <Link href="/portfolio" className="button button-primary">
                  See Full Portfolio
                </Link>
                <Link href="/#contact" className="button button-secondary">
                  Get a Quote
                </Link>
              </div>
            </div>

            <HomePortfolioGallery items={portfolioPreviewItems} />
          </div>
        </section>

        <section className="section-shell" id="about">
          <div className="container about-summary-grid">
            <div className="about-summary-media">
              <Image
                src="/projects/productive-landscapes/garden.avif"
                alt="Productive landscape project showing structured garden beds and clean site planning"
                fill
                sizes="(min-width: 1024px) 38vw, 100vw"
                className="featured-project-image"
              />
            </div>

            <div className="about-summary-copy">
              <div className="section-intro section-intro-tight">
                <p className="eyebrow">About Peter</p>
                <h2>Construction experience with a stronger land perspective.</h2>
              </div>

              <p>
                Peter grew up around Pacific Northwest mountains, water, and gardens, then studied Natural Sciences and
                later worked around sustainability, wall and paver production, residential construction, and property
                development.
              </p>
              <p>
                That mix shows up in the work: cleaner site planning, more grounded material choices, and outdoor
                spaces that solve real property problems without losing the natural feel of the yard.
              </p>

              <div className="about-summary-points">
                {aboutHighlights.map((item) => (
                  <article key={item.title} className="about-summary-point">
                    <strong>{item.title}</strong>
                    <span>{item.detail}</span>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell section-tinted" id="service-areas">
          <div className="container areas-layout">
            <div className="section-intro">
              <p className="eyebrow">Service Area</p>
              <h2>Serving the South Sound</h2>
              <p>
                PACH NW At Home Oasis works with homeowners across Tacoma, Puyallup, Gig Harbor, University Place,
                Lakewood, Olympia, and surrounding South Sound communities.
              </p>
            </div>

            <div className="areas-panel-simple">
              <div className="areas-location">
                <MapPin size={20} strokeWidth={2} />
                <span>{siteConfig.locationLabel}</span>
              </div>

              <p className="areas-copy">
                Common local projects include retaining walls for sloped properties, patios and hardscaping for daily
                outdoor use, and practical edible landscape installs built for Pacific Northwest conditions.
              </p>

              <div className="area-chip-list" aria-label="South Sound service areas">
                {serviceAreaHighlights.map((city) => (
                  <span key={city} className="area-chip">
                    {city}
                  </span>
                ))}
              </div>

              <div className="capability-strip" aria-label="South Sound project types">
                {localProjectTypes.map((item) => (
                  <span key={item} className="capability-chip">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell" id="contact">
          <div className="container contact-layout">
            <div className="contact-intro">
              <p className="eyebrow">Get a Quote</p>
              <h2>Ready to start your project?</h2>
              <p>
                Get a consultation with Peter for your retaining wall, patio and hardscaping, or productive edible
                landscape project. Start with the main problem, the part of the yard involved, and the city where the
                work is located.
              </p>

              <div className="contact-quick-actions">
                <a href="#quote-form" className="button button-primary">
                  Get a Quote
                </a>
                <a href={`tel:${siteConfig.contactPhoneHref}`} className="button button-secondary">
                  Call / Text Peter
                </a>
              </div>

              <div className="contact-method-grid">
                <article className="contact-method-card">
                  <p className="mini-label">Call or Text</p>
                  <strong>Fastest way to start</strong>
                  <a href={`tel:${siteConfig.contactPhoneHref}`}>{siteConfig.contactPhone}</a>
                </article>

                <article className="contact-method-card">
                  <p className="mini-label">Email</p>
                  <strong>Send photos or project notes</strong>
                  <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
                </article>

                <article className="contact-method-card">
                  <p className="mini-label">Service Area</p>
                  <strong>South Sound homeowners</strong>
                  <span>{siteConfig.locationLabel}</span>
                </article>
              </div>
            </div>

            <div className="contact-panel" id="quote-form">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}

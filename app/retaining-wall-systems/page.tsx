import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink, ShieldCheck } from "lucide-react";
import { SiteFooter } from "@/src/components/SiteFooter";
import { SiteHeader } from "@/src/components/SiteHeader";
import {
  gravityStoneOverviewImage,
  gravityStoneProjectGallery,
  gravityStoneSpecsUrl,
  gravityStoneStyles,
  gravityStoneSystemOverview,
} from "@/src/content/retainingWallSystems";

export const metadata: Metadata = {
  title: "Retaining Wall Systems",
  description:
    "Explore Peter's GravityStone Edge retaining wall system offerings, including Edge Weave, Forged Face, and Standard Edge styles.",
};

export default function RetainingWallSystemsPage() {
  return (
    <>
      <SiteHeader />

      <main>
        <section className="section-shell retaining-systems-hero">
          <div className="container retaining-systems-hero-grid">
            <div className="retaining-systems-copy">
              <p className="eyebrow">Retaining Wall Systems</p>
              <h1>{gravityStoneSystemOverview.title}</h1>
              <p className="retaining-style-lede">{gravityStoneSystemOverview.intro}</p>
              <p>{gravityStoneSystemOverview.description}</p>

              <div className="hero-actions">
                <Link href="/#contact" className="button button-primary">
                  Talk to Peter
                </Link>
                <a
                  href={gravityStoneSpecsUrl}
                  className="button button-secondary"
                  target="_blank"
                  rel="noreferrer"
                >
                  Official Specs
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>

            <div className="retaining-systems-visual">
              <div className="retaining-systems-project-image">
                <Image
                  src={gravityStoneOverviewImage}
                  alt="GravityStone Edge retaining wall job installed on a finished project"
                  fill
                  sizes="(min-width: 1024px) 38vw, 100vw"
                  className="retaining-style-image"
                />
              </div>
              <div className="retaining-system-note">
                <p className="mini-label">Installer perspective</p>
                <p>
                  Peter uses GravityStone Edge on retaining wall projects where the finished face matters, the wall
                  needs to sit cleanly in the larger landscape, and the homeowner wants a system worth discussing in
                  more detail than a generic block choice.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell section-tinted">
          <div className="container retaining-system-points">
            {gravityStoneSystemOverview.talkingPoints.map((point) => (
              <article key={point} className="retaining-benefit-card">
                <ShieldCheck size={18} strokeWidth={2.15} />
                <p>{point}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-shell service-photo-strip-section">
          <div className="container">
            <div className="section-intro section-intro-wide">
              <p className="eyebrow">Installed Work</p>
              <h2>Real GravityStone Edge project photos from Peter&apos;s job folder.</h2>
              <p>
                A quick look at the finished wall work, layout, and site fit before you get into the specific style
                pages.
              </p>
            </div>

            <div className="service-photo-strip">
              {gravityStoneProjectGallery.map((image) => (
                <div key={image.src} className="service-photo-strip-item">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1280px) 28vw, (min-width: 768px) 40vw, 78vw"
                    className="service-page-image"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell">
          <div className="container">
            <div className="section-intro section-intro-wide">
              <p className="eyebrow">Available Styles</p>
              <h2>Three GravityStone Edge style directions Peter can quote and install.</h2>
              <p>
                These pages help clients compare the look and feel of the system using real project photos before
                getting into final project-specific detailing.
              </p>
            </div>

            <div className="retaining-style-card-grid">
              {gravityStoneStyles.map((style) => (
                <article key={style.slug} className="retaining-style-card">
                  <div className="retaining-style-card-image">
                    <Image
                      src={style.cardImage}
                      alt={style.cardImageAlt}
                      fill
                      sizes="(min-width: 1024px) 22vw, (min-width: 768px) 44vw, 100vw"
                      className="retaining-style-image"
                    />
                  </div>
                  <div className="retaining-style-card-copy">
                    <p className="mini-label">GravityStone Edge Style</p>
                    <h3>{style.name}</h3>
                    <p>{style.shortDescription}</p>
                    <Link href={`/${style.slug}`} className="button button-primary">
                      Learn More
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell">
          <div className="container">
            <aside className="cta-band">
              <div>
                <p className="eyebrow">Need technical detail too?</p>
                <h3>Peter can walk you through installation fit, and WestBlock&apos;s official specs can handle the formal reference side.</h3>
              </div>
              <div className="retaining-style-cta-actions">
                <Link href="/#contact" className="button button-primary">
                  Request a Wall Consultation
                </Link>
                <a
                  href={gravityStoneSpecsUrl}
                  className="button button-secondary"
                  target="_blank"
                  rel="noreferrer"
                >
                  Manufacturer Specs
                  <ExternalLink size={16} />
                </a>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}

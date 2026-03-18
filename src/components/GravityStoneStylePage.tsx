import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink, ShieldCheck } from "lucide-react";
import { SiteFooter } from "@/src/components/SiteFooter";
import { SiteHeader } from "@/src/components/SiteHeader";
import { gravityStoneSpecsUrl, type GravityStoneStyle } from "@/src/content/retainingWallSystems";

type GravityStoneStylePageProps = {
  style: GravityStoneStyle;
};

export function GravityStoneStylePage({ style }: GravityStoneStylePageProps) {
  return (
    <>
      <SiteHeader />

      <main>
        <section className="section-shell retaining-style-hero">
          <div className="container retaining-style-hero-grid">
            <div className="retaining-style-copy">
              <p className="eyebrow">GravityStone Edge Style</p>
              <h1>{style.name}</h1>
              <p className="retaining-style-lede">{style.intro}</p>
              <p>{style.description}</p>

              <div className="hero-actions">
                <a href="#retaining-style-cta" className="button button-primary">
                  Request a Consultation
                </a>
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

              <div className="featured-chip-row">
                {style.highlights.map((highlight) => (
                  <span key={highlight} className="featured-chip">
                    {highlight}
                  </span>
                ))}
              </div>
            </div>

            <div className="retaining-style-visual">
              <div className="retaining-style-swatch">
                <Image
                  src={style.cardImage}
                  alt={style.cardImageAlt}
                  fill
                  sizes="(min-width: 1024px) 34vw, 100vw"
                  className="retaining-style-image"
                />
              </div>
              <div className="retaining-style-visual-note">
                <p className="mini-label">Why Peter installs it</p>
                <p>
                  More than 10 years of retaining wall field experience means Peter is looking beyond block appearance
                  alone. Layout, drainage, base prep, grade transitions, and the way the finished wall sits in the
                  landscape all matter.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell section-tinted">
          <div className="container retaining-style-body">
            <div className="retaining-style-benefits">
              <div className="section-intro">
                <p className="eyebrow">Installation Benefits</p>
                <h2>{style.name} from an installer&apos;s point of view.</h2>
                <p>
                  Peter positions this style for homeowners who want a retaining wall system that feels resolved in the
                  finished landscape, not like an afterthought added only to solve grade.
                </p>
              </div>

              <div className="retaining-benefit-list">
                {style.installationBenefits.map((benefit) => (
                  <article key={benefit} className="retaining-benefit-card">
                    <ShieldCheck size={18} strokeWidth={2.15} />
                    <p>{benefit}</p>
                  </article>
                ))}
              </div>
            </div>

            <aside className="retaining-experience-card">
              <p className="eyebrow">Peter&apos;s Experience</p>
              <h3>Retaining wall work that respects both structure and finish.</h3>
              <p>
                Peter brings more than 10 years of retaining wall experience to projects that need real grade control,
                cleaner yard organization, and a finished appearance that holds its own next to planting, patios, and
                the home itself.
              </p>
              <p>
                The value is not just that he can install the system. It is that he understands where a wall sits in
                the larger site plan and how to keep the final result feeling deliberate.
              </p>
            </aside>
          </div>
        </section>

        <section className="section-shell">
          <div className="container retaining-style-gallery">
            <div className="section-intro section-intro-wide">
              <p className="eyebrow">System Imagery</p>
              <h2>{style.name} shown through real installed GravityStone Edge work.</h2>
            </div>

            <div className="retaining-style-gallery-grid">
              <div className="retaining-style-gallery-primary">
                <Image
                  src={style.cardImage}
                  alt={style.cardImageAlt}
                  fill
                  sizes="(min-width: 1024px) 28vw, 100vw"
                  className="retaining-style-image"
                />
              </div>

              {style.wallImages.map((image) => (
                <div key={image.src} className="retaining-style-gallery-item">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1024px) 28vw, (min-width: 768px) 45vw, 100vw"
                    className="retaining-style-image"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell" id="retaining-style-cta">
          <div className="container">
            <aside className="cta-band">
              <div>
                <p className="eyebrow">Planning a retaining wall project?</p>
                <h3>Talk to Peter about the right GravityStone Edge direction for your site.</h3>
              </div>
              <div className="retaining-style-cta-actions">
                <Link href="/#contact" className="button button-primary">
                  Start a Project Consultation
                  <ArrowRight size={18} />
                </Link>
                <a
                  href={gravityStoneSpecsUrl}
                  className="button button-secondary"
                  target="_blank"
                  rel="noreferrer"
                >
                  View Official Specs
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

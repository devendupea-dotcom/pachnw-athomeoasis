import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { InteractiveServicePhotoStrip } from "@/src/components/InteractiveServicePhotoStrip";
import { SiteFooter } from "@/src/components/SiteFooter";
import { SiteHeader } from "@/src/components/SiteHeader";
import type { ServicePageData } from "@/src/content/services";
import { siteConfig } from "@/src/siteConfig";

type ServicePageTemplateProps = {
  service: ServicePageData;
};

export function ServicePageTemplate({ service }: ServicePageTemplateProps) {
  const sequenceEyebrow = service.projectSequence?.some((image) => image.label === "During")
    ? "Before / During / After"
    : "Before / After";
  const jumpLinks = [
    service.gallery.length ? { href: "#service-photos", label: "Photos" } : null,
    service.projectSequence?.length ? { href: "#service-project-flow", label: "Project Flow" } : null,
    { href: "#service-includes", label: "Includes" },
    { href: "#service-why", label: "Why It Helps" },
    { href: "#service-approach", label: "Approach" },
  ].filter(Boolean) as ReadonlyArray<{ href: string; label: string }>;

  return (
    <>
      <SiteHeader />

      <main>
        <section className="section-shell service-page-hero">
          <div className="container service-page-hero-grid">
            <div className="service-page-copy">
              <p className="eyebrow">{service.eyebrow}</p>
              <h1>{service.title}</h1>
              <p className="service-page-lede">{service.lead}</p>
              <p>{service.intro}</p>

              <div className="service-page-highlights" aria-label={`${service.title} highlights`}>
                {service.highlights.map((item) => (
                  <span key={item} className="service-page-highlight">
                    {item}
                  </span>
                ))}
              </div>

              <div className="service-page-actions">
                <a href={`tel:${siteConfig.contactPhoneHref}`} className="button button-primary">
                  Call or Text Peter
                </a>
                <Link href="/#contact" className="button button-secondary">
                  Get a Quote
                </Link>
              </div>

              <div className="hero-actions">
                <Link href="/#services" className="service-page-text-link">
                  All Services
                </Link>
              </div>

              {service.relatedLinks?.length ? (
                <div className="service-page-related-links">
                  {service.relatedLinks.map((link) => (
                    <Link key={link.href} href={link.href} className="service-related-link">
                      {link.label}
                      <ArrowRight size={16} />
                    </Link>
                  ))}
                </div>
              ) : null}

              <div className="service-page-local-card">
                <p className="mini-label">South Sound Service</p>
                <p>
                  {service.title} for Tacoma, Gig Harbor, Puyallup, University Place, Lakewood, Olympia, and nearby
                  South Sound communities.
                </p>
              </div>

              {jumpLinks.length ? (
                <div className="service-page-jump-links" aria-label={`${service.title} page sections`}>
                  {jumpLinks.map((link) => (
                    <a key={link.href} href={link.href} className="service-page-jump-link">
                      {link.label}
                    </a>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="service-page-hero-image">
              <Image
                src={service.cardImage}
                alt={service.cardImageAlt}
                fill
                sizes="(min-width: 1024px) 38vw, 100vw"
                className="service-page-image"
              />
            </div>
          </div>
        </section>

        {service.gallery.length ? (
          <section
            className="service-photo-strip-section"
            id="service-photos"
            aria-label={`${service.title} project photos`}
          >
            <div className="container">
              <InteractiveServicePhotoStrip label={service.title} photos={service.gallery} />
            </div>
          </section>
        ) : null}

        {service.projectSequence?.length ? (
          <section className="section-shell section-tinted" id="service-project-flow">
            <div className="container service-sequence-shell">
              <div className="section-intro section-intro-wide">
                <p className="eyebrow">{sequenceEyebrow}</p>
                <h2>One project from start to finish.</h2>
              </div>

              <div className="service-sequence-grid">
                {service.projectSequence.map((image) => (
                  <article key={image.src} className="service-sequence-card">
                    <div className="service-sequence-image">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(min-width: 1024px) 30vw, (min-width: 768px) 32vw, 100vw"
                        className="service-page-image"
                      />
                    </div>
                    <p className="mini-label">{image.label}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="section-shell section-tinted" id="service-includes">
          <div className="container service-includes-shell">
            <div className="section-intro section-intro-wide">
              <p className="eyebrow">What Is Included</p>
              <h2>What this service can include.</h2>
            </div>

            <div className="service-includes-grid">
              {service.includes.map((item) => (
                <article key={item} className="service-include-card">
                  <p>{item}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell" id="service-why">
          <div className="container service-page-body">
            <div className="service-why-block">
              <div className="section-intro">
                <p className="eyebrow">Why It Helps</p>
                <h2>Why this work matters on the property.</h2>
              </div>

              <div className="service-why-list">
                {service.whyItMatters.map((point) => (
                  <p key={point} className="service-why-item">
                    {point}
                  </p>
                ))}
              </div>
            </div>

            <aside className="service-approach-card" id="service-approach">
              <p className="eyebrow">How Peter Works</p>
              <h3>Simple planning. Solid work. A clean finished result.</h3>
              <div className="service-approach-copy">
                {service.approach.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section className="section-shell">
          <div className="container">
            <aside className="cta-band">
              <div>
                <p className="eyebrow">Ready To Talk?</p>
                <h3>Talk with Peter about your {service.title.toLowerCase()} project.</h3>
                <p className="service-page-cta-copy">
                  Start with the problem you want solved, the area of the yard involved, and the city where the work
                  is located.
                </p>
              </div>
              <div className="cta-band-actions">
                <a href={`tel:${siteConfig.contactPhoneHref}`} className="button button-secondary">
                  Call or Text Peter
                </a>
                <Link href="/#contact" className="button button-primary">
                  Get a Quote
                  <ArrowRight size={18} />
                </Link>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { HomePortfolioGallery } from "@/src/components/HomePortfolioGallery";
import { SiteFooter } from "@/src/components/SiteFooter";
import { SiteHeader } from "@/src/components/SiteHeader";
import { getHomePortfolioGroups, getHomePortfolioItems } from "@/src/content/homePortfolio";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Browse retaining walls, patios, landscape construction, site work, and productive landscape projects from PACH NW At Home Oasis.",
};

export default async function PortfolioPage() {
  const [portfolioItems, portfolioGroups] = await Promise.all([getHomePortfolioItems(), getHomePortfolioGroups()]);

  return (
    <>
      <SiteHeader />

      <main>
        <section className="section-shell portfolio-page-hero">
          <div className="container portfolio-page-intro">
            <div className="section-intro section-intro-wide">
              <p className="eyebrow">Portfolio</p>
              <h1>See the work in one place.</h1>
              <p>
                Browse retaining walls, patios, site work, and productive landscape projects. Open any image for a
                closer look, then jump into the matching service when you are ready.
              </p>
              <p className="portfolio-page-count">{portfolioItems.length} project photos</p>
            </div>

            <div className="cta-band-actions portfolio-page-actions">
              <Link href="/#contact" className="button button-primary">
                Get a Quote
              </Link>
              <Link href="/" className="button button-secondary">
                Back to Home
              </Link>
            </div>
          </div>
        </section>

        <section className="section-shell section-tinted">
          <div className="container">
            <div className="portfolio-page-groups">
              {portfolioGroups.map((group) => (
                <section key={group.key} className="portfolio-group-section">
                  <div className="portfolio-group-head">
                    <div className="section-intro section-intro-tight">
                      <p className="eyebrow">Portfolio Category</p>
                      <h2>{group.title}</h2>
                      <p>{group.intro}</p>
                    </div>

                    <div className="portfolio-group-meta">
                      <p className="portfolio-page-count">{group.items.length} photos</p>
                      <Link href={group.href} className="service-cta-link">
                        See Service
                      </Link>
                    </div>
                  </div>

                  <HomePortfolioGallery items={group.items} />
                </section>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}

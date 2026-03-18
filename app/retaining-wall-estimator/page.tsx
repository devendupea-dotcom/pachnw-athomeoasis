import type { Metadata } from "next";
import Link from "next/link";
import { EmbeddedWallEstimator } from "@/src/components/EmbeddedWallEstimator";
import { SiteFooter } from "@/src/components/SiteFooter";
import { SiteHeader } from "@/src/components/SiteHeader";

const retainingWallEstimatorUrl = "https://www.westblocksystems.com/wall-estimator";

export const metadata: Metadata = {
  title: "Retaining Wall Estimator",
  description:
    "Use the retaining wall cost estimator to get a starting-point price range for your wall project, then contact Peter for site-specific guidance.",
};

export default function RetainingWallEstimatorPage() {
  return (
    <>
      <SiteHeader />

      <main>
        <section className="section-shell standalone-page-hero">
          <div className="container standalone-page-intro">
            <div className="section-intro section-intro-wide">
              <p className="eyebrow">Estimator</p>
              <h1>Retaining Wall Cost Estimator</h1>
              <p>
                Use the wall estimator to get a quick starting-point price range for your retaining wall project, then
                talk with Peter about site conditions, access, and finish details.
              </p>
            </div>

            <div className="cta-band-actions standalone-page-actions">
              <Link href="/#contact" className="button button-primary">
                Get a Quote
              </Link>
              <Link href="/retaining-walls" className="button button-secondary">
                Retaining Wall Service
              </Link>
            </div>
          </div>
        </section>

        <section className="section-shell section-tinted">
          <div className="container">
            <EmbeddedWallEstimator src={retainingWallEstimatorUrl} fallbackUrl={retainingWallEstimatorUrl} />
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}

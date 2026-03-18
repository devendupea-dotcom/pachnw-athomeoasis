import Link from "next/link";
import { LogoMark } from "@/src/components/LogoMark";
import { servicePages } from "@/src/content/services";
import { siteConfig } from "@/src/siteConfig";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const footerServices = servicePages.filter((service) =>
    ["retaining-walls", "patios-pavers", "permaculture-landscaping"].includes(
      service.slug,
    ),
  );

  return (
    <footer className="site-footer">
      <div className="container footer-shell">
        <div className="footer-brand">
          <div className="footer-brand-row">
            <LogoMark compact />
            <div>
              <p className="footer-title">{siteConfig.name}</p>
              <p className="footer-copy">
                Retaining walls, patios and hardscaping, and productive edible landscapes across the South Sound.
              </p>
            </div>
          </div>
        </div>

        <div className="footer-links-grid">
          <div className="footer-link-group">
            <p className="footer-label">Navigate</p>
            <div className="footer-link-list">
              {siteConfig.navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="footer-link-group">
              <p className="footer-label">Services</p>
              <div className="footer-link-list">
                {footerServices.map((service) => (
                  <Link key={service.slug} href={`/${service.slug}`}>
                    {service.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>

        <div className="footer-meta">
          <a href={`tel:${siteConfig.contactPhoneHref}`}>{siteConfig.contactPhone}</a>
          <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
          <span>{siteConfig.locationLabel}</span>
          <span>{year} {siteConfig.name}</span>
        </div>
      </div>
    </footer>
  );
}

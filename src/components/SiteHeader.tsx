"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { LogoMark } from "@/src/components/LogoMark";
import { siteConfig } from "@/src/siteConfig";

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (!isHome) {
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 28);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setMenuOpen(false);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [menuOpen, pathname]);

  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("resize", handleResize);
    };
  }, [menuOpen]);

  return (
    <header className={`site-header${isHome && !isScrolled ? " is-overlay" : ""}`}>
      <div className="container header-shell">
        <Link href="/" className="brand-lockup" aria-label={`${siteConfig.name} home`}>
          <LogoMark />
          <span className="brand-copy">
            <span className="brand-title">{siteConfig.name}</span>
            <span className="brand-subtitle">Retaining walls, patios, and landscape construction</span>
          </span>
        </Link>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={menuOpen}
          aria-controls="site-nav"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <nav id="site-nav" className={`site-nav${menuOpen ? " is-open" : ""}`} aria-label="Primary">
          {siteConfig.navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
              {link.label}
            </Link>
          ))}
          <Link href="/#contact" className="button button-primary nav-cta" onClick={() => setMenuOpen(false)}>
            Get a Quote
          </Link>
          <a href={`tel:${siteConfig.contactPhoneHref}`} className="nav-phone-link" onClick={() => setMenuOpen(false)}>
            Call or text {siteConfig.contactPhone}
          </a>
        </nav>
      </div>

      {menuOpen ? (
        <button
          type="button"
          className="nav-backdrop"
          aria-label="Close navigation menu"
          onClick={() => setMenuOpen(false)}
        />
      ) : null}
    </header>
  );
}

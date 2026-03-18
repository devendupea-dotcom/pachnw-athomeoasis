"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { HomePortfolioItem } from "@/src/content/homePortfolio";

type HomePortfolioGalleryProps = {
  items: readonly HomePortfolioItem[];
};

export function HomePortfolioGallery({ items }: HomePortfolioGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const activeItem = useMemo(
    () => (activeIndex === null ? null : items[activeIndex] ?? null),
    [activeIndex, items],
  );
  const activeDisplayIndex = activeIndex === null ? 0 : activeIndex + 1;

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((index) => (index === null ? 0 : (index + 1) % items.length));
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((index) => (index === null ? 0 : (index - 1 + items.length) % items.length));
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [activeIndex, items.length]);

  const showPrevious = () => {
    setActiveIndex((index) => (index === null ? 0 : (index - 1 + items.length) % items.length));
  };

  const showNext = () => {
    setActiveIndex((index) => (index === null ? 0 : (index + 1) % items.length));
  };

  return (
    <>
      <div className="work-portfolio-grid">
        {items.map((item, index) => (
          <button
            key={item.src}
            type="button"
            className={`work-portfolio-tile is-${item.size}`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Open ${item.title} project photo ${index + 1}`}
          >
            <div className="work-portfolio-image-shell">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(min-width: 1280px) 28vw, (min-width: 768px) 42vw, 94vw"
                className="work-portfolio-image"
              />
            </div>

            <div className="work-portfolio-copy">
              <p className="mini-label">
                {item.location ? `${item.projectType} — ${item.location}` : item.projectType}
              </p>
              <strong>{item.title}</strong>
            </div>
          </button>
        ))}
      </div>

      {activeItem ? (
        <div className="work-lightbox" role="dialog" aria-modal="true" aria-label="Project photo viewer">
          <button
            type="button"
            className="work-lightbox-backdrop"
            aria-label="Close photo viewer"
            onClick={() => setActiveIndex(null)}
          />

          <div className="work-lightbox-shell">
            <div className="work-lightbox-topbar">
              <div className="work-lightbox-meta">
                <p className="mini-label">
                  {activeItem.location ? `${activeItem.projectType} — ${activeItem.location}` : activeItem.projectType}
                </p>
                <strong>{activeItem.title}</strong>
                <span>
                  {activeDisplayIndex} / {items.length}
                </span>
              </div>

              <button
                type="button"
                className="work-lightbox-close"
                aria-label="Close photo viewer"
                onClick={() => setActiveIndex(null)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="work-lightbox-stage">
              <button
                type="button"
                className="work-lightbox-nav is-prev"
                aria-label="Previous photo"
                onClick={showPrevious}
              >
                <ChevronLeft size={22} />
              </button>

              <div className="work-lightbox-image-shell">
                <Image
                  src={activeItem.src}
                  alt={activeItem.alt}
                  fill
                  sizes="100vw"
                  className="work-lightbox-image"
                />
              </div>

              <button type="button" className="work-lightbox-nav is-next" aria-label="Next photo" onClick={showNext}>
                <ChevronRight size={22} />
              </button>
            </div>

            <div className="work-lightbox-footer">
              <Link href={activeItem.href} className="service-cta-link" onClick={() => setActiveIndex(null)}>
                See Service
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

type ServicePhoto = {
  src: string;
  alt: string;
};

type InteractiveServicePhotoStripProps = {
  label: string;
  photos: readonly ServicePhoto[];
};

export function InteractiveServicePhotoStrip({ label, photos }: InteractiveServicePhotoStripProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const activePhoto = useMemo(
    () => (activeIndex === null ? null : photos[activeIndex] ?? null),
    [activeIndex, photos],
  );

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
        setActiveIndex((index) => (index === null ? 0 : (index + 1) % photos.length));
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((index) => (index === null ? 0 : (index - 1 + photos.length) % photos.length));
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [activeIndex, photos.length]);

  const scrollStrip = (direction: "next" | "prev") => {
    const element = scrollRef.current;

    if (!element) {
      return;
    }

    const amount = Math.max(element.clientWidth * 0.8, 280);
    element.scrollBy({
      left: direction === "next" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="service-photo-strip-head">
        <p className="mini-label">
          {photos.length} {photos.length === 1 ? "photo" : "photos"}
        </p>

        <div className="service-photo-strip-controls">
          <button
            type="button"
            className="service-photo-strip-control"
            aria-label={`Scroll ${label} photos left`}
            onClick={() => scrollStrip("prev")}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            className="service-photo-strip-control"
            aria-label={`Scroll ${label} photos right`}
            onClick={() => scrollStrip("next")}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div ref={scrollRef} className="service-photo-strip">
        {photos.map((image, index) => (
          <button
            key={image.src}
            type="button"
            className="service-photo-strip-item service-photo-strip-button"
            aria-label={`Open ${label} photo ${index + 1}`}
            onClick={() => setActiveIndex(index)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1280px) 24vw, (min-width: 768px) 34vw, 78vw"
              className="service-page-image"
            />
          </button>
        ))}
      </div>

      {activePhoto ? (
        <div className="service-photo-lightbox" role="dialog" aria-modal="true" aria-label={`${label} photo viewer`}>
          <button
            type="button"
            className="service-photo-lightbox-backdrop"
            aria-label="Close photo viewer"
            onClick={() => setActiveIndex(null)}
          />

          <div className="service-photo-lightbox-shell">
            <div className="service-photo-lightbox-topbar">
              <div className="service-photo-lightbox-meta">
                <p className="mini-label">{label}</p>
                <strong>
                  {activeIndex === null ? 0 : activeIndex + 1} / {photos.length}
                </strong>
              </div>

              <button
                type="button"
                className="service-photo-lightbox-close"
                aria-label="Close photo viewer"
                onClick={() => setActiveIndex(null)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="service-photo-lightbox-stage">
              <button
                type="button"
                className="service-photo-lightbox-nav is-prev"
                aria-label="Previous photo"
                onClick={() => setActiveIndex((index) => (index === null ? 0 : (index - 1 + photos.length) % photos.length))}
              >
                <ChevronLeft size={22} />
              </button>

              <div className="service-photo-lightbox-image-shell">
                <Image src={activePhoto.src} alt={activePhoto.alt} fill sizes="100vw" className="service-page-image" />
              </div>

              <button
                type="button"
                className="service-photo-lightbox-nav is-next"
                aria-label="Next photo"
                onClick={() => setActiveIndex((index) => (index === null ? 0 : (index + 1) % photos.length))}
              >
                <ChevronRight size={22} />
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

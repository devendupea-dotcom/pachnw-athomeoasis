"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

type HeroSlide = {
  src: string;
  alt: string;
  label: string;
};

type HeroImageCarouselProps = {
  slides: readonly HeroSlide[];
  children: ReactNode;
};

const AUTO_ROTATE_MS = 4800;

export function HeroImageCarousel({ slides, children }: HeroImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  useEffect(() => {
    if (slides.length < 2) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, AUTO_ROTATE_MS);

    return () => window.clearInterval(intervalId);
  }, [slides.length]);

  const showSlide = (index: number) => {
    setActiveIndex((index + slides.length) % slides.length);
  };

  const showAdjacentSlide = (direction: "next" | "prev") => {
    setActiveIndex((current) =>
      direction === "next" ? (current + 1) % slides.length : (current - 1 + slides.length) % slides.length,
    );
  };

  return (
    <div
      className="hero-stage"
      aria-label="Featured project imagery"
      onTouchStart={(event) => setTouchStartX(event.changedTouches[0]?.clientX ?? null)}
      onTouchEnd={(event) => {
        if (touchStartX === null || slides.length < 2) {
          return;
        }

        const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX;
        const deltaX = touchEndX - touchStartX;

        if (Math.abs(deltaX) > 44) {
          showAdjacentSlide(deltaX < 0 ? "next" : "prev");
        }

        setTouchStartX(null);
      }}
      onTouchCancel={() => setTouchStartX(null)}
    >
      {slides.map((slide, index) => (
        <div
          key={slide.src}
          className={`hero-stage-slide${index === activeIndex ? " is-active" : ""}`}
          aria-hidden={index !== activeIndex}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={index === 0}
            sizes="100vw"
            className="hero-stage-image"
          />
        </div>
      ))}

      <div className="hero-stage-overlay" />

      <div className="container hero-stage-shell">
        <div className="hero-stage-copy">
          {children}

          {slides.length > 1 ? (
            <div className="hero-stage-foot">
              <div className="hero-stage-dots" role="tablist" aria-label="Choose hero image">
                {slides.map((slide, index) => (
                  <button
                    key={slide.src}
                    type="button"
                    className={`hero-stage-dot${index === activeIndex ? " is-active" : ""}`}
                    aria-label={`Show ${slide.label}`}
                    aria-selected={index === activeIndex}
                    onClick={() => showSlide(index)}
                  />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

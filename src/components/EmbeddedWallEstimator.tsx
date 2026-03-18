"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";

type EmbeddedWallEstimatorProps = {
  fallbackUrl: string;
  src: string;
};

export function EmbeddedWallEstimator({ fallbackUrl, src }: EmbeddedWallEstimatorProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="estimator-embed-shell">
      <div className="estimator-embed-frame">
        {!isLoaded ? (
          <div className="estimator-embed-loading" aria-hidden="true">
            <p className="mini-label">Loading estimator</p>
            <strong>Westblock GravityStone wall estimator</strong>
            <span>Using the live wall calculator without leaving the site.</span>
          </div>
        ) : null}

        <iframe
          title="Westblock GravityStone retaining wall estimator"
          src={src}
          className="estimator-embed-iframe"
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>

      <div className="estimator-embed-footer">
        <p>If the estimator does not load on your device, open the full tool directly.</p>
        <a href={fallbackUrl} className="button button-secondary" target="_blank" rel="noreferrer">
          Open Full Estimator
          <ExternalLink size={16} />
        </a>
      </div>
    </div>
  );
}

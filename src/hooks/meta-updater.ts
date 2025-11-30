import { useEffect } from "react";
import { useLocation } from "react-router-dom";

type EnabledUpdater = {
  /** Whether the canonical meta tag should be updated based on the current location. */
  canonical?: boolean;
};

const defaultUpdater: EnabledUpdater = {
  canonical: true,
};

/**
 * A hook that updates the meta tags on the page dynamically.
 *
 * @param enabled - An object that specifies whether the canonical meta tag should be updated.
 */
export function useMetaUpdater(enabled: EnabledUpdater = defaultUpdater): void {
  useCanonicalUpdater(enabled.canonical);
}

// ---

function useCanonicalUpdater(canonical?: boolean) {
  const location = useLocation();

  useEffect(() => {
    if (!canonical) return;

    const canonicalUrl = window.location.origin + location.pathname;
    let canonicalEl = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');

    if (canonicalEl) {
      canonicalEl.href = canonicalUrl;
    } else {
      canonicalEl = document.createElement("link");
      canonicalEl.rel = "canonical";
      canonicalEl.href = canonicalUrl;
      document.head.appendChild(canonicalEl);
    }
  }, [location.pathname, canonical]);
}

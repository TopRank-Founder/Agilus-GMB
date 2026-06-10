import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string; // e.g. "/about"
}

export const useSEO = ({ title, description, canonicalUrl }: SEOProps) => {
  useEffect(() => {
    // Update title
    document.title = title;

    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = description;
      document.head.appendChild(meta);
    }

    // Update OG description
    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute("content", description);
    }

    // Update OG title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute("content", title);
    }

    // Update canonical tag
    const baseUrl = "https://srllabmohali.in";
    const fullCanonical = canonicalUrl ? `${baseUrl}${canonicalUrl}` : baseUrl;
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute("href", fullCanonical);
    } else {
      const link = document.createElement("link");
      link.rel = "canonical";
      link.href = fullCanonical;
      document.head.appendChild(link);
    }
  }, [title, description, canonicalUrl]);
};

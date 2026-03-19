/**
 * SEO Utilities and Helpers
 */

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  author?: string;
  robots?: string;
  lang?: string;
}

export const updateMetaTags = (config: SEOConfig) => {
  // Update title
  document.title = config.title;

  // Update or create meta tags
  updateMetaTag('description', config.description);
  updateMetaTag('keywords', config.keywords?.join(', ') || '');
  updateMetaTag('author', config.author || 'Y.H.M.L');
  updateMetaTag('robots', config.robots || 'index, follow');

  // OpenGraph
  updateMetaTag('og:title', config.title, 'property');
  updateMetaTag('og:description', config.description, 'property');
  updateMetaTag('og:image', config.ogImage || '', 'property');
  updateMetaTag('og:type', config.ogType || 'website', 'property');

  // Twitter
  updateMetaTag('twitter:title', config.title, 'name');
  updateMetaTag('twitter:description', config.description, 'name');
  updateMetaTag('twitter:card', config.twitterCard || 'summary_large_image', 'name');

  // Canonical
  if (config.canonical) {
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = config.canonical;
  }

  // Language
  if (config.lang) {
    document.documentElement.lang = config.lang;
  }
};

const updateMetaTag = (
  name: string,
  content: string,
  attr: 'name' | 'property' = 'name'
) => {
  if (!content) return;

  let tag = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, name);
    document.head.appendChild(tag);
  }
  tag.content = content;
};

// Generate structured data for different types
export const generateStructuredData = (type: 'Organization' | 'LocalBusiness' | 'BreadcrumbList', data: any) => {
  const scriptTag = document.createElement('script');
  scriptTag.type = 'application/ld+json';
  scriptTag.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  });
  document.head.appendChild(scriptTag);
};

// Create breadcrumb structured data
export const createBreadcrumbs = (items: Array<{ name: string; url: string }>) => {
  const breadcrumbList = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(breadcrumbList);
  document.head.appendChild(script);
};

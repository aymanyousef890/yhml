/**
 * SEO Checklist
 * تحقق من هذه العناصر قبل نشر الموقع
 */

export const seoChecklist = {
  'Meta Tags': [
    '✅ Title tag (50-60 characters)',
    '✅ Meta description (150-160 characters)',
    '✅ Meta keywords (relevant and specific)',
    '✅ Viewport meta tag for mobile',
    '✅ Character encoding (UTF-8)',
    '✅ Language attribute (lang)',
  ],

  'Open Graph & Twitter': [
    '✅ og:title',
    '✅ og:description',
    '✅ og:image (1200x630px)',
    '✅ og:type',
    '✅ og:url',
    '✅ twitter:card',
    '✅ twitter:title',
    '✅ twitter:description',
    '✅ twitter:image',
  ],

  'Structured Data': [
    '✅ Organization schema',
    '✅ LocalBusiness schema',
    '✅ BreadcrumbList',
    '✅ ContactPoint',
    '✅ Valid JSON-LD format',
  ],

  'Technical SEO': [
    '✅ Sitemap.xml created and submitted',
    '✅ robots.txt configured',
    '✅ Canonical URLs set',
    '✅ hreflang tags for multilingual',
    '✅ Mobile-friendly design',
    '✅ Fast page speed (< 3s)',
    '✅ SSL/HTTPS enabled',
    '✅ 404 error page',
    '✅ Internal linking structure',
  ],

  'Performance': [
    '✅ Image optimization & lazy loading',
    '✅ CSS minified',
    '✅ JavaScript minified',
    '✅ Code splitting enabled',
    '✅ Compression (Gzip/Brotli)',
    '✅ Browser caching configured',
    '✅ CDN utilized',
  ],

  'Content': [
    '✅ Unique titles for each page',
    '✅ Unique meta descriptions',
    '✅ Keyword density (1-2%)',
    '✅ H1 tag present (one per page)',
    '✅ Heading hierarchy (H1 → H6)',
    '✅ Alt text for images',
    '✅ Readability score > 60%',
  ],

  'Links': [
    '✅ No broken internal links',
    '✅ No broken external links',
    '✅ Proper anchor text',
    '✅ SSL for external links',
    '✅ rel="nofollow" for untrusted links',
  ],

  'Accessibility': [
    '✅ WCAG 2.1 AA compliance',
    '✅ Proper color contrast',
    '✅ Keyboard navigation',
    '✅ Screen reader friendly',
    '✅ Alt text for all images',
  ],
};

// Quick SEO Score Calculator
export const calculateSEOScore = (checkedItems: number, totalItems: number): string => {
  const percentage = (checkedItems / totalItems) * 100;
  if (percentage >= 90) return '🟢 Excellent';
  if (percentage >= 70) return '🟡 Good';
  if (percentage >= 50) return '🟠 Fair';
  return '🔴 Poor';
};

// SEO Tips
export const seoTips = [
  'Update content regularly for freshness signals',
  'Build high-quality backlinks from authority sites',
  'Focus on user experience and Core Web Vitals',
  'Use long-tail keywords (less competition)',
  'Create content around user intent, not just keywords',
  'Monitor competitor strategies',
  'Build brand authority and trust signals',
  'Optimize for featured snippets',
  'Use schema markup for rich snippets',
  'Develop a strong internal linking strategy',
  'Monitor click-through rates in Search Console',
  'Test different meta descriptions',
  'Create XML sitemaps for different sections',
  'Use breadcrumb navigation',
  'Optimize for voice search keywords',
];

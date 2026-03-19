# SEO & Performance Optimization Guide

## تحسينات SEO المُضافة

### 1. **Meta Tags المحسّنة** (`index.html`)
- ✅ Primary Meta Tags (title, description, keywords)
- ✅ Open Graph tags (Facebook, LinkedIn, WhatsApp)
- ✅ Twitter Card tags
- ✅ Language alternates (hreflang)
- ✅ Canonical URL
- ✅ Theme color و charset
- ✅ Robots والميتا تاجز الأمان

### 2. **Structured Data (Schema.org)**
- ✅ Organization schema بمعلومات الشركة
- ✅ LocalBusiness schema مع الإحداثيات الجغرافية
- ✅ BreadcrumbList schema لتحسين الـ Navigation
- ✅ ContactPoint معلومات التواصل

### 3. **Google Maps Embedded**
- ✅ تم إضافة iframe جوجل ماب في صفحة التواصل
- ✅ Lazy loading للخريطة
- ✅ Responsive design
- ✅ Accessibility attributes

### 4. **Sitemap و Robots**
- ✅ `sitemap.xml` - جميع الصفحات الرئيسية
- ✅ hreflang لـ alternates اللغات
- ✅ `robots.txt` - محسّن للزحف الفعّال
- ✅ معلومات التعديل والأهمية لكل صفحة

### 5. **Performance Optimizations**
- ✅ Code splitting في Vite (vendor chunks)
- ✅ Gzip و Brotli compression
- ✅ Lazy loading للصور والـ components
- ✅ Drop console و debugger in production
- ✅ Image optimization utilities

## استخدام المكونات المحسّنة

### OptimizedImage Component
```tsx
import OptimizedImage from '@/components/OptimizedImage';

<OptimizedImage
  src="image.jpg"
  alt="Description"
  className="w-full h-auto"
  priority={false}
/>
```

### SEO Utilities
```tsx
import { updateMetaTags } from '@/lib/seo';

// تحديث Meta Tags لصفحة محددة
updateMetaTags({
  title: 'Page Title',
  description: 'Page description',
  keywords: ['keyword1', 'keyword2'],
  canonical: 'https://yhml.com/page',
  lang: 'en'
});
```

### Performance Utilities
```tsx
import { prefetchData, preloadResource } from '@/lib/performance';

// Prefetch data
prefetchData('/api/data');

// Preload resources
preloadResource('/style.css', 'style');
```

## Core Web Vitals أهداف التحسين

### 1. **Largest Contentful Paint (LCP)** < 2.5s
- Optimize server response times
- Use CDN for static content
- Lazy load non-critical resources

### 2. **First Input Delay (FID)** < 100ms
- Break up long JavaScript tasks
- Use Web Workers if needed
- Minimize main thread work

### 3. **Cumulative Layout Shift (CLS)** < 0.1
- Reserve space for ads/images
- Use transform for animations (not layout changes)
- Avoid inserting content above existing

## Ongoing Optimization Checklist

- [ ] Monitor Core Web Vitals in Google Search Console
- [ ] Optimize images (WebP format, proper sizes)
- [ ] Minimize JavaScript bundles
- [ ] Cache static assets
- [ ] Use CDN for distribution
- [ ] Regular content updates for freshness
- [ ] Mobile-first design testing
- [ ] Test with Google's PageSpeed Insights tool
- [ ] Monitor search rankings
- [ ] A/B test meta descriptions
- [ ] Ensure all pages have unique, descriptive titles
- [ ] Check for broken links regularly

## Tools للمراقبة

- Google Search Console (https://search.google.com/search-console)
- Google PageSpeed Insights (https://pagespeed.web.dev)
- Lighthouse (built into Chrome DevTools)
- Bing Webmaster Tools (https://www.bing.com/webmasters)
- Ahrefs / SEMrush للتحليل التنافسي

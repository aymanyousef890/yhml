import { useEffect } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { getServices, t } from '@/lib/dataService';
import { getIcon } from '@/lib/iconMap';
import ScrollAnimate from '@/components/ScrollAnimate';
import { Link } from 'react-router-dom';

const ServicesPage = () => {
  const { lang } = useLanguage();
  const services = getServices();

  // Update meta tags for SEO
  useEffect(() => {
    const title = lang === 'en'
      ? 'Our Services - Import Export & Trading Solutions'
      : 'خدماتنا - حلول الاستيراد والتصدير والتجارة';
    
    const description = lang === 'en'
      ? 'Explore Y.H.M.L services: import-export, trading in cleaning supplies, tissues, clothing, and household products. Professional international trade solutions.'
      : 'استكشف خدمات Y.H.M.L: الاستيراد والتصدير والتجارة في المنظفات والمناديل والملابس والمنتجات المنزلية. حلول تجارية دولية احترافية.';

    document.title = title;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', description);
    }

    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', description);
    }

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = lang === 'en' ? 'https://yhml.com/services' : 'https://yhml.com/ar/services';
  }, [lang]);

  return (
    <main className="pt-20">
      <section className="gradient-hero section-padding text-center">
        <div className="container-custom max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4">
            {lang === 'en' ? 'Our Services' : 'خدماتنا'}
          </h1>
          <p className="text-lg text-primary-foreground/80">
            {lang === 'en'
              ? 'Comprehensive trading solutions across multiple sectors'
              : 'حلول تجارية شاملة عبر قطاعات متعددة'}
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => {
              const Icon = getIcon(service.icon);
              return (
                <ScrollAnimate key={service.id} delay={i * 100}>
                  <div className="glass-card-hover p-10 h-full flex flex-col">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                      <Icon size={32} className="text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">{t(service.title, lang)}</h3>
                    <p className="text-muted-foreground leading-relaxed flex-1">{t(service.description, lang)}</p>
                  </div>
                </ScrollAnimate>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted text-center">
        <div className="container-custom max-w-3xl">
          <ScrollAnimate>
            <h2 className="heading-secondary mb-4">
              {lang === 'en' ? 'Need a Custom Solution?' : 'تحتاج حلاً مخصصاً؟'}
            </h2>
            <p className="text-body mb-8">
              {lang === 'en'
                ? 'We offer tailored trading solutions to meet your unique requirements.'
                : 'نقدم حلولاً تجارية مصممة خصيصاً لتلبية متطلباتك الفريدة.'}
            </p>
            <Link to="/contact" className="btn-primary inline-block">
              {lang === 'en' ? 'Contact Us' : 'تواصل معنا'}
            </Link>
          </ScrollAnimate>
        </div>
      </section>
    </main>
  );
};

export default ServicesPage;

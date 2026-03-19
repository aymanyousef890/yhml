import { useEffect } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { getAboutData, getCompanyData, t } from '@/lib/dataService';
import ScrollAnimate from '@/components/ScrollAnimate';
import { Target, Eye, Heart } from 'lucide-react';

const AboutPage = () => {
  const { lang } = useLanguage();
  const about = getAboutData();
  const company = getCompanyData();

  const valueIcons = [Heart, Target, Heart];

  // Update meta tags for SEO
  useEffect(() => {
    const title = lang === 'en'
      ? 'About Y.H.M.L - Your Global Trading Partner Since 1995'
      : 'عن Y.H.M.L - شريكك في التجارة العالمية منذ 1995';
    
    const description = lang === 'en'
      ? 'Learn about Y.H.M.L, a globally trusted import-export company with 25+ years of experience. We specialize in quality products and reliable international trading solutions.'
      : 'تعرف على Y.H.M.L، شركة استيراد وتصدير موثوقة عالمياً بخبرة تزيد عن 25 سنة. نتخصص في المنتجات عالية الجودة والحلول التجارية الدولية الموثوقة.';

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
    canonical.href = lang === 'en' ? 'https://yhml.com/about' : 'https://yhml.com/ar/about';
  }, [lang]);

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="gradient-hero section-padding text-center">
        <div className="container-custom max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4">
            {lang === 'en' ? 'About Y.H.M.L' : 'عن Y.H.M.L'}
          </h1>
          <p className="text-lg text-primary-foreground/80">
            {t(company.slogan, lang)}
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-background">
        <div className="container-custom max-w-4xl">
          <ScrollAnimate>
            <span className="text-sm font-semibold text-accent uppercase tracking-widest">
              {lang === 'en' ? 'Our Story' : 'قصتنا'}
            </span>
            <h2 className="heading-primary mt-3 mb-6">
              {lang === 'en' ? 'Three Decades of Excellence' : 'ثلاثة عقود من التميز'}
            </h2>
            <p className="text-body">{t(about.story, lang)}</p>
          </ScrollAnimate>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <ScrollAnimate animation="slide-left">
              <div className="glass-card p-10 h-full">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <Eye size={28} className="text-primary" />
                </div>
                <h3 className="heading-secondary mb-4">{lang === 'en' ? 'Our Vision' : 'رؤيتنا'}</h3>
                <p className="text-body">{t(about.vision, lang)}</p>
              </div>
            </ScrollAnimate>
            <ScrollAnimate animation="slide-right">
              <div className="glass-card p-10 h-full">
                <div className="w-14 h-14 rounded-2xl gradient-accent flex items-center justify-center mb-6">
                  <Target size={28} className="text-accent-foreground" />
                </div>
                <h3 className="heading-secondary mb-4">{lang === 'en' ? 'Our Mission' : 'مهمتنا'}</h3>
                <p className="text-body">{t(about.mission, lang)}</p>
              </div>
            </ScrollAnimate>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <ScrollAnimate className="text-center mb-14">
            <h2 className="heading-primary">
              {lang === 'en' ? 'Our Core Values' : 'قيمنا الأساسية'}
            </h2>
          </ScrollAnimate>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {about.values.map((v, i) => (
              <ScrollAnimate key={i} delay={i * 150} animation="zoom-in">
                <div className="glass-card-hover p-8 text-center h-full">
                  <div className="w-16 h-16 rounded-full gradient-hero flex items-center justify-center mx-auto mb-5">
                    <Heart size={28} className="text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{t(v.title, lang)}</h3>
                  <p className="text-sm text-muted-foreground">{t(v.description, lang)}</p>
                </div>
              </ScrollAnimate>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;

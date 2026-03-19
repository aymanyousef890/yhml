import { useEffect, useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { getCompanyData, getServices, getWhyChoose, getStats, getStatsFromDB, t } from '@/lib/dataService';
import { getIcon } from '@/lib/iconMap';
import { Link } from 'react-router-dom';
import HeroSlider from '@/components/HeroSlider';
import ScrollAnimate from '@/components/ScrollAnimate';
import AnimatedCounter from '@/components/AnimatedCounter';

const HomePage = () => {
  const { lang } = useLanguage();
  const company = getCompanyData();
  const services = getServices();
  const whyChoose = getWhyChoose();
  const [stats, setStats] = useState(getStats());
  const [loading, setLoading] = useState(true);

  // Fetch stats from Supabase on component mount
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const dbStats = await getStatsFromDB();
        setStats(dbStats);
      } catch (error) {
        console.warn('Failed to load stats from DB:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, []);

  // Update meta tags for SEO
  useEffect(() => {
    const title = 'Y.H.M.L — Global Import & Export Trading Company Since 1995';
    
    const description = lang === 'en'
      ? 'Leading import, export, and trading company specializing in cleaning supplies, tissues, clothing, and household products. 25+ years of experience in international trade.'
      : 'شركة استيراد وتصدير وتجارة رائدة متخصصة في المنظفات والمناديل والملابس والمنتجات المنزلية. أكثر من 25 سنة من الخبرة في التجارة الدولية.';

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
    canonical.href = 'https://yhml.com';
  }, [lang]);

  return (
    <>
      <HeroSlider />

      {/* Company Introduction */}
      <section className="section-padding bg-background">
        <div className="container-custom text-center max-w-4xl">
          <ScrollAnimate>
            <span className="text-sm font-semibold text-accent uppercase tracking-widest">
              {lang === 'en' ? 'About Us' : 'من نحن'}
            </span>
            <h2 className="heading-primary mt-3 mb-6">{t(company.name, lang)}</h2>
            <p className="text-body">{t(company.description, lang)}</p>
            <Link to="/about" className="btn-outline inline-block mt-8">
              {lang === 'en' ? 'Learn More About Y.H.M.L' : 'اعرف المزيد عن Y.H.M.L'}
            </Link>
          </ScrollAnimate>
        </div>
      </section>

      {/* Business Sectors */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <ScrollAnimate className="text-center mb-14">
            <span className="text-sm font-semibold text-accent uppercase tracking-widest">
              {lang === 'en' ? 'What We Do' : 'ما نقدمه'}
            </span>
            <h2 className="heading-primary mt-3">
              {lang === 'en' ? 'Our Business Sectors' : 'قطاعاتنا التجارية'}
            </h2>
          </ScrollAnimate>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => {
              const Icon = getIcon(service.icon);
              return (
                <ScrollAnimate key={service.id} delay={i * 100}>
                  <div className="glass-card-hover p-8 text-center h-full">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                      <Icon size={28} className="text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-3">{t(service.title, lang)}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{t(service.description, lang)}</p>
                  </div>
                </ScrollAnimate>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <ScrollAnimate className="text-center mb-14">
            <span className="text-sm font-semibold text-accent uppercase tracking-widest">
              {lang === 'en' ? 'Our Advantages' : 'مزايانا'}
            </span>
            <h2 className="heading-primary mt-3">
              {lang === 'en' ? 'Why Choose Y.H.M.L' : 'لماذا تختار Y.H.M.L'}
            </h2>
          </ScrollAnimate>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChoose.map((item, i) => {
              const Icon = getIcon(item.icon);
              return (
                <ScrollAnimate key={i} delay={i * 100} animation="zoom-in">
                  <div className="glass-card-hover p-8 text-center h-full">
                    <div className="w-14 h-14 rounded-full gradient-accent flex items-center justify-center mx-auto mb-5">
                      <Icon size={24} className="text-accent-foreground" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{t(item.title, lang)}</h3>
                    <p className="text-sm text-muted-foreground">{t(item.description, lang)}</p>
                  </div>
                </ScrollAnimate>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="gradient-hero section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <ScrollAnimate key={i} delay={i * 150} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary-foreground mb-2">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-primary-foreground/70 text-sm md:text-base">{t(stat.label, lang)}</p>
              </ScrollAnimate>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-muted">
        <div className="container-custom text-center max-w-3xl">
          <ScrollAnimate>
            <h2 className="heading-primary mb-6">
              {lang === 'en' ? 'Ready to Partner With Us?' : 'مستعد للشراكة معنا؟'}
            </h2>
            <p className="text-body mb-8">
              {lang === 'en'
                ? 'Let us help you navigate global trade with confidence. Contact our team today.'
                : 'دعنا نساعدك في التنقل في التجارة العالمية بثقة. تواصل مع فريقنا اليوم.'}
            </p>
            <Link to="/contact" className="btn-primary inline-block text-lg">
              {lang === 'en' ? 'Get In Touch' : 'تواصل معنا'}
            </Link>
          </ScrollAnimate>
        </div>
      </section>
    </>
  );
};

export default HomePage;

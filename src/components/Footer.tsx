import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Twitter, MapPin, Phone, Mail, MessageCircle, Music, PinIcon } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { getCompanyData, getSocialLinks, getNavigation, getServices, t } from '@/lib/dataService';
import logo from '@/assets/logo.jpeg';

const Footer = () => {
  const { lang } = useLanguage();
  const company = getCompanyData();
  const social = getSocialLinks();
  const nav = getNavigation();
  const services = getServices();

  const socialItems = [
    { icon: Facebook, url: social.facebook, label: 'Facebook' },
    { icon: Instagram, url: social.instagram, label: 'Instagram' },
    { icon: Music, url: social.tiktok, label: 'TikTok' },
    { icon: PinIcon, url: social.pinterest, label: 'Pinterest' },
    { icon: Linkedin, url: social.linkedin, label: 'LinkedIn' },
    { icon: Twitter, url: social.twitter, label: 'X (Twitter)' },
  ];

  return (
    <footer className="bg-foreground text-background">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Y.H.M.L" className="h-10 w-auto rounded" />
              <span className="text-xl font-bold font-poppins">Y.H.M.L</span>
            </div>
            <p className="text-background/70 text-sm leading-relaxed">
              {t(company.description, lang)}
            </p>
            <p className="text-background/50 text-xs">
              {lang === 'en' ? `Est. ${company.established}` : `تأسست ${company.established}`}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {lang === 'en' ? 'Quick Links' : 'روابط سريعة'}
            </h3>
            <ul className="space-y-2">
              {nav.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-background/70 hover:text-background transition-colors text-sm"
                    title={`Navigate to ${t(item.label, lang)}`}
                    aria-label={`Go to ${t(item.label, lang)} page`}
                  >
                    {t(item.label, lang)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {lang === 'en' ? 'Our Services' : 'خدماتنا'}
            </h3>
            <ul className="space-y-2">
              {services.slice(0, 5).map((s) => (
                <li key={s.id} className="text-background/70 text-sm">
                  {t(s.title, lang)}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {lang === 'en' ? 'Contact' : 'تواصل معنا'}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-background/70 text-sm">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                <a 
                  href={company.mapUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-background transition-colors"
                  title={lang === 'en' ? 'View our location on Google Maps' : 'عرض موقعنا على خرائط جوجل'}
                  aria-label={lang === 'en' ? `Visit Y.H.M.L office at ${t(company.address, lang)}` : `زيارة مكتب Y.H.M.L في ${t(company.address, lang)}`}
                >
                  {t(company.address, lang)}
                </a>
              </li>
              <li className="flex items-center gap-2 text-background/70 text-sm">
                <Phone size={16} className="shrink-0" />
                <a 
                  href={`tel:${company.callPhones[0]}`} 
                  dir="ltr" 
                  className="hover:text-background transition-colors"
                  title={lang === 'en' ? 'Call Y.H.M.L' : 'اتصل بـ Y.H.M.L'}
                  aria-label={lang === 'en' ? `Call Y.H.M.L at ${company.callPhones[0]}` : `اتصل بـ Y.H.M.L على ${company.callPhones[0]}`}
                >
                  {company.callPhones[0]}
                </a>
              </li>
              <li className="flex items-center gap-2 text-background/70 text-sm">
                <MessageCircle size={16} className="shrink-0" />
                <a
                  href={`https://wa.me/${company.whatsapp[0].replace(/\+/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  dir="ltr"
                  className="hover:text-background transition-colors"
                  title={lang === 'en' ? 'Message Y.H.M.L on WhatsApp' : 'أرسل رسالة لـ Y.H.M.L على واتساب'}
                  aria-label={lang === 'en' ? `Message Y.H.M.L on WhatsApp at ${company.whatsapp[0]}` : `أرسل رسالة لـ Y.H.M.L على واتساب: ${company.whatsapp[0]}`}
                >
                  {company.whatsapp[0]}
                </a>
              </li>
              <li className="flex items-center gap-2 text-background/70 text-sm">
                <Mail size={16} className="shrink-0" />
                <a 
                  href={`mailto:${company.email}`} 
                  className="hover:text-background transition-colors"
                  title={lang === 'en' ? 'Send us an email' : 'أرسل لنا بريداً إلكترونياً'}
                  aria-label={lang === 'en' ? `Email Y.H.M.L at ${company.email}` : `البريد الإلكتروني إلى Y.H.M.L: ${company.email}`}
                >
                  {company.email}
                </a>
              </li>
            </ul>
            <div className="flex gap-3 mt-4">
              {socialItems.map(({ icon: Icon, url, label }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-background/10 hover:bg-background/20 transition-colors"
                  aria-label={label}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 mt-12 pt-6 text-center text-background/50 text-sm">
          © {new Date().getFullYear()} Y.H.M.L.{' '}
          {lang === 'en' ? 'All rights reserved.' : 'جميع الحقوق محفوظة.'}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

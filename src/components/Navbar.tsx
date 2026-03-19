import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { getNavigation, getCompanyData, t } from '@/lib/dataService';
import logo from '@/assets/logo.jpeg';

const Navbar = () => {
  const { lang, setLang, isRTL } = useLanguage();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const nav = getNavigation();
  const company = getCompanyData();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const isHome = location.pathname === '/';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isHome
          ? scrolled
            ? 'bg-primary/95 backdrop-blur-md shadow-lg border-b border-primary/50'
            : 'backdrop-blur-sm'
          : 'bg-primary/95 backdrop-blur-md shadow-lg border-b border-primary/50'
      }`}
    >
      <div className="container-custom flex items-center justify-between h-16 md:h-20">
        <Link 
          to="/" 
          className="flex items-center gap-3"
          title={lang === 'en' ? 'Y.H.M.L - Home' : 'Y.H.M.L - الرئيسية'}
          aria-label={lang === 'en' ? 'Y.H.M.L Home' : 'صفحة Y.H.M.L الرئيسية'}
        >
          <img src={logo} alt={t(company.name, lang)} className="h-10 md:h-12 w-auto rounded" />
          <span className="text-xl md:text-2xl font-bold text-primary-foreground font-poppins">
            Y.H.M.L
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {nav.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-5 py-2.5 rounded-lg text-base font-semibold transition-all duration-200 ${
                location.pathname === item.path
                  ? 'bg-primary-foreground text-primary'
                  : 'text-primary-foreground hover:bg-primary-foreground/90 hover:text-primary'
              }`}
              title={`Navigate to ${t(item.label, lang)}`}
              aria-label={`Go to ${t(item.label, lang)} page`}
            >
              {t(item.label, lang)}
            </Link>
          ))}
          <button
            onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-base font-semibold text-primary-foreground hover:bg-primary-foreground/90 hover:text-primary transition-all ms-2 border border-primary-foreground/30"
          >
            <Globe size={18} />
            {lang === 'en' ? 'العربية' : 'English'}
          </button>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg hover:bg-primary-foreground/20 transition-colors text-primary-foreground"
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-primary/98 backdrop-blur-xl border-t border-primary-foreground/10 animate-fade-in">
          <div className="container-custom py-4 flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-3 rounded-lg text-base font-semibold transition-all ${
                  location.pathname === item.path
                    ? 'bg-primary-foreground text-primary'
                    : 'text-primary-foreground hover:bg-primary-foreground/20'
                }`}
                title={`Navigate to ${t(item.label, lang)}`}
                aria-label={`Go to ${t(item.label, lang)} page`}
              >
                {t(item.label, lang)}
              </Link>
            ))}
            <button
              onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
              className="flex items-center gap-2 px-4 py-3 rounded-lg text-base font-semibold text-primary-foreground hover:bg-primary-foreground/20 transition-all border border-primary-foreground/30 mt-2"
            >
              <Globe size={18} />
              {lang === 'en' ? 'العربية' : 'English'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

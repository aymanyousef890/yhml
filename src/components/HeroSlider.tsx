import { useRef, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { useLanguage } from '@/i18n/LanguageContext';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/swiper-bundle.css';

const heroBgs = [
  'from-primary/90 to-corporate-dark/95',
  'from-corporate-dark/90 to-primary/80',
  'from-accent/80 to-corporate-dark/90',
];

interface HeroSlide {
  id: string;
  title_en: string;
  title_ar: string;
  subtitle_en: string;
  subtitle_ar: string;
  cta_en: string;
  cta_ar: string;
  image_url: string | null;
  sort_order: number;
}

const HeroSlider = () => {
  const { lang, isRTL } = useLanguage();
  const swiperRef = useRef<SwiperType | null>(null);
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSlides = async () => {
      const { data } = await supabase
        .from('hero_slides')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });
      if (data) setSlides(data as HeroSlide[]);
      setLoading(false);
    };
    fetchSlides();
  }, []);

  if (loading || slides.length === 0) {
    return (
      <section className="relative h-screen min-h-[600px] w-full bg-gradient-to-br from-primary/90 to-corporate-dark/95 flex items-center justify-center">
        <div className="text-primary-foreground text-xl">{loading ? '' : ''}</div>
      </section>
    );
  }

  return (
    <section className="relative h-screen min-h-[600px] w-full">
      <Swiper
        key={`${lang}-${slides.length}`}
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        className="h-full"
        onSwiper={(swiper) => { swiperRef.current = swiper; }}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={slide.id}>
            <div
              className={`h-full w-full flex items-center justify-center relative ${
                !slide.image_url ? `bg-gradient-to-br ${heroBgs[i % heroBgs.length]}` : ''
              }`}
            >
              {slide.image_url && (
                <>
                  <img
                    src={slide.image_url}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50" />
                </>
              )}
              <div className="container-custom text-center text-primary-foreground z-10 max-w-4xl relative">
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight drop-shadow-lg">
                  {lang === 'ar' ? slide.title_ar : slide.title_en}
                </h1>
                <p className="text-lg md:text-xl lg:text-2xl mb-10 text-primary-foreground/80 max-w-2xl mx-auto">
                  {lang === 'ar' ? slide.subtitle_ar : slide.subtitle_en}
                </p>
                <Link to="/contact" className="btn-accent inline-block text-lg">
                  {lang === 'ar' ? slide.cta_ar : slide.cta_en}
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style>{`
        .swiper-pagination-bullet {
          background: white !important;
          opacity: 0.5;
          width: 12px;
          height: 12px;
        }
        .swiper-pagination-bullet-active {
          opacity: 1;
          background: white !important;
        }
      `}</style>
    </section>
  );
};

export default HeroSlider;

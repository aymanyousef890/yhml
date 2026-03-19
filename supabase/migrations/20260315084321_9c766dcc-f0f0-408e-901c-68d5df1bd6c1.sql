
CREATE TABLE public.hero_slides (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title_en TEXT NOT NULL DEFAULT '',
  title_ar TEXT NOT NULL DEFAULT '',
  subtitle_en TEXT NOT NULL DEFAULT '',
  subtitle_ar TEXT NOT NULL DEFAULT '',
  cta_en TEXT NOT NULL DEFAULT 'Contact Us',
  cta_ar TEXT NOT NULL DEFAULT 'تواصل معنا',
  image_url TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.hero_slides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active slides"
  ON public.hero_slides
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage slides"
  ON public.hero_slides
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

INSERT INTO storage.buckets (id, name, public) VALUES ('slider-images', 'slider-images', true);

CREATE POLICY "Authenticated users can upload slider images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'slider-images');

CREATE POLICY "Authenticated users can update slider images"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'slider-images');

CREATE POLICY "Authenticated users can delete slider images"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'slider-images');

CREATE POLICY "Anyone can view slider images"
  ON storage.objects
  FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'slider-images');

INSERT INTO public.hero_slides (title_en, title_ar, subtitle_en, subtitle_ar, cta_en, cta_ar, sort_order) VALUES
('Global Import & Export Solutions', 'حلول الاستيراد والتصدير العالمية', 'Connecting markets worldwide with quality products since 1995', 'ربط الأسواق العالمية بمنتجات عالية الجودة منذ 1995', 'Contact Us', 'تواصل معنا', 0),
('Quality Products, Trusted Delivery', 'منتجات عالية الجودة، توصيل موثوق', 'From cleaning supplies to clothing — we deliver excellence', 'من مستلزمات التنظيف إلى الملابس — نقدم التميز', 'Our Services', 'خدماتنا', 1),
('Your Bridge to International Trade', 'جسرك إلى التجارة الدولية', '30+ years of experience in global commerce', 'أكثر من 30 عامًا من الخبرة في التجارة العالمية', 'Learn More', 'اعرف المزيد', 2);

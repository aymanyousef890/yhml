-- Create stats table
CREATE TABLE public.stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  stat_key TEXT NOT NULL UNIQUE,
  value INTEGER NOT NULL DEFAULT 0,
  label_en TEXT NOT NULL,
  label_ar TEXT NOT NULL,
  suffix TEXT DEFAULT '+',
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.stats ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read stats
CREATE POLICY "Anyone can read stats"
  ON public.stats
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Authenticated users can update stats
CREATE POLICY "Authenticated users can update stats"
  ON public.stats
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert default stats
INSERT INTO public.stats (stat_key, value, label_en, label_ar, suffix)
VALUES 
  ('experience', 30, 'Years of Experience', 'سنوات الخبرة', '+'),
  ('countries', 50, 'Countries Reached', 'دولة تم الوصول إليها', '+'),
  ('clients', 1000, 'Satisfied Clients', 'عملاء راضون', '+'),
  ('products', 5000, 'Products Delivered', 'منتج تم تسليمه', '+');

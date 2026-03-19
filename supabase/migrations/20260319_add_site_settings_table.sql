-- Create site_settings table for storing app configuration
CREATE TABLE public.site_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  setting_key TEXT NOT NULL UNIQUE,
  setting_value JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read settings
CREATE POLICY "Anyone can read settings"
  ON public.site_settings
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Authenticated users can update settings
CREATE POLICY "Authenticated users can update settings"
  ON public.site_settings
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Authenticated users can insert settings
CREATE POLICY "Authenticated users can insert settings"
  ON public.site_settings
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Insert initial stats
INSERT INTO public.site_settings (setting_key, setting_value)
VALUES ('stats', '[
  {"value": 30, "suffix": "+", "label": {"en": "Years of Experience", "ar": "سنوات الخبرة"}},
  {"value": 50, "suffix": "+", "label": {"en": "Countries Reached", "ar": "دولة تم الوصول إليها"}},
  {"value": 1000, "suffix": "+", "label": {"en": "Satisfied Clients", "ar": "عملاء راضون"}},
  {"value": 5000, "suffix": "+", "label": {"en": "Products Delivered", "ar": "منتج تم تسليمه"}}
]'::jsonb)
ON CONFLICT (setting_key) DO UPDATE SET setting_value = EXCLUDED.setting_value;

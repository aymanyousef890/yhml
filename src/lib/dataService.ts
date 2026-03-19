import siteData from '@/data/siteData.json';
import { supabase } from '@/integrations/supabase/client';

export type Lang = 'en' | 'ar';

export interface LocalizedString {
  en: string;
  ar: string;
}

const data = siteData;

export const getCompanyData = () => data.company;
export const getSocialLinks = () => data.social;
export const getHeroData = () => data.hero;
export const getServices = () => data.services;
export const getWhyChoose = () => data.whyChoose;
export const getStats = () => data.stats;
export const getAboutData = () => data.about;
export const getNavigation = () => data.navigation;
export const getPartners = () => data.partners;

// Function to fetch stats from Supabase
export const getStatsFromDB = async () => {
  try {
    const { data: settings, error } = await supabase
      .from('site_settings')
      .select('setting_value')
      .eq('setting_key', 'stats')
      .single();
    
    if (error) {
      console.warn('Failed to fetch stats from DB:', error);
      return data.stats;
    }
    
    if (settings && settings.setting_value) {
      return settings.setting_value;
    }
  } catch (error) {
    console.warn('Failed to fetch stats from DB:', error);
  }
  
  return data.stats;
};

// Function to save stats to Supabase
export const saveStatsToDB = async (stats: any[]) => {
  try {
    const { error } = await supabase
      .from('site_settings')
      .upsert({
        setting_key: 'stats',
        setting_value: stats,
      }, { onConflict: 'setting_key' });
    
    if (error) {
      console.error('Failed to save stats:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Failed to save stats:', error);
    return false;
  }
};

export const t = (obj: LocalizedString, lang: Lang): string => obj[lang];

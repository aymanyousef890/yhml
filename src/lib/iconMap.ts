import { Sparkles, Layers, Shirt, Home, Globe, TrendingUp, Users, Settings, Shield, Headphones, LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Sparkles,
  Layers,
  Shirt,
  Home,
  Globe,
  TrendingUp,
  Users,
  Settings,
  Shield,
  Headphones,
};

export const getIcon = (name: string): LucideIcon => {
  return iconMap[name] || Globe;
};

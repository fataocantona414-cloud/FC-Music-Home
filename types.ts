
export type ViewType = 'home' | 'about' | 'contact' | 'donate' | 'terms' | 'privacy';

export interface LinkItem {
  platform: string;
  iconClass: string;
  description: string;
  url: string;
  highlight?: boolean;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface ShowItem {
  id: string;
  title: string;
  date: string;
  venue: string;
  flyerUrl: string;
  ticketLink?: string;
}

export interface ProfileData {
  name: string;
  tagline: string;
  location: string;
  image: string;
  coverImage: string;
  flagImage: string;
  stats: StatItem[];
}

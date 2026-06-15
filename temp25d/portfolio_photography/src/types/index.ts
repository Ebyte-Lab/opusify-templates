export interface NavLink {
  label: string;
  href: string;
  variant?: 'default' | 'accent'; // 'accent' = the styled "Booking" link
}

export interface HeroSlide {
  id: string;
  image: string;
  alt: string;
  eyebrow: string; // e.g. "Featured Series", "Iceland, 2025"
  title: string;   // e.g. "Midnight Shadows"
}

export type GalleryCategory = 'all' | 'portraits' | 'landscapes' | 'editorial';

export interface ExifData {
  lens: string;
  aperture: string;
  shutter: string;
  iso: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: Exclude<GalleryCategory, 'all'>;
  exif: ExifData;
  sourceLabel: string; // e.g. "Leica M11 — New York"
}

export interface LightboxState {
  isOpen: boolean;
  currentSrc: string | null;
  currentAlt: string | null;
  isLoading: boolean;
}

export interface StudioInfo {
  ctaHeading: string;
  ctaBlurb: string;
  email: string;
  phone: string;
  addressLines: string[];
}

export interface AboutData {
  bio: string;
  portraitSrc: string;
  portraitAlt: string;
  clients: string[];
  publications: string[];
  awards: string[];
}


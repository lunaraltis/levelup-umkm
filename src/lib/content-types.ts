export interface FaqItem {
  question: string;
  answer: string;
}

export interface TestimonialItem {
  name: string;
  role: string;
  content: string;
  rating: number;
  initials: string;
}

export interface PricingPlan {
  name: string;
  description: string;
  originalPrice?: string;
  priceUpfront: string;
  priceMonthly: string;
  promoBadge?: string;
  features: string[];
}

export type LeadStatus = "new" | "contacted" | "won" | "lost";

export interface LeadItem {
  id: string;
  name: string;
  phone: string;
  business: string;
  service: string;
  message: string;
  pageUrl: string;
  createdAt: string;
  status?: LeadStatus;
}

export interface ContactSettings {
  whatsappNumber: string;
  whatsappDisplay: string;
  email: string;
  location: string;
  businessHours: string;
  ctaTitle: string;
  ctaHighlight: string;
  ctaDescription: string;
  formTitle: string;
  formDescription: string;
}

export interface HeroContent {
  badge: string;
  title: string;
  highlight: string;
  description: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  trustedText: string;
  brands: string[];
}

export interface PortfolioItem {
  title: string;
  category: string;
  image: string;
  color: string;
  accent: string;
}

export interface TrustItem {
  title: string;
  description: string;
}

export interface TrustContent {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  items: TrustItem[];
  guarantees: string[];
}

export interface ServicePage {
  slug: string;
  name: string;
  shortName: string;
  headline: string;
  description: string;
  intro: string;
  badge: string;
  accent: string;
  accentSoft: string;
  statLabel: string;
  statValue: string;
  idealFor: string[];
  deliverables: string[];
  outcomes: string[];
  faqs: FaqItem[];
}

export interface ContentData {
  hero: HeroContent;
  faqs: FaqItem[];
  testimonials: TestimonialItem[];
  portfolio: PortfolioItem[];
  trust: TrustContent;
  services: ServicePage[];
  pricing: PricingPlan[];
  leads: LeadItem[];
  contact: ContactSettings;
}

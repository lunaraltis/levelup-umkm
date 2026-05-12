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

export interface LeadItem {
  id: string;
  name: string;
  phone: string;
  business: string;
  service: string;
  message: string;
  pageUrl: string;
  createdAt: string;
}

export interface ContentData {
  faqs: FaqItem[];
  testimonials: TestimonialItem[];
  pricing: PricingPlan[];
  leads: LeadItem[];
}

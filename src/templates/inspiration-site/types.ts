export interface InspirationSiteData {
  hero?: {
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
  };
  about?: {
    title: string;
    description: string;
    image?: string;
  };
  services?: {
    title: string;
    description: string;
    items: Array<{
      title: string;
      description: string;
      icon?: string;
    }>;
  };
  whyChooseUs?: {
    title: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
  testimonials?: {
    title: string;
    description: string;
    items: Array<{
      name: string;
      role: string;
      content: string;
      avatar?: string;
    }>;
  };
  contact?: {
    title: string;
    description: string;
    email: string;
    phone?: string;
    address?: string;
  };
  footer?: {
    tagline: string;
    socialLinks?: Array<{
      platform: string;
      url: string;
    }>;
  };
} 
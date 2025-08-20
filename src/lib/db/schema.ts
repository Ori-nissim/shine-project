export interface PortfolioConfig {
  meta: {
    title: string;
    description: string;
    keywords: string[];
  };
  theme: {
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
    textColor: string;
    fontFamily: string;
    borderRadius: number;
    spacing: number;
  };
  layout: {
    sections: Array<{
      id: string;
      type: string;
      order: number;
      isVisible: boolean;
      config: any;
    }>;
    navigation: {
      isVisible: boolean;
      style: string;
      links: Array<{
        label: string;
        href: string;
        isExternal: boolean;
      }>;
    };
    footer: {
      isVisible: boolean;
      content: string;
      socialLinks: any[];
    };
  };
  content: {
    hero: {
      title: string;
      subtitle: string;
      description: string;
      ctaText: string;
      ctaLink: string;
    };
    services: Array<{
      name: string;
      description: string;
      icon: string;
      color: string;
    }>;
    about: {
      title: string;
      content: string;
      image?: string;
      skills: string[];
    };
    skills: {
      title: string;
      skills: string[];
    };
    projects: {
      title: string;
      projects: any[];
    };
    contact: {
      title: string;
      email: string;
      phone: string;
      location: string;
      socialLinks: any[];
    };
  };
} 
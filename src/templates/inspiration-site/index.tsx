'use client';

import React from 'react';
import { InspirationSiteData } from './types';
import {
  Navbar,
  HeroSection,
  ServicesSection,
  AboutSection,
  WhyChooseUsSection,
  TestimonialsSection,
  ContactSection
} from '../../components/inspiration-site';

interface InspirationSiteTemplateProps {
  data: InspirationSiteData;
  whatsappNumber?: string;
}

const InspirationSiteTemplate: React.FC<InspirationSiteTemplateProps> = ({ 
  data, 
  whatsappNumber = "972526495077" 
}) => {
  // Transform data to match existing component interfaces with defaults
  const heroProps = {
    headline: data.hero?.title || "Welcome",
    subheadline: data.hero?.subtitle || "Your subtitle here",
    backgroundImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2000&auto=format&fit=crop",
    primaryCTA: data.hero?.ctaText || "Get Started",
    secondaryCTA: "Learn More",
  };

  const servicesProps = {
    title: data.services?.title || "Our Services",
    description: data.services?.description || "Professional services tailored to your needs",
    items: data.services?.items?.map(item => ({
      ...item,
      icon: item.icon || "Check"
    })) || [],
  };

  const aboutProps = {
    title: data.about?.title || "About Us",
    description: data.about?.description || "Learn more about our services and expertise.",
    image: data.about?.image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
    imageAlt: "About Us",
    benefits: [
      {
        title: "Professional Service",
        description: "We deliver high-quality results on time, every time."
      },
      {
        title: "Expert Team",
        description: "Our experienced team ensures your project succeeds."
      },
      {
        title: "Customer Focus",
        description: "Your satisfaction is our top priority."
      }
    ]
  };

  const whyChooseUsProps = {
    title: data.whyChooseUs?.title || "Why Choose Us",
    items: (data.whyChooseUs?.items || [
      {
        title: "Professional Service",
        description: "We deliver high-quality results on time, every time."
      },
      {
        title: "Expert Team", 
        description: "Our experienced team ensures your project succeeds."
      },
      {
        title: "Customer Focus",
        description: "Your satisfaction is our top priority."
      }
    ]).map(item => ({
      ...item,
      icon: "Check"
    })),
  };

  const testimonialsProps = {
    title: data.testimonials?.title || "Client Testimonials",
    description: data.testimonials?.description || "What our clients say about our work",
    items: data.testimonials?.items?.map(item => ({
      quote: item.content,
      name: item.name,
      position: item.role,
      company: "",
      image: item.avatar || "https://randomuser.me/api/portraits/men/1.jpg"
    })) || [],
  };

  const contactProps = {
    title: data.contact?.title || "Get In Touch",
    description: data.contact?.description || "Ready to start your project? Contact us today!",
    formTitle: "Send Message",
    contactInfo: {
      title: "Contact Information",
      address: {
        title: "Address",
        value: data.contact?.address || "Contact us for location"
      },
      phone: {
        title: "Phone",
        value: data.contact?.phone || "Contact us"
      },
      email: {
        title: "Email",
        value: data.contact?.email || "contact@example.com"
      }
    },
    socialConnect: {
      title: "Connect With Us",
      whatsappBtn: "WhatsApp Ori"
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar logoText={heroProps.headline} />
      <HeroSection {...heroProps} />
      <ServicesSection {...servicesProps} />
      <AboutSection {...aboutProps} />
      <WhyChooseUsSection {...whyChooseUsProps} />
      <TestimonialsSection {...testimonialsProps} />
      <ContactSection {...contactProps} whatsappLink={`https://wa.me/${whatsappNumber}`} />
    </div>
  );
};

export default InspirationSiteTemplate; 
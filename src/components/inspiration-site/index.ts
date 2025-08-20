// Inspiration Site Component Library
// Export all components for easy importing

export { default as Navbar } from './Navbar';
export { default as HeroSection } from './HeroSection';
export { default as ServicesSection } from './ServicesSection';
export { default as AboutSection } from './AboutSection';
export { default as WhyChooseUsSection } from './WhyChooseUsSection';
export { default as TestimonialsSection } from './TestimonialsSection';
export { default as ContactSection } from './ContactSection';

// Export types for external use
export type { NavbarProps } from './Navbar';
export type { HeroSectionProps } from './HeroSection';
export type { ServicesSectionProps, ServiceItem } from './ServicesSection';
export type { AboutSectionProps, AboutBenefit } from './AboutSection';
export type { WhyChooseUsSectionProps, WhyChooseItem } from './WhyChooseUsSection';
export type { TestimonialsSectionProps, TestimonialItem } from './TestimonialsSection';
export type { ContactSectionProps, ContactInfo, SocialConnect } from './ContactSection'; 
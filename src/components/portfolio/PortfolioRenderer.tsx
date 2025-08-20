'use client';

import { useState, useEffect } from 'react';
import { PortfolioConfig } from '@/lib/db/schema';
import { TEMPLATE_STYLES } from '@/lib/portfolio/template';
import { 
  Palette, 
  TrendingUp, 
  Code, 
  Users, 
  Edit3, 
  Smartphone, 
  Briefcase,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Twitter,
  ArrowRight,
  Check,
  Home,
  Clipboard,
  Tag,
  ShieldCheck,
  Star,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PortfolioRendererProps {
  config: PortfolioConfig;
  isPreview?: boolean;
}

const iconMap: Record<string, React.ComponentType<any>> = {
  palette: Palette,
  'trending-up': TrendingUp,
  code: Code,
  users: Users,
  'edit-3': Edit3,
  smartphone: Smartphone,
  briefcase: Briefcase,
  check: Check,
  home: Home,
  clipboard: Clipboard,
  tag: Tag,
  'shield-check': ShieldCheck,
  star: Star,
};

export default function PortfolioRenderer({ config, isPreview = false }: PortfolioRendererProps) {
  const { theme, content, layout } = config;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  // Add scroll offset for fixed navigation
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Account for fixed navbar height
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: TEMPLATE_STYLES }} />
      
      {/* Navigation - Exact match to inspiration site */}
      {layout.navigation.isVisible && (
        <nav
          className={cn(
            "fixed top-0 w-full z-50 h-4 transition-all duration-300 text-white",
            isScrolled ? "bg-black backdrop-blur-sm shadow-sm" : "bg-transparent"
          )}
        >
          <div className="container-custom">
            <div className="flex items-center justify-between ">
              {/* Logo */}
              <a href="#" className="flex items-center">
                <span className="text-2xl font-display font-bold">{content.hero.title}</span>
              </a>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center space-x-8">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-sm font-medium hover:text-primary transition-colors ml-8"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.href.substring(1));
                    }}
                  >
                    {item.name}
                  </a>
                ))}
                <Button>Get Quote</Button>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </Button>
              </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
              <div className="md:hidden py-4 px-2 space-y-3 animate-fade-in bg-black rounded-md">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block py-2 text-base font-medium hover:text-primary transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsMenuOpen(false);
                      scrollToSection(item.href.substring(1));
                    }}
                  >
                    {item.name}
                  </a>
                ))}
                <div className="pt-2">
                  <Button className="w-full">Get Quote</Button>
                </div>
              </div>
            )}
          </div>
        </nav>
      )}

      {/* Hero Section - Inspiration Style */}
      <section id="hero" className="hero-inspiration">
        <div className="container-custom">
          <div className="max-w-4xl animate-fade-in">
            <h1 className="heading-xl text-white mb-6">
              {content.hero.title}
            </h1>
            <p className="text-2xl md:text-xl text-white/90 mb-4 font-medium">
              {content.hero.subtitle}
            </p>
            <p className="text-lg text-white/90 mb-8 leading-relaxed max-w-2xl">
              {content.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              {content.hero.ctaText && (
                <a
                  href={content.hero.ctaLink}
                  className="btn btn-primary text-base px-8 py-4 inline-flex items-center"
                >
                  {content.hero.ctaText}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              )}
              <button
                className="btn btn-secondary text-base px-8 py-4 border-white text-white hover:bg-white hover:text-black"
                onClick={() => {
                  document.getElementById("services")?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Inspiration Style */}
      <section id="services" className="section-padding bg-secondary/50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">My Services</h2>
            <p className="paragraph max-w-2xl mx-auto">
              Professional solutions tailored to your needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.services.map((service: any, index: number) => {
              const IconComponent = iconMap[service.icon] || Briefcase;
              return (
                <div key={index} className="card border border-border/50 hover-scale">
                  <div className="mb-4">
                    <IconComponent size={36} className="text-primary-color" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{service.name}</h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 items-center gap-16">
            <div>
              <h2 className="heading-lg mb-8">
                {content.about.title}
              </h2>
              <p className="paragraph mb-8">
                {content.about.content}
              </p>
              
              {content.about.skills && content.about.skills.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold mb-6">Skills & Expertise</h3>
                  <div className="flex flex-wrap gap-3">
                    {content.about.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-primary-color text-white rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {content.about.image && (
              <div className="text-center">
                <div className="w-64 h-64 mx-auto rounded-full overflow-hidden bg-gradient-to-br from-primary-color to-blue-600 shadow-xl">
                  {/* Placeholder for profile image */}
                  <div className="w-full h-full flex items-center justify-center text-white text-6xl font-bold">
                    {content.hero.title.charAt(0)}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding bg-secondary/50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-6">
              {content.contact.title}
            </h2>
            <p className="paragraph max-w-2xl mx-auto">
              Ready to bring your ideas to life?
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div>
              <h3 className="text-2xl font-bold mb-8">Get In Touch</h3>
              <div className="space-y-6">
                {content.contact.email && (
                  <div className="flex items-center">
                    <div className="p-3 rounded-lg bg-primary-color/10 mr-4">
                      <Mail className="h-5 w-5 text-primary-color" />
                    </div>
                    <a 
                      href={`mailto:${content.contact.email}`}
                      className="text-gray-600 hover:text-primary-color transition-colors font-medium"
                    >
                      {content.contact.email}
                    </a>
                  </div>
                )}
                
                {content.contact.phone && (
                  <div className="flex items-center">
                    <div className="p-3 rounded-lg bg-primary-color/10 mr-4">
                      <Phone className="h-5 w-5 text-primary-color" />
                    </div>
                    <a 
                      href={`tel:${content.contact.phone}`}
                      className="text-gray-600 hover:text-primary-color transition-colors font-medium"
                    >
                      {content.contact.phone}
                    </a>
                  </div>
                )}
                
                {content.contact.location && (
                  <div className="flex items-center">
                    <div className="p-3 rounded-lg bg-primary-color/10 mr-4">
                      <MapPin className="h-5 w-5 text-primary-color" />
                    </div>
                    <span className="text-gray-600 font-medium">
                      {content.contact.location}
                    </span>
                  </div>
                )}
              </div>
              
              {content.contact.socialLinks && content.contact.socialLinks.length > 0 && (
                <div className="mt-10">
                  <h4 className="text-lg font-bold mb-6">Follow Me</h4>
                  <div className="flex space-x-4">
                    {content.contact.socialLinks.map((social, index) => {
                      const SocialIcon = getSocialIcon(social.platform);
                      return (
                        <a
                          key={index}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
                        >
                          <SocialIcon className="h-5 w-5 text-gray-600" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            
            {/* Contact Form */}
            <div className="card">
              <h3 className="text-2xl font-bold mb-6">Send Message</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-color focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-color focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-color focus:border-transparent"
                    placeholder="Tell me about your project..."
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-full"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      {layout.footer.isVisible && (
        <footer className="bg-secondary-color text-white py-12">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p className="text-gray-300">
                  {layout.footer.content.replace('{{name}}', content.hero.title)}
                </p>
              </div>
              
              {layout.footer.socialLinks && layout.footer.socialLinks.length > 0 && (
                <div className="flex space-x-4">
                  {layout.footer.socialLinks.map((social, index) => {
                    const SocialIcon = getSocialIcon(social.platform);
                    return (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-white transition-colors"
                      >
                        <SocialIcon className="h-5 w-5" />
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </footer>
      )}
    </>
  );
}

function getSocialIcon(platform: string) {
  switch (platform.toLowerCase()) {
    case 'linkedin':
      return Linkedin;
    case 'github':
      return Github;
    case 'twitter':
      return Twitter;
    default:
      return Linkedin;
  }
} 
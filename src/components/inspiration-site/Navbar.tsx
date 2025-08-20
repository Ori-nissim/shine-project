"use client"
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export interface NavbarProps {
  logoText?: string;
  navItems?: Array<{ name: string; href: string }>;
  ctaText?: string;
}

const Navbar: React.FC<NavbarProps> = ({ 
  logoText = "YourBrand",
  navItems = [
    { name: " השירותים שלי", href: "#services" },
    { name: "אודות ", href: "#about" },
    { name: "לקוחות מספרים", href: "#testimonials" },
    { name: "למה לבחור בי", href: "#why-choose-us" },
    { name: "צרו קשר", href: "#contact" },
  ],
  ctaText = "לחצו להצעת מחיר"
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={` w-full z-50 transition-all duration-300 text-white ${
        isScrolled ? "bg-black backdrop-blur-sm shadow-sm" : "bg-black"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <a href="#" className="flex items-center">
            <span className="text-2xl font-display font-bold">{logoText}</span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium hover:text-primary transition-colors ml-8"
              >
                {item.name}
              </a>
            ))}
            <Button>{ctaText}</Button>
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
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="pt-2">
              <Button className="w-full">{ctaText}</Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 
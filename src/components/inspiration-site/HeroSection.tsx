"use client"
import React from "react";
import { Button } from "@/components/ui/button";

export interface HeroSectionProps {
  headline: string;
  subheadline: string;
  backgroundImage: string;
  primaryCTA: string;
  secondaryCTA: string;
  additionalText?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  headline,
  subheadline,
  backgroundImage,
  primaryCTA,
  secondaryCTA,
  additionalText = "מגלים ליקויים היום , חוסכים בעיות מחר"
}) => {
  return (
    <section className="relative min-h-screen flex items-center pt-16" id="hero">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-right md:bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-tight text-white mb-4">
            {headline}
          </h1>
          <p className="text-2xl md:text-xl text-white/90 mb-2">
            {subheadline}
          </p>
          <p className="text-2xl md:text-xl text-white/90 mb-8">
            {additionalText}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="text-base">
              {primaryCTA}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-black border-white text-base hover:bg-white hover:text-black"
              onClick={() => {
                document.getElementById("services")?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {secondaryCTA}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 
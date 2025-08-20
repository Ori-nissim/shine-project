"use client"
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Clipboard, Tag, Check, ShieldCheck, Star } from "lucide-react";

export interface WhyChooseItem {
  icon: string;
  title: string;
  description: string;
}

export interface WhyChooseUsSectionProps {
  title: string;
  items: WhyChooseItem[];
  backgroundColor?: string;
}

// Icon rendering function
const renderIcon = (iconName: string) => {
  const iconProps = { size: 36, className: "text-primary" };
  switch (iconName) {
    case "Home":
      return <Home {...iconProps} />;
    case "Clipboard":
      return <Clipboard {...iconProps} />;
    case "Tag":
      return <Tag {...iconProps} />;
    case "Check":
      return <Check {...iconProps} />;
    case "shield-check":
      return <ShieldCheck {...iconProps} />;
    case "Star":
      return <Star {...iconProps} />;
    default:
      return <Home {...iconProps} />;
  }
};

const WhyChooseUsSection: React.FC<WhyChooseUsSectionProps> = ({ 
  title, 
  items, 
  backgroundColor = "bg-secondary/50" 
}) => {
  return (
    <section className={`py-16 md:py-24 ${backgroundColor}`} id="why-choose-us">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-3xl md:text-4xl leading-tight mb-4">
            {title}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {Array.isArray(items) ? items.map((item, index) => (
            <Card key={index} className="text-center border border-border/50 transition-transform duration-300 hover:scale-105">
              <CardHeader>
                <div className="mb-4 mx-auto">{renderIcon(item.icon)}</div>
                <CardTitle className="text-xl">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {item.description}
                </CardDescription>
              </CardContent>
            </Card>
          )) : (
            <div className="col-span-full text-center text-gray-500">
              No items available
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection; 
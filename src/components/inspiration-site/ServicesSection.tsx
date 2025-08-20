"use client"
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Clipboard, Tag, Check, ShieldCheck, Star, Search } from "lucide-react";

export interface ServiceItem {
  icon: string;
  title: string;
  description: string;
}

export interface ServicesSectionProps {
  title: string;
  description: string;
  items: ServiceItem[];
  backgroundColor?: string;
}

// Icon rendering function
const renderIcon = (iconName: string) => {
  const iconProps = { size: 36, className: "text-primary" };
  switch (iconName) {
    case "Home":
      return <Home {...iconProps} />;
    case "Search":
      return <Search {...iconProps} />;
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

const ServicesSection: React.FC<ServicesSectionProps> = ({ 
  title, 
  description, 
  items, 
  backgroundColor = "bg-secondary/50" 
}) => {
  return (
    <section className={`py-16 md:py-24 ${backgroundColor}`} id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-3xl md:text-4xl leading-tight mb-4">
            {title}
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(items) ? items.map((service, index) => (
            <Card key={index} className="border border-border/50 transition-transform duration-300 hover:scale-105">
              <CardHeader>
                <div className="mb-4">{renderIcon(service.icon)}</div>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          )) : (
            <div className="col-span-full text-center text-gray-500">
              No services available
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection; 
"use client"
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export interface TestimonialItem {
  quote: string;
  name: string;
  position?: string;
  company?: string;
  image: string;
}

export interface TestimonialsSectionProps {
  title: string;
  description: string;
  items: TestimonialItem[];
  backgroundColor?: string;
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ 
  title, 
  description, 
  items, 
  backgroundColor = "" 
}) => {
  return (
    <section className={`py-16 md:py-24 ${backgroundColor}`} id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-3xl md:text-4xl leading-tight mb-4">
            {title}
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((testimonial, index) => (
            <Card key={index} className="border border-border/50 transition-transform duration-300 hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    {testimonial.position && (
                      <p className="text-sm text-muted-foreground">
                        {testimonial.position}
                        {testimonial.company && ` at ${testimonial.company}`}
                      </p>
                    )}
                  </div>
                </div>
                <blockquote className="text-base italic">
                  "{testimonial.quote}"
                </blockquote>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection; 
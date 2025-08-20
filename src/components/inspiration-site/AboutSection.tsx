"use client"
import React from "react";
import { CheckCircle } from "lucide-react";

export interface AboutBenefit {
  title: string;
  description: string;
}

export interface AboutSectionProps {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  benefits: AboutBenefit[];
  missionTitle?: string;
  missionDescription?: string;
  backgroundColor?: string;
}

const AboutSection: React.FC<AboutSectionProps> = ({
  title,
  description,
  image,
  imageAlt,
  benefits,
  missionTitle = "המטרה שלי",
  missionDescription = "המטרה שלי היא להעניק לדיירים ביטחון מלא ברגעים החשובים של חייהם. במסגרת שירותי בדק הבית שאני מבצע, אני פועל לאתר ליקויים גלויים וסמויים, לוודא עמידה בתקני הבנייה ולשמור על זכויות הדיירים מול הקבלן. הבדיקה המקצועית שאני עורך מספקת דו\"ח מפורט ואמין, המאפשר לדרוש את תיקון הליקויים במסגרת האחריות — ובכך לחסוך הוצאות עתידיות, למנוע עוגמת נפש ובעיות לא צפויות. אני מאמין שלכל רוכש דירה מגיע לדעת בדיוק מה הוא מקבל — וליהנות משקט נפשי וביטחון מלא בקנייה",
  backgroundColor = ""
}) => {
  return (
    <section className={`py-16 md:py-24 ${backgroundColor}`} id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Column */}
          <div className="relative rounded-2xl overflow-hidden h-[500px]">
            <img
              src={image}
              alt={imageAlt}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content Column */}
          <div>
            <h2 className="font-display font-bold text-3xl md:text-4xl leading-tight mb-6">
              {title}
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-muted-foreground mb-8">
              {description}
            </p>

            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Mission Section */}
        <div className="mt-16">
          <h2 className="font-display font-bold text-3xl md:text-4xl leading-tight mb-4">
            {missionTitle}
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-muted-foreground mb-8">
            {missionDescription}
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 
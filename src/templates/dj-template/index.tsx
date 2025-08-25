'use client';

import React, { useState, useEffect } from 'react';
import { DJTemplateData } from './types';
import {
  DJNavbar,
  DJHeroSection,
  DJMusicSection,
  DJEventsSection,
  DJGallerySection,
  DJAboutSection,
  DJSocialSection,
  DJContactSection,
  FloatingWhatsAppButton,
  DJFooter
} from '../../components/dj-template';

interface DJTemplateProps {
  data: DJTemplateData;
  whatsappNumber?: string;
}

const DJTemplate: React.FC<DJTemplateProps> = ({ 
  data, 
  whatsappNumber = "972 5555555" 
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  // Show loading state until client-side hydration is complete
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center">
      <div className="text-center space-y-6">
        {/* Shine Platform Logo */}
        <div className="space-y-2" dir="ltr">
          <div className="flex items-center justify-center space-x-2 text-4xl font-bold">
            <span className="bg-gradient-to-r from-orange-400 to-yellow-300 bg-clip-text text-transparent">
              Shine
            </span>
            <span className="text-white">Platform</span>
          </div>
          <div className="w-16 h-1 bg-gradient-to-r from-orange-400 to-yellow-300 mx-auto rounded-full"></div>
        </div>
        
        {/* Loading message */}
        <div className="text-white text-xl">טוען את האתר החדש שלך...</div>
        
        {/* Animated dots */}
        <div className="flex space-x-2 justify-center">
          <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-yellow-300 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
        
        {/* Tagline */}
        <div className="text-gray-400 text-sm max-w-md mx-auto">
          Crafting digital experiences with passion and precision
        </div>
      </div>
    </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden" suppressHydrationWarning dir="rtl">
      {/* Subtle animated background gradient */}
      <div 
        className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 opacity-10"
        style={{
          animation: 'subtle-pulse 4s ease-in-out infinite'
        }}
      ></div>
      
      <style jsx>{`
        @keyframes subtle-pulse {
          0%, 100% { opacity: 0.08; }
          50% { opacity: 0.12; }
        }
      `}</style>
      
      <DJNavbar 
        logoText={data.hero?.title || "די ג'יי עומר"} 
        socialLinks={data.social?.links || []}
      />
      
      <DJHeroSection 
        title={data.hero?.title || "די ג'יי עומר"}
        subtitle={data.hero?.subtitle || "מפיק מוזיקה אלקטרונית ו-DJ"}
        ctaText={data.hero?.ctaText || "האזן עכשיו"}
        ctaLink={data.hero?.ctaLink || "#music"}
        backgroundVideo={data.hero?.backgroundVideo}
        backgroundImage={data.hero?.backgroundImage}
      />
      
      <DJMusicSection 
        title={data.music?.title || "הקלטות אחרונות"}
        description={data.music?.description || "בדוק את הטראקים והרמיקסים האחרונים שלי"}
        tracks={data.music?.tracks || []}
      />
      
      <DJEventsSection 
        title={data.events?.title || "הופעות קרובות"}
        description={data.events?.description || "תפוס אותי בהופעות הקרובות"}
        events={data.events?.upcomingEvents || []}
      />
      
      <DJGallerySection 
        title={data.gallery?.title || "גלריה"}
        description={data.gallery?.description || "מאחורי הקלעים ורגעים מהופעות"}
        media={data.gallery?.media || []}
      />
      
      <DJAboutSection 
        title={data.about?.title || "אודות"}
        description={data.about?.description || "מפיק מוזיקה אלקטרונית ו-DJ"}
        quote={data.about?.quote}
        image={data.about?.image}
      />
      
      <DJSocialSection 
        links={data.social?.links || []}
      />
      
      <DJContactSection 
        title={data.contact?.title || "צור קשר"}
        description={data.contact?.description || "לבוקינג ושיתופי פעולה"}
        whatsappNumber={whatsappNumber}
        email={data.contact?.email}
        bookingEmail={data.contact?.bookingEmail}
      />
      
      <DJFooter />
      
      <FloatingWhatsAppButton 
        phoneNumber={whatsappNumber}
        message="היי! אני רוצה להזמין אותך לאירוע."
      />
    </div>
  );
};

export default DJTemplate; 
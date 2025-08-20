'use client';

import React from 'react';
import DJNavbar from './DJNavbar';
import DJHeroSection from './DJHeroSection';
import DJAboutSection from './DJAboutSection';
import DJMusicSection from './DJMusicSection';
import DJEventsSection from './DJEventsSection';
import DJGallerySection from './DJGallerySection';
import DJSocialSection from './DJSocialSection';
import DJContactSection from './DJContactSection';
import DJFooter from './DJFooter';
import FloatingWhatsAppButton from './FloatingWhatsAppButton';

interface DJTemplateProps {
  data: {
    name: string;
    tagline: string;
    about: string;
    music: {
      genres: string[];
      platforms: string[];
      tracks?: Array<{
        title: string;
        artist: string;
        coverImage: string;
        spotifyUrl?: string;
        soundcloudUrl?: string;
        releaseDate: string;
        duration?: string;
      }>;
    };
    events: {
      name: string;
      date: string;
      location: string;
    }[];
    contact: {
      email: string;
      phone: string;
    };
  };
  whatsappNumber: string;
}

const DJTemplate: React.FC<DJTemplateProps> = ({ data, whatsappNumber }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <DJNavbar name={data.name} />
      <DJHeroSection name={data.name} tagline={data.tagline} />
      <DJAboutSection about={data.about} />
      <DJMusicSection 
        title="המוזיקה שלי"
        description="גלה את הצלילים הייחודיים שלי"
        tracks={data.music.tracks || []}
      />
      <DJEventsSection events={data.events} />
      <DJGallerySection />
      <DJSocialSection />
      <DJContactSection contact={data.contact} />
      <DJFooter name={data.name} />
      <FloatingWhatsAppButton phoneNumber={whatsappNumber} />
    </div>
  );
};

export default DJTemplate; 
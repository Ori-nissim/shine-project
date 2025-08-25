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
    hero: {
      title: string;
      subtitle: string;
      ctaText: string;
      ctaLink: string;
      backgroundVideo?: string;
      backgroundImage?: string;
    };
    about: {
      title: string;
      description: string;
      quote: string;
      image: string;
    };
    music: {
      title: string;
      description: string;
      tracks: Array<{
        title: string;
        artist: string;
        coverImage: string;
        spotifyUrl: string;
        releaseDate: string;
        duration: string;
      }>;
    };
    events: {
      title: string;
      description: string;
      upcomingEvents: Array<{
        title: string;
        venue: string;
        city: string;
        date: string;
        time: string;
        ticketUrl: string;
        image: string;
      }>;
    };
    gallery: {
      title: string;
      description: string;
      media: Array<{
        type: string;
        url: string;
        title: string;
        description: string;
      }>;
    };
    social: {
      title: string;
      links: Array<{
        platform: string;
        url: string;
        icon: string;
      }>;
    };
    contact: {
      title: string;
      description: string;
      whatsappNumber: string;
      email: string;
      bookingEmail: string;
    };
  };
  whatsappNumber: string;
}

const DJTemplate: React.FC<DJTemplateProps> = ({ data, whatsappNumber }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <DJNavbar logoText={data.hero.title} socialLinks={data.social.links} />
      <DJHeroSection 
        title={data.hero.title}
        subtitle={data.hero.subtitle}
        ctaText={data.hero.ctaText}
        ctaLink={data.hero.ctaLink}
        backgroundVideo={data.hero.backgroundVideo}
        backgroundImage={data.hero.backgroundImage}
      />
      <DJAboutSection 
        title={data.about.title}
        description={data.about.description}
        quote={data.about.quote}
        image={data.about.image}
      />
      <DJMusicSection 
        title={data.music.title}
        description={data.music.description}
        tracks={data.music.tracks}
      />
      <DJEventsSection 
        title={data.events.title}
        description={data.events.description}
        events={data.events.upcomingEvents}
      />
      <DJGallerySection 
        title={data.gallery.title}
        description={data.gallery.description}
        media={data.gallery.media}
      />
      <DJSocialSection links={data.social.links} />
      <DJContactSection 
        title={data.contact.title}
        description={data.contact.description}
        whatsappNumber={data.contact.whatsappNumber}
        email={data.contact.email}
        bookingEmail={data.contact.bookingEmail}
      />
      <DJFooter />
      <FloatingWhatsAppButton phoneNumber={whatsappNumber} />
    </div>
  );
};

export default DJTemplate; 
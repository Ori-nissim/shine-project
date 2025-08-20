export interface DJTemplateData {
  hero?: {
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
    backgroundVideo?: string;
    backgroundImage?: string;
  };
  about?: {
    title: string;
    description: string;
    quote?: string;
    image?: string;
  };
  music?: {
    title: string;
    description: string;
    tracks: Array<{
      title: string;
      artist: string;
      coverImage: string;
      spotifyUrl?: string;
      soundcloudUrl?: string;
      releaseDate: string;
      duration?: string;
    }>;
  };
  events?: {
    title: string;
    description: string;
    upcomingEvents: Array<{
      title: string;
      venue: string;
      city: string;
      date: string;
      time: string;
      ticketUrl?: string;
      image?: string;
    }>;
  };
  gallery?: {
    title: string;
    description: string;
    media: Array<{
      type: string;
      url: string;
      title: string;
      description?: string;
      thumbnail?: string;
    }>;
  };
  social?: {
    title: string;
    links: Array<{
      platform: string;
      url: string;
      icon: string;
    }>;
  };
  contact?: {
    title: string;
    description: string;
    whatsappNumber: string;
    email?: string;
    bookingEmail?: string;
  };
} 
# DJ Template - Premium Music Artist Website

A bold, colorful, and animated website template specifically designed for DJs and electronic music artists. Inspired by top DJ websites like Martin Garrix, Miss Monique, and Calvin Harris.

## 🎵 Features

### **Hero Section**
- **Impressive animated background** with video/image support
- **Bold typography** with gradient text effects
- **Interactive mouse follower** for engaging user experience
- **Animated particles** for dynamic visual appeal
- **Smooth scroll indicators**

### **Music Section**
- **Spotify integration** with direct track links
- **SoundCloud support** for additional platforms
- **Animated track cards** with hover effects
- **Play button overlays** for visual engagement
- **Release date and duration display**

### **Events Section**
- **Upcoming shows display** with venue details
- **Ticket booking links** for direct sales
- **Date formatting** for better readability
- **Event type categorization**
- **Share functionality**

### **Gallery Section**
- **Masonry layout** for dynamic photo/video display
- **Lightbox functionality** for full-screen viewing
- **Filter system** (All/Photos/Videos)
- **Hover effects** with media information
- **Responsive design** for all devices

### **About Section**
- **Clever quote integration** with animated styling
- **Statistics display** (shows, tracks, streams)
- **Animated floating elements**
- **Professional bio presentation**

### **Social Section**
- **Platform-specific colors** for each social media
- **Animated social cards** with hover effects
- **Newsletter signup** for audience building
- **Floating decorative elements**

### **Contact Section**
- **Clever WhatsApp integration** with pre-filled messages
- **Event booking form** with type selection
- **Multiple contact methods** (email, WhatsApp, booking)
- **Response time indicators**
- **Professional contact layout**

### **Floating WhatsApp Button**
- **Smart positioning** with delayed appearance
- **Pulse animations** to draw attention
- **Hover tooltips** with booking information
- **Live status indicator**

## 🎨 Design Features

### **Color Scheme**
- **Purple to Pink to Blue gradients** for vibrant appeal
- **Dark theme** with neon accents
- **Platform-specific colors** for social media
- **Animated gradient backgrounds**

### **Animations**
- **Framer Motion** for smooth animations
- **Staggered animations** for content reveal
- **Hover effects** throughout the interface
- **Scroll-triggered animations**
- **Floating elements** for dynamic feel

### **Typography**
- **Bold, modern fonts** for impact
- **Gradient text effects** for visual appeal
- **Responsive sizing** for all devices
- **Clear hierarchy** for easy reading

## 🚀 Usage

### **Basic Setup**
```tsx
import DJTemplate from '@/templates/dj-template';
import { DJTemplateData } from '@/templates/dj-template/types';

const data: DJTemplateData = {
  hero: {
    title: "DJ NAME",
    subtitle: "Electronic Music Producer & DJ",
    ctaText: "Listen Now",
    ctaLink: "#music"
  },
  // ... other sections
};

<DJTemplate data={data} whatsappNumber="1234567890" />
```

### **Data Structure**
The template expects a `DJTemplateData` object with sections for:
- `hero` - Main landing section
- `music` - Track listings with Spotify/SoundCloud links
- `events` - Upcoming shows and performances
- `gallery` - Photo and video content
- `about` - Artist bio and quote
- `social` - Social media links
- `contact` - Contact information and booking

### **WhatsApp Integration**
The template includes clever WhatsApp integration:
- **Floating button** with animations
- **Pre-filled messages** for bookings
- **Direct phone number links**
- **Response time indicators**

## 📱 Responsive Design

- **Mobile-first approach** with responsive breakpoints
- **Touch-friendly interactions** for mobile devices
- **Optimized layouts** for tablets and desktops
- **Smooth scrolling** on all devices

## 🎯 Performance

- **Optimized animations** with Framer Motion
- **Lazy loading** for images and videos
- **Efficient re-renders** with React best practices
- **Minimal bundle size** for fast loading

## 🔧 Customization

### **Colors**
Modify the gradient colors in the CSS classes:
```css
bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400
```

### **Animations**
Adjust animation timing and effects in the Framer Motion components:
```tsx
transition={{ duration: 0.8, delay: 0.2 }}
```

### **Content**
Update the data structure to match your artist's information:
- Track listings with Spotify URLs
- Event details with ticket links
- Social media profiles
- Contact information

## 📋 Requirements

- **Next.js 15+** for the framework
- **Framer Motion** for animations
- **Tailwind CSS** for styling
- **Font Awesome** for icons

## 🎵 Perfect For

- **Electronic music DJs**
- **Music producers**
- **Festival performers**
- **Club DJs**
- **Music artists** looking for a bold, modern website

## 🌟 Inspiration

This template draws inspiration from:
- **Martin Garrix** - Bold, colorful design
- **Miss Monique** - Music-focused layout
- **Calvin Harris** - Clean, modern aesthetic

The result is a premium, engaging website that captures the energy and excitement of electronic music culture while providing all the tools needed for successful artist promotion and booking. 
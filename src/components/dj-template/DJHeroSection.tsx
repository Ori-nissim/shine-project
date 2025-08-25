'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface DJHeroSectionProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  backgroundVideo?: string;
  backgroundImage?: string;
}

const DJHeroSection: React.FC<DJHeroSectionProps> = ({
  title,
  subtitle,
  ctaText,
  ctaLink,
  backgroundVideo,
  backgroundImage
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });


  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const scrollToSection = (href: string) => {
    if (typeof window !== 'undefined') {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" >
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0">
        {/* Background Image or Video */}
        {backgroundVideo ? (
          backgroundVideo.includes('youtube.com') || backgroundVideo.includes('youtu.be') ? (
            // YouTube embed
            <iframe
              src={`${backgroundVideo.replace('watch?v=', 'embed/')}?autoplay=1&mute=1&loop=1&playlist=${backgroundVideo.split('v=')[1]}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`}
              className="w-full h-screen object-cover"
              style={{
                position: 'absolute',
                top: '-30px',
                left: '0',
                width: '100vw',
                height: '100vh',
                pointerEvents: 'none'
              }}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            // Direct video file
            <video
              autoPlay
              muted
              loop={true}
              className="w-full h-full object-cover"
            >
              <source src={backgroundVideo} type="video/mp4" />
            </video>
          )
        ) : backgroundImage ? (
          <div 
            className="w-full h-full object-cover opacity-50"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        ) : (
          <div 
            className="w-full h-full object-cover"
            style={{
              background: 'linear-gradient(45deg, #1e3a8a 0%, #0f172a 100%)',
            }}
          />
        )}
        </div>
      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-8xl md:text-10xl lg:text-[150px] font-black mb-6 relative"
          style={{ fontFamily: 'var(--font-bebas-neue)' }}
        >
          {/* Text outline effect with multiple shadows */}
          <span 
            className="relative tracking-wider"
            style={{
              color: '#00D4FF',
              textShadow: `
                -3px -3px 0 #000000,
                3px -3px 0 #000000,
                -3px 3px 0 #000000,
                3px 3px 0 #000000,
                -2px -2px 0 #000000,
                2px -2px 0 #000000,
                -2px 2px 0 #000000,
                2px 2px 0 #000000,
                -1px -1px 0 #000000,
                1px -1px 0 #000000,
                -1px 1px 0 #000000,
                1px 1px 0 #000000,
                0 0 8px rgba(0, 212, 255, 0.8),
                0 0 16px rgba(0, 212, 255, 0.6),
                0 0 24px rgba(0, 212, 255, 0.4),
                0 0 32px rgba(0, 212, 255, 0.2)
              `,
              filter: 'drop-shadow(0 0 12px rgba(0, 212, 255, 0.6))'
            }}
          >
            {title}
          </span>
          

        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-2xl md:text-4xl mb-8 font-semibold"
          style={{
            color: '#e1e1e1',
            textShadow: `
              -2px -2px 0 #000000,
              2px -2px 0 #000000,
              -2px 2px 0 #000000,
              2px 2px 0 #000000,
              0 0 8px rgba(0, 230, 204, 0.8),
              0 0 16px rgba(0, 230, 204, 0.4)
            `,
            filter: 'drop-shadow(0 0 8px rgba(0, 230, 204, 0.6))'
          }}
        >
          {subtitle}
        </motion.p>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          whileHover={{ 
            scale: 1.05, 
            boxShadow: "0 0 40px rgba(0, 212, 255, 0.8)",
            textShadow: "0 0 10px rgba(255, 255, 255, 0.8)"
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => scrollToSection(ctaLink)}
          className="relative text-white font-semibold py-4 px-8 rounded-full text-xl md:text-2xl transition-all tracking-widest duration-300 transform hover:translate-y-[-2px] shadow-2xl overflow-hidden group"
          style={{
            background: 'linear-gradient(135deg, #00D4FF 0%, #00E6CC 50%, #00B8D4 100%)',
            boxShadow: '0 0 20px rgba(0, 212, 255, 0.6), 0 0 40px rgba(0, 230, 204, 0.4)'
          }}
        >
          {/* Button glow effect */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
            style={{
              background: 'linear-gradient(135deg, #00D4FF 0%, #00E6CC 50%, #00B8D4 100%)'
            }}
            animate={{
              x: [0, 100, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <span className="relative z-10">{ctaText}</span>
        </motion.button>
      </div>

              {/* Cursor-responsive sound waves */}
        {(
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-1">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 bg-blue-400 rounded-full"
              animate={{
                height: [10, 30, 10],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </div>
        )}
    </section>
  );
};

export default DJHeroSection;
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
            className="w-full h-full object-cover"
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
        
        {/* Enhanced overlay with animated gradient - applied on top of image/video */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 via-slate-900/40 to-teal-900/60"></div>
        
        {/* Interactive cursor-responsive glow */}
        {(
          <motion.div
            className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"
            animate={{
              x: mousePosition.x - 192,
              y: mousePosition.y - 192,
            }}
            transition={{ type: "spring", stiffness: 100, damping: 30 }}
          />
        )}

        {/* Enhanced animated particles */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/40 rounded-full"
              animate={{
                x: [0, Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000)],
                y: [0, Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800)],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: (i % 4) + 3,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                left: `${(i * 3.33) % 100}%`,
                top: `${(i * 2.5) % 100}%`,
              }}
            />
          ))}
        </div>

        {/* Floating geometric shapes */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`shape-${i}`}
              className="absolute border border-blue-400/20"
              style={{
                width: 50 + (i * 10),
                height: 50 + (i * 8),
                left: `${(i * 12.5) % 100}%`,
                top: `${(i * 15) % 100}%`,
                borderRadius: i % 2 === 0 ? '50%' : '0%',
              }}
              animate={{
                rotate: [0, 360],
                scale: [0.8, 1.2, 0.8],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 10 + (i * 2),
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>

        {/* Cursor-responsive grid lines */}
        {(
          <div className="absolute inset-0">
            <svg className="w-full h-full" style={{ opacity: 0.1 }}>
              <defs>
                <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke="blue" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
        )}

        {/* Additional overlay for better text readability when image is used */}
        {backgroundImage && (
          <div className="absolute inset-0 bg-black/30"></div>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-9xl font-black mb-6"
          style={{ fontFamily: 'var(--font-bebas-neue)' }}
        >
          <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
            {title}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-3xl text-gray-300 mb-8 font-light"
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
            boxShadow: "0 0 40px rgba(59, 130, 246, 0.6)",
            textShadow: "0 0 10px rgba(255, 255, 255, 0.5)"
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => scrollToSection(ctaLink)}
          className="relative bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-500 hover:to-teal-500 text-white font-semibold py-4 px-8 rounded-full text-xl md:text-2xl transition-all tracking-widest duration-300 transform hover:translate-y-[-2px] shadow-2xl overflow-hidden group"
        >
          {/* Button glow effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-400 to-teal-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
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
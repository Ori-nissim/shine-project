'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Rubik } from 'next/font/google';

const rubik = Rubik({ 
  subsets: ['hebrew'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-rubik'
});

interface Track {
  title: string;
  artist: string;
  coverImage: string;
  spotifyUrl?: string;
  soundcloudUrl?: string;
  releaseDate: string;
  duration?: string;
}

interface DJMusicSectionProps {
  title: string;
  description: string;
  tracks: Track[];
}

const DJMusicSection: React.FC<DJMusicSectionProps> = ({
  title,
  description,
  tracks
}) => {
  // Safety check for empty tracks
  if (!tracks || tracks.length === 0) {
    return (
      <section id="music" className="py-20 bg-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h2 className={`text-4xl md:text-5xl font-black mb-6 ${rubik.className}`}>
              <span className="bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                {title}
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {description}
            </p>
            <p className="text-gray-400 mt-8">אין שירים זמינים כרגע</p>
          </div>
        </div>
      </section>
    );
  }

  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  // Add reactive viewport width to avoid direct window usage during render and support responsive math
  const [viewportWidth, setViewportWidth] = useState(1024);
  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle mouse movement for card interaction with throttling
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    mouseX.set(x);
    mouseY.set(y);
    
    // Calculate which card should be active based on mouse position
    const cardWidth = rect.width / tracks.length;
    const newIndex = Math.floor(x / cardWidth);
    const clampedIndex = Math.max(0, Math.min(newIndex, tracks.length - 1));
    
    // Only update state if index actually changed
    if (clampedIndex !== activeIndex) {
      setActiveIndex(clampedIndex);
    }
  };

  const handleMouseLeave = () => {
    setActiveIndex(0);
  };

  return (
    <section id="music" className="py-20 bg-black relative overflow-hidden">
      {/* Neon Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl md:text-5xl font-black mb-6 ${rubik.className}`}>
            <span className="bg-gradient-to-r from-cyan-400 to-green-400  bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(34,211,238,0.5)]">
              {title}
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {description}
          </p>
        </motion.div>

        {/* Stacked Cards Container - Desktop/Tablet */}
        <div className="relative h-[60vh] mb-16 hidden md:block">
          <motion.div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-full h-full flex items-center justify-center"
          >
            {tracks.map((track, index) => {
              const isActive = index === activeIndex;
              const distanceFromActive = Math.abs(index - activeIndex);
              
              // Calculate card positioning and rotation
              const baseRotation = -12; // Starting rotation
              const rotationStep = 6; // Rotation increment per card
              const rotation = baseRotation + (index * rotationStep);
              
              // Calculate z-index and scale
              const zIndex = tracks.length - distanceFromActive;
              const scale = isActive ? 1.15 : Math.max(0.75, 1 - (distanceFromActive * 0.08));
              
              // Calculate horizontal offset for fanned effect - responsive without direct window usage
              const baseOffset = viewportWidth > 1024 ? -400 : -250;
              const offsetStep = viewportWidth > 1024 ? 150 : 100;
              const xOffset = baseOffset + (index * offsetStep);
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8, rotateY: -45 }}
                  dir="rtl"
                  animate={{
                    opacity: 1,
                    scale,
                    rotateY: rotation,
                    x: xOffset,
                    z: isActive ? 50 : 0,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                  style={{
                    zIndex,
                    position: 'absolute',
                    transformStyle: 'preserve-3d',
                  }}
                  className="w-96 h-86 cursor-pointer"
                  onClick={() => setActiveIndex(index)}
                >
                  {/* Card Container */}
                  <motion.div
                    whileHover={{ scale: isActive ? 1.05 : 1.02 }}
                    className={`relative w-full h-full rounded-2xl p-4 transition-all duration-300 ${
                      isActive 
                        ? 'bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border-2 shadow-[0_0_30px_rgba(34,211,238,0.3)]' 
                        : 'bg-gradient-to-br from-slate-900/60 to-slate-800/60 backdrop-blur-sm border border-slate-600/30'
                    }`}
                  >
                    {/* Track Cover */}
                    <div className="relative mb-3">
                      <motion.img
                        src={track.coverImage}
                        alt={`${track.title} cover`}
                        className="w-full h-56 object-cover rounded-xl shadow-2xl"
                        style={{
                          filter: isActive ? 'none' : 'brightness(0.6) saturate(0.8)',
                        }}
                      />
                      
                      {/* Play Button Overlay */}
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                          className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center"
                        >
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.5)]"
                          >
                           <img src="/images/icons8-play-48.png" alt="play" width={24} height={24} />
                          </motion.button>
                        </motion.div>
                      )}
                    </div>

                    {/* Simplified Track Info */}
                    <div className="space-y-2">
                      <h3 className={`text-base font-bold transition-colors text-xl text-center ${
                        isActive ? 'text-white' : 'text-gray-400'
                      }`}>
                        {track.title}
                      </h3>
                      
                      {/* Listen Button - Only on active card */}
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="mt-3"
                        >
                          <div className="text-gray-400 text-l  text-center mt-0">
                            {track.releaseDate.split("-")[0]}
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* Neon Border */}
                    <div 
                      className={`absolute inset-0 rounded-2xl border-2 transition-all duration-300 ${
                        isActive 
                          ? 'border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.3)]' 
                          : index === 0 ? 'border-lime-400/50' :
                            index === 1 ? 'border-lime-400/50' :
                            index === 2 ? 'border-teal-400/50' :
                            index === 3 ? 'border-lime-400/50' :
                            'border-blue-400/50'
                      }`}
                    />
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Mobile Carousel - Horizontal Scroll */}
        <div className="md:hidden mb-16">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 px-1">
            {tracks.map((track, index) => (
              <div
                key={index}
                className="shrink-0 w-[80vw] max-w-xs snap-center"
              >
                <div className="relative w-full rounded-2xl p-4 bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur border border-slate-600/30">
                  <div className="relative mb-3">
                    <img
                      src={track.coverImage}
                      alt={`${track.title} cover`}
                      className="w-full h-48 object-cover rounded-xl shadow-2xl"
                    />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-white text-lg font-bold text-center">{track.title}</h3>
                    <div className="text-gray-400 text-sm text-center">{track.releaseDate.split('-')[0]}</div>
                  </div>
                  <div 
                    className={`absolute inset-0 rounded-2xl border-2 ${
                      index === 0 ? 'border-lime-400/50' :
                      index === 1 ? 'border-lime-400/50' :
                      index === 2 ? 'border-teal-400/50' :
                      index === 3 ? 'border-lime-400/50' :
                      'border-blue-400/50'
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 bg-black text-white font-bold py-3 px-6 rounded-lg text-base transition-all duration-300 shadow-lg border border-white hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]"
          >
            לכל השירים 
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default DJMusicSection; 
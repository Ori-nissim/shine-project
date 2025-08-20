'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Rubik } from 'next/font/google';


const rubik = Rubik({ 
  subsets: ['hebrew'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-rubik'
});

interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

interface DJSocialSectionProps {
  links: SocialLink[];
}

const DJSocialSection: React.FC<DJSocialSectionProps> = ({
  links = []
}) => {
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15
      }
    }
  };

  // Get platform-specific icon and colors
  const getPlatformData = (platformName: string) => {
    const platformData: { [key: string]: { 
      icon: string; 
      borderColor: string; 
      glowColor: string;
    } } = {
      'instagram': {
        icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`,
        borderColor: 'border-purple-800',
        glowColor: 'shadow-purple-500/50'
      },
      'facebook': {
        icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,
        borderColor: 'border-blue-800',
        glowColor: 'shadow-blue-600/50'
      },
      'twitter': {
        icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>`,
        borderColor: 'border-sky-500',
        glowColor: 'shadow-sky-500/50'
      },
      'youtube': {
        icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
        borderColor: 'border-red-800',
        glowColor: 'shadow-red-600/50'
      },
      'spotify': {
        icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>`,
        borderColor: 'border-green-800',
        glowColor: 'shadow-green-500/50'
              },
      'soundcloud': {
        icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>`,
        borderColor: 'border-orange-900',
        glowColor: 'shadow-orange-500/50'
      },
      'whatsapp': {
        icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/></svg>`,
        borderColor: 'border-green-600',
        glowColor: 'shadow-green-500/50'
      },
      'tiktok': {
        icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>`,
        borderColor: 'border-pink-800',
        glowColor: 'shadow-pink-500/50'
      },
      'twitch': {
        icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/></svg>`,
        borderColor: 'border-purple-600',
        glowColor: 'shadow-purple-600/50'
      }
    };
    
    const platformKey = platformName.toLowerCase();
    return platformData[platformKey] || {
      icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>`,
      borderColor: 'border-orange-800',
      glowColor: 'shadow-gray-500/50'
    };
  };

  return (
    <section className="relative py-24 bg-gradient-to-br from-black via-slate-900 to-blue-900 overflow-hidden" dir="rtl">
      {/* Animated Background Elements */}
      <div className="absolute inset-0" >
        {/* Large rotating orbs */}
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            rotate: -360,
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-pink-500/10 to-orange-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            x: [0, 10, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 rounded-full blur-3xl"
        />

        {/* Moving Bubbles - Asymmetric */}
        <motion.div
          animate={{ 
            y: [0, -100, 0],
            x: [0, 50, 0],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 right-1/4 w-8 h-8 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full blur-sm"
        />
        
        <motion.div
          animate={{ 
            y: [0, 80, 0],
            x: [0, -30, 0],
            scale: [0.8, 1.1, 0.8],
            opacity: [0.4, 0.9, 0.4]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/3 left-10 w-12 h-12 bg-gradient-to-r from-pink-400/30 to-orange-400/30 rounded-full blur-sm"
        />
        
        <motion.div
          animate={{ 
            y: [0, -60, 0],
            x: [0, 80, 0],
            scale: [1.1, 0.9, 1.1],
            opacity: [0.5, 0.7, 0.5]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute bottom-1/3 right-20 w-6 h-6 bg-gradient-to-r from-teal-400/30 to-cyan-400/30 rounded-full blur-sm"
        />
        
        <motion.div
          animate={{ 
            y: [0, 120, 0],
            x: [0, -60, 0],
            scale: [0.9, 1.3, 0.9],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-2/3 left-1/3 w-10 h-10 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full blur-sm"
        />
        
        <motion.div
          animate={{ 
            y: [0, -80, 0],
            x: [0, 40, 0],
            scale: [1.2, 0.8, 1.2],
            opacity: [0.4, 0.9, 0.4]
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute bottom-1/4 right-1/3 w-14 h-14 bg-gradient-to-r from-orange-400/30 to-yellow-400/30 rounded-full blur-sm"
        />
        
        <motion.div
          animate={{ 
            y: [0, 90, 0],
            x: [0, -50, 0],
            scale: [0.8, 1.2, 0.8],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          className="absolute top-1/4 right-1/2 w-9 h-9 bg-gradient-to-r from-green-400/30 to-teal-400/30 rounded-full blur-sm"
        />
        
        <motion.div
          animate={{ 
            y: [0, -70, 0],
            x: [0, 70, 0],
            scale: [1.1, 0.9, 1.1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{ duration: 17, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
          className="absolute bottom-1/3 left-1/4 w-7 h-7 bg-gradient-to-r from-blue-400/30 to-indigo-400/30 rounded-full blur-sm"
        />
        
        <motion.div
          animate={{ 
            y: [0, 100, 0],
            x: [0, -40, 0],
            scale: [0.9, 1.1, 0.9],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{ duration: 19, repeat: Infinity, ease: "easeInOut", delay: 6 }}
          className="absolute top-3/4 right-1/4 w-11 h-11 bg-gradient-to-r from-pink-400/30 to-red-400/30 rounded-full blur-sm"
        />
        
        <motion.div
          animate={{ 
            y: [0, -50, 0],
            x: [0, 60, 0],
            scale: [1.3, 0.8, 1.3],
            opacity: [0.3, 0.9, 0.3]
          }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute bottom-1/2 left-1/2 w-5 h-5 bg-gradient-to-r from-cyan-400/30 to-blue-400/30 rounded-full blur-sm"
        />
        
        <motion.div
          animate={{ 
            y: [0, 80, 0],
            x: [0, -80, 0],
            scale: [0.8, 1.4, 0.8],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 4.5 }}
          className="absolute top-1/2 right-1/3 w-13 h-13 bg-gradient-to-r from-purple-400/30 to-violet-400/30 rounded-full blur-sm"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-block mb-6"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-yellow-400 to-teal-400 blur-lg opacity-10"></div>
              <h2 className={`relative text-5xl md:text-7xl font-black mb-8 ${rubik.className}`}>
                <span className="bg-gradient-to-r from-green-400 via-blue-300 to-teal-400 bg-clip-text text-transparent">
                עקבו אחריי 
                </span>
              </h2>
            </div>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed "
          >
כדי לקבל עדכונים חמים, הצצה אל מאחורי הקלעים ותכנים בלעדיים. 🎶

</motion.p>
        </motion.div>

        {/* Social Links Grid - Tiles */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {links && links.length > 0 ? (
            links.map((link, index) => {
              const platformData = getPlatformData(link.platform);
              
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group relative"
                >
                  <motion.a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ 
                      scale: 1.05, 
                      y: -5,
                      transition: { type: "spring", stiffness: 300, damping: 20 }
                    }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative block bg-gradient-to-br from-slate-800/90 via-slate-900/90 to-black/90 rounded-2xl p-8 md:p-10 text-center transition-all duration-500 shadow-2xl hover:shadow-3xl ${platformData.borderColor} group-hover:${platformData.glowColor} overflow-hidden backdrop-blur-sm border-4`}
                    style={{
                      boxShadow: `0 8px 32px rgba(0, 0, 0, 0.3), 0 4px 16px ${platformData.glowColor.replace('/50', '/20')}`,
                    }}
                  >
                    {/* Subtle background pattern */}
                    <div className="absolute inset-0 opacity-5">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"
                      />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center justify-center h-full">
                      {/* Platform Icon */}
                      <div className="mb-4">
                        <div className="relative inline-block">
                          <div className="absolute inset-0 bg-white/10 rounded-full blur-lg"></div>
                          <div 
                            className="relative z-10 w-12 h-12 md:w-14 md:h-14 mx-auto flex items-center justify-center"
                            dangerouslySetInnerHTML={{ __html: platformData.icon }}
                          />
                        </div>
                      </div>
                      
                      {/* Platform Name */}
                      <h3 className="text-white font-bold text-lg md:text-xl capitalize mb-2">
                        {link.platform}
                      </h3>
                    </div>
                  </motion.a>
                </motion.div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-400 text-lg">אין קישורים זמינים כרגע</p>
            </div>
          )}
        </motion.div>

        {/* Premium Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <div className="relative">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-2xl"></div>
            
            <div className="relative bg-gradient-to-br from-slate-800/80 via-slate-900/80 to-black/80 rounded-3xl p-12 border border-blue-500/30 backdrop-blur-sm">
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="text-center"
              >
                <h3 className={`text-3xl md:text-5xl font-bold text-white mb-6 ${rubik.className}`}>
                  <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                    הישארו מעודכנים
                  </span>
                </h3>
                <p className="text-gray-300 mb-8 text-lg md:text-2xl max-w-2xl mx-auto">
                שירים חדשים, הופעות סודיות ותוכן שאי אפשר למצוא בשום מקום אחר – הכל מחכה לכם פה.

</p>
                
                <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="email"
                    placeholder="לכאן הולך האימייל שלכם"
                    className="flex-1 px-6 py-4 bg-white/10 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 backdrop-blur-sm"
                  />
                  <motion.button
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 10px 30px rgba(59, 130, 246, 0.4)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r text-lg md:text-xl from-blue-700 to-green-700 text-white font-semibold rounded-xl transition-all duration-300 hover:from-blue-700 hover:to-purple-700 shadow-lg"
                  >
                    הירשמו
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced floating elements */}
        <div className="relative">
          <motion.div
            animate={{ 
              y: [0, -20, 0], 
              rotate: [0, 10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute top-20 left-10 w-12 h-12 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-sm"
          />
          <motion.div
            animate={{ 
              y: [0, 15, 0], 
              rotate: [0, -15, 0],
              scale: [1, 0.8, 1]
            }}
            transition={{ duration: 8, repeat: Infinity, delay: 2 }}
            className="absolute top-40 right-20 w-8 h-8 bg-gradient-to-r from-pink-500/30 to-orange-500/30 rounded-full blur-sm"
          />
          <motion.div
            animate={{ 
              y: [0, -25, 0], 
              rotate: [0, 20, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 7, repeat: Infinity, delay: 4 }}
            className="absolute bottom-20 left-20 w-16 h-16 bg-gradient-to-r from-teal-500/30 to-cyan-500/30 rounded-full blur-sm"
          />
        </div>
      </div>
    </section>
  );
};

export default DJSocialSection; 
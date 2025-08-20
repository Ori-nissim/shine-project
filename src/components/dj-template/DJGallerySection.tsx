'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Rubik } from 'next/font/google';

const rubik = Rubik({ 
  subsets: ['hebrew'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-rubik'
});

interface MediaItem {
  type: string;
  url: string;
  title: string;
  description?: string;
  thumbnail?: string;
}

interface DJGallerySectionProps {
  title: string;
  description: string;
  media: MediaItem[];
}

const DJGallerySection: React.FC<DJGallerySectionProps> = ({
  title,
  description,
  media = []
}) => {
  // Split media into two rows
  const firstRow = media?.slice(0, Math.ceil((media?.length || 0) / 2)) || [];
  const secondRow = media?.slice(Math.ceil((media?.length || 0) / 2)) || [];

  // Create multiple duplicates for seamless infinite scroll
  const createInfiniteRow = (items: MediaItem[]) => {
    const duplicates: (MediaItem & { key: string })[] = [];
    // Add 4 sets of items to ensure no blank spaces
    for (let i = 0; i < 4; i++) {
      items.forEach((item, index) => {
        duplicates.push({
          ...item,
          key: `${i}-${index}`
        });
      });
    }
    return duplicates;
  };

  const infiniteFirstRow = createInfiniteRow(firstRow);
  const infiniteSecondRow = createInfiniteRow(secondRow);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <section id="gallery" className="py-20 bg-gradient-to-br from-black via-slate-900 to-blue-900" dir="ltr">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl md:text-5xl font-black mb-6 ${rubik.className}`}>
            <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              {title}
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {description}
          </p>
        </motion.div>

        {/* Gallery Rows */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8"
        >
          {/* First Row - Scroll Left */}
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-4 animate-scroll-left min-w-max">
              {infiniteFirstRow.map((item, index) => (
                <motion.div
                  key={`row1-${item.key}`}
                  variants={itemVariants}
                  transition={{ delay: index * 0.05 }}
                  className="flex-shrink-0 w-80 h-96"
                >
                  <div className="relative w-full h-full overflow-hidden rounded-lg border border-gray-600/30 bg-gradient-to-br from-blue-900/50 to-teal-900/50">
                    {item.type === 'video' ? (
                      <video
                        src={item.url}
                        poster={item.thumbnail}
                        className="w-full h-full object-cover"
                        muted
                        loop
                        playsInline
                      />
                    ) : (
                      <img
                        src={item.url}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                        {item.description && (
                          <p className="text-gray-300 text-sm">{item.description}</p>
                        )}
                      </div>
                    </div>

                    {/* Play Button for Videos */}
                    {item.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <i className="fas fa-play text-white text-xl ml-1"></i>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Second Row - Scroll Right */}
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-4 animate-scroll-right min-w-max">
              {infiniteSecondRow.map((item, index) => (
                <motion.div
                  key={`row2-${item.key}`}
                  variants={itemVariants}
                  transition={{ delay: index * 0.05 }}
                  className="flex-shrink-0 w-80 h-96"
                >
                  <div className="relative w-full h-full overflow-hidden rounded-lg border border-gray-600/30 bg-gradient-to-br from-blue-900/50 to-teal-900/50">
                    {item.type === 'video' ? (
                      <video
                        src={item.url}
                        poster={item.thumbnail}
                        className="w-full h-full object-cover"
                        muted
                        loop
                        playsInline
                      />
                    ) : (
                      <img
                        src={item.url}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                        {item.description && (
                          <p className="text-gray-300 text-sm">{item.description}</p>
                        )}
                      </div>
                    </div>

                    {/* Play Button for Videos */}
                    {item.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <i className="fas fa-play text-white text-xl ml-1"></i>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* No Media Message */}
        {media.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-gray-400 text-lg">
              <i className="fas fa-images text-4xl mb-4"></i>
              <p>אין תמונות או סרטונים זמינים כרגע</p>
              <p className="text-sm mt-2">בדוק שוב בקרוב או עקוב אחרי ברשתות החברתיות</p>
            </div>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-500 hover:to-teal-500 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            צפו בתמונות נוספות
          </motion.button>
        </motion.div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        
        .animate-scroll-left {
          animation: scroll-left 30s linear infinite;
        }
        
        .animate-scroll-right {
          animation: scroll-right 30s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default DJGallerySection;
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Rubik } from 'next/font/google';

const rubik = Rubik({ 
  subsets: ['hebrew'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-rubik'
});

interface Event {
  title: string;
  venue: string;
  city: string;
  date: string;
  time: string;
  ticketUrl?: string;
  image?: string;
  eventType?: 'club-night' | 'private-party' | 'wedding' | 'corporate' | 'festival' | 'special-event';
  capacity?: string;
  price?: string;
}

interface DJEventsSectionProps {
  title: string;
  description: string;
  events?: Event[];
}

const DJEventsSection: React.FC<DJEventsSectionProps> = ({
  title,
  description,
  events = []
}) => {
  // Ensure events is always an array
  const safeEvents = Array.isArray(events) ? events : [];

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
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleDateString('he-IL', { month: 'short' });
    const year = date.getFullYear();
    return { day, month, year };
  };

  const getEventTypeInfo = (type?: Event['eventType']) => {
    const types = {
      'club-night': { label: 'לילה במועדון', icon: '🎧', color: 'from-purple-600 to-pink-600' },
      'private-party': { label: 'מסיבה פרטית', icon: '🎉', color: 'from-blue-600 to-cyan-600' },
      'wedding': { label: 'חתונה', icon: '💒', color: 'from-pink-600 to-rose-600' },
      'corporate': { label: 'אירוע חברה', icon: '🏢', color: 'from-indigo-600 to-blue-600' },
      'festival': { label: 'פסטיבל', icon: '🎪', color: 'from-orange-600 to-yellow-600' },
      'special-event': { label: 'אירוע מיוחד', icon: '⭐', color: 'from-teal-600 to-emerald-600' }
    };
    
    // Return default if type is undefined or invalid
    if (!type || !types[type]) {
      return { label: 'אירוע', icon: '🎵', color: 'from-gray-600 to-slate-600' };
    }
    
    return types[type];
  };

  return (
    <section id="events" className="py-20 bg-gradient-to-br from-black via-slate-900 to-blue-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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

        {/* Events Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12"
        >
          {safeEvents.map((event, index) => {
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative"
              >
                {/* Event Card */}
                <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl border border-blue-500/20 overflow-hidden shadow-2xl hover:shadow-blue-500/20 transition-all duration-300">
                  {/* Event Image */}
                  <div className="h-48 bg-gradient-to-br from-blue-900/50 to-purple-900/50 flex items-center justify-center">
                    {event.image ? (
                      <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center text-gray-400">
                        <i className="fas fa-music text-6xl mb-2"></i>
                        <p className="text-sm">תמונה של האירוע</p>
                      </div>
                    )}
                  </div>

                  {/* Event Title */}
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-white text-center group-hover:text-blue-300 transition-colors">
                      {event.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* No Events Message */}
        {safeEvents.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-blue-500/20 p-12">
              <div className="text-gray-400 mb-6">
                <i className="fas fa-calendar-times text-6xl mb-4"></i>
                <h3 className="text-2xl font-bold text-white mb-2">אין אירועים קרובים</h3>
                <p className="text-lg">אני מתכנן אירועים חדשים בקרוב</p>
                <p className="text-sm mt-2 text-gray-500">צור קשר לבוקינג או עקוב אחרי העדכונים</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-900/50 to-teal-900/50 backdrop-blur-sm rounded-2xl border border-blue-500/20 p-8" dir="rtl">
            <h3 className="text-2xl font-bold text-white mb-4">רוצה שאנגן אצלכם באירוע?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto text-xl">
בואו נדבר וניצור את הווייב המושלם לאירוע שלכם            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-500 hover:to-teal-500 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                הזמן אותי לאירוע
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-blue-500/50 text-blue-400 hover:bg-blue-500/10 font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300"
              >
                צור קשר לייעוץ
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DJEventsSection;
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Rubik } from 'next/font/google';

const rubik = Rubik({ 
  subsets: ['hebrew'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-rubik'
});

interface DJAboutSectionProps {
  title: string;
  description: string;
  quote?: string;
  image?: string;
}

const DJAboutSection: React.FC<DJAboutSectionProps> = ({
  title,
  description,
  quote,
  image
}) => {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-slate-900 via-black to-blue-900" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
          
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="grid grid-cols-3 gap-6"
            >
              {[
                { number: '500+', label: 'הופעות' },
                { number: '50+', label: 'טראקים' },
                { number: '1M+', label: 'השמעות' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

        {/* Description */}
<div className="space-y-4 text-xl">
  <p className="text-gray-300 leading-relaxed">
    די ג'יי מקצועי עם ניסיון של מעל לעשור בתחום האירועים והמוזיקה. במהלך השנים הופעתי במגוון רחב של לוקיישנים – ממועדונים אינטימיים ועד לבמות גדולות בפסטיבלים ואירועים פרטיים בארץ ובחו"ל.
  </p>
  <p className="text-gray-300 leading-relaxed">
    כל הופעה היא הזדמנות ליצור אנרגיה ייחודית ולחבר בין אנשים דרך המוזיקה. אני שואף לקרוא את הקהל בזמן אמת ולבנות סט שמרגיש נכון, מפתיע ומרקיד – עם סאונד איכותי וסטייל אישי.
  </p>
</div>


            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="text-2xl font-bold text-white mb-4">הסגנונות שאני מנגן</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  'House Music',
                  'Techno',
                  'Progressive House',
                  'Deep House',
                  'Ableton Live',
                  'Logic Pro',
                  'Live Performance',
                  'Studio Production'
                ].map((skill, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center space-x-2 text-gray-300"
                  >
                    <i className=" text-blue-400 text-sm"></i>
                    <span className="text-md">{skill}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            {image ? (
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src={image}
                  alt="DJ "
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
            ) : (
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-blue-900 to-teal-900 h-96 flex items-center justify-center">
                <div className="text-center text-white">
                  <i className="fas fa-music text-6xl mb-4 text-blue-400"></i>
                  <p className="text-xl font-bold">DJ </p>
                  <p className="text-gray-300">מפיק מוזיקה אלקטרונית</p>
                </div>
              </div>
            )}
            
            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 rounded-full opacity-50"
            />
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-4 -left-4 w-6 h-6 bg-teal-500 rounded-full opacity-50"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DJAboutSection;
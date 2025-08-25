'use client';

import React from 'react';
import { Heart } from 'lucide-react';

interface DJFooterProps {
  className?: string;
}

const DJFooter: React.FC<DJFooterProps> = ({ className = '' }) => {
  return (
    <footer className={`bg-gradient-to-r from-gray-900 via-black to-gray-800 border-t border-gray-800 ${className}` }dir="ltr">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main footer content */}
        <div className="text-center space-y-8">
          {/* Shine platform branding */}
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-2 text-2xl font-bold text-white">
              <span className="bg-gradient-to-r from-orange-400 to-yellow-300 bg-clip-text text-transparent">
                Shine
              </span>
              <span className="text-white">Platform</span>
            </div>
            
            {/* Tagline with heart */}
            <div className="flex flex-wrap items-center justify-center gap-2 text-lg text-gray-300">
              <span>Designed and tailored for you with</span>
              <Heart className="w-5 h-5 text-red-500 fill-red-500" />
              <span>by Shine</span>
            </div>
            
            {/* Call to action */}
            <p className="text-gray-400 text-base max-w-md mx-auto">
              Let us know what you think! We'd love to hear your feedback and help you create something amazing.
            </p>
          </div>
          
          {/* Contact and social links */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm text-gray-400">
            <a 
              href="mailto:hello@shineplatform.com" 
              className="hover:text-white transition-colors duration-200"
            >
nissim9996@gmail.com            </a>
            <span className="hidden sm:inline text-gray-600">•</span>
            <a 
              href="https://shineplatform.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-200"
            >
              shineplatform.com
            </a>
          </div>
          
          {/* Copyright */}
          <div className="pt-6 border-t border-gray-800">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Shine Platform. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default DJFooter; 
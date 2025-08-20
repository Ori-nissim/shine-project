'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
// Removed unused imports
import { djSampleData } from '@/lib/template-defaults';

// Dynamically import the DJ template to avoid SSR issues
const DJTemplate = dynamic(() => import('@/templates/dj-template'), {
  loading: () => (
    <div className="misn-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center">
      <div className="text-center space-y-6">
        {/* Shine Platform Logo */}
        <div className="space-y-2" dir="ltr">
          <div className="flex items-center justify-center space-x-2 text-4xl font-bold">
            <span className="bg-gradient-to-r from-orange-400 to-yellow-300 bg-clip-text text-transparent">
              Shine
            </span>
            <span className="text-white">Platform</span>
          </div>
          <div className="w-16 h-1 bg-gradient-to-r from-orange-400 to-yellow-300 mx-auto rounded-full"></div>
        </div>
        
        {/* Loading message */}
        <div className="text-white text-xl">טוען את האתר  החדש שלך...</div>
        
        {/* Animated dots */}
        <div className="flex space-x-2 justify-center">
          <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-yellow-300 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
        
        {/* Tagline */}
        <div className="text-gray-400 text-sm max-w-md mx-auto">
          Crafting digital experiences with passion and precision
        </div>
      </div>
    </div>
  )
});

const DJDemoPage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center" dir="rtl">
        <div className="text-center space-y-6">
          {/* Shine Platform Logo */}
          <div className="space-y-2">
            <div className="flex items-center justify-center space-x-2 text-4xl font-bold">
              <span className="bg-gradient-to-r from-orange-400 to-yellow-300 bg-clip-text text-transparent">
                Shine
              </span>
              <span className="text-white">Platform</span>
            </div>
            <div className="w-16 h-1 bg-gradient-to-r from-orange-400 to-yellow-300 mx-auto rounded-full"></div>
          </div>
          
          {/* Loading message */}
          <div className="text-white text-xl">טוען...</div>
          
          {/* Animated dots */}
          <div className="flex space-x-2 justify-center">
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-yellow-300 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
          
          {/* Tagline */}
          <div className="text-gray-400 text-sm max-w-md mx-auto">
            יוצרים חוויות דיגיטליות עם תשוקה ודייקנות
          </div>
        </div>
      </div>
    }>
      <div dir="rtl">
      <DJTemplate 
        data={djSampleData} 
        whatsappNumber="972 55 5555555"
      />
      </div>
    </Suspense>
  );
};

export default DJDemoPage; 
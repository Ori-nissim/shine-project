'use client';

import { useLanguage } from '@/lib/language-context';
import { Button } from './button';

export const LanguageToggle = () => {
  const { language, setLanguage, isRTL } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'he' : 'en');
  };

  return (
    <Button
      onClick={toggleLanguage}
      variant="ghost"
      size="sm"
      className="relative overflow-hidden bg-gradient-to-r from-gray-800/50 to-gray-900/50 hover:from-gray-700/50 hover:to-gray-800/50 border border-gray-600/30 hover:border-gray-500/50 text-white px-4 py-2 rounded-xl backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg"
    >
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">
          {language === 'en' ? '🇮🇱 עברית' : '🇺🇸 English'}
        </span>
      </div>
    </Button>
  );
}; 
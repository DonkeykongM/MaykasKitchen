import React from 'react';
import { Globe } from 'lucide-react';
import { useTranslation, Language } from '../lib/i18n';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useTranslation();

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    // Announce language change to screen readers
    const announcement = newLang === 'en' ? 'Language changed to English' : 'Språk ändrat till svenska';
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    announcer.textContent = announcement;
    document.body.appendChild(announcer);
    setTimeout(() => document.body.removeChild(announcer), 1000);
  };

  return (
    <div className="relative inline-flex items-center">
      <Globe size={16} className="text-gray-600 mr-2" aria-hidden="true" />
      <div className="flex bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <button
          onClick={() => handleLanguageChange('sv')}
          className={`px-3 py-2 text-sm font-medium transition-all min-h-[40px] min-w-[44px] ${
            language === 'sv'
              ? 'bg-purple-600 text-white'
              : 'text-gray-600 hover:bg-gray-50 hover:text-purple-600'
          }`}
          aria-pressed={language === 'sv'}
          aria-label="Switch to Swedish"
        >
          SV
        </button>
        <button
          onClick={() => handleLanguageChange('en')}
          className={`px-3 py-2 text-sm font-medium transition-all min-h-[40px] min-w-[44px] ${
            language === 'en'
              ? 'bg-purple-600 text-white'
              : 'text-gray-600 hover:bg-gray-50 hover:text-purple-600'
          }`}
          aria-pressed={language === 'en'}
          aria-label="Switch to English"
        >
          EN
        </button>
      </div>
    </div>
  );
};
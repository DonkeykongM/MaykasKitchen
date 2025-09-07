import React, { useState } from 'react';
import { Instagram, BookText as TikTok, Youtube, Facebook, Mail, MapPin, Heart, ChefHat, Twitter } from 'lucide-react';
import { useTranslation } from '../lib/i18n';

export const Footer = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [submitStatus, setSubmitStatus] = useState<null | 'submitting' | 'success' | 'error'>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@') || !email.includes('.')) {
      setSubmitStatus('error');
      setErrorMessage(t.newsletter.validEmail);
      return;
    }
    
    setSubmitStatus('submitting');
    
    try {
      const response = await fetch('https://hook.eu2.make.com/sfjfkezizhjh4x7r1rrjmjwyei2sufj2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          type: 'newsletter',
          email,
          source: 'footer'
        })
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setSubmitStatus('success');
      setEmail('');
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(t.newsletter.errorMessage);
      console.error("Error submitting form:", error);
    }
  };

  // Optimerad navigation med korrekt funktionalitet
  const handleNavigation = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="pt-8 md:pt-12 pb-4 md:pb-6 relative text-white"
      style={{
        background: 'linear-gradient(135deg, #800080 0%, #4B0082 25%, #2E0054 50%, #1A001A 75%, #000000 100%)'
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between mb-6 md:mb-10">
          <div className="mb-6 md:mb-0 md:w-1/3">
            <div className="flex items-center mb-3 md:mb-4">
              <div className="bg-purple-600/30 p-2 rounded-full mr-2">
                <ChefHat size={24} className="text-purple-300" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-purple-300 font-serif">MaykasKitchen</h3>
            </div>
            <p className="max-w-xs mb-3 md:mb-4 text-gray-300 leading-relaxed text-sm md:text-base">{t.footer.description}</p>
            
            <div className="flex space-x-3 md:space-x-4 mb-4 md:mb-6">
              <a 
                href="https://www.instagram.com/maykaskitchen/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-purple-300 transition-colors transform hover:scale-110 min-h-[44px] min-w-[44px] flex items-center justify-center" 
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://www.tiktok.com/@Maykaskitchen" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-purple-300 transition-colors transform hover:scale-110 min-h-[44px] min-w-[44px] flex items-center justify-center" 
                aria-label="TikTok"
              >
                <TikTok size={20} />
              </a>
              <a 
                href="https://www.youtube.com/@Maykaskitchen" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-purple-300 transition-colors transform hover:scale-110 min-h-[44px] min-w-[44px] flex items-center justify-center" 
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
              <a 
                href="https://www.facebook.com/maykaskitchen/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-purple-300 transition-colors transform hover:scale-110 min-h-[44px] min-w-[44px] flex items-center justify-center" 
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
            </div>
            
            <div className="flex flex-col space-y-2">
              <div className="flex items-center text-gray-300 text-sm group">
                <Mail size={14} className="mr-2 group-hover:text-purple-300 transition-colors" />
                <a 
                  href="mailto:info@maykaskitchen.se" 
                  className="hover:text-purple-300 transition-colors"
                >
                  info@maykaskitchen.se
                </a>
              </div>
              <div className="flex items-center text-gray-300 text-sm group">
                <MapPin size={14} className="mr-2 group-hover:text-purple-300 transition-colors" />
                <span>Skåne, {t.common.sweden}</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 md:w-2/3">
            <div>
              <h4 className="font-semibold mb-3 md:mb-4 text-purple-300 text-base md:text-lg border-b border-purple-500 pb-2">{t.footer.explore}</h4>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => handleNavigation('recept')}
                    className="text-gray-300 hover:text-white transition-colors flex items-center group text-sm md:text-base min-h-[44px]" 
                  >
                    <span className="w-1.5 h-1.5 bg-purple-300 rounded-full mr-2 inline-block transform transition-transform group-hover:scale-125"></span> 
                    {t.footer.recipes}
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => window.location.hash = 'recept/alla'}
                    className="text-gray-300 hover:text-white transition-colors flex items-center group text-sm md:text-base min-h-[44px]"
                  >
                    <span className="w-1.5 h-1.5 bg-purple-300 rounded-full mr-2 inline-block transform transition-transform group-hover:scale-125"></span> 
                    {t.footer.allRecipes}
                  </button>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 md:mb-4 text-purple-300 text-base md:text-lg border-b border-purple-500 pb-2">{t.footer.about}</h4>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => handleNavigation('om-mig')}
                    className="text-gray-300 hover:text-white transition-colors flex items-center group text-sm md:text-base min-h-[44px]"
                  >
                    <span className="w-1.5 h-1.5 bg-purple-300 rounded-full mr-2 inline-block transform transition-transform group-hover:scale-125"></span> 
                    {t.footer.about}
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavigation('samarbeten')}
                    className="text-gray-300 hover:text-white transition-colors flex items-center group text-sm md:text-base min-h-[44px]"
                  >
                    <span className="w-1.5 h-1.5 bg-purple-300 rounded-full mr-2 inline-block transform transition-transform group-hover:scale-125"></span> 
                    {t.footer.collaborations}
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavigation('kontakt')}
                    className="text-gray-300 hover:text-white transition-colors flex items-center group text-sm md:text-base min-h-[44px]"
                  >
                    <span className="w-1.5 h-1.5 bg-purple-300 rounded-full mr-2 inline-block transform transition-transform group-hover:scale-125"></span> 
                    {t.footer.contact}
                  </button>
                </li>
              </ul>
            </div>
            
            <div className="col-span-2 md:col-span-1">
              <h4 className="font-semibold mb-3 md:mb-4 text-purple-300 text-base md:text-lg border-b border-purple-500 pb-2">{t.footer.newsletter}</h4>
              <p className="text-purple-100 text-xs md:text-sm mb-3">{t.footer.newsletterDesc}</p>
              
              {submitStatus === 'success' ? (
                <div className="bg-green-500/20 p-3 rounded-lg text-white text-center">
                  <p className="font-medium text-sm">{t.newsletter.subscribed}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row mb-3 md:mb-4">
                  <input 
                    type="email" 
                    placeholder={t.footer.emailPlaceholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full sm:w-auto flex-1 bg-purple-700 border-0 rounded-lg sm:rounded-r-none p-2 md:p-3 text-xs md:text-sm text-white focus:outline-none focus:ring-1 focus:ring-purple-300 placeholder-purple-200 mb-2 sm:mb-0 min-h-[44px] max-w-full box-border"
                    aria-label="Din e-postadress för nyhetsbrev"
                  />
                  <button 
                    type="submit"
                    className="bg-black text-white text-xs md:text-sm py-2 md:py-3 px-3 rounded-lg sm:rounded-l-none hover:bg-gray-800 transition-colors min-h-[44px] max-w-full"
                    aria-label={t.newsletter.subscribe}
                    disabled={submitStatus === 'submitting'}
                  >
                    {submitStatus === 'submitting' ? (
                      <svg className="animate-spin h-4 w-4 text-white mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <Mail size={14} />
                    )}
                  </button>
                </form>
              )}
              
              {submitStatus === 'error' && (
                <p className="text-xs text-red-200 mb-2">{errorMessage}</p>
              )}
              
              <div className="grid grid-cols-2 gap-2 md:gap-3 text-xs">
                <div className="flex items-center text-gray-300">
                  <span className="w-1.5 h-1.5 bg-purple-300 rounded-full mr-1"></span>
                  {t.footer.benefits.newRecipes}
                </div>
                <div className="flex items-center text-gray-300">
                  <span className="w-1.5 h-1.5 bg-purple-300 rounded-full mr-1"></span>
                  {t.footer.benefits.exclusiveRecipes}
                </div>
                <div className="flex items-center text-gray-300">
                  <span className="w-1.5 h-1.5 bg-purple-300 rounded-full mr-1"></span>
                  {t.footer.benefits.seasonalTips}
                </div>
                <div className="flex items-center text-gray-300">
                  <span className="w-1.5 h-1.5 bg-purple-300 rounded-full mr-1"></span>
                  {t.footer.benefits.techniques}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-purple-500 mt-6 md:mt-8 pt-4 md:pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-xs md:text-sm mb-4 md:mb-0 text-center md:text-left">
            &copy; {currentYear} MaykasKitchen. {t.footer.copyright}
          </p>
          <div className="flex items-center text-gray-300 text-xs md:text-sm">
            <span>{t.footer.madeWith}</span>
            <Heart size={12} className="mx-1 text-purple-300 animate-pulse" />
            <span>{t.footer.in}</span>
          </div>
        </div>
        <div className="border-t border-purple-500/30 mt-4 pt-4 text-center">
          <p className="text-gray-400 text-xs">
            {t.footer.createdBy}{' '}
            <a 
              href="https://bahkostudio.se" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-purple-300 hover:text-white transition-colors underline hover:no-underline"
            >
              BahkoStudio.se
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
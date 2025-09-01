import React, { useState } from 'react';
import { Instagram, BookText as TikTok, Youtube, Facebook, Mail, MapPin, Heart, ChefHat, Twitter } from 'lucide-react';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@') || !email.includes('.')) {
      setSubmitStatus('error');
      setErrorMessage('Vänligen ange en giltig e-postadress.');
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
      setErrorMessage('Något gick fel. Försök igen senare.');
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
      className="pt-16 md:pt-20 pb-8 md:pb-12 relative text-white"
      style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #533483 75%, #800080 100%)'
      }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand section */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl mr-3 shadow-lg">
                <ChefHat size={28} className="text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white font-serif">MaykasKitchen</h3>
            </div>
            <p className="mb-6 text-white/80 leading-relaxed text-base">
              Mat från hjärtat & själen. Assyriska/syrianska rötter, tacksam för min familj & kokar alltid med kärlek!
            </p>
            
            <div className="flex space-x-4 mb-8">
              <a 
                href="https://www.instagram.com/maykaskitchen/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-white/15 backdrop-blur-md text-white hover:bg-white/25 p-3 rounded-2xl transition-all hover-scale shadow-lg border border-white/20 min-h-[48px] min-w-[48px] flex items-center justify-center" 
                aria-label="Instagram"
              >
                <Instagram size={22} />
              </a>
              <a 
                href="https://www.tiktok.com/@Maykaskitchen" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-white/15 backdrop-blur-md text-white hover:bg-white/25 p-3 rounded-2xl transition-all hover-scale shadow-lg border border-white/20 min-h-[48px] min-w-[48px] flex items-center justify-center" 
                aria-label="TikTok"
              >
                <TikTok size={22} />
              </a>
              <a 
                href="https://www.youtube.com/@Maykaskitchen" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-white/15 backdrop-blur-md text-white hover:bg-white/25 p-3 rounded-2xl transition-all hover-scale shadow-lg border border-white/20 min-h-[48px] min-w-[48px] flex items-center justify-center" 
                aria-label="YouTube"
              >
                <Youtube size={22} />
              </a>
              <a 
                href="https://www.facebook.com/maykaskitchen/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-white/15 backdrop-blur-md text-white hover:bg-white/25 p-3 rounded-2xl transition-all hover-scale shadow-lg border border-white/20 min-h-[48px] min-w-[48px] flex items-center justify-center" 
                aria-label="Facebook"
              >
                <Facebook size={22} />
              </a>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center text-white/80 group">
                <Mail size={16} className="mr-3 group-hover:text-white transition-colors" />
                <a 
                  href="mailto:info@maykaskitchen.se" 
                  className="hover:text-white transition-colors font-medium"
                >
                  info@maykaskitchen.se
                </a>
              </div>
              <div className="flex items-center text-white/80 group">
                <MapPin size={16} className="mr-3 group-hover:text-white transition-colors" />
                <span className="font-medium">Skåne, Sverige</span>
              </div>
            </div>
          </div>
          
          {/* Navigation sections */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h4 className="font-bold mb-6 text-white text-lg">Utforska</h4>
              <ul className="space-y-4">
                <li>
                  <button 
                    onClick={() => handleNavigation('recept')}
                    className="text-white/70 hover:text-white transition-all flex items-center group text-base font-medium min-h-[44px] hover:translate-x-2" 
                  >
                    <span className="w-2 h-2 bg-white/60 rounded-full mr-3 inline-block transform transition-all group-hover:scale-125 group-hover:bg-white"></span> 
                    Recept
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => window.location.hash = 'recept/alla'}
                    className="text-white/70 hover:text-white transition-all flex items-center group text-base font-medium min-h-[44px] hover:translate-x-2"
                  >
                    <span className="w-2 h-2 bg-white/60 rounded-full mr-3 inline-block transform transition-all group-hover:scale-125 group-hover:bg-white"></span> 
                    Alla recept
                  </button>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-white text-lg">Om</h4>
              <ul className="space-y-4">
                <li>
                  <button 
                    onClick={() => handleNavigation('om-mig')}
                    className="text-white/70 hover:text-white transition-all flex items-center group text-base font-medium min-h-[44px] hover:translate-x-2"
                  >
                    <span className="w-2 h-2 bg-white/60 rounded-full mr-3 inline-block transform transition-all group-hover:scale-125 group-hover:bg-white"></span> 
                    Om mig
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavigation('samarbeten')}
                    className="text-white/70 hover:text-white transition-all flex items-center group text-base font-medium min-h-[44px] hover:translate-x-2"
                  >
                    <span className="w-2 h-2 bg-white/60 rounded-full mr-3 inline-block transform transition-all group-hover:scale-125 group-hover:bg-white"></span> 
                    Samarbeten
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavigation('kontakt')}
                    className="text-white/70 hover:text-white transition-all flex items-center group text-base font-medium min-h-[44px] hover:translate-x-2"
                  >
                    <span className="w-2 h-2 bg-white/60 rounded-full mr-3 inline-block transform transition-all group-hover:scale-125 group-hover:bg-white"></span> 
                    Kontakt
                  </button>
                </li>
              </ul>
            </div>
            
            {/* Newsletter section */}
            <div>
              <h4 className="font-bold mb-6 text-white text-lg">Nyhetsbrev</h4>
              <p className="text-white/80 text-sm mb-4 font-medium">Få nya recept och matinspiration direkt i din inkorg!</p>
              
              {submitStatus === 'success' ? (
                <div className="success-message text-center p-4 rounded-xl">
                  <p className="font-semibold">Tack för din prenumeration!</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mb-6">
                  <input 
                    type="email" 
                    placeholder="Din e-post" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/15 backdrop-blur-md border border-white/30 rounded-xl p-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-white/60 mb-3 min-h-[48px] font-medium"
                    aria-label="Din e-postadress för nyhetsbrev"
                  />
                  <button 
                    type="submit"
                    className="w-full bg-white text-purple-600 text-sm py-3 px-4 rounded-xl hover:bg-gray-50 transition-all min-h-[48px] font-bold hover-lift shadow-lg"
                    aria-label="Prenumerera på nyhetsbrev"
                    disabled={submitStatus === 'submitting'}
                  >
                    {submitStatus === 'submitting' ? (
                      <svg className="animate-spin h-5 w-5 text-purple-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      'Prenumerera'
                    )}
                  </button>
                </form>
              )}
              
              {submitStatus === 'error' && (
                <p className="error-message mb-4">{errorMessage}</p>
              )}
              
              <div className="grid grid-cols-1 gap-3 text-xs">
                <div className="flex items-center text-white/70">
                  <span className="w-2 h-2 bg-white/60 rounded-full mr-2"></span>
                  Nya recept varje månad
                </div>
                <div className="flex items-center text-white/70">
                  <span className="w-2 h-2 bg-white/60 rounded-full mr-2"></span>
                  Exklusiva recept
                </div>
                <div className="flex items-center text-white/70">
                  <span className="w-2 h-2 bg-white/60 rounded-full mr-2"></span>
                  Säsongsbaserade tips
                </div>
                <div className="flex items-center text-white/70">
                  <span className="w-2 h-2 bg-white/60 rounded-full mr-2"></span>
                  Matlagningstekniker
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/70 text-sm mb-4 md:mb-0 text-center md:text-left font-medium">
            &copy; {currentYear} MaykasKitchen. Alla rättigheter förbehållna.
          </p>
          <div className="flex items-center text-white/70 text-sm font-medium">
            <span>Skapad med</span>
            <Heart size={14} className="mx-2 text-pink-300 animate-gentle-pulse" fill="currentColor" />
            <span>i Skåne, Sverige</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
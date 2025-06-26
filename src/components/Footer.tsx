import React, { useState } from 'react';
import { Instagram, BookText as TikTok, Youtube, Facebook, Mail, MapPin, ArrowUp, Heart, ChefHat } from 'lucide-react';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [email, setEmail] = useState('');
  const [submitStatus, setSubmitStatus] = useState<null | 'submitting' | 'success' | 'error'>(null);
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'footer' })
      });
      
      if (!response.ok) throw new Error('Network response was not ok');
      setSubmitStatus('success');
      setEmail('');
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Något gick fel. Försök igen senare.');
      console.error("Error submitting form:", error);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white pt-12 pb-6 relative">
      <div className="container mx-auto px-4">
        <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
          <button 
            onClick={scrollToTop}
            className="bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400 relative overflow-hidden group"
            aria-label="Skrolla till toppen"
          >
            <ArrowUp size={20} />
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between mb-10">
          <div className="mb-8 md:mb-0 md:w-1/3">
            <div className="flex items-center mb-4">
              <div className="bg-purple-600/30 p-2 rounded-full mr-2">
                <ChefHat size={28} className="text-purple-300" />
              </div>
              <h3 className="text-2xl font-bold text-purple-300">MaykasKitchen</h3>
            </div>
            <p className="max-w-xs mb-4 text-gray-300">Mat från hjärtat & tro i själen. Assyriska/Syrianska rötter, tacksam för min familj & kokar alltid med kärlek!</p>
            
            <div className="flex space-x-4 mb-6">
              <a href="https://www.instagram.com/maykaskitchen/" target="_blank" rel="noopener noreferrer" 
                className="text-gray-300 hover:text-purple-300 transition-colors transform hover:scale-110" aria-label="Instagram">
                <Instagram size={22} />
              </a>
              <a href="https://www.tiktok.com/@Maykaskitchen" target="_blank" rel="noopener noreferrer" 
                className="text-gray-300 hover:text-purple-300 transition-colors transform hover:scale-110" aria-label="TikTok">
                <TikTok size={22} />
              </a>
              <a href="https://www.youtube.com/@Maykaskitchen" target="_blank" rel="noopener noreferrer" 
                className="text-gray-300 hover:text-purple-300 transition-colors transform hover:scale-110" aria-label="YouTube">
                <Youtube size={22} />
              </a>
              <a href="https://www.facebook.com/maykaskitchen/" target="_blank" rel="noopener noreferrer" 
                className="text-gray-300 hover:text-purple-300 transition-colors transform hover:scale-110" aria-label="Facebook">
                <Facebook size={22} />
              </a>
            </div>
            
            <div className="flex flex-col space-y-2">
              <div className="flex items-center text-gray-300 text-sm group">
                <Mail size={14} className="mr-2 group-hover:text-purple-300 transition-colors" />
                <a href="mailto:info@maykaskitchen.se" className="hover:text-purple-300 transition-colors">
                  info@maykaskitchen.se
                </a>
              </div>
              <div className="flex items-center text-gray-300 text-sm">
                <MapPin size={14} className="mr-2" />
                <span>Skåne, Sverige</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:w-2/3">
            <div>
              <h4 className="font-semibold mb-4 text-purple-300 text-lg border-b border-purple-500 pb-2">Utforska</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#recept" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                    <span className="w-1.5 h-1.5 bg-purple-300 rounded-full mr-2 transform transition-transform group-hover:scale-125"></span> 
                    Recept
                  </a>
                </li>
                <li>
                  <a href="#animated-background" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                    <span className="w-1.5 h-1.5 bg-purple-300 rounded-full mr-2 transform transition-transform group-hover:scale-125"></span> 
                    Animerad bakgrund
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-purple-300 text-lg border-b border-purple-500 pb-2">Om</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#om-mig" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                    <span className="w-1.5 h-1.5 bg-purple-300 rounded-full mr-2 transform transition-transform group-hover:scale-125"></span> 
                    Om mig
                  </a>
                </li>
                <li>
                  <a href="#samarbeten" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                    <span className="w-1.5 h-1.5 bg-purple-300 rounded-full mr-2 transform transition-transform group-hover:scale-125"></span> 
                    Samarbeten
                  </a>
                </li>
                <li>
                  <a href="#kontakt" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                    <span className="w-1.5 h-1.5 bg-purple-300 rounded-full mr-2 transform transition-transform group-hover:scale-125"></span> 
                    Kontakt
                  </a>
                </li>
              </ul>
            </div>
            
            <div className="col-span-2 md:col-span-1">
              <h4 className="font-semibold mb-4 text-purple-300 text-lg border-b border-purple-500 pb-2">Nyhetsbrev</h4>
              <div className="bg-purple-600 p-4 rounded-lg transform transition-all hover:scale-102">
                <h5 className="font-medium text-white mb-2">Få nya recept varje vecka!</h5>
                <p className="text-purple-100 text-sm mb-3">Prenumerera på vårt nyhetsbrev och få de senaste recepten direkt i din inkorg.</p>
                
                {submitStatus === 'success' ? (
                  <div className="bg-green-500/20 p-3 rounded-lg text-white text-center">
                    <p className="font-medium">Tack för din prenumeration!</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex">
                    <input 
                      type="email" 
                      placeholder="Din e-post" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-purple-700 border-0 rounded-l-lg p-2 text-sm text-white focus:outline-none placeholder-purple-200"
                    />
                    <button 
                      type="submit"
                      className="bg-black text-white text-sm py-2 px-3 rounded-r-lg hover:bg-gray-800 transition-colors"
                      disabled={submitStatus === 'submitting'}
                    >
                      {submitStatus === 'submitting' ? (
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        <Mail size={16} />
                      )}
                    </button>
                  </form>
                )}
                
                {submitStatus === 'error' && (
                  <p className="text-xs text-red-200 mt-2">{errorMessage}</p>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-purple-500 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm mb-4 md:mb-0">
            &copy; {currentYear} MaykasKitchen. Alla rättigheter förbehållna.
          </p>
          <div className="flex items-center text-gray-300 text-sm">
            <span>Skapad med</span>
            <Heart size={14} className="mx-1 text-purple-300" />
            <span>i Skåne, Sverige</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
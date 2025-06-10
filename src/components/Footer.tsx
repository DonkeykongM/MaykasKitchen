import React, { useState } from 'react';
import { Instagram, BookText as TikTok, Youtube, Facebook, Mail, MapPin, ArrowUp, Heart, ChefHat, Twitter, Linkedin } from 'lucide-react';
import { supabase } from '../lib/supabase';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const [email, setEmail] = useState('');
  const [submitStatus, setSubmitStatus] = useState<null | 'submitting' | 'success' | 'error'>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple email validation
    if (!email || !email.includes('@') || !email.includes('.')) {
      setSubmitStatus('error');
      setErrorMessage('Vänligen ange en giltig e-postadress.');
      return;
    }
    
    // Submit form
    setSubmitStatus('submitting');
    
    try {
      // Send directly to Make webhook
      const response = await fetch('https://hook.eu2.make.com/sfjfkezizhjh4x7r1rrjmjwyei2sufj2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
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

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-accent-color text-white pt-12 pb-6 relative">
      {/* Wave divider for visual interest */}
      <div className="absolute top-0 left-0 right-0 h-12 overflow-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute bottom-0 w-full h-12 text-beige-50 fill-current">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" />
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" />
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" />
        </svg>
      </div>
    
      <div className="container mx-auto px-4">
        {/* Scroll to top button with enhanced animation */}
        <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
          <button 
            onClick={scrollToTop}
            className="bg-primary-color text-white p-3 rounded-full shadow-lg hover:bg-secondary-color transition-colors focus:outline-none focus:ring-2 focus:ring-secondary-color focus:ring-offset-2 focus:ring-offset-accent-color relative overflow-hidden group"
            aria-label="Skrolla till toppen"
          >
            <span className="absolute inset-0 bg-white/20 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
            <ArrowUp size={20} className="relative z-10" />
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between mb-10">
          {/* Brand section */}
          <div className="mb-8 md:mb-0 md:w-1/3">
            <div className="flex items-center mb-4">
              <div className="bg-accent-color/30 p-2 rounded-full mr-2">
                <ChefHat size={28} className="text-secondary-color" />
              </div>
              <h3 className="text-2xl font-bold text-secondary-color">MaykasKitchen</h3>
            </div>
            <p className="max-w-xs mb-4 text-gray-300">Mat från hjärtat & tro i själen. Assyriska/Syrianska rötter, tacksam för min familj & kokar alltid med kärlek!</p>
            
            {/* Enhanced social media links with hover effects */}
            <div className="flex space-x-4 mb-6">
              <a 
                href="https://www.instagram.com/maykaskitchen/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-secondary-color transition-colors transform hover:scale-110" 
                aria-label="Instagram"
              >
                <Instagram size={22} />
              </a>
              <a 
                href="https://www.tiktok.com/@Maykaskitchen" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-secondary-color transition-colors transform hover:scale-110" 
                aria-label="TikTok"
              >
                <TikTok size={22} />
              </a>
              <a 
                href="https://www.youtube.com/@Maykaskitchen" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-secondary-color transition-colors transform hover:scale-110" 
                aria-label="YouTube"
              >
                <Youtube size={22} />
              </a>
              <a 
                href="https://www.facebook.com/maykaskitchen/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-secondary-color transition-colors transform hover:scale-110" 
                aria-label="Facebook"
              >
                <Facebook size={22} />
              </a>
              <a 
                href="https://twitter.com/maykaskitchen" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-secondary-color transition-colors transform hover:scale-110" 
                aria-label="Twitter"
              >
                <Twitter size={22} />
              </a>
            </div>
            
            {/* Contact information */}
            <div className="flex flex-col space-y-2">
              <div className="flex items-center text-gray-300 text-sm group">
                <Mail size={14} className="mr-2 group-hover:text-secondary-color transition-colors" />
                <a 
                  href="mailto:info@maykaskitchen.se" 
                  className="hover:text-secondary-color transition-colors"
                >
                  info@maykaskitchen.se
                </a>
              </div>
              <div className="flex items-center text-gray-300 text-sm group">
                <MapPin size={14} className="mr-2 group-hover:text-secondary-color transition-colors" />
                <span>Skåne, Sverige</span>
              </div>
            </div>
          </div>
          
          {/* Footer navigation links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:w-2/3">
            <div>
              <h4 className="font-semibold mb-4 text-secondary-color text-lg border-b border-blue-400 pb-2">Utforska</h4>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="#recept" 
                    className="text-gray-300 hover:text-white transition-colors flex items-center group" 
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('recept')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <span className="w-1.5 h-1.5 bg-secondary-color rounded-full mr-2 inline-block transform transition-transform group-hover:scale-125"></span> 
                    Recept
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                    <span className="w-1.5 h-1.5 bg-secondary-color rounded-full mr-2 inline-block transform transition-transform group-hover:scale-125"></span> 
                    Påskfastan
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                    <span className="w-1.5 h-1.5 bg-secondary-color rounded-full mr-2 inline-block transform transition-transform group-hover:scale-125"></span> 
                    Mellanöstern
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                    <span className="w-1.5 h-1.5 bg-secondary-color rounded-full mr-2 inline-block transform transition-transform group-hover:scale-125"></span> 
                    Säsongsmat
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                    <span className="w-1.5 h-1.5 bg-secondary-color rounded-full mr-2 inline-block transform transition-transform group-hover:scale-125"></span> 
                    Alla kategorier
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-secondary-color text-lg border-b border-blue-400 pb-2">Om</h4>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="#om-mig" 
                    className="text-gray-300 hover:text-white transition-colors flex items-center group"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('om-mig')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <span className="w-1.5 h-1.5 bg-secondary-color rounded-full mr-2 inline-block transform transition-transform group-hover:scale-125"></span> 
                    Om mig
                  </a>
                </li>
                <li>
                  <a 
                    href="#samarbeten" 
                    className="text-gray-300 hover:text-white transition-colors flex items-center group"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('samarbeten')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <span className="w-1.5 h-1.5 bg-secondary-color rounded-full mr-2 inline-block transform transition-transform group-hover:scale-125"></span> 
                    Samarbeten
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                    <span className="w-1.5 h-1.5 bg-secondary-color rounded-full mr-2 inline-block transform transition-transform group-hover:scale-125"></span> 
                    Min matfilosofi
                  </a>
                </li>
                <li>
                  <a 
                    href="#kontakt" 
                    className="text-gray-300 hover:text-white transition-colors flex items-center group"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <span className="w-1.5 h-1.5 bg-secondary-color rounded-full mr-2 inline-block transform transition-transform group-hover:scale-125"></span> 
                    Kontakt
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                    <span className="w-1.5 h-1.5 bg-secondary-color rounded-full mr-2 inline-block transform transition-transform group-hover:scale-125"></span> 
                    Mediaprofil
                  </a>
                </li>
              </ul>
            </div>
            
            <div className="col-span-2 md:col-span-1">
              <h4 className="font-semibold mb-4 text-secondary-color text-lg border-b border-blue-400 pb-2">Juridisk info</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                    <span className="w-1.5 h-1.5 bg-secondary-color rounded-full mr-2 inline-block transform transition-transform group-hover:scale-125"></span> 
                    Integritetspolicy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                    <span className="w-1.5 h-1.5 bg-secondary-color rounded-full mr-2 inline-block transform transition-transform group-hover:scale-125"></span> 
                    Cookiepolicy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                    <span className="w-1.5 h-1.5 bg-secondary-color rounded-full mr-2 inline-block transform transition-transform group-hover:scale-125"></span> 
                    Användarvillkor
                  </a>
                </li>
              </ul>
              
              {/* Enhanced newsletter signup */}
              <div className="mt-6 bg-blue-400 p-4 rounded-lg transform transition-all hover:scale-102 hover:shadow-md">
                <h5 className="font-medium text-white mb-2">Nyhetsbrev</h5>
                <p className="text-gray-100 text-sm mb-3">Få nya recept och matinspiration direkt i din inkorg!</p>
                
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
                      className="w-full bg-blue-600 border-0 rounded-l-lg p-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-secondary-color"
                      aria-label="Din e-postadress för nyhetsbrev"
                    />
                    <button 
                      type="submit"
                      className="bg-primary-color text-white text-sm py-2 px-3 rounded-r-lg hover:bg-secondary-color transition-colors"
                      aria-label="Prenumerera på nyhetsbrev"
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
        
        {/* Footer bottom section */}
        <div className="border-t border-blue-400 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm mb-4 md:mb-0">
            &copy; {currentYear} MaykasKitchen. Alla rättigheter förbehållna.
          </p>
          <div className="flex items-center text-gray-300 text-sm">
            <span>Skapad med</span>
            <Heart size={14} className="mx-1 text-secondary-color animate-pulse" />
            <span>i Skåne, Sverige</span>
          </div>
        </div>
      </div>
      
      {/* Structured data for SEO - hidden from view */}
      <div className="hidden" itemScope itemType="https://schema.org/Organization">
        <meta itemProp="name" content="MaykasKitchen" />
        <meta itemProp="url" content="https://maykaskitchen.se" />
        <meta itemProp="logo" content="https://maykaskitchen.se/logo.png" />
        <meta itemProp="description" content="MaykasKitchen - Autentisk assyrisk/syriansk matlagning med Mayka Gulo. Recept, inspiration och matglädje för hela familjen." />
        <div itemProp="founder" itemScope itemType="https://schema.org/Person">
          <meta itemProp="name" content="Mayka Gulo" />
        </div>
        <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
          <meta itemProp="addressRegion" content="Skåne" />
          <meta itemProp="addressCountry" content="Sweden" />
        </div>
        <meta itemProp="sameAs" content="https://www.instagram.com/maykaskitchen/" />
        <meta itemProp="sameAs" content="https://www.tiktok.com/@Maykaskitchen" />
        <meta itemProp="sameAs" content="https://www.youtube.com/@Maykaskitchen" />
        <meta itemProp="sameAs" content="https://www.facebook.com/maykaskitchen/" />
      </div>
    </footer>
  );
};
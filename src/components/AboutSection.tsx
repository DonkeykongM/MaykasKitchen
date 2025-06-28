import React, { useEffect, useRef, useState } from 'react';
import { Instagram, BookText as TikTok, Youtube, Facebook, Heart, Globe, Award, Medal, CalendarDays } from 'lucide-react';

export const AboutSection = () => {
  const sectionRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const elements = document.querySelectorAll('.scroll-trigger');
    elements.forEach(el => {
      observer.observe(el);
    });
    
    return () => {
      elements.forEach(el => {
        observer.unobserve(el);
      });
    };
  }, []);

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(false);
  };

  return (
    <section id="om-mig" className="py-16 md:py-20 bg-white" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block text-purple-600 text-sm font-medium mb-2 uppercase tracking-wider bg-purple-50 px-4 py-2 rounded-full">
            Lär känna mig
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-purple-600 font-serif">
            Passion för matlagning
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Med assyriska/syrianska rötter och nutida influenser
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="lg:w-2/5 mb-8 lg:mb-0 scroll-trigger relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500">
              {!imageError ? (
                <img 
                  src="https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHCWwNgB4As78PDxpNGZ2hd4yYrwW3o1UOAiJac" 
                  alt="Mayka Gulo i köket" 
                  className="w-full h-auto rounded-2xl transform transition-transform hover:scale-105"
                  loading="lazy"
                  width={500}
                  height={600}
                  decoding="async"
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                  style={{ 
                    opacity: imageLoaded ? 1 : 0,
                    transition: 'opacity 0.3s ease'
                  }}
                />
              ) : null}
              
              {imageError && (
                <div className="w-full h-96 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex flex-col items-center justify-center text-purple-600 border border-purple-300">
                  <div className="text-6xl mb-4">👩‍🍳</div>
                  <h3 className="text-xl font-semibold mb-2">Mayka Gulo</h3>
                  <p className="text-center text-sm px-4">Kock & matkreatör specialiserad på assyrisk/syriansk matlagning</p>
                </div>
              )}
              
              {!imageLoaded && !imageError && (
                <div className="w-full h-96 bg-gray-200 rounded-2xl flex items-center justify-center animate-pulse">
                  <div className="text-gray-400 text-center">
                    <div className="text-3xl mb-2">📸</div>
                    <div>Laddar bild...</div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="absolute -bottom-5 -right-5 bg-white p-4 rounded-full shadow-xl hidden lg:flex flex-col items-center justify-center w-28 h-28 border-4 border-purple-100">
              <Medal className="text-purple-600 mb-1" size={20} />
              <span className="text-lg font-bold text-purple-600">10+ år</span>
              <span className="text-xs text-gray-600 text-center">Matlagnings-erfarenhet</span>
            </div>
          </div>
          
          <div className="lg:w-3/5 scroll-trigger">
            <div className="flex items-center mb-6">
              <div className="h-1 bg-purple-200 flex-grow mr-4"></div>
              <h3 className="text-2xl font-semibold text-gray-800 font-serif">Hej, jag är Mayka!</h3>
              <div className="h-1 bg-purple-200 flex-grow ml-4"></div>
            </div>
            
            <p className="mb-6 text-gray-600 leading-relaxed text-lg">
              Jag är kock, kreatör och matinfluencer med passion för säsongsbaserad mat, odling och matglädje för hela familjen. Genom min assyriska/syrianska bakgrund har jag fått ett rikt arv av smaker och traditioner som jag älskar att dela med mig av.
            </p>
            <p className="mb-8 text-gray-600 leading-relaxed text-lg">
              Med över 120 000 följare på Instagram och 62 000 på TikTok inspirerar jag dagligen tusentals människor till att laga mer mat hemma, med hjärta, själ och enkla råvaror. Min matfilosofi handlar om gemenskap, tradition och modernt vardagsliv i harmoni.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-purple-50 p-6 rounded-xl transform transition-transform hover:-translate-y-1 hover:shadow-lg border border-purple-100">
                <div className="flex items-center mb-3">
                  <div className="bg-purple-100 p-2 rounded-full mr-3">
                    <Globe className="text-purple-600" size={18} />
                  </div>
                  <h4 className="font-semibold text-purple-600">Community</h4>
                </div>
                <p className="text-sm text-gray-600">Aktiv och lojal gemenskap som älskar autentiska recept och matinspiration.</p>
              </div>
              <div className="bg-purple-50 p-6 rounded-xl transform transition-transform hover:-translate-y-1 hover:shadow-lg border border-purple-100">
                <div className="flex items-center mb-3">
                  <div className="bg-purple-100 p-2 rounded-full mr-3">
                    <Award className="text-purple-600" size={18} />
                  </div>
                  <h4 className="font-semibold text-purple-600">Expertis</h4>
                </div>
                <p className="text-sm text-gray-600">Specialiserad på assyrisk/syriansk mat och moderna tolkningar av traditionella recept.</p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h4 className="font-semibold mb-4 text-gray-700">Följ mig här:</h4>
                <div className="flex space-x-4">
                  <a href="https://www.instagram.com/maykaskitchen/" target="_blank" rel="noopener noreferrer" 
                    className="bg-purple-50 text-purple-600 hover:bg-purple-100 p-3 rounded-full transition-colors transform hover:scale-110 border border-purple-200" 
                    aria-label="Instagram">
                    <Instagram size={22} />
                  </a>
                  <a href="https://www.tiktok.com/@Maykaskitchen" target="_blank" rel="noopener noreferrer" 
                    className="bg-purple-50 text-purple-600 hover:bg-purple-100 p-3 rounded-full transition-colors transform hover:scale-110 border border-purple-200" 
                    aria-label="TikTok">
                    <TikTok size={22} />
                  </a>
                  <a href="https://www.youtube.com/@Maykaskitchen" target="_blank" rel="noopener noreferrer" 
                    className="bg-purple-50 text-purple-600 hover:bg-purple-100 p-3 rounded-full transition-colors transform hover:scale-110 border border-purple-200" 
                    aria-label="YouTube">
                    <Youtube size={22} />
                  </a>
                  <a href="https://www.facebook.com/maykaskitchen/" target="_blank" rel="noopener noreferrer" 
                    className="bg-purple-50 text-purple-600 hover:bg-purple-100 p-3 rounded-full transition-colors transform hover:scale-110 border border-purple-200" 
                    aria-label="Facebook">
                    <Facebook size={22} />
                  </a>
                </div>
              </div>
              
              <div className="mt-6 md:mt-0">
                <div className="inline-flex items-center text-gray-600 text-sm">
                  <CalendarDays size={16} className="mr-2 text-purple-600" />
                  Delar recept och inspiration sedan 2019
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 scroll-trigger">
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all text-center transform hover:-translate-y-1 border border-purple-100">
            <h3 className="text-3xl font-bold text-purple-600 mb-1">125k+</h3>
            <p className="text-gray-600">Instagram</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all text-center transform hover:-translate-y-1 border border-purple-100">
            <h3 className="text-3xl font-bold text-purple-600 mb-1">62k+</h3>
            <p className="text-gray-600">TikTok</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all text-center transform hover:-translate-y-1 border border-purple-100">
            <h3 className="text-3xl font-bold text-purple-600 mb-1">2k+</h3>
            <p className="text-gray-600">YouTube</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all text-center transform hover:-translate-y-1 border border-purple-100">
            <h3 className="text-3xl font-bold text-purple-600 mb-1">25k+</h3>
            <p className="text-gray-600">Facebook</p>
          </div>
        </div>
      </div>
    </section>
  );
};
import React, { useEffect, useRef, useState } from 'react';
import { Instagram, BookText as TikTok, Youtube, Facebook, Heart, Globe, Award, Medal, CalendarDays } from 'lucide-react';

export const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
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
    <section id="om-mig" className="section-padding bg-gradient-to-br from-white via-purple-50 to-white" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block text-purple-600 text-sm font-semibold mb-4 uppercase tracking-wider bg-purple-100 px-6 py-3 rounded-full shadow-md">
            Lär känna mig
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-purple-600 font-serif">
            Passion för matlagning
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Med assyriska/syrianska rötter och nutida influenser
          </p>
        </div>
        
        <div className="content-grid items-center mb-20">
          {/* Beautiful image section */}
          <div className="scroll-reveal relative">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 hover-lift">
              {!imageError ? (
                <img 
                  src="https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHCWwNgB4As78PDxpNGZ2hd4yYrwW3o1UOAiJac" 
                  alt="Mayka Gulo i köket" 
                  className="w-full h-auto transition-transform duration-500"
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
                <div className="w-full h-96 bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl flex flex-col items-center justify-center text-purple-600 shadow-xl">
                  <div className="text-6xl mb-4">👩‍🍳</div>
                  <h3 className="text-2xl font-bold mb-3">Mayka Gulo</h3>
                  <p className="text-center text-base px-6 font-medium">Kock & matkreatör specialiserad på assyrisk/syriansk matlagning</p>
                </div>
              )}
              
              {!imageLoaded && !imageError && (
                <div className="w-full h-96 skeleton rounded-3xl flex items-center justify-center">
                  <div className="text-gray-400 text-center">
                    <div className="text-4xl mb-3">📸</div>
                    <div className="text-lg font-medium">Laddar bild...</div>
                  </div>
                </div>
              )}
            </div>
            
              {/* Floating achievement badge */}
              <div className="absolute -bottom-6 -right-6 glass-card p-6 rounded-2xl shadow-2xl hidden lg:flex flex-col items-center justify-center w-32 h-32 hover-scale">
                <Medal className="text-purple-600 mb-2" size={24} />
                <span className="text-xl font-bold text-purple-600">10+ år</span>
                <span className="text-xs text-gray-600 text-center font-medium">Matlagnings-erfarenhet</span>
              </div>
            </div>
          </div>
          
          {/* Beautiful content section */}
          <div className="scroll-reveal">
            <div className="text-center lg:text-left mb-8">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-800 font-serif mb-6">
                Hej, jag är Mayka! 👋
              </h3>
            </div>
            
            <div className="prose max-w-none">
              <p className="mb-6 text-gray-700 leading-relaxed text-lg">
              Jag är kock, kreatör och matinfluencer med passion för säsongsbaserad mat, odling och matglädje för hela familjen. Genom min assyriska/syrianska bakgrund har jag fått ett rikt arv av smaker och traditioner som jag älskar att dela med mig av.
            </p>
              <p className="mb-8 text-gray-700 leading-relaxed text-lg">
              Med över 120 000 följare på Instagram och 62 000 på TikTok inspirerar jag dagligen tusentals människor till att laga mer mat hemma, med hjärta, själ och enkla råvaror. Min matfilosofi handlar om gemenskap, tradition och modernt vardagsliv i harmoni.
            </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <div className="card-modern hover-lift">
                <div className="flex items-center mb-3">
                  <div className="bg-purple-100 p-3 rounded-2xl mr-4 shadow-md">
                    <Globe className="text-purple-600" size={20} />
                  </div>
                  <h4 className="font-bold text-purple-600 text-lg">Community</h4>
                </div>
                <p className="text-gray-600 leading-relaxed">Aktiv och lojal gemenskap som älskar autentiska recept och matinspiration.</p>
              </div>
              <div className="card-modern hover-lift">
                <div className="flex items-center mb-3">
                  <div className="bg-purple-100 p-3 rounded-2xl mr-4 shadow-md">
                    <Award className="text-purple-600" size={20} />
                  </div>
                  <h4 className="font-bold text-purple-600 text-lg">Expertis</h4>
                </div>
                <p className="text-gray-600 leading-relaxed">Specialiserad på assyrisk/syriansk mat och moderna tolkningar av traditionella recept.</p>
              </div>
            </div>
            
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h4 className="font-bold mb-6 text-gray-700 text-lg">Följ mig här:</h4>
                <div className="flex space-x-4 mb-6 lg:mb-0">
                  <a href="https://www.instagram.com/maykaskitchen/" target="_blank" rel="noopener noreferrer" 
                    className="bg-purple-50 text-purple-600 hover:bg-purple-100 p-4 rounded-2xl transition-all hover-scale border border-purple-200 shadow-md hover:shadow-lg" 
                    aria-label="Instagram">
                    <Instagram size={24} />
                  </a>
                  <a href="https://www.tiktok.com/@Maykaskitchen" target="_blank" rel="noopener noreferrer" 
                    className="bg-purple-50 text-purple-600 hover:bg-purple-100 p-4 rounded-2xl transition-all hover-scale border border-purple-200 shadow-md hover:shadow-lg" 
                    aria-label="TikTok">
                    <TikTok size={24} />
                  </a>
                  <a href="https://www.youtube.com/@Maykaskitchen" target="_blank" rel="noopener noreferrer" 
                    className="bg-purple-50 text-purple-600 hover:bg-purple-100 p-4 rounded-2xl transition-all hover-scale border border-purple-200 shadow-md hover:shadow-lg" 
                    aria-label="YouTube">
                    <Youtube size={24} />
                  </a>
                  <a href="https://www.facebook.com/maykaskitchen/" target="_blank" rel="noopener noreferrer" 
                    className="bg-purple-50 text-purple-600 hover:bg-purple-100 p-4 rounded-2xl transition-all hover-scale border border-purple-200 shadow-md hover:shadow-lg" 
                    aria-label="Facebook">
                    <Facebook size={24} />
                  </a>
                </div>
              </div>
              
              <div className="text-center lg:text-right">
                <div className="inline-flex items-center text-gray-600 text-base bg-white/80 backdrop-blur-md px-4 py-3 rounded-xl shadow-md">
                  <CalendarDays size={18} className="mr-3 text-purple-600" />
                  Delar recept och inspiration sedan 2019
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Beautiful stats section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 scroll-reveal">
          <div className="card-modern text-center hover-lift">
            <h3 className="text-4xl font-bold text-purple-600 mb-2">125k+</h3>
            <p className="text-gray-600 font-medium">Instagram</p>
          </div>
          <div className="card-modern text-center hover-lift">
            <h3 className="text-4xl font-bold text-purple-600 mb-2">62k+</h3>
            <p className="text-gray-600 font-medium">TikTok</p>
          </div>
          <div className="card-modern text-center hover-lift">
            <h3 className="text-4xl font-bold text-purple-600 mb-2">2k+</h3>
            <p className="text-gray-600 font-medium">YouTube</p>
          </div>
          <div className="card-modern text-center hover-lift">
            <h3 className="text-4xl font-bold text-purple-600 mb-2">25k+</h3>
            <p className="text-gray-600 font-medium">Facebook</p>
          </div>
        </div>
      </div>
    </section>
  );
};
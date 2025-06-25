import React, { useEffect, useRef } from 'react';
import { Instagram, BookText as TikTok, Youtube, Facebook, Heart, Globe, Award, Medal, CalendarDays, Users } from 'lucide-react';

export const AboutSection = () => {
  const sectionRef = useRef(null);
  
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

  return (
    <section id="om-mig" className="py-20 relative" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <span className="block text-center text-white/90 text-sm font-medium mb-2 uppercase tracking-wider">Lär känna mig</span>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white w-full mx-auto">
          Passion för matlagning <span className="block text-yellow-200 text-xl mt-2 font-normal">Med assyriska/syrianska rötter och nutida influenser</span>
        </h2>
        
        <div className="flex flex-col md:flex-row items-center gap-10 lg:gap-16">
          <div className="md:w-2/5 mb-8 md:mb-0 scroll-trigger relative">
            <div className="rounded-lg overflow-hidden shadow-lg hover-zoom">
              <img 
                src="https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHCIRQfhMbanRC45KvFPkwGxStE3Ob1dcATYX9L" 
                alt="Mayka Gulo i köket" 
                className="w-full h-auto rounded-lg"
                loading="lazy"
              />
            </div>
            
            {/* Experience badge */}
            <div className="absolute -bottom-5 -right-5 bg-white/95 backdrop-blur-sm p-4 rounded-full shadow-lg hidden md:flex flex-col items-center justify-center w-28 h-28 border-4 border-white/50">
              <Medal className="text-purple-600 mb-1" size={20} />
              <span className="text-lg font-bold text-purple-600">10+ år</span>
              <span className="text-xs text-purple-500 text-center">Matlagnings-erfarenhet</span>
            </div>
          </div>
          
          <div className="md:w-3/5 scroll-trigger" style={{ transitionDelay: '0.2s' }}>
            <div className="flex items-center mb-4">
              <div className="h-1 bg-white/30 flex-grow mr-4"></div>
              <h3 className="text-2xl font-semibold text-yellow-200">Hej, jag är Mayka!</h3>
              <div className="h-1 bg-white/30 flex-grow ml-4"></div>
            </div>
            
            <p className="mb-4 text-white/90 leading-relaxed">Jag är kock, kreatör och matinfluencer med passion för säsongsbaserad mat, odling och matglädje för hela familjen. Genom min assyriska/syrianska bakgrund har jag fått ett rikt arv av smaker och traditioner som jag älskar att dela med mig av.</p>
            <p className="mb-6 text-white/85 leading-relaxed">Med över 120 000 följare på Instagram och 62 000 på TikTok inspirerar jag dagligen tusentals människor till att laga mer mat hemma, med hjärta, själ och enkla råvaror. Min matfilosofi handlar om gemenskap, tradition och modernt vardagsliv i harmoni.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur-sm p-5 rounded-xl transform transition-transform hover:-translate-y-1 hover:shadow-md border border-white/20">
                <div className="flex items-center mb-3">
                  <div className="bg-white/20 p-2 rounded-full mr-3">
                    <Globe className="text-white" size={18} />
                  </div>
                  <h4 className="font-semibold text-white">Community</h4>
                </div>
                <p className="text-sm text-white/80">Aktiv och lojal gemenskap som älskar autentiska recept och matinspiration.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-5 rounded-xl transform transition-transform hover:-translate-y-1 hover:shadow-md border border-white/20">
                <div className="flex items-center mb-3">
                  <div className="bg-white/20 p-2 rounded-full mr-3">
                    <Award className="text-white" size={18} />
                  </div>
                  <h4 className="font-semibold text-white">Expertis</h4>
                </div>
                <p className="text-sm text-white/80">Specialiserad på assyrisk/syriansk mat och moderna tolkningar av traditionella recept.</p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h4 className="font-semibold mb-3 text-white">Följ mig här:</h4>
                <div className="flex space-x-5">
                  <a href="https://www.instagram.com/maykaskitchen/" target="_blank" rel="noopener noreferrer" 
                    className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 p-3 rounded-full transition-colors transform hover:scale-110 border border-white/20" 
                    aria-label="Instagram">
                    <Instagram size={22} />
                  </a>
                  <a href="https://www.tiktok.com/@Maykaskitchen" target="_blank" rel="noopener noreferrer" 
                    className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 p-3 rounded-full transition-colors transform hover:scale-110 border border-white/20" 
                    aria-label="TikTok">
                    <TikTok size={22} />
                  </a>
                  <a href="https://www.youtube.com/@Maykaskitchen" target="_blank" rel="noopener noreferrer" 
                    className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 p-3 rounded-full transition-colors transform hover:scale-110 border border-white/20" 
                    aria-label="YouTube">
                    <Youtube size={22} />
                  </a>
                  <a href="https://www.facebook.com/maykaskitchen/" target="_blank" rel="noopener noreferrer" 
                    className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 p-3 rounded-full transition-colors transform hover:scale-110 border border-white/20" 
                    aria-label="Facebook">
                    <Facebook size={22} />
                  </a>
                </div>
              </div>
              
              <div className="mt-6 md:mt-0">
                <div className="inline-flex items-center text-white/80 text-sm">
                  <CalendarDays size={16} className="mr-2 text-yellow-200" />
                  Delar recept och inspiration sedan 2019
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 scroll-trigger" style={{ transitionDelay: '0.4s' }}>
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-soft hover:shadow-hover transition-all text-center transform hover:-translate-y-1 border border-white/20">
            <h3 className="text-3xl font-bold text-white mb-1">125k+</h3>
            <p className="text-white/80">Instagram</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-soft hover:shadow-hover transition-all text-center transform hover:-translate-y-1 border border-white/20">
            <h3 className="text-3xl font-bold text-white mb-1">62k+</h3>
            <p className="text-white/80">TikTok</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-soft hover:shadow-hover transition-all text-center transform hover:-translate-y-1 border border-white/20">
            <h3 className="text-3xl font-bold text-white mb-1">2k+</h3>
            <p className="text-white/80">YouTube</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-soft hover:shadow-hover transition-all text-center transform hover:-translate-y-1 border border-white/20">
            <h3 className="text-3xl font-bold text-white mb-1">25k+</h3>
            <p className="text-white/80">Facebook</p>
          </div>
        </div>
      </div>
    </section>
  );
};
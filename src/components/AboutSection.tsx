import React, { useEffect, useRef } from 'react';
import { Instagram, BookText as TikTok, Youtube, Facebook, Globe, Award, CalendarDays } from 'lucide-react';

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
    elements.forEach(el => observer.observe(el));
    
    return () => elements.forEach(el => observer.unobserve(el));
  }, []);

  return (
    <section id="om-mig" className="py-20 bg-white" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <span className="block text-center text-purple-600 text-sm font-medium mb-2 uppercase tracking-wider">Lär känna mig</span>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-purple-600 w-full mx-auto">
          Passion för matlagning <span className="block text-black text-xl mt-2 font-normal">Med assyriska/syrianska rötter och nutida influenser</span>
        </h2>
        
        <div className="flex flex-col md:flex-row items-center gap-10 lg:gap-16">
          <div className="md:w-2/5 mb-8 md:mb-0 scroll-trigger relative">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHCIRQfhMbanRC45KvFPkwGxStE3Ob1dcATYX9L" 
                alt="Mayka Gulo i köket" 
                className="w-full h-auto rounded-lg"
                loading="lazy"
                width="400"
                height="500"
              />
            </div>
          </div>
          
          <div className="md:w-3/5 scroll-trigger">
            <div className="flex items-center mb-4">
              <div className="h-1 bg-purple-200 flex-grow mr-4"></div>
              <h3 className="text-2xl font-semibold text-black">Hej, jag är Mayka!</h3>
              <div className="h-1 bg-purple-200 flex-grow ml-4"></div>
            </div>
            
            <p className="mb-4 text-gray-600 leading-relaxed">Jag är kock, kreatör och matinfluencer med passion för säsongsbaserad mat, odling och matglädje för hela familjen. Genom min assyriska/syrianska bakgrund har jag fått ett rikt arv av smaker och traditioner som jag älskar att dela med mig av.</p>
            <p className="mb-6 text-gray-600 leading-relaxed">Med över 120 000 följare på Instagram och 62 000 på TikTok inspirerar jag dagligen tusentals människor till att laga mer mat hemma, med hjärta, själ och enkla råvaror.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-purple-50 p-5 rounded-xl transform transition-transform hover:-translate-y-1 border border-purple-100">
                <div className="flex items-center mb-3">
                  <div className="bg-purple-100 p-2 rounded-full mr-3">
                    <Globe className="text-purple-600" size={18} />
                  </div>
                  <h4 className="font-semibold text-purple-600">Community</h4>
                </div>
                <p className="text-sm text-gray-600">Aktiv och lojal gemenskap som älskar autentiska recept och matinspiration.</p>
              </div>
              <div className="bg-purple-50 p-5 rounded-xl transform transition-transform hover:-translate-y-1 border border-purple-100">
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
                <h4 className="font-semibold mb-3 text-gray-700">Följ mig här:</h4>
                <div className="flex space-x-5">
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
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all text-center transform hover:-translate-y-1 border border-purple-100">
            <h3 className="text-3xl font-bold text-purple-600 mb-1">125k+</h3>
            <p className="text-gray-600">Instagram</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all text-center transform hover:-translate-y-1 border border-purple-100">
            <h3 className="text-3xl font-bold text-purple-600 mb-1">62k+</h3>
            <p className="text-gray-600">TikTok</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all text-center transform hover:-translate-y-1 border border-purple-100">
            <h3 className="text-3xl font-bold text-purple-600 mb-1">2k+</h3>
            <p className="text-gray-600">YouTube</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all text-center transform hover:-translate-y-1 border border-purple-100">
            <h3 className="text-3xl font-bold text-purple-600 mb-1">25k+</h3>
            <p className="text-gray-600">Facebook</p>
          </div>
        </div>
      </div>
    </section>
  );
};
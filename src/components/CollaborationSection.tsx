import React from 'react';
import { Check, Heart, Users, TrendingUp, Camera } from 'lucide-react';

export const CollaborationSection = () => {
  return (
    <section id="samarbeten" className="py-8 md:py-12 lg:py-16 xl:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6 md:mb-8 lg:mb-12">
          <span className="inline-block text-purple-600 text-sm font-medium mb-2 uppercase tracking-wider bg-purple-50 px-4 py-2 rounded-full">
            Samarbeten & Partnerships
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-purple-600 font-serif px-4">
            Låt oss skapa tillsammans
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg px-4">
            Jag erbjuder kreativa samarbeten med varumärken som delar mina värderingar om autentisk matlagning och kvalitet.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 mb-8 md:mb-12 lg:mb-16">
          <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-purple-100">
            <div className="flex items-center mb-6">
              <div className="bg-purple-100 p-3 rounded-full mr-4">
                <Heart className="text-purple-600" size={24} />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-purple-600 font-serif">Vad jag erbjuder</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Check className="text-purple-600 mt-1 mr-3 flex-shrink-0" size={18} />
                <span className="text-sm md:text-base text-gray-700">Samarbeten & kampanjer med autentiskt innehåll</span>
              </li>
              <li className="flex items-start">
                <Check className="text-purple-600 mt-1 mr-3 flex-shrink-0" size={18} />
                <span className="text-sm md:text-base text-gray-700">Receptutveckling & professionell matfoto</span>
              </li>
              <li className="flex items-start">
                <Check className="text-purple-600 mt-1 mr-3 flex-shrink-0" size={18} />
                <span className="text-sm md:text-base text-gray-700">Video, reels och TikToks med hög kvalitet</span>
              </li>
              <li className="flex items-start">
                <Check className="text-purple-600 mt-1 mr-3 flex-shrink-0" size={18} />
                <span className="text-sm md:text-base text-gray-700">Affiliate eller långsiktigt ambassadörskap</span>
              </li>
              <li className="flex items-start">
                <Check className="text-purple-600 mt-1 mr-3 flex-shrink-0" size={18} />
                <span className="text-sm md:text-base text-gray-700">Matlagningsworkshops & events</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-purple-100">
            <div className="flex items-center mb-6">
              <div className="bg-purple-100 p-3 rounded-full mr-4">
                <TrendingUp className="text-purple-600" size={24} />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-purple-600 font-serif">Mina siffror</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center bg-purple-50 p-4 rounded-lg border border-purple-200">
                <div className="text-xl md:text-2xl font-bold text-purple-600">125k+</div>
                <div className="text-sm text-gray-600">Instagram följare</div>
              </div>
              <div className="text-center bg-purple-50 p-4 rounded-lg border border-purple-200">
                <div className="text-xl md:text-2xl font-bold text-purple-600">62k+</div>
                <div className="text-sm text-gray-600">TikTok följare</div>
              </div>
              <div className="text-center bg-purple-50 p-4 rounded-lg border border-purple-200">
                <div className="text-xl md:text-2xl font-bold text-purple-600">8.5%</div>
                <div className="text-sm text-gray-600">Engagemang</div>
              </div>
              <div className="text-center bg-purple-50 p-4 rounded-lg border border-purple-200">
                <div className="text-xl md:text-2xl font-bold text-purple-600">20-65</div>
                <div className="text-sm text-gray-600">Åldersgrupp</div>
              </div>
            </div>
            <p className="text-gray-600 text-sm md:text-base">
              Hög engagemang med autentisk målgrupp som älskar matlagning och kvalitetsprodukter.
            </p>
          </div>
        </div>

        {/* Previous collaborations */}
        <div className="mb-8 md:mb-12 lg:mb-16">
          <h3 className="text-xl md:text-2xl font-semibold text-center text-purple-600 mb-6 md:mb-8 font-serif px-4">Tidigare samarbeten</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {['FELIX', 'GLOBAL', 'GARANT', 'BONG', 'TV4'].map((brand, index) => (
              <div key={index} className="bg-white/90 backdrop-blur-md p-4 md:p-6 rounded-xl flex items-center justify-center h-16 md:h-20 shadow-md hover:shadow-lg transition-all border border-purple-100 transform hover:scale-105">
                <span className="font-bold text-gray-700 text-sm md:text-lg">{brand}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6 md:p-8 lg:p-12 rounded-2xl shadow-xl">
          <div className="flex flex-col lg:flex-row items-center text-center lg:text-left">
            <div className="lg:w-2/3 mb-6 lg:mb-0 lg:pr-8">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-4 font-serif px-4">Vill du samarbeta med mig?</h3>
              <p className="text-purple-100 mb-4 text-base md:text-lg px-4">
                Engagemanget är högt och communityt är varmt, aktivt och lojalt med en äkta passion för god mat och autentiska recept.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm px-4">
                <div className="flex items-center">
                  <Users size={16} className="mr-2" />
                  <span>200k+ total reach</span>
                </div>
                <div className="flex items-center">
                  <Camera size={16} className="mr-2" />
                  <span>Professional content</span>
                </div>
              </div>
            </div>
            <div className="lg:w-1/3 flex justify-center">
              <a 
                href="#kontakt" 
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-white text-purple-600 py-4 px-8 rounded-full hover:bg-purple-50 transition duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 min-h-[56px] flex items-center justify-center text-lg w-full sm:w-auto"
              >
                Kontakta mig
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
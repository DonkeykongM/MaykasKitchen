import React from 'react';
import { ArrowRight, Clock, Heart, Calendar, Eye } from 'lucide-react';

export const BlogSection = () => {
  // Function to handle recipe link clicks
  const handleRecipeClick = (id: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.location.hash = `recipe/${id}`;
  };
  
  return (
    <section id="min-blogg" className="py-16 md:py-20 bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block text-purple-600 text-sm font-medium mb-2 uppercase tracking-wider bg-purple-50 px-4 py-2 rounded-full">
            Min Blogg
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-purple-600 font-serif">
            Senaste inläggen
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Ta del av mina senaste tankar, matupplevelser och inspirerande recept från min vardag i köket.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Blogg inlägg 1 */}
          <article className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-purple-100">
            <div className="relative h-48 overflow-hidden">
              <img 
                src="https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHC8y19NS5037zrR9qXSut4TKmZEpjlBcOhHew0" 
                alt="Kryddig lax- & risbowl" 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
              <div className="absolute top-4 left-4 bg-purple-600/90 text-white text-xs py-1 px-3 rounded-full flex items-center">
                <Clock size={12} className="mr-1" /> 5 min läsning
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center text-gray-500 text-sm">
                  <Calendar size={14} className="mr-1" />
                  <span>12 maj 2023</span>
                </div>
                <div className="flex items-center text-gray-500 text-sm">
                  <Eye size={14} className="mr-1" />
                  <span>1.2k visningar</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 font-serif hover:text-purple-600 transition-colors">
                Kryddig lax- & risbowl - en vårig smakexplosion! 🌸🐟
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Perfekt som fräsch vardagsmiddag eller när du vill lyxa till lunchen. Snabbt, enkelt och så himla smakrikt...
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-500 text-sm">
                  <Heart size={14} className="mr-1 text-red-500" />
                  <span>78 gillningar</span>
                </div>
                <a 
                  href="#recipe/lax-risbowl" 
                  onClick={(e) => handleRecipeClick('lax-risbowl', e)}
                  className="inline-flex items-center text-purple-600 hover:text-purple-800 font-medium group"
                >
                  Läs mer <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </article>
          
          {/* Blogg inlägg 2 */}
          <article className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-purple-100">
            <div className="relative h-48 overflow-hidden">
              <img 
                src="https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHC2bVVcBHX4Xuw0sOU5gWozk6clEfde8bBYInQ" 
                alt="Kafta bil sejnie - Köttbullar i tomatsås" 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
              <div className="absolute top-4 left-4 bg-purple-600/90 text-white text-xs py-1 px-3 rounded-full flex items-center">
                <Clock size={12} className="mr-1" /> 7 min läsning
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center text-gray-500 text-sm">
                  <Calendar size={14} className="mr-1" />
                  <span>29 april 2023</span>
                </div>
                <div className="flex items-center text-gray-500 text-sm">
                  <Eye size={14} className="mr-1" />
                  <span>956 visningar</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 font-serif hover:text-purple-600 transition-colors">
                Mellanösterns smakfulla hemlighet: Köttbullar på mitt sätt
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                En traditionell rätt från mellanöstern med saftiga köttbullar och potatis i en smakrik tomatsås...
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-500 text-sm">
                  <Heart size={14} className="mr-1 text-red-500" />
                  <span>56 gillningar</span>
                </div>
                <a 
                  href="#recipe/kafta-bil-sejnie" 
                  onClick={(e) => handleRecipeClick('kafta-bil-sejnie', e)}
                  className="inline-flex items-center text-purple-600 hover:text-purple-800 font-medium group"
                >
                  Läs mer <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </article>

          {/* Blogg inlägg 3 */}
          <article className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-purple-100">
            <div className="relative h-48 overflow-hidden">
              <img 
                src="https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHCfVuc1HC48dYxTFVG4qu9OSWrN21vZPBkJiCo" 
                alt="Pasta pesto med halloumi" 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
              <div className="absolute top-4 left-4 bg-purple-600/90 text-white text-xs py-1 px-3 rounded-full flex items-center">
                <Clock size={12} className="mr-1" /> 4 min läsning
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center text-gray-500 text-sm">
                  <Calendar size={14} className="mr-1" />
                  <span>15 mars 2023</span>
                </div>
                <div className="flex items-center text-gray-500 text-sm">
                  <Eye size={14} className="mr-1" />
                  <span>1.8k visningar</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 font-serif hover:text-purple-600 transition-colors">
                Snabb vardagsmiddag: Pasta pesto med ugnsbakade tomater
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                En smakrik, krämig och färgsprakande pastarätt som blir klar på 40 minuter. Perfekt för hela familjen...
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-500 text-sm">
                  <Heart size={14} className="mr-1 text-red-500" />
                  <span>89 gillningar</span>
                </div>
                <a 
                  href="#recipe/pasta-pesto" 
                  onClick={(e) => handleRecipeClick('pasta-pesto', e)}
                  className="inline-flex items-center text-purple-600 hover:text-purple-800 font-medium group"
                >
                  Läs mer <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </article>
        </div>
        
        <div className="text-center">
          <button 
            onClick={() => scrollToSection('recept')}
            className="bg-purple-600 text-white px-8 py-3 rounded-full hover:bg-purple-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 min-h-[44px]"
          >
            Se alla recept
          </button>
        </div>
      </div>
    </section>
  );
};
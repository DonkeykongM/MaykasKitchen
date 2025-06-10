import React from 'react';
import { ArrowRight, Clock, Heart } from 'lucide-react';

export const BlogSection = () => {
  // Function to handle recipe link clicks
  const handleRecipeClick = (id: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.location.hash = id;
  };
  
  return (
    <section id="min-blogg" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <span className="block text-center text-primary-color text-sm font-medium mb-2 uppercase tracking-wider">MIN BLOGG</span>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-primary-color">Senaste inläggen</h2>
        <p className="text-center mb-16 max-w-2xl mx-auto text-brown-500">Ta del av mina senaste tankar, matupplevelser och inspirerande recept från min vardag i köket.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-xl overflow-hidden shadow-soft group hover:shadow-hover transition-all">
            <div className="relative h-64 overflow-hidden">
              <img 
                src="https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHC8y19NS5037zrR9qXSut4TKmZEpjlBcOhHew0" 
                alt="Kryddig lax- & risbowl" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 bg-beige-100 text-primary-color text-xs py-1 px-3 rounded-full flex items-center">
                <Clock size={12} className="mr-1" /> 45 min
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-brown-500">Publicerad 2023-05-12</span>
                <span className="text-brown-500 text-sm flex items-center">
                  <Heart size={16} className="mr-1" /> 78
                </span>
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-accent-color">Kryddig lax- & risbowl - en vårig smakexplosion! 🌸🐟</h3>
              <p className="text-brown-500 mb-4">
                Perfekt som fräsch vardagsmiddag eller när du vill lyxa till lunchen. Snabbt, enkelt och så himla smakrikt, du kommer vilja göra det här om och om igen!
              </p>
              <a 
                href="#lax-risbowl" 
                onClick={(e) => handleRecipeClick('lax-risbowl', e)}
                className="inline-flex items-center text-primary-color hover:text-accent-color font-medium"
              >
                Läs hela inlägget <ArrowRight size={16} className="ml-1" />
              </a>
            </div>
          </div>
          
          <div className="bg-white rounded-xl overflow-hidden shadow-soft group hover:shadow-hover transition-all">
            <div className="relative h-64 overflow-hidden">
              <img 
                src="https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHC2bVVcBHX4Xuw0sOU5gWozk6clEfde8bBYInQ" 
                alt="Kafta bil sejnie - Köttbullar i tomatsås" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 bg-beige-100 text-primary-color text-xs py-1 px-3 rounded-full flex items-center">
                <Clock size={12} className="mr-1" /> 60 min
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-brown-500">Publicerad 2023-04-29</span>
                <span className="text-brown-500 text-sm flex items-center">
                  <Heart size={16} className="mr-1" /> 56
                </span>
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-accent-color">Mellanösterns Smakfulla Hemlighet: Köttbullar i Tomatsås på Mitt Sätt</h3>
              <p className="text-brown-500 mb-4">
                En traditionell rätt från mellanöstern med saftiga köttbullar och potatis i en smakrik tomatsås – perfekt komfort för hela familjen.
              </p>
              <a 
                href="#kafta-bil-sejnie" 
                onClick={(e) => handleRecipeClick('kafta-bil-sejnie', e)}
                className="inline-flex items-center text-primary-color hover:text-accent-color font-medium"
              >
                Läs hela inlägget <ArrowRight size={16} className="ml-1" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <a href="#min-blogg" className="btn-secondary">
            Se alla inlägg
          </a>
        </div>
      </div>
    </section>
  );
};
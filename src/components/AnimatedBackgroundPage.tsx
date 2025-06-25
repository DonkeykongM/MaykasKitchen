import React, { useState } from 'react';
import { ArrowLeft, Palette, Sparkles, Eye, Settings } from 'lucide-react';
import FoodBlogBackground from './ui/food-blog-background';

export const AnimatedBackgroundPage = () => {
  const [selectedVariant, setSelectedVariant] = useState<'default' | 'hero' | 'recipes' | 'about' | 'contact'>('hero');

  const handleBack = () => {
    window.location.hash = '';
  };

  const variants = [
    { 
      name: 'hero', 
      label: 'Hero Section', 
      description: 'Dramatisk lila-till-blå gradient med flytande ikoner och sparkle-effekter',
      color: 'from-purple-600 to-blue-600'
    },
    { 
      name: 'recipes', 
      label: 'Recipe Section', 
      description: 'Varm terracotta och olivgrön färgpalett för matrelaterat innehåll',
      color: 'from-orange-600 to-green-600'
    },
    { 
      name: 'about', 
      label: 'About Section', 
      description: 'Lugn olivgrön till blå gradient för personligt innehåll',
      color: 'from-green-600 to-blue-800'
    },
    { 
      name: 'contact', 
      label: 'Contact Section', 
      description: 'Djup blå till terracotta för kontaktformulär och kommunikation',
      color: 'from-blue-800 to-orange-600'
    },
    { 
      name: 'default', 
      label: 'Default/Light', 
      description: 'Subtil beige och ljus bakgrund för allmänt innehåll',
      color: 'from-amber-100 to-orange-100'
    }
  ] as const;

  return (
    <FoodBlogBackground className="min-h-screen" variant={selectedVariant}>
      <div className="min-h-screen relative z-10">
        {/* Header */}
        <div className="relative z-20 bg-white/90 backdrop-blur-md shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <button 
              onClick={handleBack}
              className="flex items-center text-purple-700 hover:text-purple-900 transition-colors group"
            >
              <ArrowLeft size={20} className="mr-2 transition-transform group-hover:-translate-x-1" />
              Tillbaka till startsidan
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12 relative z-20">
          {/* Title Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-white/90 backdrop-blur-sm text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4 shadow-lg">
              <Sparkles size={16} className="mr-2" />
              Dynamisk Animerad Bakgrund
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 text-shadow-lg">
              Animationsdemo
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto text-shadow-lg">
              Upptäck våra dynamiska bakgrunder med flytande gradienter, animerade ikoner och immersiva effekter
            </p>
          </div>

          {/* Variant Selector */}
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl mb-12">
            <div className="flex items-center mb-6">
              <Palette className="text-purple-600 mr-3" size={24} />
              <h2 className="text-2xl font-bold text-gray-800">Välj Bakgrundsvariant</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {variants.map((variant) => (
                <button
                  key={variant.name}
                  onClick={() => setSelectedVariant(variant.name)}
                  className={`p-4 rounded-xl border-2 transition-all text-left group ${
                    selectedVariant === variant.name
                      ? 'border-purple-500 bg-purple-50 shadow-lg scale-105'
                      : 'border-gray-200 bg-white hover:border-purple-300 hover:shadow-md'
                  }`}
                >
                  <div className={`w-full h-12 rounded-lg bg-gradient-to-r ${variant.color} mb-3 shadow-md`}></div>
                  <h3 className={`font-semibold mb-2 ${
                    selectedVariant === variant.name ? 'text-purple-700' : 'text-gray-700'
                  }`}>
                    {variant.label}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {variant.description}
                  </p>
                  {selectedVariant === variant.name && (
                    <div className="mt-3 flex items-center text-purple-600 text-sm">
                      <Eye size={14} className="mr-1" />
                      Aktiv variant
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Feature Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/90 backdrop-blur-md rounded-xl p-6 shadow-lg">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="text-purple-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Flytande Ikoner</h3>
              <p className="text-gray-600">
                15 matrelaterade ikoner som flyter runt med individuella animationer, rotationer och färgskiftningar.
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-md rounded-xl p-6 shadow-lg">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Palette className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Dynamiska Gradienter</h3>
              <p className="text-gray-600">
                20-sekunders flytande animationer med flerlagers gradienter som skapar djup och rörelse.
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-md rounded-xl p-6 shadow-lg">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Settings className="text-green-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Responsiv Design</h3>
              <p className="text-gray-600">
                Optimerad för alla enheter med anpassade animationshastigheter och effekter.
              </p>
            </div>
          </div>

          {/* Demo Content */}
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-xl">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Upplev den Animerade Bakgrunden
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Tekniska Funktioner:</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    Framer Motion animationer för smidig prestanda
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    GPU-accelererade transformationer
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Optimerad för olika skärmstorlekar
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                    Stöd för reduced motion preferences
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Visuella Effekter:</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
                    Organiska blob-former med mjuka kanter
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                    Sparkle-effekter och ljusstrålning
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                    Textur-overlays för djup
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
                    Färgade skuggor och glow-effekter
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200">
              <p className="text-center text-gray-700 italic">
                "Denna animerade bakgrund skapar en immersiv upplevelse som förstärker MaykasKitchens 
                varumärke och ger besökarna en minnesvärd visuell resa genom sajten."
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="relative z-20 py-12">
          <div className="container mx-auto px-4 text-center">
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-xl inline-block">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Redo att utforska mer?
              </h3>
              <p className="text-gray-600 mb-6">
                Gå tillbaka till huvudsidan för att se alla animerade bakgrunder i aktion.
              </p>
              <button 
                onClick={handleBack}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg"
              >
                Tillbaka till MaykasKitchen
              </button>
            </div>
          </div>
        </div>
      </div>
    </FoodBlogBackground>
  );
};
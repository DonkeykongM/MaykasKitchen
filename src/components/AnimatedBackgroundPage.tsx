import React, { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';

export const AnimatedBackgroundPage = () => {
  const [deviceCapabilities, setDeviceCapabilities] = useState({
    supportsAdvancedAnimations: true,
    prefersReducedMotion: false
  });

  useEffect(() => {
    // Detect device capabilities for performance optimization
    const checkDeviceCapabilities = () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isLowEndDevice = navigator.hardwareConcurrency <= 2 || 
                           (navigator as any).deviceMemory <= 2 ||
                           /Android.*Chrome\/[.0-9]*\s*Mobile|iPhone|iPad|iPod/i.test(navigator.userAgent);
      
      setDeviceCapabilities({
        supportsAdvancedAnimations: !isLowEndDevice,
        prefersReducedMotion
      });
    };

    checkDeviceCapabilities();

    // Listen for changes in motion preferences
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e: MediaQueryListEvent) => {
      setDeviceCapabilities(prev => ({
        ...prev,
        prefersReducedMotion: e.matches
      }));
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleBackClick = () => {
    window.location.hash = '';
  };

  return (
    <div className="animated-background-container">
      {/* Animated Background */}
      <div 
        className={`animated-background ${
          deviceCapabilities.prefersReducedMotion ? 'reduced-motion' : ''
        } ${
          deviceCapabilities.supportsAdvancedAnimations ? 'high-performance' : 'low-performance'
        }`}
      />
      
      {/* Content Layer */}
      <div className="content-layer">
        {/* Back Navigation */}
        <button 
          onClick={handleBackClick}
          className="back-button"
          aria-label="Tillbaka till startsidan"
        >
          <ArrowLeft size={20} />
          <span>Tillbaka</span>
        </button>

        {/* Main Content */}
        <main className="main-content" role="main">
          <header className="content-header">
            <h1>Dynamic Animated Background</h1>
            <p>En responsiv webbsida med animerad bakgrund</p>
          </header>

          <section className="content-section">
            <div className="content-card">
              <h2>Bakgrundsteknologi</h2>
              <ul>
                <li>CSS-gradienters med linjär övergång</li>
                <li>Optimerade CSS-animationer</li>
                <li>Responsiv design för alla skärmstorlekar</li>
                <li>Tillgänglighetsanpassad för WCAG 2.1</li>
                <li>Prestationsoptimerad för olika enheter</li>
              </ul>
            </div>

            <div className="content-card">
              <h2>Animationsspecifikationer</h2>
              <ul>
                <li><strong>Varaktighet:</strong> 15 sekunder</li>
                <li><strong>Timing:</strong> ease-in-out</li>
                <li><strong>Iteration:</strong> Oändlig</li>
                <li><strong>Opacitet:</strong> 0.8 - 1.0</li>
                <li><strong>Färgschema:</strong> Lila till kunglig blå</li>
              </ul>
            </div>

            <div className="content-card">
              <h2>Responsivitet & Prestanda</h2>
              <ul>
                <li>Stöd för 320px till 4K-upplösning</li>
                <li>Adaptiv animationsprestanda</li>
                <li>Automatisk optimering för låg-end enheter</li>
                <li>Respekterar användarens rörelseinställningar</li>
                <li>Kors-kompatibel med alla moderna webbläsare</li>
              </ul>
            </div>
          </section>

          <section className="demo-info">
            <h2>Teknisk Information</h2>
            <div className="tech-grid">
              <div className="tech-item">
                <span className="tech-label">Enhet:</span>
                <span className="tech-value">
                  {deviceCapabilities.supportsAdvancedAnimations ? 'Hög prestanda' : 'Optimerad'}
                </span>
              </div>
              <div className="tech-item">
                <span className="tech-label">Animationer:</span>
                <span className="tech-value">
                  {deviceCapabilities.prefersReducedMotion ? 'Reducerade' : 'Fullständiga'}
                </span>
              </div>
              <div className="tech-item">
                <span className="tech-label">Viewport:</span>
                <span className="tech-value">{window.innerWidth}x{window.innerHeight}</span>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};
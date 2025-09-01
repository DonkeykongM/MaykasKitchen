"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { 
  ChefHat, 
  Coffee, 
  Utensils, 
  Heart, 
  Star, 
  Clock,
  Apple,
  Fish,
  Wheat,
  Cookie
} from "lucide-react";

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  direction: number;
  icon: React.ReactNode;
  color: string;
  animationDelay: number;
  rotationSpeed: number;
  opacity: number;
}

interface FoodBlogBackgroundProps {
  className?: string;
  children?: React.ReactNode;
  variant?: 'default' | 'hero' | 'recipes' | 'about' | 'contact';
}

const FoodBlogBackground: React.FC<FoodBlogBackgroundProps> = ({
  className = "",
  children,
  variant = 'default'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [floatingElements, setFloatingElements] = useState<FloatingElement[]>([]);
  const animationRef = useRef<number>();
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check for reduced motion preference and mobile
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobileQuery = window.matchMedia('(max-width: 768px)');
    
    setIsReducedMotion(mediaQuery.matches);
    setIsMobile(mobileQuery.matches);
    
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };
    
    const handleMobileChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleMotionChange);
    mobileQuery.addEventListener('change', handleMobileChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange);
      mobileQuery.removeEventListener('change', handleMobileChange);
    };
  }, []);

  // Simplified food icons array for better performance
  const foodIcons = useMemo(() => [
    { icon: <ChefHat className="w-full h-full" />, color: "#800080" },
    { icon: <Coffee className="w-full h-full" />, color: "#4B0082" },
    { icon: <Utensils className="w-full h-full" />, color: "#2E0054" },
    { icon: <Heart className="w-full h-full" />, color: "#800080" },
    { icon: <Star className="w-full h-full" />, color: "#4B0082" },
    { icon: <Clock className="w-full h-full" />, color: "#2E0054" },
    { icon: <Apple className="w-full h-full" />, color: "#800080" },
    { icon: <Fish className="w-full h-full" />, color: "#4B0082" },
    { icon: <Wheat className="w-full h-full" />, color: "#2E0054" },
    { icon: <Cookie className="w-full h-full" />, color: "#800080" }
  ], []);

  // Variant-specific background configurations - optimized for mobile
  const getBackgroundConfig = useMemo(() => {
    const mobileMultiplier = isMobile ? 0.3 : 1;
    const motionMultiplier = isReducedMotion ? 0.1 : 1;
    
    switch (variant) {
      case 'hero':
        return {
          gradient: 'linear-gradient(135deg, #800080 0%, #4B0082 25%, #2E0054 50%, #1A001A 75%, #000000 100%)',
          opacity: { min: 0.9, max: 1 },
          elementCount: Math.max(2, Math.floor(8 * mobileMultiplier * motionMultiplier)),
          animationSpeed: 0.2 * motionMultiplier,
          iconOpacity: { min: 0.2, max: 0.4 }
        };
      case 'recipes':
        return {
          gradient: 'linear-gradient(135deg, #4B0082 0%, #800080 25%, #2E0054 50%, #800080 75%, #4B0082 100%)',
          opacity: { min: 0.8, max: 0.95 },
          elementCount: Math.max(2, Math.floor(6 * mobileMultiplier * motionMultiplier)),
          animationSpeed: 0.15 * motionMultiplier,
          iconOpacity: { min: 0.15, max: 0.3 }
        };
      case 'about':
        return {
          gradient: 'linear-gradient(135deg, #2E0054 0%, #4B0082 25%, #800080 50%, #4B0082 75%, #2E0054 100%)',
          opacity: { min: 0.7, max: 0.85 },
          elementCount: Math.max(1, Math.floor(5 * mobileMultiplier * motionMultiplier)),
          animationSpeed: 0.1 * motionMultiplier,
          iconOpacity: { min: 0.1, max: 0.25 }
        };
      case 'contact':
        return {
          gradient: 'linear-gradient(135deg, #1A001A 0%, #2E0054 25%, #4B0082 50%, #2E0054 75%, #000000 100%)',
          opacity: { min: 0.8, max: 0.95 },
          elementCount: Math.max(1, Math.floor(5 * mobileMultiplier * motionMultiplier)),
          animationSpeed: 0.15 * motionMultiplier,
          iconOpacity: { min: 0.15, max: 0.3 }
        };
      default:
        return {
          gradient: 'linear-gradient(135deg, #F8F8FF 0%, #F5F5FF 25%, #F0F0F5 50%, #F5F5FF 75%, #F8F8FF 100%)',
          opacity: { min: 0.9, max: 1 },
          elementCount: Math.max(1, Math.floor(3 * mobileMultiplier * motionMultiplier)),
          animationSpeed: 0.1 * motionMultiplier,
          iconOpacity: { min: 0.1, max: 0.2 }
        };
    }
  }, [variant, isReducedMotion, isMobile]);

  const config = getBackgroundConfig;

  // Initialize floating elements with mobile optimization
  useEffect(() => {
    if (config.elementCount === 0) {
      setFloatingElements([]);
      return;
    }
    
    const elements: FloatingElement[] = Array.from({ length: config.elementCount }, (_, i) => {
      const iconData = foodIcons[i % foodIcons.length];
      return {
        id: i,
        x: Math.random() * 80 + 15,
        y: Math.random() * 80 + 15,
        size: Math.random() * 15 + 15, // Smaller icons for mobile
        speed: Math.random() * config.animationSpeed + 0.02,
        direction: Math.random() * Math.PI * 2,
        icon: iconData.icon,
        color: iconData.color,
        animationDelay: i * 1,
        rotationSpeed: Math.random() * 0.5 + 0.2,
        opacity: Math.random() * (config.iconOpacity.max - config.iconOpacity.min) + config.iconOpacity.min
      };
    });
    setFloatingElements(elements);
  }, [foodIcons, config]);

  // Simplified animation loop - disabled on mobile for better performance
  useEffect(() => {
    if (isReducedMotion || isMobile || floatingElements.length === 0) return;

    let lastTime = 0;
    const throttleTime = 100; // Slower update rate for better performance

    const animate = (currentTime: number) => {
      if (currentTime - lastTime >= throttleTime) {
        setFloatingElements(prev => 
          prev.map(element => {
            let newX = element.x + Math.cos(element.direction) * element.speed;
            let newY = element.y + Math.sin(element.direction) * element.speed;
            let newDirection = element.direction;

            // Simple bounce physics
            if (newX <= 10 || newX >= 85) {
              newDirection = Math.PI - element.direction;
              newX = Math.max(10, Math.min(85, newX));
            }
            if (newY <= 10 || newY >= 85) {
              newDirection = -element.direction;
              newY = Math.max(10, Math.min(85, newY));
            }

            return {
              ...element,
              x: newX,
              y: newY,
              direction: newDirection
            };
          })
        );
        lastTime = currentTime;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isReducedMotion, isMobile, floatingElements.length]);

  // Simplified blob configurations - fewer on mobile
  const blobPositions = useMemo(() => {
    const blobCount = isMobile ? 1 : (isReducedMotion ? 2 : 3);
    return Array.from({ length: blobCount }, (_, i) => ({
      left: (Math.random() * 50) + 25,
      top: (Math.random() * 50) + 25,
      width: 60 + Math.random() * 80,
      height: 60 + Math.random() * 80,
      color: foodIcons[i % foodIcons.length].color,
      delay: i * 2
    }));
  }, [foodIcons, isReducedMotion, isMobile]);

  return (
    <div className={`min-h-screen w-full overflow-x-hidden relative ${className}`} role="presentation">
      {/* Simplified Dynamic Background Layer */}
      <div className="fixed inset-0 z-0 w-full h-full">
        {/* Main gradient background - no animation on mobile */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
          style={{
            background: config.gradient,
            backgroundSize: '100% 100%'
          }}
        />

        {/* Simplified floating food icons - none on mobile */}
        {!isMobile && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {floatingElements.map((element) => (
              <motion.div
                key={element.id}
                className="absolute will-change-transform"
                style={{
                  left: `${element.x}%`,
                  top: `${element.y}%`,
                  width: `${element.size}px`,
                  height: `${element.size}px`,
                  color: element.color,
                  opacity: element.opacity,
                  transform: 'translate3d(0,0,0)',
                  filter: `drop-shadow(0 1px 2px rgba(0,0,0,0.1))`,
                  zIndex: 5
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={isReducedMotion ? 
                  { scale: 1, opacity: element.opacity } :
                  { 
                    scale: [0.8, 1.0, 0.8],
                    opacity: [element.opacity * 0.8, element.opacity * 1.0, element.opacity * 0.8]
                  }
                }
                transition={isReducedMotion ? 
                  { duration: 0.5 } :
                  {
                    scale: {
                      duration: 8 + element.animationDelay,
                      repeat: Infinity,
                      ease: "easeInOut"
                    },
                    opacity: {
                      duration: 6 + element.animationDelay * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }
                }
              >
                {element.icon}
              </motion.div>
            ))}
          </div>
        )}

        {/* Simplified organic blob shapes - minimal on mobile */}
        {!isReducedMotion && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {blobPositions.map((blob, i) => (
              <motion.div
                key={`blob-${i}`}
                className="absolute will-change-transform"
                style={{
                  left: `${blob.left}%`,
                  top: `${blob.top}%`,
                  width: `${blob.width}px`,
                  height: `${blob.height}px`,
                  background: `radial-gradient(ellipse, ${blob.color}06, ${blob.color}03 60%, transparent 80%)`,
                  borderRadius: '40% 60% 70% 30%',
                  transform: 'translate3d(0,0,0)',
                  filter: 'blur(1px)'
                }}
                initial={{ scale: 0.2 }}
                animate={{ 
                  scale: isMobile ? [0.3, 0.4, 0.3] : [0.4, 0.6, 0.4],
                  borderRadius: [
                    '40% 60% 70% 30%',
                    '60% 40% 30% 70%',
                    '40% 60% 70% 30%'
                  ]
                }}
                transition={{
                  duration: isMobile ? 15 : 20 + blob.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: blob.delay * 0.5
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full min-h-screen" role="main">
        {children}
      </div>

      {/* Simplified CSS animations */}
      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
          }
        }
        
        @media (max-width: 768px) {
          .will-change-transform {
            will-change: auto;
          }
        }
      `}</style>
    </div>
  );
};

export default FoodBlogBackground;
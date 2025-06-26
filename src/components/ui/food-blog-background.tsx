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
  Cookie,
  Soup,
  Pizza,
  Cherry,
  Grape,
  Croissant
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

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Optimized food icons array with purple and black color scheme
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
    { icon: <Cookie className="w-full h-full" />, color: "#800080" },
    { icon: <Soup className="w-full h-full" />, color: "#4B0082" },
    { icon: <Pizza className="w-full h-full" />, color: "#2E0054" },
    { icon: <Cherry className="w-full h-full" />, color: "#800080" },
    { icon: <Grape className="w-full h-full" />, color: "#4B0082" },
    { icon: <Croissant className="w-full h-full" />, color: "#2E0054" }
  ], []);

  // Variant-specific background configurations with purple/black theme
  const getBackgroundConfig = useMemo(() => {
    switch (variant) {
      case 'hero':
        return {
          gradient: 'linear-gradient(135deg, #800080 0%, #4B0082 25%, #2E0054 50%, #1A001A 75%, #000000 100%)',
          opacity: { min: 0.9, max: 1 },
          elementCount: isReducedMotion ? 5 : 15,
          animationSpeed: isReducedMotion ? 0.1 : 0.4,
          iconOpacity: { min: 0.3, max: 0.6 }
        };
      case 'recipes':
        return {
          gradient: 'linear-gradient(135deg, #4B0082 0%, #800080 25%, #2E0054 50%, #800080 75%, #4B0082 100%)',
          opacity: { min: 0.8, max: 0.95 },
          elementCount: isReducedMotion ? 4 : 13,
          animationSpeed: isReducedMotion ? 0.1 : 0.3,
          iconOpacity: { min: 0.25, max: 0.5 }
        };
      case 'about':
        return {
          gradient: 'linear-gradient(135deg, #2E0054 0%, #4B0082 25%, #800080 50%, #4B0082 75%, #2E0054 100%)',
          opacity: { min: 0.7, max: 0.85 },
          elementCount: isReducedMotion ? 3 : 12,
          animationSpeed: isReducedMotion ? 0.1 : 0.25,
          iconOpacity: { min: 0.2, max: 0.4 }
        };
      case 'contact':
        return {
          gradient: 'linear-gradient(135deg, #1A001A 0%, #2E0054 25%, #4B0082 50%, #2E0054 75%, #000000 100%)',
          opacity: { min: 0.8, max: 0.95 },
          elementCount: isReducedMotion ? 3 : 12,
          animationSpeed: isReducedMotion ? 0.1 : 0.35,
          iconOpacity: { min: 0.25, max: 0.5 }
        };
      default:
        return {
          gradient: 'linear-gradient(135deg, #F8F8FF 0%, #F5F5FF 25%, #F0F0F5 50%, #F5F5FF 75%, #F8F8FF 100%)',
          opacity: { min: 0.9, max: 1 },
          elementCount: isReducedMotion ? 2 : 10,
          animationSpeed: isReducedMotion ? 0.05 : 0.2,
          iconOpacity: { min: 0.15, max: 0.3 }
        };
    }
  }, [variant, isReducedMotion]);

  const config = getBackgroundConfig;

  // Initialize floating elements with performance optimizations
  useEffect(() => {
    const elements: FloatingElement[] = Array.from({ length: config.elementCount }, (_, i) => {
      const iconData = foodIcons[i % foodIcons.length];
      return {
        id: i,
        x: Math.random() * 85 + 10,
        y: Math.random() * 85 + 10,
        size: Math.random() * 25 + 20, // Reduced size for better performance
        speed: Math.random() * config.animationSpeed + 0.05,
        direction: Math.random() * Math.PI * 2,
        icon: iconData.icon,
        color: iconData.color,
        animationDelay: i * 0.5, // Reduced delay
        rotationSpeed: Math.random() * 1 + 0.5, // Reduced rotation speed
        opacity: Math.random() * (config.iconOpacity.max - config.iconOpacity.min) + config.iconOpacity.min
      };
    });
    setFloatingElements(elements);
  }, [foodIcons, config]);

  // Optimized animation loop with better performance
  useEffect(() => {
    if (isReducedMotion) return;

    let lastTime = 0;
    const throttleTime = 32; // 30fps for better performance

    const animate = (currentTime: number) => {
      if (currentTime - lastTime >= throttleTime) {
        setFloatingElements(prev => 
          prev.map(element => {
            let newX = element.x + Math.cos(element.direction) * element.speed;
            let newY = element.y + Math.sin(element.direction) * element.speed;
            let newDirection = element.direction;

            // Optimized bounce physics
            if (newX <= 5 || newX >= 90) {
              newDirection = Math.PI - element.direction;
              newX = Math.max(5, Math.min(90, newX));
            }
            if (newY <= 5 || newY >= 90) {
              newDirection = -element.direction;
              newY = Math.max(5, Math.min(90, newY));
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
  }, [isReducedMotion]);

  // Optimized blob configurations with reduced complexity
  const blobPositions = useMemo(() => 
    Array.from({ length: isReducedMotion ? 2 : 6 }, (_, i) => ({
      left: (Math.random() * 60) + 20,
      top: (Math.random() * 60) + 20,
      width: 80 + Math.random() * 120,
      height: 80 + Math.random() * 120,
      color: foodIcons[i % foodIcons.length].color,
      delay: i * 1.5
    })), [foodIcons, isReducedMotion]
  );

  return (
    <div className={`min-h-screen w-full overflow-x-hidden relative ${className}`} role="presentation">
      {/* Enhanced Dynamic Background Layer */}
      <div className="fixed inset-0 z-0 w-full h-full">
        {/* Main animated gradient background */}
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
          style={{
            background: config.gradient,
            backgroundSize: isReducedMotion ? '100% 100%' : '400% 400%',
            animation: isReducedMotion ? 'none' : `dynamicGradientFlow 25s ease-in-out infinite, dynamicOpacityPulse 25s ease-in-out infinite`
          }}
        />

        {/* Enhanced overlay gradients */}
        {!isReducedMotion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(circle at 25% 25%, rgba(128, 0, 128, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 75% 75%, rgba(75, 0, 130, 0.1) 0%, transparent 50%)
              `,
              animation: 'overlayMovement 30s ease-in-out infinite'
            }}
          />
        )}

        {/* Optimized floating food icons */}
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
                filter: `drop-shadow(0 2px 4px rgba(0,0,0,0.1))`,
                zIndex: 5
              }}
              initial={isReducedMotion ? { scale: 1, rotate: 0 } : { scale: 0, rotate: 0, opacity: 0 }}
              animate={isReducedMotion ? 
                { scale: 1, rotate: 0 } :
                { 
                  scale: [0.8, 1.1, 0.9, 1.0, 0.8],
                  rotate: [0, 180 * element.rotationSpeed],
                  opacity: [
                    element.opacity * 0.8, 
                    element.opacity * 1.1, 
                    element.opacity * 0.9, 
                    element.opacity * 1.0, 
                    element.opacity * 0.8
                  ],
                  x: [0, Math.sin(element.id) * 5, 0],
                  y: [0, Math.cos(element.id) * 5, 0]
                }
              }
              transition={isReducedMotion ? 
                { duration: 0 } :
                {
                  scale: {
                    duration: 15 + element.animationDelay,
                    repeat: Infinity,
                    ease: "easeInOut"
                  },
                  rotate: {
                    duration: 25 + element.animationDelay,
                    repeat: Infinity,
                    ease: "linear"
                  },
                  opacity: {
                    duration: 10 + element.animationDelay * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  },
                  x: {
                    duration: 18 + element.animationDelay,
                    repeat: Infinity,
                    ease: "easeInOut"
                  },
                  y: {
                    duration: 20 + element.animationDelay,
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

        {/* Optimized organic blob shapes */}
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
                  background: `radial-gradient(ellipse, ${blob.color}08, ${blob.color}04 60%, transparent 80%)`,
                  borderRadius: '40% 60% 70% 30%',
                  transform: 'translate3d(0,0,0)',
                  filter: 'blur(1px)'
                }}
                initial={{ scale: 0.2, rotate: 0 }}
                animate={{ 
                  scale: [0.4, 0.7, 0.5, 0.8, 0.4],
                  rotate: [0, 120, 240, 360],
                  borderRadius: [
                    '40% 60% 70% 30%',
                    '60% 40% 30% 70%',
                    '30% 70% 40% 60%',
                    '40% 60% 70% 30%'
                  ]
                }}
                transition={{
                  duration: 25 + blob.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: blob.delay * 0.3
                }}
              />
            ))}
          </div>
        )}

        {/* Optimized texture overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03] mix-blend-soft-light"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23800080' fill-opacity='0.4'%3E%3Cpath d='m20 20v-8h-4v8h-8v4h8v8h4v-8h8v-4h-8z'/%3E%3C/g%3E%3C/svg%3E")`,
            animation: isReducedMotion ? 'none' : 'textureMove 45s linear infinite'
          }}
        />
      </div>

      {/* Content Container with improved z-index management */}
      <div className="relative z-10 w-full min-h-screen" role="main">
        {children}
      </div>

      {/* Optimized CSS animations with reduced motion support */}
      <style jsx>{`
        @keyframes dynamicGradientFlow {
          0% { background-position: 0% 50%; }
          25% { background-position: 100% 50%; }
          50% { background-position: 100% 100%; }
          75% { background-position: 0% 100%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes dynamicOpacityPulse {
          0%, 100% { opacity: ${config.opacity.min}; }
          25% { opacity: ${config.opacity.max}; }
          50% { opacity: ${(config.opacity.min + config.opacity.max) / 2}; }
          75% { opacity: ${config.opacity.max}; }
        }

        @keyframes overlayMovement {
          0% { transform: translate(0%, 0%) rotate(0deg); }
          25% { transform: translate(5%, -3%) rotate(90deg); }
          50% { transform: translate(-3%, 3%) rotate(180deg); }
          75% { transform: translate(-5%, -2%) rotate(270deg); }
          100% { transform: translate(0%, 0%) rotate(360deg); }
        }

        @keyframes textureMove {
          0% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(-10px, -5px) scale(1.02); }
          50% { transform: translate(-5px, -10px) scale(0.98); }
          75% { transform: translate(-12px, -3px) scale(1.01); }
          100% { transform: translate(0, 0) scale(1); }
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default FoodBlogBackground;
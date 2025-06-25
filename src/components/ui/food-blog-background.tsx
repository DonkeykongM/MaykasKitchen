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

  // Expanded food icons array with 15 different icons
  const foodIcons = useMemo(() => [
    { icon: <ChefHat className="w-full h-full" />, color: "#B86344" },
    { icon: <Coffee className="w-full h-full" />, color: "#8A9A5B" },
    { icon: <Utensils className="w-full h-full" />, color: "#2A4356" },
    { icon: <Heart className="w-full h-full" />, color: "#B86344" },
    { icon: <Star className="w-full h-full" />, color: "#8A9A5B" },
    { icon: <Clock className="w-full h-full" />, color: "#2A4356" },
    { icon: <Apple className="w-full h-full" />, color: "#B86344" },
    { icon: <Fish className="w-full h-full" />, color: "#2A4356" },
    { icon: <Wheat className="w-full h-full" />, color: "#8A9A5B" },
    { icon: <Cookie className="w-full h-full" />, color: "#B86344" },
    { icon: <Soup className="w-full h-full" />, color: "#2A4356" },
    { icon: <Pizza className="w-full h-full" />, color: "#B86344" },
    { icon: <Cherry className="w-full h-full" />, color: "#8A9A5B" },
    { icon: <Grape className="w-full h-full" />, color: "#2A4356" },
    { icon: <Croissant className="w-full h-full" />, color: "#B86344" }
  ], []);

  // Variant-specific background configurations with 20-second animations
  const getBackgroundConfig = () => {
    switch (variant) {
      case 'hero':
        return {
          gradient: 'linear-gradient(135deg, #8A2BE2 0%, #6A5ACD 25%, #4169E1 50%, #6A5ACD 75%, #8A2BE2 100%)',
          opacity: { min: 0.8, max: 1 },
          elementCount: 15,
          animationSpeed: 0.4,
          iconOpacity: { min: 0.3, max: 0.6 }
        };
      case 'recipes':
        return {
          gradient: 'linear-gradient(135deg, #B86344 0%, #A55A3E 25%, #8A9A5B 50%, #A55A3E 75%, #B86344 100%)',
          opacity: { min: 0.7, max: 0.9 },
          elementCount: 13,
          animationSpeed: 0.3,
          iconOpacity: { min: 0.25, max: 0.5 }
        };
      case 'about':
        return {
          gradient: 'linear-gradient(135deg, #8A9A5B 0%, #7A8A4B 25%, #2A4356 50%, #7A8A4B 75%, #8A9A5B 100%)',
          opacity: { min: 0.6, max: 0.8 },
          elementCount: 12,
          animationSpeed: 0.25,
          iconOpacity: { min: 0.2, max: 0.4 }
        };
      case 'contact':
        return {
          gradient: 'linear-gradient(135deg, #2A4356 0%, #1F3A4C 25%, #B86344 50%, #1F3A4C 75%, #2A4356 100%)',
          opacity: { min: 0.7, max: 0.9 },
          elementCount: 12,
          animationSpeed: 0.35,
          iconOpacity: { min: 0.25, max: 0.5 }
        };
      default:
        return {
          gradient: 'linear-gradient(135deg, #F9F6F2 0%, #FEF9F3 25%, #F5F1E2 50%, #FEF9F3 75%, #F9F6F2 100%)',
          opacity: { min: 0.8, max: 1 },
          elementCount: 10,
          animationSpeed: 0.2,
          iconOpacity: { min: 0.15, max: 0.3 }
        };
    }
  };

  const config = getBackgroundConfig();

  // Initialize floating elements with enhanced visibility and animations
  useEffect(() => {
    const elements: FloatingElement[] = Array.from({ length: config.elementCount }, (_, i) => {
      const iconData = foodIcons[i % foodIcons.length];
      return {
        id: i,
        x: Math.random() * 85 + 10,
        y: Math.random() * 85 + 10,
        size: Math.random() * 45 + 30, // Larger icons for better visibility
        speed: Math.random() * config.animationSpeed + 0.1,
        direction: Math.random() * Math.PI * 2,
        icon: iconData.icon,
        color: iconData.color,
        animationDelay: i * 0.8, // Staggered animation delays
        rotationSpeed: Math.random() * 2 + 1, // Individual rotation speeds
        opacity: Math.random() * (config.iconOpacity.max - config.iconOpacity.min) + config.iconOpacity.min
      };
    });
    setFloatingElements(elements);
  }, [foodIcons, config.elementCount, config.animationSpeed, config.iconOpacity]);

  // Enhanced animation loop with better performance and visibility
  useEffect(() => {
    let lastTime = 0;
    const throttleTime = 16; // 60fps

    const animate = (currentTime: number) => {
      if (currentTime - lastTime >= throttleTime) {
        setFloatingElements(prev => 
          prev.map(element => {
            let newX = element.x + Math.cos(element.direction) * element.speed;
            let newY = element.y + Math.sin(element.direction) * element.speed;
            let newDirection = element.direction;

            // Enhanced bounce physics with slight randomization
            if (newX <= 5 || newX >= 90) {
              newDirection = Math.PI - element.direction + (Math.random() - 0.5) * 0.2;
              newX = Math.max(5, Math.min(90, newX));
            }
            if (newY <= 5 || newY >= 90) {
              newDirection = -element.direction + (Math.random() - 0.5) * 0.2;
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
  }, []);

  // Enhanced blob configurations
  const blobPositions = useMemo(() => 
    Array.from({ length: 8 }, (_, i) => ({
      left: (Math.random() * 70) + 15,
      top: (Math.random() * 70) + 15,
      width: 120 + Math.random() * 180,
      height: 120 + Math.random() * 180,
      color: foodIcons[i % foodIcons.length].color,
      delay: i * 2.5
    })), [foodIcons]
  );

  return (
    <div className={`min-h-screen w-full overflow-x-hidden relative ${className}`} role="presentation">
      {/* Enhanced Dynamic Background Layer */}
      <div className="fixed inset-0 z-0 w-full h-full">
        {/* Main animated gradient background with 20-second animation */}
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0"
          style={{
            background: config.gradient,
            backgroundSize: '400% 400%',
            animation: `dynamicGradientFlow 20s ease-in-out infinite, dynamicOpacityPulse 20s ease-in-out infinite`
          }}
        />

        {/* Enhanced overlay gradients with 20-second animations */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 25% 25%, rgba(184, 99, 68, 0.15) 0%, transparent 60%),
              radial-gradient(circle at 75% 75%, rgba(138, 154, 91, 0.15) 0%, transparent 60%),
              radial-gradient(circle at 50% 10%, rgba(42, 67, 86, 0.12) 0%, transparent 50%),
              radial-gradient(circle at 20% 80%, rgba(184, 99, 68, 0.12) 0%, transparent 50%)
            `,
            animation: 'overlayMovement 25s ease-in-out infinite'
          }}
        />

        {/* Enhanced floating food icons with increased visibility */}
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
                filter: `drop-shadow(0 2px 8px rgba(0,0,0,0.15)) drop-shadow(0 1px 3px rgba(0,0,0,0.3))`,
                zIndex: 5
              }}
              initial={{ scale: 0, rotate: 0, opacity: 0 }}
              animate={{ 
                scale: [0.8, 1.3, 0.9, 1.2, 0.8],
                rotate: [0, 360 * element.rotationSpeed],
                opacity: [
                  element.opacity * 0.7, 
                  element.opacity * 1.2, 
                  element.opacity * 0.9, 
                  element.opacity * 1.1, 
                  element.opacity * 0.7
                ],
                x: [0, Math.sin(element.id) * 10, 0],
                y: [0, Math.cos(element.id) * 10, 0]
              }}
              transition={{
                scale: {
                  duration: 12 + element.animationDelay,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                rotate: {
                  duration: 20 + element.animationDelay,
                  repeat: Infinity,
                  ease: "linear"
                },
                opacity: {
                  duration: 8 + element.animationDelay * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                x: {
                  duration: 15 + element.animationDelay,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                y: {
                  duration: 18 + element.animationDelay,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              {element.icon}
            </motion.div>
          ))}
        </div>

        {/* Enhanced organic blob shapes with 20-second animations */}
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
                background: `radial-gradient(ellipse, ${blob.color}12, ${blob.color}08 60%, transparent 80%)`,
                borderRadius: '40% 60% 70% 30%',
                transform: 'translate3d(0,0,0)',
                filter: 'blur(2px)'
              }}
              initial={{ scale: 0.2, rotate: 0 }}
              animate={{ 
                scale: [0.4, 0.9, 0.6, 1.0, 0.4],
                rotate: [0, 180, 360],
                borderRadius: [
                  '40% 60% 70% 30%',
                  '60% 40% 30% 70%',
                  '30% 70% 40% 60%',
                  '70% 30% 60% 40%',
                  '40% 60% 70% 30%'
                ]
              }}
              transition={{
                duration: 20 + blob.delay,
                repeat: Infinity,
                ease: "easeInOut",
                delay: blob.delay * 0.5
              }}
            />
          ))}
        </div>

        {/* Enhanced texture and noise overlay */}
        <div 
          className="absolute inset-0 opacity-[0.05] mix-blend-soft-light"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23B86344' fill-opacity='0.6'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            animation: 'textureMove 40s linear infinite'
          }}
        />

        {/* Enhanced light effects with 20-second rotation */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3, delay: 1 }}
          style={{
            background: `
              conic-gradient(from 0deg at 20% 20%, transparent 0deg, rgba(255,255,255,0.08) 120deg, transparent 240deg),
              conic-gradient(from 180deg at 80% 80%, transparent 0deg, rgba(255,255,255,0.06) 120deg, transparent 240deg)
            `,
            animation: 'lightRotation 45s linear infinite'
          }}
        />

        {/* Additional sparkle effects for enhanced visibility */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 8 }, (_, i) => (
            <motion.div
              key={`sparkle-${i}`}
              className="absolute w-2 h-2 bg-white/40 rounded-full"
              style={{
                left: `${15 + i * 10}%`,
                top: `${20 + (i % 3) * 25}%`,
                filter: 'blur(1px)'
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0.5, 1.5, 0.5],
                x: [0, Math.random() * 20 - 10, 0],
                y: [0, Math.random() * 20 - 10, 0]
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.8
              }}
            />
          ))}
        </div>
      </div>

      {/* Content Container with improved z-index management */}
      <div className="relative z-10 w-full min-h-screen" role="main">
        {children}
      </div>

      {/* Enhanced Dynamic CSS animations with 20-second cycles */}
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
          25% { transform: translate(8%, -6%) rotate(90deg); }
          50% { transform: translate(-5%, 5%) rotate(180deg); }
          75% { transform: translate(-8%, -3%) rotate(270deg); }
          100% { transform: translate(0%, 0%) rotate(360deg); }
        }

        @keyframes textureMove {
          0% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(-15px, -8px) scale(1.05); }
          50% { transform: translate(-8px, -15px) scale(0.95); }
          75% { transform: translate(-20px, -5px) scale(1.02); }
          100% { transform: translate(0, 0) scale(1); }
        }

        @keyframes lightRotation {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.1); }
          100% { transform: rotate(360deg) scale(1); }
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
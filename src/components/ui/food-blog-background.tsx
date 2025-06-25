"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ChefHat, Coffee, Utensils, Heart, Star, Clock } from "lucide-react";

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

  // Enhanced food icons with more variety
  const foodIcons = useMemo(() => [
    { icon: <ChefHat className="w-full h-full" />, color: "#B86344" },
    { icon: <Coffee className="w-full h-full" />, color: "#8A9A5B" },
    { icon: <Utensils className="w-full h-full" />, color: "#2A4356" },
    { icon: <Heart className="w-full h-full" />, color: "#B86344" },
    { icon: <Star className="w-full h-full" />, color: "#8A9A5B" },
    { icon: <Clock className="w-full h-full" />, color: "#2A4356" }
  ], []);

  // Variant-specific background configurations
  const getBackgroundConfig = () => {
    switch (variant) {
      case 'hero':
        return {
          gradient: 'linear-gradient(135deg, #8A2BE2 0%, #6A5ACD 25%, #4169E1 50%, #6A5ACD 75%, #8A2BE2 100%)',
          opacity: { min: 0.8, max: 1 },
          elementCount: 15,
          animationSpeed: 0.3
        };
      case 'recipes':
        return {
          gradient: 'linear-gradient(135deg, #B86344 0%, #A55A3E 25%, #8A9A5B 50%, #A55A3E 75%, #B86344 100%)',
          opacity: { min: 0.7, max: 0.9 },
          elementCount: 12,
          animationSpeed: 0.2
        };
      case 'about':
        return {
          gradient: 'linear-gradient(135deg, #8A9A5B 0%, #7A8A4B 25%, #2A4356 50%, #7A8A4B 75%, #8A9A5B 100%)',
          opacity: { min: 0.6, max: 0.8 },
          elementCount: 10,
          animationSpeed: 0.15
        };
      case 'contact':
        return {
          gradient: 'linear-gradient(135deg, #2A4356 0%, #1F3A4C 25%, #B86344 50%, #1F3A4C 75%, #2A4356 100%)',
          opacity: { min: 0.7, max: 0.9 },
          elementCount: 12,
          animationSpeed: 0.25
        };
      default:
        return {
          gradient: 'linear-gradient(135deg, #F9F6F2 0%, #FEF9F3 25%, #F5F1E2 50%, #FEF9F3 75%, #F9F6F2 100%)',
          opacity: { min: 0.8, max: 1 },
          elementCount: 8,
          animationSpeed: 0.1
        };
    }
  };

  const config = getBackgroundConfig();

  // Initialize floating elements with enhanced animations
  useEffect(() => {
    const elements: FloatingElement[] = Array.from({ length: config.elementCount }, (_, i) => {
      const iconData = foodIcons[i % foodIcons.length];
      return {
        id: i,
        x: Math.random() * 85 + 10,
        y: Math.random() * 85 + 10,
        size: Math.random() * 40 + 25,
        speed: Math.random() * config.animationSpeed + 0.05,
        direction: Math.random() * Math.PI * 2,
        icon: iconData.icon,
        color: iconData.color,
        animationDelay: i * 0.5
      };
    });
    setFloatingElements(elements);
  }, [foodIcons, config.elementCount, config.animationSpeed]);

  // Enhanced animation loop with better performance
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

            // Enhanced bounce physics
            if (newX <= 5 || newX >= 90) {
              newDirection = Math.PI - element.direction + (Math.random() - 0.5) * 0.1;
              newX = Math.max(5, Math.min(90, newX));
            }
            if (newY <= 5 || newY >= 90) {
              newDirection = -element.direction + (Math.random() - 0.5) * 0.1;
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
      width: 120 + Math.random() * 150,
      height: 120 + Math.random() * 150,
      color: foodIcons[i % foodIcons.length].color,
      delay: i * 2
    })), [foodIcons]
  );

  return (
    <div className={`min-h-screen w-full overflow-x-hidden relative ${className}`} role="presentation">
      {/* Enhanced Dynamic Background Layer */}
      <div className="fixed inset-0 z-0 w-full h-full">
        {/* Main animated gradient background */}
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0"
          style={{
            background: config.gradient,
            backgroundSize: '400% 400%',
            animation: `dynamicGradientFlow 20s ease-in-out infinite, dynamicOpacityPulse 15s ease-in-out infinite`
          }}
        />

        {/* Enhanced overlay gradients */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 25% 25%, rgba(184, 99, 68, 0.12) 0%, transparent 60%),
              radial-gradient(circle at 75% 75%, rgba(138, 154, 91, 0.12) 0%, transparent 60%),
              radial-gradient(circle at 50% 10%, rgba(42, 67, 86, 0.08) 0%, transparent 50%),
              radial-gradient(circle at 20% 80%, rgba(184, 99, 68, 0.08) 0%, transparent 50%)
            `,
            animation: 'overlayMovement 25s ease-in-out infinite'
          }}
        />

        {/* Enhanced floating food icons */}
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
                opacity: 0.08,
                transform: 'translate3d(0,0,0)',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
              }}
              initial={{ scale: 0, rotate: 0, opacity: 0 }}
              animate={{ 
                scale: [0.7, 1.2, 0.8, 1.1, 0.7],
                rotate: [0, 180, 360],
                opacity: [0.05, 0.15, 0.08, 0.12, 0.05]
              }}
              transition={{
                scale: {
                  duration: 8 + element.animationDelay,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                rotate: {
                  duration: 30 + element.animationDelay * 2,
                  repeat: Infinity,
                  ease: "linear"
                },
                opacity: {
                  duration: 6 + element.animationDelay,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              {element.icon}
            </motion.div>
          ))}
        </div>

        {/* Enhanced organic blob shapes */}
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
                scale: [0.3, 0.8, 0.5, 0.9, 0.3],
                rotate: [0, 120, 240, 360],
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

        {/* Subtle texture and noise overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03] mix-blend-soft-light"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23B86344' fill-opacity='0.4'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            animation: 'textureMove 40s linear infinite'
          }}
        />

        {/* Enhanced light effects */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3, delay: 1 }}
          style={{
            background: `
              conic-gradient(from 0deg at 15% 15%, transparent 0deg, rgba(255,255,255,0.05) 120deg, transparent 240deg),
              conic-gradient(from 180deg at 85% 85%, transparent 0deg, rgba(255,255,255,0.03) 120deg, transparent 240deg)
            `,
            animation: 'lightRotation 45s linear infinite'
          }}
        />
      </div>

      {/* Content Container with improved z-index management */}
      <div className="relative z-10 w-full min-h-screen" role="main">
        {children}
      </div>

      {/* Dynamic CSS animations */}
      <style jsx>{`
        @keyframes dynamicGradientFlow {
          0% { background-position: 0% 50%; }
          20% { background-position: 100% 50%; }
          40% { background-position: 100% 100%; }
          60% { background-position: 0% 100%; }
          80% { background-position: 0% 0%; }
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
          25% { transform: translate(5%, -5%) rotate(90deg); }
          50% { transform: translate(-3%, 3%) rotate(180deg); }
          75% { transform: translate(-5%, -2%) rotate(270deg); }
          100% { transform: translate(0%, 0%) rotate(360deg); }
        }

        @keyframes textureMove {
          0% { transform: translate(0, 0); }
          25% { transform: translate(-10px, -5px); }
          50% { transform: translate(-5px, -10px); }
          75% { transform: translate(-15px, -2px); }
          100% { transform: translate(0, 0); }
        }

        @keyframes lightRotation {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
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
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
}

interface FoodBlogBackgroundProps {
  className?: string;
  children?: React.ReactNode;
}

const FoodBlogBackground: React.FC<FoodBlogBackgroundProps> = ({
  className = "",
  children
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [floatingElements, setFloatingElements] = useState<FloatingElement[]>([]);
  const animationRef = useRef<number>();

  // Memoize food icons to prevent recreation on every render
  const foodIcons = useMemo(() => [
    { icon: <ChefHat className="w-full h-full" />, color: "#B86344" },
    { icon: <Coffee className="w-full h-full" />, color: "#8A9A5B" },
    { icon: <Utensils className="w-full h-full" />, color: "#2A4356" },
    { icon: <Heart className="w-full h-full" />, color: "#B86344" },
    { icon: <Star className="w-full h-full" />, color: "#8A9A5B" },
    { icon: <Clock className="w-full h-full" />, color: "#2A4356" }
  ], []);

  // Initialize floating elements with performance optimizations
  useEffect(() => {
    const elements: FloatingElement[] = Array.from({ length: 12 }, (_, i) => {
      const iconData = foodIcons[i % foodIcons.length];
      return {
        id: i,
        x: Math.random() * 80 + 10, // Safe bounds
        y: Math.random() * 80 + 10,
        size: Math.random() * 35 + 20,
        speed: Math.random() * 0.2 + 0.1,
        direction: Math.random() * Math.PI * 2,
        icon: iconData.icon,
        color: iconData.color
      };
    });
    setFloatingElements(elements);
  }, [foodIcons]);

  // Optimized animation loop with throttling
  useEffect(() => {
    let lastTime = 0;
    const throttleTime = 16; // ~60fps

    const animate = (currentTime: number) => {
      if (currentTime - lastTime >= throttleTime) {
        setFloatingElements(prev => 
          prev.map(element => {
            let newX = element.x + Math.cos(element.direction) * element.speed;
            let newY = element.y + Math.sin(element.direction) * element.speed;
            let newDirection = element.direction;

            // Bounce off edges
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
  }, []);

  // Memoize blob positions for better performance
  const blobPositions = useMemo(() => 
    Array.from({ length: 6 }, (_, i) => ({
      left: Math.random() * 60 + 20,
      top: Math.random() * 60 + 20,
      width: 80 + Math.random() * 100,
      height: 80 + Math.random() * 100,
      color: foodIcons[i % foodIcons.length].color
    })), [foodIcons]
  );

  return (
    <div className={`min-h-screen w-full overflow-x-hidden relative ${className}`} role="presentation">
      {/* FIXED Background Layer - Optimized */}
      <div className="fixed inset-0 z-0 w-full h-full">
        {/* Enhanced gradient background */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(135deg, #FEF3E2 0%, #F9F1E2 25%, #FFF8E1 50%, #FEF3E2 75%, #F9F1E2 100%),
              radial-gradient(circle at 25% 25%, rgba(184, 99, 68, 0.08) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(138, 154, 91, 0.08) 0%, transparent 50%)
            `
          }}
        />

        {/* Floating Food Icons - Performance optimized */}
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
                opacity: 0.15,
                transform: 'translate3d(0,0,0)' // Force hardware acceleration
              }}
              animate={{ 
                scale: [0.8, 1.1, 0.8],
                rotate: [0, 360]
              }}
              transition={{
                scale: {
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                rotate: {
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }
              }}
            >
              {element.icon}
            </motion.div>
          ))}
        </div>

        {/* Optimized blob shapes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {blobPositions.map((blob, i) => (
            <motion.div
              key={`blob-${i}`}
              className="absolute rounded-full will-change-transform"
              style={{
                left: `${blob.left}%`,
                top: `${blob.top}%`,
                width: `${blob.width}px`,
                height: `${blob.height}px`,
                background: `radial-gradient(circle, ${blob.color}15, transparent 70%)`,
                transform: 'translate3d(0,0,0)'
              }}
              animate={{ 
                scale: [0.3, 0.7, 0.3],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 15 + i * 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Subtle texture overlay */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23B86344' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
      </div>

      {/* Content Container with improved accessibility */}
      <div className="relative z-10 w-full min-h-screen" role="main">
        {children}
      </div>
    </div>
  );
};

export default FoodBlogBackground;
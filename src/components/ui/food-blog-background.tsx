"use client";

import React, { useEffect, useRef, useState } from "react";
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

  const foodIcons = [
    { icon: <ChefHat className="w-full h-full" />, color: "#B86344" },
    { icon: <Coffee className="w-full h-full" />, color: "#8A9A5B" },
    { icon: <Utensils className="w-full h-full" />, color: "#2A4356" },
    { icon: <Heart className="w-full h-full" />, color: "#B86344" },
    { icon: <Star className="w-full h-full" />, color: "#8A9A5B" },
    { icon: <Clock className="w-full h-full" />, color: "#2A4356" }
  ];

  useEffect(() => {
    console.log("🎨 FoodBlogBackground: Initiating floating elements...");
    const elements: FloatingElement[] = Array.from({ length: 15 }, (_, i) => {
      const iconData = foodIcons[i % foodIcons.length];
      return {
        id: i,
        x: Math.random() * 85 + 5, // Keep within safe bounds
        y: Math.random() * 85 + 5,
        size: Math.random() * 40 + 25, // Larger size for better visibility
        speed: Math.random() * 0.3 + 0.15, // Faster movement
        direction: Math.random() * Math.PI * 2,
        icon: iconData.icon,
        color: iconData.color
      };
    });
    setFloatingElements(elements);
    console.log("✅ FoodBlogBackground: Floating elements created:", elements.length);
  }, []);

  useEffect(() => {
    let animationFrame: number;

    const animate = () => {
      setFloatingElements(prev => 
        prev.map(element => {
          let newX = element.x + Math.cos(element.direction) * element.speed;
          let newY = element.y + Math.sin(element.direction) * element.speed;
          let newDirection = element.direction;

          // Bounce off edges with margin
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
      animationFrame = requestAnimationFrame(animate);
    };

    console.log("🚀 FoodBlogBackground: Starting animation loop...");
    animationFrame = requestAnimationFrame(animate);
    
    return () => {
      console.log("🛑 FoodBlogBackground: Stopping animation loop");
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  console.log("🎬 FoodBlogBackground: Rendering with", floatingElements.length, "elements");

  return (
    <div className={`min-h-screen w-full overflow-x-hidden relative ${className}`}>
      {/* FIXED Background Layer */}
      <div className="fixed inset-0 z-0 w-full h-full">
        {/* Main Background with stronger colors */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-gradient-to-br from-orange-100/90 via-red-100/70 to-yellow-100/90"
        />

        {/* Colorful Gradient Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3, delay: 0.5 }}
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 20% 30%, rgba(184, 99, 68, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(138, 154, 91, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(42, 67, 86, 0.12) 0%, transparent 50%)
            `
          }}
        />

        {/* Floating Food Icons with higher opacity */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {floatingElements.map((element) => (
            <motion.div
              key={element.id}
              className="absolute opacity-25" // Increased opacity
              style={{
                left: `${element.x}%`,
                top: `${element.y}%`,
                width: `${element.size}px`,
                height: `${element.size}px`,
                color: element.color,
                zIndex: 1
              }}
              initial={{ scale: 0, rotate: 0, opacity: 0 }}
              animate={{ 
                scale: [0.7, 1.2, 0.7],
                rotate: [0, 360],
                opacity: [0.15, 0.3, 0.15]
              }}
              transition={{
                scale: {
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                rotate: {
                  duration: 15 + Math.random() * 10,
                  repeat: Infinity,
                  ease: "linear"
                },
                opacity: {
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              {element.icon}
            </motion.div>
          ))}
        </div>

        {/* Organic Blob Shapes with more visibility */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`blob-${i}`}
              className="absolute rounded-full opacity-8" // Increased opacity
              style={{
                left: `${Math.random() * 70 + 15}%`,
                top: `${Math.random() * 70 + 15}%`,
                width: `${100 + Math.random() * 150}px`,
                height: `${100 + Math.random() * 150}px`,
                background: `linear-gradient(45deg, ${foodIcons[i % foodIcons.length].color}25, transparent)`,
                zIndex: 0
              }}
              initial={{ scale: 0.2, rotate: 0 }}
              animate={{ 
                scale: [0.2, 0.9, 0.2],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 15 + Math.random() * 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Subtle pattern overlay with more visibility */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23B86344' fill-opacity='0.3'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
      </div>

      {/* Scrollable Content Container */}
      <div className="relative z-10 w-full min-h-screen">
        {children}
      </div>
    </div>
  );
};

export default FoodBlogBackground;
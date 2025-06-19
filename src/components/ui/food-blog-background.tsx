"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChefHat, Coffee, Utensils, Heart, Star, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
    const elements: FloatingElement[] = Array.from({ length: 15 }, (_, i) => {
      const iconData = foodIcons[i % foodIcons.length];
      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 35 + 25,
        speed: Math.random() * 0.3 + 0.1,
        direction: Math.random() * Math.PI * 2,
        icon: iconData.icon,
        color: iconData.color
      };
    });
    setFloatingElements(elements);
  }, []);

  useEffect(() => {
    let animationFrame: number;

    const animate = () => {
      setFloatingElements(prev => 
        prev.map(element => {
          let newX = element.x + Math.cos(element.direction) * element.speed;
          let newY = element.y + Math.sin(element.direction) * element.speed;
          let newDirection = element.direction;

          if (newX <= 0 || newX >= 100) {
            newDirection = Math.PI - element.direction;
            newX = Math.max(0, Math.min(100, newX));
          }
          if (newY <= 0 || newY >= 100) {
            newDirection = -element.direction;
            newY = Math.max(0, Math.min(100, newY));
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

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div className={`fixed inset-0 w-full h-full overflow-hidden ${className}`}>
      {/* Main Background Gradient */}
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 3, ease: "easeOut" }}
        className="absolute inset-0 bg-gradient-to-br from-orange-50/80 via-red-50/60 to-yellow-50/80 dark:from-orange-950/80 dark:via-red-950/60 dark:to-yellow-950/80"
      />

      {/* Animated Gradient Overlay */}
      <motion.div
        initial={{ opacity: 0, scale: 1.2 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(184, 99, 68, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(138, 154, 91, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(42, 67, 86, 0.08) 0%, transparent 50%)
          `
        }}
      />

      {/* Floating Food Icons */}
      <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        {floatingElements.map((element) => (
          <motion.div
            key={element.id}
            className="absolute opacity-15 dark:opacity-25"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              width: `${element.size}px`,
              height: `${element.size}px`,
              color: element.color
            }}
            initial={{ scale: 0, rotate: 0, opacity: 0 }}
            animate={{ 
              scale: [0.8, 1.1, 0.8],
              rotate: [0, 360],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{
              scale: {
                duration: 6 + Math.random() * 3,
                repeat: Infinity,
                ease: "easeInOut"
              },
              rotate: {
                duration: 25 + Math.random() * 15,
                repeat: Infinity,
                ease: "linear"
              },
              opacity: {
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            {element.icon}
          </motion.div>
        ))}
      </div>

      {/* Floating Recipe Cards */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`card-${i}`}
            className="absolute opacity-8 dark:opacity-15"
            style={{
              left: `${15 + i * 20}%`,
              top: `${5 + i * 20}%`
            }}
            initial={{ y: 0, rotate: -3 + i * 2, opacity: 0 }}
            animate={{ 
              y: [-15, 15, -15],
              rotate: [-8 + i * 4, 8 + i * 4, -8 + i * 4],
              opacity: [0.05, 0.1, 0.05]
            }}
            transition={{
              duration: 10 + i * 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Card className="w-40 h-24 p-3 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm border-none">
              <div className="space-y-1">
                <div className="h-2 bg-gray-300/50 dark:bg-gray-600/50 rounded w-3/4"></div>
                <div className="h-1.5 bg-gray-200/50 dark:bg-gray-700/50 rounded w-1/2"></div>
                <div className="flex gap-1">
                  <Badge variant="secondary" className="text-xs opacity-70 h-4">Recipe</Badge>
                  <Badge variant="outline" className="text-xs opacity-70 h-4">Quick</Badge>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Organic Blob Shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`blob-${i}`}
            className="absolute rounded-full opacity-4 dark:opacity-8"
            style={{
              left: `${Math.random() * 90}%`,
              top: `${Math.random() * 90}%`,
              width: `${150 + Math.random() * 200}px`,
              height: `${150 + Math.random() * 200}px`,
              background: `linear-gradient(45deg, ${foodIcons[i % foodIcons.length].color}20, transparent)`
            }}
            initial={{ scale: 0.3, rotate: 0 }}
            animate={{ 
              scale: [0.3, 0.8, 0.3],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 20 + Math.random() * 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full h-full overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default FoodBlogBackground;
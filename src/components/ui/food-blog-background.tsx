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
    { icon: <ChefHat className="w-full h-full" />, color: "#FF6B6B" },
    { icon: <Coffee className="w-full h-full" />, color: "#4ECDC4" },
    { icon: <Utensils className="w-full h-full" />, color: "#45B7D1" },
    { icon: <Heart className="w-full h-full" />, color: "#96CEB4" },
    { icon: <Star className="w-full h-full" />, color: "#FFEAA7" },
    { icon: <Clock className="w-full h-full" />, color: "#DDA0DD" }
  ];

  useEffect(() => {
    const elements: FloatingElement[] = Array.from({ length: 12 }, (_, i) => {
      const iconData = foodIcons[i % foodIcons.length];
      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 30 + 20,
        speed: Math.random() * 0.5 + 0.2,
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
    <div className={`relative min-h-screen overflow-hidden bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 dark:from-orange-950 dark:via-red-950 dark:to-yellow-950 ${className}`}>
      {/* Animated Gradient Background */}
      <motion.div
        initial={{ opacity: 0, scale: 1.2 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(255, 107, 107, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(78, 205, 196, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(255, 234, 167, 0.1) 0%, transparent 50%)
          `
        }}
      />

      {/* Floating Food Icons */}
      <div ref={containerRef} className="absolute inset-0 pointer-events-none">
        {floatingElements.map((element) => (
          <motion.div
            key={element.id}
            className="absolute opacity-20 dark:opacity-30"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              width: `${element.size}px`,
              height: `${element.size}px`,
              color: element.color
            }}
            initial={{ scale: 0, rotate: 0 }}
            animate={{ 
              scale: [0.8, 1.2, 0.8],
              rotate: [0, 360]
            }}
            transition={{
              scale: {
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut"
              },
              rotate: {
                duration: 20 + Math.random() * 10,
                repeat: Infinity,
                ease: "linear"
              }
            }}
          >
            {element.icon}
          </motion.div>
        ))}
      </div>

      {/* Floating Recipe Cards */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`card-${i}`}
            className="absolute opacity-10 dark:opacity-20"
            style={{
              left: `${20 + i * 30}%`,
              top: `${10 + i * 25}%`
            }}
            initial={{ y: 0, rotate: -5 + i * 5 }}
            animate={{ 
              y: [-20, 20, -20],
              rotate: [-10 + i * 5, 10 + i * 5, -10 + i * 5]
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Card className="w-48 h-32 p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
              <div className="space-y-2">
                <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                <div className="flex gap-1">
                  <Badge variant="secondary" className="text-xs">Recipe</Badge>
                  <Badge variant="outline" className="text-xs">5 min</Badge>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Organic Blob Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`blob-${i}`}
            className="absolute rounded-full opacity-5 dark:opacity-10"
            style={{
              left: `${Math.random() * 80}%`,
              top: `${Math.random() * 80}%`,
              width: `${200 + Math.random() * 300}px`,
              height: `${200 + Math.random() * 300}px`,
              background: `linear-gradient(45deg, ${foodIcons[i % foodIcons.length].color}, transparent)`
            }}
            initial={{ scale: 0.5, rotate: 0 }}
            animate={{ 
              scale: [0.5, 1, 0.5],
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

      {/* Content */}
      <div className="relative z-10">
        {children || (
          <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <motion.h1 
                className="text-6xl md:text-8xl font-bold text-orange-600 dark:text-orange-400 mb-6"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                Delicious
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
              >
                Discover amazing recipes and culinary adventures
              </motion.p>
              <motion.div
                className="flex flex-wrap justify-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.5 }}
              >
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  <ChefHat className="w-4 h-4 mr-2" />
                  Chef Approved
                </Badge>
                <Badge variant="outline" className="text-lg px-4 py-2">
                  <Star className="w-4 h-4 mr-2" />
                  5-Star Recipes
                </Badge>
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  <Clock className="w-4 h-4 mr-2" />
                  Quick & Easy
                </Badge>
              </motion.div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodBlogBackground;
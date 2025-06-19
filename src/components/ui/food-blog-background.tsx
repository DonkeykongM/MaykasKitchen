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
    { icon: <Heart className="w-full h-full" />, color: "#5C4637" },
    { icon: <Star className="w-full h-full" />, color: "#B86344" },
    { icon: <Clock className="w-full h-full" />, color: "#8A9A5B" }
  ];

  useEffect(() => {
    const elements: FloatingElement[] = Array.from({ length: 8 }, (_, i) => {
      const iconData = foodIcons[i % foodIcons.length];
      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 20 + 15,
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
    <div className={`relative min-h-screen overflow-hidden bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 ${className}`}>
      {/* Animated Gradient Background */}
      <motion.div
        initial={{ opacity: 0, scale: 1.2 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(184, 99, 68, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(138, 154, 91, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(245, 241, 226, 0.1) 0%, transparent 50%)
          `
        }}
      />

      {/* Floating Food Icons */}
      <div ref={containerRef} className="absolute inset-0 pointer-events-none">
        {floatingElements.map((element) => (
          <motion.div
            key={element.id}
            className="absolute opacity-10"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              width: `${element.size}px`,
              height: `${element.size}px`,
              color: element.color
            }}
            initial={{ scale: 0, rotate: 0 }}
            animate={{ 
              scale: [0.8, 1.1, 0.8],
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

      {/* Floating Recipe Cards - fewer and smaller for food blog aesthetic */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(2)].map((_, i) => (
          <motion.div
            key={`card-${i}`}
            className="absolute opacity-5"
            style={{
              left: `${20 + i * 40}%`,
              top: `${15 + i * 30}%`
            }}
            initial={{ y: 0, rotate: -3 + i * 3 }}
            animate={{ 
              y: [-15, 15, -15],
              rotate: [-8 + i * 4, 8 + i * 4, -8 + i * 4]
            }}
            transition={{
              duration: 12 + i * 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Card className="w-32 h-20 p-3 bg-white/30 backdrop-blur-sm border-primary-color/20">
              <div className="space-y-1">
                <div className="h-2 bg-primary-color/30 rounded w-3/4"></div>
                <div className="h-1 bg-primary-color/20 rounded w-1/2"></div>
                <div className="flex gap-1">
                  <Badge variant="secondary" className="text-xs px-1 py-0 h-3">Recept</Badge>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Organic Blob Shapes with food blog colors */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`blob-${i}`}
            className="absolute rounded-full opacity-3"
            style={{
              left: `${Math.random() * 70 + 15}%`,
              top: `${Math.random() * 70 + 15}%`,
              width: `${150 + Math.random() * 200}px`,
              height: `${150 + Math.random() * 200}px`,
              background: `linear-gradient(45deg, ${foodIcons[i % foodIcons.length].color}, transparent)`
            }}
            initial={{ scale: 0.3, rotate: 0 }}
            animate={{ 
              scale: [0.3, 0.7, 0.3],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
};

export default FoodBlogBackground;
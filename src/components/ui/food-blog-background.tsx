"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface FoodBlogBackgroundProps {
  className?: string;
  children?: React.ReactNode;
}

const FoodBlogBackground: React.FC<FoodBlogBackgroundProps> = ({
  className = "",
  children
}) => {
  const [colorIndex, setColorIndex] = useState(0);
  
  // Kraftiga färger som VERKLIGEN syns
  const backgroundColors = [
    "linear-gradient(45deg, #FFE5B4 0%, #FFCCCB 50%, #E6E6FA 100%)",
    "linear-gradient(45deg, #FFB6C1 0%, #FFA07A 50%, #98FB98 100%)",
    "linear-gradient(45deg, #F0E68C 0%, #DDA0DD 50%, #87CEEB 100%)",
    "linear-gradient(45deg, #FFEFD5 0%, #F5DEB3 50%, #D3D3D3 100%)"
  ];

  useEffect(() => {
    console.log("🎨 STARK BAKGRUND STARTAR!");
    
    // Ändra bakgrundsfärg var 3:e sekund
    const interval = setInterval(() => {
      setColorIndex(prev => (prev + 1) % backgroundColors.length);
      console.log("🌈 Byter bakgrundsfärg till index:", (colorIndex + 1) % backgroundColors.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [colorIndex, backgroundColors.length]);

  return (
    <div className={`min-h-screen w-full relative ${className}`}>
      {/* SUPER TYDLIG ANIMERAD BAKGRUND */}
      <motion.div
        className="fixed inset-0 w-full h-full z-0"
        animate={{
          background: backgroundColors[colorIndex]
        }}
        transition={{
          duration: 2,
          ease: "easeInOut"
        }}
        style={{
          background: backgroundColors[colorIndex]
        }}
      />

      {/* Stora rörliga cirklar som GARANTERAT syns */}
      <div className="fixed inset-0 z-1 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: "200px",
              height: "200px",
              background: `radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)`,
              left: `${20 + i * 15}%`,
              top: `${10 + i * 20}%`
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.7, 0.3],
              rotate: [0, 360]
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Pulsande text som visar att animationen fungerar */}
      <motion.div
        className="fixed top-10 right-10 z-50 bg-red-500 text-white p-4 rounded-lg font-bold"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{
          duration: 2,
          repeat: Infinity
        }}
      >
        🎨 BAKGRUND AKTIV!
      </motion.div>

      {/* Content */}
      <div className="relative z-10 w-full min-h-screen">
        {children}
      </div>
    </div>
  );
};

export default FoodBlogBackground;
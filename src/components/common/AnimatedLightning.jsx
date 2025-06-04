import React from 'react';
import { motion } from 'framer-motion';

const AnimatedLightning = () => {
  return (
    <motion.div
      className="inline-block"
      initial={{ y: 0 }}
      animate={{ y: [-2, 2, -2] }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <svg 
        width="48" 
        height="48" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Main Lightning Bolt */}
        <motion.path
          d="M13 2L4 14H12L11 22L20 10H12L13 2Z"
          fill="url(#lightning-gradient)"
          initial={{ opacity: 0.6 }}
          animate={{ 
            opacity: [0.6, 1, 0.6],
            filter: [
              'drop-shadow(0 0 2px #FCD34D)',
              'drop-shadow(0 0 8px #FCD34D)',
              'drop-shadow(0 0 2px #FCD34D)'
            ]
          }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Energy Particles */}
        <motion.circle
          cx="16"
          cy="8"
          r="1"
          fill="#FCD34D"
          animate={{ 
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
            y: [-4, 0, 4]
          }}
          transition={{ 
            duration: 1,
            repeat: Infinity,
            delay: 0.2
          }}
        />
        <motion.circle
          cx="18"
          cy="12"
          r="0.5"
          fill="#FBBF24"
          animate={{ 
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
            y: [-3, 0, 3]
          }}
          transition={{ 
            duration: 1,
            repeat: Infinity,
            delay: 0.5
          }}
        />
        <motion.circle
          cx="14"
          cy="10"
          r="0.5"
          fill="#F59E0B"
          animate={{ 
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
            y: [-2, 0, 2]
          }}
          transition={{ 
            duration: 1,
            repeat: Infinity,
            delay: 0.8
          }}
        />

        {/* Gradient Definition */}
        <defs>
          <linearGradient id="lightning-gradient" x1="4" y1="2" x2="20" y2="22" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FCD34D" />
            <stop offset="0.5" stopColor="#F59E0B" />
            <stop offset="1" stopColor="#D97706" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
};

export default AnimatedLightning;

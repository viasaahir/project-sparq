import React from 'react';
import { motion } from 'framer-motion';

const AnimatedRocket = () => {
  return (
    <motion.div
      className="inline-block"
      animate={{ 
        y: [0, -4, 4, -2, 0],
      }}
      transition={{ 
        duration: 2.5,
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
        className="transform rotate-45"
      >
        {/* Rocket Body */}
        <motion.path
          d="M4.5 16.5L8 20M8 20L11.5 16.5M8 20L8 13.5M8 13.5C8 10.8478 9.05357 8.30516 10.9289 6.42975C12.8043 4.55433 15.3478 3.5 18 3.5C18 6.15216 16.9464 8.69485 15.0711 10.5703C13.1957 12.4457 10.6522 13.5 8 13.5Z"
          stroke="url(#rocket-gradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        
        {/* Flame */}
        <motion.path
          d="M8 13.5V17.5"
          stroke="url(#flame-gradient)"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0.5 }}
          animate={{ 
            pathLength: [0, 1, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ 
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Gradients */}
        <defs>
          <linearGradient id="rocket-gradient" x1="4.5" y1="3.5" x2="18" y2="20" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F472B6" />
            <stop offset="1" stopColor="#60A5FA" />
          </linearGradient>
          <linearGradient id="flame-gradient" x1="8" y1="13.5" x2="8" y2="17.5" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F59E0B" />
            <stop offset="1" stopColor="#EF4444" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
};

export default AnimatedRocket;

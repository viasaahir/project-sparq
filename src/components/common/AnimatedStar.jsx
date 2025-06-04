import React from 'react';
import { motion } from 'framer-motion';

const AnimatedStar = () => {
  return (
    <motion.div
      className="inline-block"
      animate={{ 
        scale: [1, 1.2, 1],
        rotate: [0, 360],
      }}
      transition={{ 
        duration: 3,
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
        {/* Main star */}
        <motion.path
          d="M12 2L14.4 9.6H22L15.8 14.4L18.2 22L12 17.2L5.8 22L8.2 14.4L2 9.6H9.6L12 2Z"
          fill="url(#star-gradient)"
          initial={{ scale: 0.8, opacity: 0.5 }}
          animate={{ 
            scale: [0.8, 1, 0.8],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Sparkles */}
        <motion.circle
          cx="18"
          cy="4"
          r="1"
          fill="#60A5FA"
          initial={{ scale: 0 }}
          animate={{ 
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
            delay: 0.5,
            ease: "easeInOut"
          }}
        />
        <motion.circle
          cx="6"
          cy="6"
          r="1"
          fill="#F472B6"
          initial={{ scale: 0 }}
          animate={{ 
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
            delay: 1,
            ease: "easeInOut"
          }}
        />
        <motion.circle
          cx="20"
          cy="12"
          r="1"
          fill="#34D399"
          initial={{ scale: 0 }}
          animate={{ 
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
            delay: 0,
            ease: "easeInOut"
          }}
        />

        {/* Gradient */}
        <defs>
          <linearGradient id="star-gradient" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F472B6" />
            <stop offset="0.5" stopColor="#60A5FA" />
            <stop offset="1" stopColor="#34D399" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
};

export default AnimatedStar;

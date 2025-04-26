import React from 'react';
import { motion } from 'framer-motion';

const AnimatedRoleArcLogo = ({ size = 96 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Glowing background circle */}
      <motion.circle
        cx="12"
        cy="12"
        r="11"
        className="text-indigo-600/20"
        fill="currentColor"
        initial={{ scale: 1 }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Base circle with gradient */}
      <motion.circle
        cx="12"
        cy="12"
        r="10"
        fill="url(#gradient)"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
      
      {/* Robot face plate with hover effect */}
      <motion.path
        d="M6 11C6 8.5 8.5 6.5 12 6.5C15.5 6.5 18 8.5 18 11V14.5C18 16 16.5 17 12 17C7.5 17 6 16 6 14.5V11Z"
        fill="#EEF2FF"
        fillOpacity="0.98"
        stroke="#C7D2FE"
        strokeWidth="0.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: 1,
          ease: "easeInOut",
        }}
      />

      {/* Left eye with blinking and scanning animation */}
      <motion.circle
        cx="9"
        cy="11"
        r="1"
        fill="#4F46E5"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [1, 0.5, 1],
          y: [0, -1, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Right eye with blinking and scanning animation */}
      <motion.circle
        cx="15"
        cy="11"
        r="1"
        fill="#4F46E5"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [1, 0.5, 1],
          y: [0, -1, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Scanning beam effect */}
      <motion.line
        x1="6"
        y1="12"
        x2="18"
        y2="12"
        stroke="url(#scanGradient)"
        strokeWidth="0.2"
        initial={{ opacity: 0, pathLength: 0 }}
        animate={{
          opacity: [0, 1, 0],
          pathLength: [0, 1, 0],
          y: [10, 14, 10],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
      />

      {/* Gradients */}
      <defs>
        <linearGradient id="gradient" x1="12" y1="2" x2="12" y2="22">
          <stop offset="0%" stopColor="#4F46E5" />
          <stop offset="100%" stopColor="#6366F1" />
        </linearGradient>
        <linearGradient id="scanGradient" x1="6" y1="12" x2="18" y2="12">
          <stop offset="0%" stopColor="#4F46E5" stopOpacity="0" />
          <stop offset="50%" stopColor="#4F46E5" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#4F46E5" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Particle effects */}
      {[...Array(8)].map((_, i) => (
        <motion.circle
          key={i}
          r="0.2"
          fill="#4F46E5"
          initial={{
            x: 12,
            y: 12,
            opacity: 0,
          }}
          animate={{
            x: 12 + Math.cos(i * (Math.PI / 4)) * 12,
            y: 12 + Math.sin(i * (Math.PI / 4)) * 12,
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}
    </svg>
  );
};

export default AnimatedRoleArcLogo;

import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { HiOutlineLightBulb, HiOutlineDocumentSearch, HiOutlineClipboardCheck } from 'react-icons/hi';
import RollyIcon from '../shared/RollyIcon';

// Animated grid line component
const GridLine = ({ index, total, vertical = false }) => {
  const position = (index / total) * 100;
  const variants = {
    initial: { scale: 0.6, opacity: 0 },
    animate: { scale: 1, opacity: 0.1 },
  };

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      transition={{ duration: 2, delay: index * 0.1, ease: 'easeOut' }}
      style={{
        position: 'absolute',
        [vertical ? 'height' : 'width']: '100%',
        [vertical ? 'width' : 'height']: '1px',
        [vertical ? 'left' : 'top']: `${position}%`,
        background: 'linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.3), transparent)',
      }}
    />
  );
};

// Animated particle effect
const Particle = ({ delay }) => {
  const size = Math.random() * 2 + 1;
  const startX = Math.random() * window.innerWidth;
  const startY = Math.random() * window.innerHeight;

  return (
    <motion.div
      style={{
        position: 'absolute',
        width: size,
        height: size,
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
        borderRadius: '50%',
      }}
      initial={{ x: startX, y: startY, opacity: 0 }}
      animate={{
        opacity: [0, 1, 0],
        scale: [1, 1.5, 1],
        y: startY - 100,
      }}
      transition={{
        duration: 3,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
};

const FeatureHighlight = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    className="flex items-start space-x-4 text-left bg-gray-900/30 backdrop-blur-sm rounded-xl p-6 border border-gray-800/30"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    whileHover={{
      scale: 1.02,
      backgroundColor: 'rgba(17, 24, 39, 0.5)',
      borderColor: 'rgba(99, 102, 241, 0.5)',
      transition: { duration: 0.2, ease: 'easeOut' }
    }}
  >
    <div className="flex-shrink-0">
      <div className="p-3 bg-indigo-500/20 rounded-lg">
        <Icon className="w-6 h-6 text-indigo-400" />
      </div>
    </div>
    <div>
      <h3 className="font-medium text-gray-100">{title}</h3>
      <p className="mt-1 text-sm text-gray-400">{description}</p>
    </div>
  </motion.div>
);

const WelcomeSplash = () => {
  const navigate = useNavigate();
  const controls = useAnimation();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  const features = [
    {
      icon: HiOutlineDocumentSearch,
      title: "Smart Resume Analysis",
      description: "Our AI analyzes your resume to match you with the perfect job opportunities.",
    },
    {
      icon: HiOutlineLightBulb,
      title: "AI-Powered Recommendations",
      description: "Get personalized suggestions to improve your resume and boost your chances.",
    },
    {
      icon: HiOutlineClipboardCheck,
      title: "Tailored Job Matching",
      description: "Find roles that match your skills, experience, and career goals.",
    },
  ];

  // Generate particles for the background
  const particles = Array.from({ length: 30 }, (_, i) => ({
    delay: Math.random() * 2,
  }));

  // Grid lines
  const horizontalLines = Array.from({ length: 10 });
  const verticalLines = Array.from({ length: 20 });

  const handleGetStarted = () => {
    controls.start({
      opacity: 0,
      y: 20,
      transition: { duration: 0.5 }
    }).then(() => navigate('/home'));
  };

  return mounted ? (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-gray-900 via-gray-900 to-indigo-900/20">
      {/* Animated background grid */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Horizontal grid lines */}
        {horizontalLines.map((_, i) => (
          <GridLine key={`h-${i}`} index={i} total={horizontalLines.length} />
        ))}
        {/* Vertical grid lines */}
        {verticalLines.map((_, i) => (
          <GridLine key={`v-${i}`} index={i} total={verticalLines.length} vertical />
        ))}
        {/* Floating particles */}
        {particles.map((particle, i) => (
          <Particle key={i} {...particle} />
        ))}
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-3xl w-full space-y-12">
          {/* Logo and Title */}
          <div className="text-center space-y-8">
            <motion.div
              className="mx-auto relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="absolute inset-0 bg-indigo-500/20 rounded-full blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <RollyIcon className="w-32 h-32 text-indigo-400 mx-auto relative" />
            </motion.div>
          </div>

          <motion.h1
            className="text-5xl font-bold text-white tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Welcome to RoleArc
          </motion.h1>

            <motion.p
            className="text-xl text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Your AI-powered career companion
          </motion.p>
          <div className="grid gap-6 mt-12">
            {features.map((feature, index) => (
              <FeatureHighlight
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={0.4 + index * 0.1}
              />
            ))}
          </div>

          <div className="mt-12">
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <motion.button
                type="button"
                className="group relative inline-flex items-center px-8 py-4 text-lg font-medium text-white bg-indigo-600 rounded-xl overflow-hidden transition-all hover:bg-indigo-700"
                onClick={handleGetStarted}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={false}
                  animate={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />
                <span className="relative">
                  Get Started
                </span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  ) : null;
};

export default WelcomeSplash;

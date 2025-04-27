import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { HiOutlineLightBulb, HiOutlineDocumentSearch, HiOutlineClipboardCheck } from 'react-icons/hi';
import RollyIcon from '../shared/RollyIcon';
import AuthModal from '../auth/AuthModal';

const FeatureHighlight = ({ icon: Icon, title, description, delay }) => {
  return (
    <motion.div
      className="flex items-start gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <div className="flex-shrink-0">
        <Icon className="w-6 h-6 text-indigo-400" />
      </div>
      <div className="flex-1 text-left">
        <h3 className="font-medium text-white">{title}</h3>
        <p className="text-sm text-gray-300">{description}</p>
      </div>
    </motion.div>
  );
};

const WelcomeSplash = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const features = [
    {
      icon: HiOutlineLightBulb,
      title: 'Smart Job Matching',
      description: 'AI-powered recommendations based on your skills and experience'
    },
    {
      icon: HiOutlineDocumentSearch,
      title: 'Resume Analysis',
      description: 'Get instant feedback and improvement suggestions'
    },
    {
      icon: HiOutlineClipboardCheck,
      title: 'Application Tracking',
      description: 'Keep track of your applications and follow-ups'
    }
  ];

  const handleGetStarted = () => {
    setShowAuthModal(true);
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    setIsOpen(false);
    navigate('/home');
  };

  const handleAuthClose = () => {
    setShowAuthModal(false);
  };

  const handleSkip = () => {
    setIsOpen(false);
    navigate('/home');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          static
          as={motion.div}
          open={isOpen}
          onClose={() => {}}
          className="relative z-50"
        >
          {/* Animated Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0"
          >
            {/* Gradient background */}
            <div className="absolute inset-0 bg-[#0f172a]" />
            
            {/* Animated particles */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-indigo-500 rounded-full"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  opacity: 0,
                }}
                animate={{
                  y: [null, -20],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel
              as={motion.div}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-[#0a1120]/50 backdrop-blur-xl rounded-2xl shadow-2xl max-w-2xl w-full p-8 overflow-hidden"
            >
              {/* Animated Logo */}
              <motion.div 
                className="flex justify-center mb-6"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", bounce: 0.5 }}
              >
                <RollyIcon width={96} height={96} />
              </motion.div>

              {/* Content */}
              <motion.div 
                className="text-center mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Dialog.Title className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-indigo-400 mb-4">
                  Welcome to RoleArc
                </Dialog.Title>
                <Dialog.Description className="text-lg text-gray-300 max-w-xl mx-auto">
                  Your AI-powered career companion. We scan your resume and deliver smart, personalized job matches to help you land your next big opportunity.
                </Dialog.Description>
              </motion.div>

              {/* Feature Highlights */}
              <div className="mb-8 space-y-6">
                {features.map((feature, index) => (
                  <FeatureHighlight
                    key={index}
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                    delay={0.5 + index * 0.2}
                  />
                ))}
              </div>

              {/* Action Buttons */}
              <motion.div 
                className="flex flex-col items-center gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <button
                  onClick={handleGetStarted}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                >
                  Get Started
                </button>
                <button
                  onClick={handleSkip}
                  className="text-gray-400 hover:text-gray-300 transition-colors text-sm mt-2"
                >
                  Skip for now
                </button>
              </motion.div>
            </Dialog.Panel>
          </div>

          {/* Auth Modal */}
          {showAuthModal && (
            <AuthModal
              isOpen={showAuthModal}
              onClose={handleAuthClose}
              onSuccess={handleAuthSuccess}
            />
          )}
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default WelcomeSplash;

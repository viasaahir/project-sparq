import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUpload } from 'react-icons/fi';
import AuthModal from '../shared/AuthModal';
import AnimatedRoleArcLogo from '../shared/AnimatedRoleArcLogo';

const WelcomeSplash = ({ isOpen, onClose }) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Welcome to RoleArc",
      description: "Your AI-powered career companion. We help you find the perfect job match by analyzing your resume and providing personalized recommendations.",
      action: "Get Started",
      onAction: () => setCurrentStep(1)
    },
    {
      title: "First, Let's Create Your Profile",
      description: "Sign up to save your progress and get personalized job recommendations.",
      action: "Sign Up / Login",
      onAction: () => setShowAuthModal(true)
    }
  ];

  const currentContent = steps[currentStep];

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <Dialog
            static
            as={motion.div}
            open={isOpen}
            onClose={onClose}
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
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-indigo-900" />
              
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
                className="relative bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl max-w-2xl w-full p-8 overflow-hidden"
              >
                {/* Animated Logo */}
                <motion.div 
                  className="flex justify-center mb-6"
                  initial={{ y: -20 }}
                  animate={{ y: 0 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                >
                  <AnimatedRoleArcLogo size={96} />
                </motion.div>

                {/* Content */}
                <motion.div 
                  className="text-center mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Dialog.Title className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-indigo-400 mb-4">
                    {currentContent.title}
                  </Dialog.Title>
                  <Dialog.Description className="text-lg text-gray-600">
                    {currentContent.description}
                  </Dialog.Description>
                </motion.div>

                {/* Animation */}
                {currentStep === 0 && (
                  <motion.div
                    className="w-full h-48 mb-8 flex items-center justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="relative">
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        animate={{
                          y: [0, -10, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <FiUpload className="w-24 h-24 text-primary-500" />
                      </motion.div>
                      <motion.div
                        className="absolute inset-0 border-2 border-dashed border-primary-300 rounded-lg"
                        animate={{
                          scale: [1, 1.05, 1],
                          opacity: [1, 0.8, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    </div>
                  </motion.div>
                )}

                {/* Action Button */}
                <motion.div 
                  className="flex justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <button
                    onClick={currentContent.onAction}
                    className="primary-button text-base px-8 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 transition-all duration-200 transform hover:scale-105"
                  >
                    {currentContent.action}
                  </button>
                </motion.div>
              </Dialog.Panel>
            </div>
          </Dialog>
        )}
      </AnimatePresence>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => {
          setShowAuthModal(false);
          onClose();
        }} 
      />
    </>
  );
};

export default WelcomeSplash;

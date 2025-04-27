import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUpload } from 'react-icons/fi';
import { HiOutlineLightBulb, HiOutlineDocumentSearch, HiOutlineClipboardCheck } from 'react-icons/hi';
import AuthModal from '../shared/AuthModal';
import AnimatedRoleArcLogo from '../shared/AnimatedRoleArcLogo';
import ResumeUpload from '../resume/ResumeUpload';
import ResumeAnalysis from '../resume/ResumeAnalysis';

const FeatureHighlight = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    className="flex items-start space-x-4 text-left"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
  >
    <div className="flex-shrink-0">
      <div className="p-3 bg-indigo-100 rounded-lg">
        <Icon className="w-6 h-6 text-indigo-600" />
      </div>
    </div>
    <div>
      <h3 className="font-medium text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
    </div>
  </motion.div>
);

const WelcomeSplash = ({ isOpen, onClose }) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showResumeUpload, setShowResumeUpload] = useState(false);
  const [showResumeAnalysis, setShowResumeAnalysis] = useState(false);

  const steps = [
    {
      title: "Welcome to RoleArc",
      description: "Your AI-powered career companion. We scan your resume and deliver smart, personalized job matches to help you land your next big opportunity.",
      action: "Get Started",
      onAction: () => setShowResumeUpload(true)
    },
    {
      title: "First, Let's Create Your Profile",
      description: "Sign up to save your progress and get personalized job recommendations.",
      action: "Sign Up / Login",
      onAction: () => setShowAuthModal(true)
    }
  ];

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

  const currentContent = steps[currentStep];

  if (showResumeAnalysis) {
    return <ResumeAnalysis />;
  }

  if (showResumeUpload) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-indigo-900 flex items-center justify-center p-4"
      >
        <ResumeUpload onAnalysisComplete={() => setShowResumeAnalysis(true)} />
      </motion.div>
    );
  }

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
                  <Dialog.Description className="text-lg text-gray-600 max-w-xl mx-auto">
                    {currentContent.description}
                  </Dialog.Description>
                </motion.div>

                {/* Feature Highlights */}
                {currentStep === 0 && (
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

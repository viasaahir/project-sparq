import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { HiOutlineLightBulb, HiOutlineDocumentSearch, HiOutlineClipboardCheck } from 'react-icons/hi';
import RollyIcon from '../shared/RollyIcon';

const FeatureHighlight = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    className="flex items-start space-x-4 text-left"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
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
  const [isOpen, setIsOpen] = useState(true);

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

  const handleGetStarted = () => {
    setIsOpen(false);
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <AnimatePresence>
        {isOpen && (
          <Dialog
            as={motion.div}
            static
            className="fixed inset-0 z-10 overflow-y-auto"
            open={isOpen}
            onClose={() => {}}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="min-h-screen text-center">
              <Dialog.Overlay 
                as={motion.div}
                className="fixed inset-0 bg-black/75"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />

              <div className="inline-block w-full max-w-2xl p-6 my-8 text-left align-middle transition-all transform bg-gray-900 shadow-xl rounded-2xl border border-gray-800">
                {/* Logo */}
                <div className="mx-auto flex justify-center mb-8">
                  <RollyIcon className="w-16 h-16 text-indigo-400" />
                </div>

                {/* Title */}
                <Dialog.Title
                  as="h3"
                  className="text-3xl font-bold text-center text-white mb-4"
                >
                  Welcome to RoleArc
                </Dialog.Title>

                {/* Subtitle */}
                <p className="text-center text-gray-400 mb-8">
                  Your AI-powered career companion
                </p>

                {/* Features */}
                <div className="space-y-6 mb-8">
                  {features.map((feature, index) => (
                    <FeatureHighlight
                      key={feature.title}
                      icon={feature.icon}
                      title={feature.title}
                      description={feature.description}
                      delay={0.2 + index * 0.1}
                    />
                  ))}
                </div>

                {/* Get Started Button */}
                <div className="mt-8 flex justify-center">
                  <motion.button
                    type="button"
                    className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
                    onClick={handleGetStarted}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Get Started
                  </motion.button>
                </div>
              </div>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WelcomeSplash;

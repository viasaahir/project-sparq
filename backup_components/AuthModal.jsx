import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { FcGoogle } from 'react-icons/fc';
import { BsGithub, BsMicrosoft, BsApple } from 'react-icons/bs';
import { HiOutlineMail } from 'react-icons/hi';

const AuthModal = ({ isOpen, onClose }) => {
  const handleSocialLogin = (provider) => {
    switch (provider) {
      case 'google':
        window.location.href = '/api/auth/google';
        break;
      case 'microsoft':
        window.location.href = '/api/auth/microsoft';
        break;
      case 'apple':
        window.location.href = '/api/auth/apple';
        break;
      case 'github':
        window.location.href = '/api/auth/github';
        break;
      case 'email':
        window.location.href = '/api/auth/email';
        break;
      default:
        console.error('Unknown provider:', provider);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 overflow-hidden relative"
          >
            {/* Close Button */}
            <div className="absolute top-4 left-4 z-10">
              <button
                onClick={onClose}
                className="group p-1.5 hover:bg-gray-50 rounded-full transition-all"
                aria-label="Close modal"
              >
                <XMarkIcon className="w-6 h-6 text-gray-300 group-hover:text-gray-400" />
              </button>
            </div>

            {/* Content */}
            <div className="p-8">
              {/* Logo */}
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 bg-indigo-600 bg-opacity-10 rounded-full flex items-center justify-center">
                  <svg
                    className="w-16 h-16 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
                Create an account or sign in
              </h2>
              <p className="text-center text-gray-600 mb-8">
                Join our community of job seekers and employers
              </p>

              {/* Auth Buttons */}
              <div className="space-y-3">
                <button 
                  onClick={() => handleSocialLogin('google')}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-gray-900 rounded-xl hover:bg-gray-800 transition-colors"
                >
                  <FcGoogle className="w-5 h-5" />
                  <span className="text-white">Continue with Google</span>
                </button>

                <button 
                  onClick={() => handleSocialLogin('microsoft')}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-gray-900 rounded-xl hover:bg-gray-800 transition-colors"
                >
                  <BsMicrosoft className="w-5 h-5 text-blue-500" />
                  <span className="text-white">Continue with Microsoft</span>
                </button>

                <button 
                  onClick={() => handleSocialLogin('apple')}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-gray-900 rounded-xl hover:bg-gray-800 transition-colors"
                >
                  <BsApple className="w-5 h-5 text-white" />
                  <span className="text-white">Continue with Apple</span>
                </button>

                <button 
                  onClick={() => handleSocialLogin('email')}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-gray-900 rounded-xl hover:bg-gray-800 transition-colors"
                >
                  <HiOutlineMail className="w-5 h-5 text-indigo-400" />
                  <span className="text-white">Continue with Email</span>
                </button>

                <button 
                  onClick={() => handleSocialLogin('github')}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-gray-900 rounded-xl hover:bg-gray-800 transition-colors"
                >
                  <BsGithub className="w-5 h-5 text-white" />
                  <span className="text-white">Continue with Github</span>
                </button>
              </div>

              {/* Terms */}
              <p className="mt-8 text-center text-sm text-gray-500">
                By creating an account or logging in, you understand and agree to our{' '}
                <a href="#" className="text-indigo-600 hover:text-indigo-700 font-medium">
                  Terms
                </a>
                . You also acknowledge our{' '}
                <a href="#" className="text-indigo-600 hover:text-indigo-700 font-medium">
                  Cookie and Privacy policies
                </a>
                .
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;

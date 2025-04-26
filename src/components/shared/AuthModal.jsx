import React from 'react';
import { Dialog } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FcGoogle 
} from 'react-icons/fc';
import { 
  BsApple, 
  BsGithub, 
  BsMicrosoft 
} from 'react-icons/bs';
import { 
  HiOutlineMail 
} from 'react-icons/hi';

const AuthModal = ({ isOpen, onClose }) => {
  const handleSocialLogin = (provider) => {
    // TODO: Implement social login
    console.log(`Logging in with ${provider}`);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          static
          as={motion.div}
          open={isOpen}
          onClose={onClose}
          className="relative z-50"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center p-4"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
          >
            <Dialog.Panel className="w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 shadow-xl">
              <Dialog.Title className="text-lg font-medium text-center text-gray-900 mb-2">
                Welcome to RoleArc
              </Dialog.Title>
              
              <p className="text-sm text-gray-500 text-center mb-6">
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
            </Dialog.Panel>
          </motion.div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;

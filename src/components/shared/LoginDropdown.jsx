import React, { useState, useRef } from 'react';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import AuthModal from './AuthModal';

const LoginDropdown = ({ onLogin, onSignUp }) => {
  const [showModal, setShowModal] = useState(false);
  const buttonRef = useRef(null);

  return (
    <div className="relative inline-block">
      <button
        ref={buttonRef}
        onClick={() => setShowModal(true)}
        className="flex items-center text-sm text-white hover:text-gray-200 transition-colors relative"
      >
        <ArrowRightOnRectangleIcon className="h-4 w-4 mr-1 text-white" />
        <span>Login / Sign Up</span>
      </button>

      <AuthModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
      />
    </div>
  );
};

export default LoginDropdown;

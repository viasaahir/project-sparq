import React from 'react';
import { Link } from 'react-router-dom';

const RoleArcLogo = ({ className = '', size = 24 }) => {
  return (
    <Link to="/" className={`flex items-center space-x-2 hover:opacity-80 transition-opacity ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Base circle with subtle pulse */}
        <circle cx="12" cy="12" r="11" fill="currentColor" className="text-indigo-600">
          <animate
            attributeName="opacity"
            values="1;0.9;1"
            dur="4s"
            repeatCount="indefinite"
          />
        </circle>
        
        {/* Robot face plate with hover effect */}
        <path
          d="M6 11C6 8.5 8.5 6.5 12 6.5C15.5 6.5 18 8.5 18 11V14.5C18 16 16.5 17 12 17C7.5 17 6 16 6 14.5V11Z"
          fill="#EEF2FF"
          fillOpacity="0.98"
          stroke="#C7D2FE"
          strokeWidth="0.5"
        >
          <animate
            attributeName="d"
            values="
              M6 11C6 8.5 8.5 6.5 12 6.5C15.5 6.5 18 8.5 18 11V14.5C18 16 16.5 17 12 17C7.5 17 6 16 6 14.5V11Z;
              M6 10.8C6 8.3 8.5 6.3 12 6.3C15.5 6.3 18 8.3 18 10.8V14.5C18 16 16.5 17 12 17C7.5 17 6 16 6 14.5V10.8Z;
              M6 11C6 8.5 8.5 6.5 12 6.5C15.5 6.5 18 8.5 18 11V14.5C18 16 16.5 17 12 17C7.5 17 6 16 6 14.5V11Z"
            dur="4s"
            repeatCount="indefinite"
          />
        </path>

        {/* Eyes */}
        <circle cx="9" cy="11" r="1" fill="#4F46E5" className="text-indigo-600">
          <animate
            attributeName="r"
            values="1;0.8;1"
            dur="4s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="15" cy="11" r="1" fill="#4F46E5" className="text-indigo-600">
          <animate
            attributeName="r"
            values="1;0.8;1"
            dur="4s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </Link>
  );
};

export default RoleArcLogo;

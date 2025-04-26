import React from 'react';

const RoleMatch = ({ score = 0 }) => {
  return (
    <div className="flex items-center space-x-2">
      <div className="text-sm font-medium text-gray-600">
        Match: {score}%
      </div>
      <div className="w-20 h-2 bg-gray-200 rounded-full">
        <div 
          className="h-full bg-indigo-400 rounded-full" 
          style={{ width: `${score}%` }} 
        />
      </div>
    </div>
  );
};

export default RoleMatch;

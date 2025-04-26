import React from 'react';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

const RoleMatch = ({ score, skills = [], requirements = [] }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-medium text-gray-900">Role Match</h4>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          score >= 80 ? 'bg-green-100 text-green-800' :
          score >= 60 ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {score}% Match
        </span>
      </div>

      {/* Matching Skills */}
      {skills.length > 0 && (
        <div className="mb-4">
          <h5 className="text-xs font-medium text-gray-700 mb-2">Matching Skills</h5>
          <div className="space-y-1">
            {skills.map((skill, index) => (
              <div key={index} className="flex items-center text-sm text-gray-600">
                <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2" />
                {skill}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Missing Requirements */}
      {requirements.length > 0 && (
        <div>
          <h5 className="text-xs font-medium text-gray-700 mb-2">Missing Requirements</h5>
          <div className="space-y-1">
            {requirements.map((req, index) => (
              <div key={index} className="flex items-center text-sm text-gray-600">
                <XCircleIcon className="h-4 w-4 text-red-500 mr-2" />
                {req}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleMatch;

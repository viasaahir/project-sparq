import React, { useState } from 'react';
import { motion } from 'framer-motion';
import RollyIcon from '../../components/shared/RollyIcon';
import CareerTransition from '../../components/transition/CareerTransition';
import StudentPath from '../../components/student/StudentPath';
import LandingHero from '../../components/landing/LandingHero';

const JobBoardModule = () => {
  const [selectedPath, setSelectedPath] = useState(null);

  const renderContent = () => {
    if (!selectedPath) {
      return <LandingHero onPathSelect={setSelectedPath} />;
    }

    if (selectedPath === 'student') {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <StudentPath />
        </motion.div>
      );
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <CareerTransition />
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-black to-black/95">
      {/* Header with RoleArc branding */}
      <div className="bg-gradient-to-b from-black/20 to-transparent border-b border-gray-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="flex items-center gap-4 mb-6">
              <RollyIcon width={48} height={48} />
              <h1 className="text-4xl font-bold text-white">RoleArc</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {renderContent()}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-800/30 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-sm text-center text-gray-500">
            a product by Neetly<sup>®</sup>
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobBoardModule;

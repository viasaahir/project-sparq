import React from 'react';
import { motion } from 'framer-motion';

const InternPortal = ({ onSearch }) => {
  const universities = [
    {
      name: 'University of Toronto',
      logo: '/logos/uoft.png',
      abbr: 'U of T'
    },
    {
      name: 'Toronto Metropolitan University',
      logo: '/logos/tmu.png',
      abbr: 'TMU'
    },
    {
      name: 'York University',
      logo: '/logos/york.png',
      abbr: 'York'
    }
  ];

  const internshipTypes = [
    {
      title: 'Software Development',
      description: 'Build and maintain applications, work with various programming languages',
      icon: '💻'
    },
    {
      title: 'Data Science',
      description: 'Analyze data, build models, and derive insights',
      icon: '📊'
    },
    {
      title: 'Product Management',
      description: 'Define product strategy and work with cross-functional teams',
      icon: '📱'
    },
    {
      title: 'Design',
      description: 'Create user interfaces and improve user experience',
      icon: '🎨'
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* University Partners */}
      <div className="text-center mb-12">
        <p className="text-gray-400 mb-6">As used by</p>
        <div className="flex justify-center items-center gap-12">
          {universities.map((uni, index) => (
            <motion.div
              key={uni.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="flex flex-col items-center"
            >
              <div className="w-24 h-24 bg-white/5 rounded-lg flex items-center justify-center p-4">
                <img
                  src={uni.logo}
                  alt={uni.name}
                  className="max-w-full max-h-full object-contain filter brightness-0 invert opacity-70"
                />
              </div>
              <span className="text-sm text-gray-400 mt-2">{uni.abbr}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Internship Categories */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {internshipTypes.map((type, index) => (
          <motion.button
            key={type.title}
            onClick={() => onSearch(`Looking for ${type.title.toLowerCase()} internships`)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-left group"
          >
            <span className="text-2xl mb-3 block">{type.icon}</span>
            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-indigo-400 transition-colors">
              {type.title}
            </h3>
            <p className="text-sm text-gray-400">
              {type.description}
            </p>
          </motion.button>
        ))}
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-3 justify-center mt-8">
        {['Summer 2024', 'Fall 2024', 'Remote', 'Paid', '4-month', '8-month', '12-month'].map((filter) => (
          <button
            key={filter}
            onClick={() => onSearch(`Looking for ${filter.toLowerCase()} internships`)}
            className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-sm text-gray-300 
                     hover:text-white transition-colors"
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default InternPortal;

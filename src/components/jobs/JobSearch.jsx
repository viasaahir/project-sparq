import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineSearch, HiOutlineLightningBolt } from 'react-icons/hi';

const JobSearch = ({ onSearch, isProcessing }) => {
  const [prompt, setPrompt] = useState('');
  const [showExamples, setShowExamples] = useState(false);

  const examples = [
    "I'm a software engineering professional of 8 years looking for a role within FAANG in New York City",
    "Recent Computer Science graduate seeking entry-level software developer positions in Toronto",
    "Looking for software engineering internships at startups in San Francisco for Summer 2024"
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(prompt);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your ideal role... (e.g., 'Senior software engineer with 8 years experience seeking remote roles at startups')"
            className="w-full px-6 py-4 text-lg bg-white/10 border border-gray-700 rounded-xl 
                     text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                     focus:ring-indigo-500 focus:border-transparent pr-12"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-indigo-600 
                     rounded-lg text-white hover:bg-indigo-500 transition-colors"
          >
            {isProcessing ? (
              <HiOutlineLightningBolt className="w-6 h-6 animate-pulse" />
            ) : (
              <HiOutlineSearch className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Search Examples */}
        <div className="mt-2">
          <button
            type="button"
            onClick={() => setShowExamples(!showExamples)}
            className="text-sm text-gray-400 hover:text-gray-300 transition-colors"
          >
            {showExamples ? 'Hide examples' : 'Show examples'}
          </button>
          
          {showExamples && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 space-y-2"
            >
              {examples.map((example, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setPrompt(example)}
                  className="block text-left text-sm text-gray-400 hover:text-indigo-400 
                           transition-colors cursor-pointer w-full truncate"
                >
                  "{example}"
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </form>
    </div>
  );
};

export default JobSearch;

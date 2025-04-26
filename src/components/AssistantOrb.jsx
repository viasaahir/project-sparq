import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import RollyIcon from './RollyIcon';

const initialPrompts = [
  "How do I find jobs matching my skills?",
  "Show me how to connect with role consultants",
  "Tips for getting my application noticed",
  "Help me reach out to company insiders"
];

const responses = {
  "How do I find jobs matching my skills?": 
    "1. Use the skills filter at the top of the job board\n2. Sort by 'Best Match' to see most relevant roles\n3. Look for the match percentage on each job card\n4. Save jobs you're interested in to track them",
  
  "Show me how to connect with role consultants":
    "1. Click the 'Role Consultant' tab on any job posting\n2. View their profile and expertise\n3. Use the 'Connect' button to send a message\n4. They can provide insider tips and fast-track your application",
  
  "Tips for getting my application noticed":
    "1. Match your resume keywords to the job description\n2. Get a referral through mutual connections\n3. Engage with the role consultant\n4. Follow up after applying",
  
  "Help me reach out to company insiders":
    "1. Find mutual connections on the company page\n2. Use the 'Request Intro' button\n3. Connect with role consultants\n4. Join company discussion groups"
};

const followUpPrompts = {
  "How do I find jobs matching my skills?": [
    "How do I improve my match score?",
    "What skills are in high demand?",
    "Show me remote opportunities"
  ],
  "Show me how to connect with role consultants": [
    "What should I ask consultants?",
    "How to get faster responses?",
    "Find consultants in my field"
  ],
  "Tips for getting my application noticed": [
    "Help with resume keywords",
    "Write a compelling cover letter",
    "When to follow up?"
  ],
  "Help me reach out to company insiders": [
    "Draft an outreach message",
    "Find mutual connections",
    "Join company discussions"
  ],
  "default": [
    "Find jobs matching my skills",
    "Connect with role consultants",
    "Tips for application success"
  ]
};

const TypewriterText = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      }, 15); // Fast typing speed (15ms per character)
      
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  return <span>{displayedText}</span>;
};

const AssistantOrb = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const handlePromptClick = (prompt) => {
    setSelectedPrompt(prompt);
    setInputValue('');
  };

  const handleCustomQuestion = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    // Use the question as the prompt
    setSelectedPrompt(inputValue);
    setInputValue('');
  };

  const getResponse = (prompt) => {
    // If it's a predefined prompt, use the responses object
    if (responses[prompt]) {
      return responses[prompt];
    }

    // For custom questions, generate a contextual response
    const question = prompt.toLowerCase();
    if (question.includes('skill') || question.includes('match')) {
      return "1. Focus on technical skills listed in job descriptions\n2. Highlight relevant projects and experience\n3. Keep your profile updated with latest skills\n4. Take skill assessments to verify your expertise";
    }
    if (question.includes('consultant') || question.includes('connect')) {
      return "1. Browse consultant profiles on job listings\n2. Send a personalized connection request\n3. Ask specific questions about the role\n4. Follow up professionally after connecting";
    }
    if (question.includes('resume') || question.includes('application')) {
      return "1. Tailor your resume to each role\n2. Use keywords from the job description\n3. Highlight quantifiable achievements\n4. Keep formatting clean and professional";
    }
    if (question.includes('interview') || question.includes('prepare')) {
      return "1. Research the company thoroughly\n2. Practice with common interview questions\n3. Prepare relevant examples of your work\n4. Have thoughtful questions ready";
    }
    
    // Default response for other questions
    return "I can help you with:\n1. Finding matching jobs\n2. Connecting with role consultants\n3. Optimizing your application\n4. Interview preparation\n\nWhat specific aspect would you like to know more about?";
  };

  const resetChat = () => {
    setSelectedPrompt(null);
    setInputValue('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-20 right-0 w-96 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-white/10 p-1 rounded-lg">
                    <RollyIcon size={24} className="text-white" />
                  </div>
                  <h3 className="font-medium text-sm">Rolly</h3>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={resetChat}
                    className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                    title="Reset conversation"
                  >
                    <ArrowPathIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <XMarkIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Chat Content */}
            <div className="h-96 overflow-y-auto p-4">
              {/* Welcome Message */}
              <div className="flex items-start gap-2.5 mb-4">
                <div className="bg-indigo-100 p-1 rounded-lg flex-shrink-0">
                  <RollyIcon size={20} className="text-indigo-600" />
                </div>
                <div className="flex-1 text-sm leading-relaxed text-gray-700 bg-gray-50 rounded-xl p-3">
                  <TypewriterText text="Hi! I'm Rolly, your AI career guide. How can I help you navigate the job board today?" />
                </div>
              </div>

              {/* Prompts or Response */}
              {selectedPrompt ? (
                <div className="space-y-4">
                  {/* User Question */}
                  <div className="flex justify-end">
                    <div className="max-w-[85%] rounded-xl p-3 text-sm bg-indigo-600 text-white">
                      {selectedPrompt}
                    </div>
                  </div>
                  {/* Rolly Response */}
                  <div className="flex items-start gap-2.5">
                    <div className="bg-indigo-100 p-1 rounded-lg flex-shrink-0">
                      <RollyIcon size={20} className="text-indigo-600" />
                    </div>
                    <div className="flex-1 text-sm leading-relaxed text-gray-700 bg-gray-50 rounded-xl p-3 whitespace-pre-line">
                      <TypewriterText text={getResponse(selectedPrompt)} />
                    </div>
                  </div>
                  {/* Follow-up Prompts */}
                  <div className="pl-9 space-y-2 mt-4">
                    <div className="text-xs text-gray-500 mb-2">Related topics:</div>
                    {(followUpPrompts[selectedPrompt] || followUpPrompts.default).map((prompt, index) => (
                      <button
                        key={index}
                        onClick={() => handlePromptClick(prompt)}
                        className="w-full text-left p-2.5 rounded-lg bg-white border border-gray-100 hover:border-indigo-100 hover:bg-indigo-50/50 text-sm text-gray-700 transition-colors"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-2 pl-9">
                  {initialPrompts.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => handlePromptClick(prompt)}
                      className="w-full text-left p-2.5 rounded-lg bg-white border border-gray-100 hover:border-indigo-100 hover:bg-indigo-50/50 text-sm text-gray-700 transition-colors"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input for custom questions */}
            <form onSubmit={handleCustomQuestion} className="p-4 border-t border-gray-100">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Or ask your own question..."
                  className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-indigo-300 focus:ring-1 focus:ring-indigo-300"
                />
                <button
                  type="submit"
                  className="bg-indigo-600 text-white rounded-xl px-4 py-2.5 text-sm font-medium hover:bg-indigo-700 transition-colors"
                >
                  Ask
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-r from-indigo-200 to-indigo-300 text-indigo-600 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 relative group hover:text-indigo-700"
      >
        <RollyIcon className="w-9 h-9 transition-transform group-hover:scale-110" />
      </motion.button>
    </div>
  );
};

export default AssistantOrb;

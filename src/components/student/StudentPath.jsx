import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineAcademicCap, HiOutlineBriefcase, HiOutlineLightningBolt, HiOutlineCode } from 'react-icons/hi';

const StudentPath = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    major: '',
    year: '',
    interests: [],
    skills: [],
    preferredLocations: []
  });

  const majors = [
    'Computer Science',
    'Software Engineering',
    'Data Science',
    'Information Technology',
    'Business & Technology',
    'Other Engineering',
    'Other Major'
  ];

  const techInterests = [
    'Software Development',
    'Data Science & Analytics',
    'Product Management',
    'UX/UI Design',
    'Cybersecurity',
    'Cloud Computing',
    'Artificial Intelligence',
    'DevOps'
  ];

  const handleInterestToggle = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  return (
    <div className="space-y-8">
      {/* Progress Steps */}
      <div className="flex justify-between items-center max-w-2xl mx-auto mb-12">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              s === step ? 'bg-purple-500 text-white' : 
              s < step ? 'bg-purple-500/20 text-purple-400' : 
              'bg-gray-800 text-gray-500'
            }`}>
              {s < step ? '✓' : s}
            </div>
            {s < 3 && (
              <div className={`w-24 h-0.5 ${
                s < step ? 'bg-purple-500/20' : 'bg-gray-800'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="max-w-2xl mx-auto"
      >
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-semibold text-white">Tell us about your background</h2>
              <p className="text-gray-400">Help us understand your academic journey</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  What's your major?
                </label>
                <select
                  value={formData.major}
                  onChange={(e) => setFormData(prev => ({ ...prev, major: e.target.value }))}
                  className="w-full bg-white/5 rounded-lg border border-gray-800 text-white py-2 px-3 focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select your major</option>
                  {majors.map(major => (
                    <option key={major} value={major}>{major}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Year of Study
                </label>
                <select
                  value={formData.year}
                  onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
                  className="w-full bg-white/5 rounded-lg border border-gray-800 text-white py-2 px-3 focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select your year</option>
                  <option value="1">First Year</option>
                  <option value="2">Second Year</option>
                  <option value="3">Third Year</option>
                  <option value="4">Fourth Year</option>
                  <option value="5+">Fifth Year or Graduate</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-semibold text-white">What interests you in tech?</h2>
              <p className="text-gray-400">Select all areas that excite you</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {techInterests.map(interest => (
                <button
                  key={interest}
                  onClick={() => handleInterestToggle(interest)}
                  className={`p-4 rounded-xl border ${
                    formData.interests.includes(interest)
                      ? 'border-purple-500 bg-purple-500/10 text-white'
                      : 'border-gray-800 bg-white/5 text-gray-400'
                  } hover:border-purple-500/50 transition-all duration-200`}
                >
                  <div className="flex items-center gap-3">
                    <HiOutlineCode className="w-5 h-5" />
                    {interest}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-semibold text-white">Almost there!</h2>
              <p className="text-gray-400">Let's find your perfect internship match</p>
            </div>

            <div className="grid gap-6">
              <div className="p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-gray-800">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <HiOutlineLightningBolt className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">Matching in Progress</h3>
                    <p className="text-gray-400 text-sm">Based on your profile:</p>
                    <ul className="mt-2 space-y-1 text-sm text-gray-400">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                        {formData.major} student in year {formData.year}
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                        Interested in {formData.interests.slice(0, 2).join(', ')}
                        {formData.interests.length > 2 && ' and more'}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          {step > 1 && (
            <button
              onClick={() => setStep(s => s - 1)}
              className="px-6 py-2 rounded-lg border border-gray-800 text-gray-400 hover:border-gray-700"
            >
              Back
            </button>
          )}
          <button
            onClick={() => step < 3 ? setStep(s => s + 1) : null}
            className={`px-6 py-2 rounded-lg ${
              step === 3
                ? 'bg-purple-500 hover:bg-purple-600'
                : 'bg-purple-500 hover:bg-purple-600'
            } text-white ml-auto`}
          >
            {step === 3 ? 'View Matches' : 'Continue'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default StudentPath;

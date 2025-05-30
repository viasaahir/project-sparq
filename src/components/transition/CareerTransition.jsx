import React, { useState, Fragment } from 'react';
import { motion } from 'framer-motion';
import { Combobox, Transition } from '@headlessui/react';
import { HiCheck, HiChevronUpDown } from 'react-icons/hi2';
import { HiOutlineLightningBolt, HiOutlineAcademicCap, HiOutlineTrendingUp } from 'react-icons/hi';
import { careerPaths, analyzeCareerTransition, getRecommendedJobTitles } from '../../services/careerTransitionService';

const CareerTransition = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const [skills, setSkills] = useState([]);
  const [transitionPaths, setTransitionPaths] = useState([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [query, setQuery] = useState('');

  const allRoles = Object.values(careerPaths)
    .flatMap(industry => industry.roles)
    .sort();

  const filteredRoles = query === ''
    ? allRoles
    : allRoles.filter(role =>
        role.toLowerCase().includes(query.toLowerCase())
      );

  const handleAnalyze = () => {
    setAnalyzing(true);
    // Simulate API call delay
    setTimeout(() => {
      const paths = analyzeCareerTransition(selectedRole, skills);
      setTransitionPaths(paths);
      setAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="space-y-8">
      {/* Career Input Section */}
      <div className="bg-white/5 rounded-xl p-6 space-y-6">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <HiOutlineLightningBolt className="w-6 h-6 text-indigo-400" />
          Discover Your Tech Career Path
        </h2>
        
        <div className="space-y-4">
          <div className="mb-8">
            <Combobox value={selectedRole} onChange={setSelectedRole}>
              <div className="relative mt-1">
                <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-gray-900 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-300 sm:text-sm">
                  <Combobox.Input
                    className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-300 bg-gray-900 focus:ring-0"
                    displayValue={(role) => role}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search for your current role..."
                  />
                  <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                    <HiChevronUpDown
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </Combobox.Button>
                </div>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                  afterLeave={() => setQuery('')}
                >
                  <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-900 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                    {filteredRoles.length === 0 && query !== '' ? (
                      <div className="relative cursor-default select-none px-4 py-2 text-gray-400">
                        Nothing found.
                      </div>
                    ) : (
                      filteredRoles.map((role) => (
                        <Combobox.Option
                          key={role}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-indigo-600 text-white' : 'text-gray-300'}`
                          }
                          value={role}
                        >
                          {({ selected, active }) => (
                            <>
                              <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                {role}
                              </span>
                              {selected ? (
                                <span
                                  className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-indigo-500'}`}
                                >
                                  <HiCheck className="h-5 w-5" aria-hidden="true" />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Combobox.Option>
                      ))
                    )}
                  </Combobox.Options>
                </Transition>
              </div>
            </Combobox>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Your Skills (comma-separated)
            </label>
            <input
              type="text"
              placeholder="e.g., Patient Care, Data Analysis, Research"
              className="w-full bg-white/10 rounded-lg border border-gray-700 text-white py-2 px-3 focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => setSkills(e.target.value.split(',').map(s => s.trim()))}
            />
          </div>

          <button
            onClick={handleAnalyze}
            disabled={!currentRole || analyzing}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg disabled:opacity-50"
          >
            {analyzing ? 'Analyzing...' : 'Analyze Career Transitions'}
          </button>
        </div>
      </div>

      {/* Results Section */}
      {analyzing ? (
        <div className="text-center py-12">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="mx-auto w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full"
          />
          <p className="mt-4 text-gray-400">Analyzing your career transition paths...</p>
        </div>
      ) : transitionPaths.length > 0 ? (
        <div className="space-y-6">
          {transitionPaths.map((path, index) => (
            <div key={index} className="bg-white/5 rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-white">{path.targetRole}</h3>
                <span className="text-sm font-medium px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400">
                  {path.matchPercentage.toFixed(0)}% Match
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-400">
                    <HiOutlineTrendingUp className="w-5 h-5" />
                    <span>Transition Time</span>
                  </div>
                  <p className="text-white">{path.timeToTransition}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-400">
                    <HiOutlineAcademicCap className="w-5 h-5" />
                    <span>Avg. Salary</span>
                  </div>
                  <p className="text-white">${path.avgSalary.toLocaleString()}/year</p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-400">Skills to Acquire</h4>
                <div className="flex flex-wrap gap-2">
                  {path.missingSkills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs rounded-full bg-orange-500/20 text-orange-400"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-400">Learning Path</h4>
                <div className="space-y-2">
                  {path.learningPath.map((item, i) => (
                    <div key={i} className="space-y-1">
                      <h5 className="text-white text-sm">{item.skill}</h5>
                      <div className="grid grid-cols-2 gap-2">
                        {item.resources.map((resource, j) => (
                          <div
                            key={j}
                            className="text-xs p-2 rounded bg-white/5 border border-gray-800"
                          >
                            <p className="font-medium text-indigo-400">{resource.name}</p>
                            <p className="text-gray-400">{resource.provider}</p>
                            <div className="flex justify-between text-gray-500 mt-1">
                              <span>{resource.duration}</span>
                              <span>{resource.cost}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default CareerTransition;

// Career paths and their corresponding tech transitions
export const careerPaths = {
  healthcare: {
    roles: ['Doctor', 'Nurse', 'Pharmacist', 'Clinical Research Coordinator'],
    techTransitions: [
      {
        role: 'Health Tech Product Manager',
        matchingSkills: ['Patient Care', 'Clinical Workflows', 'Healthcare Regulations'],
        requiredSkills: ['Agile Methodology', 'User Stories', 'Product Roadmapping'],
        timeToTransition: '6-12 months',
        avgSalary: 120000,
      },
      {
        role: 'Healthcare Data Scientist',
        matchingSkills: ['Research', 'Data Analysis', 'Clinical Trials'],
        requiredSkills: ['Python', 'Machine Learning', 'SQL'],
        timeToTransition: '9-15 months',
        avgSalary: 115000,
      }
    ]
  },
  finance: {
    roles: ['Financial Analyst', 'Investment Banker', 'Accountant'],
    techTransitions: [
      {
        role: 'FinTech Product Manager',
        matchingSkills: ['Financial Analysis', 'Risk Assessment', 'Client Management'],
        requiredSkills: ['API Architecture', 'Payment Systems', 'Agile'],
        timeToTransition: '6-12 months',
        avgSalary: 125000,
      },
      {
        role: 'Quantitative Developer',
        matchingSkills: ['Mathematics', 'Financial Modeling', 'Risk Analysis'],
        requiredSkills: ['Python', 'C++', 'Machine Learning'],
        timeToTransition: '12-18 months',
        avgSalary: 140000,
      }
    ]
  },
  science: {
    roles: ['Research Scientist', 'Lab Technician', 'Biologist'],
    techTransitions: [
      {
        role: 'Data Scientist',
        matchingSkills: ['Research', 'Statistical Analysis', 'Hypothesis Testing'],
        requiredSkills: ['Python', 'Machine Learning', 'Big Data'],
        timeToTransition: '6-12 months',
        avgSalary: 120000,
      },
      {
        role: 'Bioinformatics Engineer',
        matchingSkills: ['Lab Techniques', 'Research', 'Data Analysis'],
        requiredSkills: ['Python', 'R', 'Sequence Analysis'],
        timeToTransition: '9-15 months',
        avgSalary: 115000,
      }
    ]
  }
};

// Learning resources for different skills
export const learningResources = {
  'Python': [
    { name: 'Python for Data Science', provider: 'Coursera', duration: '3 months', cost: 'Free' },
    { name: 'Complete Python Bootcamp', provider: 'Udemy', duration: '2 months', cost: '$59.99' }
  ],
  'Machine Learning': [
    { name: 'Machine Learning Specialization', provider: 'Coursera', duration: '4 months', cost: 'Free' },
    { name: 'Fast.ai Practical Deep Learning', provider: 'Fast.ai', duration: '3 months', cost: 'Free' }
  ],
  'Agile Methodology': [
    { name: 'Agile Development', provider: 'Coursera', duration: '1 month', cost: 'Free' },
    { name: 'Scrum Master Certification', provider: 'Scrum.org', duration: '2 months', cost: '$150' }
  ]
};

// Analyze current skills and suggest transitions
export const analyzeCareerTransition = (currentRole, currentSkills) => {
  let possiblePaths = [];
  
  // Find matching career path based on current role
  for (const [field, pathData] of Object.entries(careerPaths)) {
    if (pathData.roles.includes(currentRole)) {
      // For each possible tech transition in this field
      pathData.techTransitions.forEach(transition => {
        // Calculate skill match percentage
        const matchingSkillsCount = transition.matchingSkills.filter(
          skill => currentSkills.includes(skill)
        ).length;
        const matchPercentage = (matchingSkillsCount / transition.matchingSkills.length) * 100;
        
        // Calculate missing skills
        const missingSkills = transition.requiredSkills.filter(
          skill => !currentSkills.includes(skill)
        );
        
        // Get learning resources for missing skills
        const learningPath = missingSkills.map(skill => ({
          skill,
          resources: learningResources[skill] || []
        }));
        
        possiblePaths.push({
          targetRole: transition.role,
          matchPercentage,
          missingSkills,
          learningPath,
          timeToTransition: transition.timeToTransition,
          avgSalary: transition.avgSalary
        });
      });
    }
  }
  
  // Sort by match percentage
  return possiblePaths.sort((a, b) => b.matchPercentage - a.matchPercentage);
};

// Get recommended job titles based on transition progress
export const getRecommendedJobTitles = (currentRole, targetRole, acquiredSkills) => {
  // This would contain logic to suggest intermediate roles
  // based on current progress in the transition
  const transitionStages = {
    'Healthcare': {
      'Health Tech Product Manager': [
        'Clinical Systems Analyst',
        'Healthcare IT Specialist',
        'Health Tech Product Owner'
      ]
    },
    'Finance': {
      'FinTech Product Manager': [
        'Business Analyst',
        'Product Owner',
        'Technical Product Manager'
      ]
    }
  };
  
  return transitionStages[currentRole]?.[targetRole] || [];
};

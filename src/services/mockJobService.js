// Mock jobs data
export const mockJobs = [
  {
    id: 1,
    title: 'Senior Product Manager',
    company: 'Stripe',
    location: 'San Francisco, CA',
    salary: '$150,000 - $220,000',
    employmentType: 'Full-time',
    description: 'Lead product strategy and execution for our payments platform. Focus on developer experience and API design.',
    connections: [
      {
        name: "Sarah Chen",
        role: "Product Director",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg"
      },
      {
        name: "Michael Ross",
        role: "Engineering Manager",
        avatar: "https://randomuser.me/api/portraits/men/2.jpg"
      }
    ],
    consultants: [
      {
        name: "David Kim",
        role: "Technical Recruiter",
        avatar: "https://randomuser.me/api/portraits/men/3.jpg"
      }
    ],
    trending: true
  },
  {
    id: 2,
    title: 'Technical Project Manager',
    company: 'Microsoft',
    location: 'Seattle, WA',
    salary: '$140,000 - $200,000',
    employmentType: 'Full-time',
    description: 'Drive technical initiatives and coordinate cross-functional teams for cloud infrastructure projects.',
    connections: [
      {
        name: "Emily Johnson",
        role: "Senior TPM",
        avatar: "https://randomuser.me/api/portraits/women/4.jpg"
      }
    ],
    consultants: [
      {
        name: "James Wilson",
        role: "Product Lead",
        avatar: "https://randomuser.me/api/portraits/men/5.jpg"
      }
    ],
    trending: true
  },
  {
    id: 3,
    title: 'Product Manager, AI/ML',
    company: 'OpenAI',
    location: 'San Francisco, CA',
    salary: '$180,000 - $250,000',
    employmentType: 'Full-time',
    description: 'Shape the future of AI products. Work with researchers and engineers to bring cutting-edge ML models to market.',
    connections: [],
    consultants: [
      {
        name: "Lisa Park",
        role: "AI Research Lead",
        avatar: "https://randomuser.me/api/portraits/women/6.jpg"
      }
    ],
    trending: true
  },
  {
    id: 4,
    title: 'Senior Product Manager, Mobile',
    company: 'Spotify',
    location: 'New York, NY',
    salary: '$160,000 - $230,000',
    employmentType: 'Full-time',
    description: 'Lead the mobile product experience team. Focus on user engagement and retention.',
    connections: [
      {
        name: "Rachel Green",
        role: "Design Director",
        avatar: "https://randomuser.me/api/portraits/women/7.jpg"
      }
    ],
    consultants: [
      {
        name: "Sophie Martinez",
        role: "Growth Advisor",
        avatar: "https://randomuser.me/api/portraits/women/8.jpg"
      }
    ],
    trending: true
  },
  {
    id: 5,
    title: 'Product Manager',
    company: 'Google',
    location: 'Mountain View, CA',
    salary: '$140,000 - $210,000',
    employmentType: 'Full-time',
    description: 'Drive product development for Google Search features. Work with ML and search quality teams.',
    connections: [
      {
        name: "Thomas Lee",
        role: "Search Quality Lead",
        avatar: "https://randomuser.me/api/portraits/men/9.jpg"
      }
    ],
    consultants: [
      {
        name: "Ryan Cooper",
        role: "Creative Director",
        avatar: "https://randomuser.me/api/portraits/men/10.jpg"
      }
    ],
    trending: true
  },
  {
    id: 6,
    title: 'Technical Program Manager',
    company: 'Amazon',
    location: 'Seattle, WA',
    salary: '$130,000 - $190,000',
    employmentType: 'Full-time',
    description: 'Lead technical programs for AWS services. Coordinate between engineering teams and stakeholders.',
    connections: [
      {
        name: "Chris Anderson",
        role: "Engineering Director",
        avatar: "https://randomuser.me/api/portraits/men/11.jpg"
      }
    ],
    consultants: [
      {
        name: "Maria Garcia",
        role: "Technical Advisor",
        avatar: "https://randomuser.me/api/portraits/women/11.jpg"
      }
    ],
    trending: false
  },
  {
    id: 7,
    title: 'Product Manager, Platform',
    company: 'Figma',
    location: 'San Francisco, CA',
    salary: '$145,000 - $215,000',
    employmentType: 'Full-time',
    description: 'Own the platform strategy for our design tools. Focus on extensibility and developer ecosystem.',
    connections: [
      {
        name: "Daniel Wong",
        role: "Platform Lead",
        avatar: "https://randomuser.me/api/portraits/men/12.jpg"
      }
    ],
    consultants: [
      {
        name: "Emma Thompson",
        role: "UX Consultant",
        avatar: "https://randomuser.me/api/portraits/women/12.jpg"
      }
    ],
    trending: false
  }
];

// Get trending jobs
export function getTrendingJobs() {
  console.log('Getting trending jobs from:', mockJobs);
  const trendingJobs = mockJobs.filter(job => job.trending);
  console.log('Filtered trending jobs:', trendingJobs);
  return trendingJobs;
}

// Search jobs by query
export function searchMockJobs(query) {
  console.log('Searching jobs with query:', query);
  if (!query) {
    console.log('No query, returning all jobs:', mockJobs);
    return mockJobs;
  }
  
  const searchTerms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (searchTerms.length === 0) {
    console.log('No search terms, returning all jobs:', mockJobs);
    return mockJobs;
  }

  const results = mockJobs.filter(job => {
    const searchableText = [
      job.title,
      job.company,
      job.location,
      job.description,
      job.employmentType,
      job.salary
    ].join(' ').toLowerCase();

    return searchTerms.every(term => searchableText.includes(term));
  });

  console.log('Search results:', results);
  return results;
}

// Get job by ID
export function getJobById(id) {
  console.log('Getting job by id:', id);
  const job = mockJobs.find(job => job.id === id);
  console.log('Found job:', job);
  return job;
}

// Export for direct access
export const allMockJobs = mockJobs;

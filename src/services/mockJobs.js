export const mockJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp",
    location: "New York, USA",
    isRemote: true,
    employmentType: "full-time",
    workType: "remote",
    experienceLevel: "senior",
    salary: 150000,
    description: "We're looking for a Senior Frontend Developer to join our growing team...",
    requirements: [
      "5+ years of experience with React",
      "Strong TypeScript skills",
      "Experience with state management (Redux, MobX)",
      "Experience with modern CSS and CSS-in-JS",
      "Understanding of web performance optimization"
    ],
    highlights: [
      "Competitive salary and equity package",
      "Remote-first culture",
      "Health, dental, and vision insurance",
      "Unlimited PTO"
    ],
    roleMatch: {
      score: 85,
      matchingSkills: ["React", "TypeScript", "Redux"],
      missingRequirements: ["Web performance optimization"]
    }
  },
  {
    id: 2,
    title: "Full Stack Engineer",
    company: "StartupX",
    location: "San Francisco, CA",
    isRemote: false,
    employmentType: "full-time",
    workType: "hybrid",
    experienceLevel: "mid",
    salary: 130000,
    description: "Join our fast-paced engineering team building the next generation of fintech solutions...",
    requirements: [
      "3+ years of full stack development",
      "Experience with Node.js and Express",
      "Proficiency in React or similar frontend frameworks",
      "Knowledge of SQL and NoSQL databases",
      "Understanding of cloud services (AWS/GCP)"
    ],
    highlights: [
      "Fast-paced startup environment",
      "Comprehensive benefits package",
      "Regular team events",
      "Professional development budget"
    ],
    roleMatch: {
      score: 70,
      matchingSkills: ["Node.js", "React"],
      missingRequirements: ["Cloud services experience"]
    }
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "DesignLab",
    location: "Remote",
    isRemote: true,
    employmentType: "contract",
    workType: "remote",
    experienceLevel: "mid",
    salary: 90000,
    description: "We're seeking a talented UI/UX Designer to help create beautiful and intuitive user experiences...",
    requirements: [
      "3+ years of UI/UX design experience",
      "Proficiency in Figma and Adobe Creative Suite",
      "Strong portfolio demonstrating web and mobile design",
      "Experience with design systems",
      "Understanding of user research and testing"
    ],
    highlights: [
      "Flexible work hours",
      "Creative freedom",
      "Collaborative team environment",
      "Latest design tools and resources"
    ],
    roleMatch: {
      score: 60,
      matchingSkills: ["Figma", "Design Systems"],
      missingRequirements: ["User research experience", "Mobile design portfolio"]
    }
  }
];

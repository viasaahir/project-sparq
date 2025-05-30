// Mock matching service that simulates AI-powered job matching
// In a real app, this would use NLP and ML models

export async function calculateJobMatch(job, roleDescription = '', resumeData = null) {
  console.log('Calculating job match:', { job, roleDescription, hasResume: !!resumeData });

  // Simulate a delay to mimic API call
  await new Promise(resolve => setTimeout(resolve, 100));

  // Calculate role match if we have a role description
  let roleMatch = null;
  if (roleDescription) {
    // Simple mock scoring based on keyword matching
    const keywords = roleDescription.toLowerCase().split(/\s+/).filter(Boolean);
    const jobText = `${job.title} ${job.company} ${job.description}`.toLowerCase();
    const matches = keywords.filter(word => jobText.includes(word));
    roleMatch = (matches.length / keywords.length) * 100;
    roleMatch = Math.min(100, Math.max(0, roleMatch)); // Clamp between 0-100
    console.log('Role match score:', roleMatch);
  }

  // Calculate candidate fit if we have resume data
  let candidateFit = null;
  if (resumeData) {
    // Simple mock scoring
    candidateFit = Math.random() * 40 + 60; // Random score between 60-100
    console.log('Candidate fit score:', candidateFit);
  }

  return {
    roleMatch,
    candidateFit,
  };
}

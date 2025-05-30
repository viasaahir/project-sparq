import axios from 'axios';

const ADZUNA_BASE_URL = 'https://api.adzuna.com/v1/api/jobs/us/search/1';

export async function searchJobs(query, location = '') {
  try {
    console.log('Searching jobs with query:', query);
    console.log('Using Adzuna credentials:', {
      app_id: import.meta.env.VITE_ADZUNA_APP_ID,
      app_key: import.meta.env.VITE_ADZUNA_API_KEY
    });

    const response = await axios.get(ADZUNA_BASE_URL, {
      params: {
        app_id: import.meta.env.VITE_ADZUNA_APP_ID,
        app_key: import.meta.env.VITE_ADZUNA_API_KEY,
        what: query,
        where: location,
        content_type: 'application/json',
        results_per_page: 20,
        max_days_old: 30
      }
    });

    console.log('Adzuna API response:', response.data);

    if (!response.data.results) {
      console.error('No results in Adzuna response:', response.data);
      return [];
    }

    const jobs = response.data.results.map(job => ({
      id: job.id,
      title: job.title,
      company: job.company?.display_name || 'Company Not Listed',
      location: job.location?.display_name || 'Location Not Specified',
      description: job.description || '',
      salary: job.salary_max ? `$${Math.round(job.salary_min).toLocaleString()} - $${Math.round(job.salary_max).toLocaleString()}` : 'Salary Not Specified',
      url: job.redirect_url,
      created: new Date(job.created).toLocaleDateString(),
      employmentType: job.contract_time || 'Full-time'
    }));

    console.log('Processed jobs:', jobs);
    return jobs;

  } catch (error) {
    console.error('Error fetching jobs from Adzuna:', error.response?.data || error.message);
    if (error.response?.data) {
      console.error('Full error response:', error.response.data);
    }
    return [];
  }
}

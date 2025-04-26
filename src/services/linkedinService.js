import axios from 'axios';

const LINKEDIN_API_BASE = import.meta.env.VITE_LINKEDIN_API_URL || 'http://localhost:3001/api';
const LINKEDIN_CLIENT_ID = import.meta.env.VITE_LINKEDIN_CLIENT_ID;

class LinkedInService {
  constructor() {
    this.accessToken = null;
    this.isInitialized = false;
  }

  // Mock implementation for development
  async initialize() {
    if (this.isInitialized) return;
    this.isInitialized = true;
    return Promise.resolve();
  }

  async getConnections(jobDetails) {
    try {
      // Mock data for development
      return [
        {
          id: '1',
          name: 'John Smith',
          title: 'Senior Software Engineer',
          company: jobDetails.company,
          degree: 1,
          profileUrl: '#',
          relevance: 95,
          relevanceReason: 'Works at the company • Direct connection'
        },
        {
          id: '2',
          name: 'Sarah Johnson',
          title: 'Engineering Manager',
          company: 'Tech Corp',
          degree: 2,
          profileUrl: '#',
          relevance: 85,
          relevanceReason: 'Similar role • Second-degree connection'
        },
        {
          id: '3',
          name: 'Mike Wilson',
          title: 'Technical Recruiter',
          company: jobDetails.company,
          degree: 1,
          profileUrl: '#',
          relevance: 80,
          relevanceReason: 'Works at the company • Direct connection'
        }
      ];
    } catch (error) {
      console.error('Error fetching LinkedIn connections:', error);
      throw error;
    }
  }

  async sendOutreachEmail(connection, emailContent) {
    try {
      // Mock successful email send
      return {
        success: true,
        messageId: 'mock-message-id-' + Date.now(),
        sentAt: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error sending outreach email:', error);
      throw error;
    }
  }

  async getMessageMetrics(messageId) {
    try {
      // Mock metrics data
      return {
        openRate: 75,
        responseRate: 60,
        avgResponseTime: 4
      };
    } catch (error) {
      console.error('Error fetching message metrics:', error);
      throw error;
    }
  }
}

export default new LinkedInService();

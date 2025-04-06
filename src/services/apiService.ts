
import axios from 'axios';

// Replace with your actual Flask backend URL when deployed
const API_URL = 'http://localhost:5000';

// Create axios instance for API requests
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Health API endpoints
export const healthApi = {
  // Submit symptoms to ML model for analysis
  submitSymptoms: async (symptoms: any, notes: string) => {
    try {
      const response = await apiClient.post('/api/symptoms', { symptoms, notes });
      return response.data;
    } catch (error) {
      console.error('Error submitting symptoms:', error);
      throw error;
    }
  },
  
  // Get health predictions from AI model
  getHealthPredictions: async (userId: string) => {
    try {
      const response = await apiClient.get(`/api/predictions/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching predictions:', error);
      throw error;
    }
  },
  
  // Submit wearable data for analysis
  submitWearableData: async (wearableData: any) => {
    try {
      const response = await apiClient.post('/api/wearables', wearableData);
      return response.data;
    } catch (error) {
      console.error('Error submitting wearable data:', error);
      throw error;
    }
  },
  
  // Get personalized health alerts from AI
  getHealthAlerts: async (userId: string) => {
    try {
      const response = await apiClient.get(`/api/alerts/${userId}`);
      return response.data;
      
      // Note: The API now returns alerts in response.data.alerts
      // The frontend components may need to be updated to use this structure
    } catch (error) {
      console.error('Error fetching health alerts:', error);
      throw error;
    }
  },
  
  // Generate health report with ML insights
  generateReport: async (userId: string, timeRange: string) => {
    try {
      const response = await apiClient.post('/api/reports/generate', { 
        userId, 
        timeRange 
      });
      return response.data;
    } catch (error) {
      console.error('Error generating report:', error);
      throw error;
    }
  },
  
  // Check if the API is running
  checkHealth: async () => {
    try {
      const response = await apiClient.get('/health');
      return response.data;
    } catch (error) {
      console.error('API health check failed:', error);
      throw error;
    }
  }
};

export default apiClient;

const request = require('supertest');
const app = require('../index');

describe('NASA Project Backend API', () => {
  // Health check endpoint
  describe('GET /api/health', () => {
    it('should return health status', async () => {
      const response = await request(app).get('/api/health');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status', 'OK');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('uptime');
    });
  });

  // APOD endpoint
  describe('GET /api/apod', () => {
    it('should return APOD data', async () => {
      const response = await request(app).get('/api/apod');
      
      // Since we're using demo key, the response might be limited
      // We'll just check that we get a response
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });

    it('should handle date parameter', async () => {
      const response = await request(app).get('/api/apod?date=2023-01-01');
      
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });
  });

  // Mars Rover endpoint
  describe('GET /api/mars-rover', () => {
    it('should return Mars Rover data', async () => {
      const response = await request(app).get('/api/mars-rover');
      
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });

    it('should handle query parameters', async () => {
      const response = await request(app).get('/api/mars-rover?sol=1000&camera=fhaz');
      
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });
  });

  // NASA Images endpoint
  describe('GET /api/nasa-images', () => {
    it('should return NASA image search results', async () => {
      const response = await request(app).get('/api/nasa-images');
      
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });

    it('should handle search query', async () => {
      const response = await request(app).get('/api/nasa-images?q=mars');
      
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });
  });

  // 404 handler
  describe('GET /api/nonexistent', () => {
    it('should return 404 for non-existent endpoints', async () => {
      const response = await request(app).get('/api/nonexistent');
      
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'Endpoint not found');
    });
  });
}); 
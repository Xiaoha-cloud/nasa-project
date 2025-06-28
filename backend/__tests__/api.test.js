const request = require('supertest');
const app = require('../server');

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
  describe('GET /api/mars', () => {
    it('should return Mars Rover data', async () => {
      const response = await request(app).get('/api/mars?rover=curiosity&earth_date=2023-01-01');
      
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });

    it('should handle missing parameters', async () => {
      const response = await request(app).get('/api/mars');
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });

  // NEO endpoint
  describe('GET /api/neo', () => {
    it('should return NEO data', async () => {
      const response = await request(app).get('/api/neo?start_date=2024-01-01&end_date=2024-01-07');
      
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });

    it('should handle missing date parameters', async () => {
      const response = await request(app).get('/api/neo');
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });

  // Search endpoint
  describe('GET /api/search', () => {
    it('should return search results', async () => {
      const response = await request(app).get('/api/search?q=mars');
      
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });

    it('should handle missing query parameter', async () => {
      const response = await request(app).get('/api/search');
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
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
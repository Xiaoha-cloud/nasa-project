const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(morgan('combined')); // Logging
app.use(express.json()); // Parse JSON bodies

// NASA API base URL
const NASA_API_BASE = 'https://api.nasa.gov';
const NASA_API_KEY = process.env.NASA_API_KEY || 'DEMO_KEY'; // Use demo key if no API key provided

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Get Astronomy Picture of the Day
app.get('/api/apod', async (req, res) => {
  try {
    const { date } = req.query;
    const url = `${NASA_API_BASE}/planetary/apod`;
    const params = {
      api_key: NASA_API_KEY,
      ...(date && { date })
    };

    const response = await axios.get(url, { params });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching APOD:', error.message);
    res.status(500).json({
      error: 'Failed to fetch Astronomy Picture of the Day',
      message: error.message
    });
  }
});

// Get Mars Rover photos
app.get('/api/mars-rover', async (req, res) => {
  try {
    const { sol, camera, page } = req.query;
    const url = `${NASA_API_BASE}/mars-photos/api/v1/rovers/curiosity/photos`;
    const params = {
      api_key: NASA_API_KEY,
      sol: sol || 1000, // Default to sol 1000 if not specified
      ...(camera && { camera }),
      ...(page && { page })
    };

    const response = await axios.get(url, { params });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching Mars Rover data:', error.message);
    res.status(500).json({
      error: 'Failed to fetch Mars Rover data',
      message: error.message
    });
  }
});

// Get NASA image search
app.get('/api/nasa-images', async (req, res) => {
  try {
    const { q, media_type, year_start, year_end } = req.query;
    const url = `${NASA_API_BASE}/search`;
    const params = {
      api_key: NASA_API_KEY,
      q: q || 'earth',
      media_type: media_type || 'image',
      ...(year_start && { year_start }),
      ...(year_end && { year_end })
    };

    const response = await axios.get(url, { params });
    res.json(response.data);
  } catch (error) {
    console.error('Error searching NASA images:', error.message);
    res.status(500).json({
      error: 'Failed to search NASA images',
      message: error.message
    });
  }
});

// Error handling middleware
app.use((err, req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: err.message
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    message: `The endpoint ${req.originalUrl} does not exist`
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 NASA Project Backend running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🌌 APOD endpoint: http://localhost:${PORT}/api/apod`);
  console.log(`🔴 Mars Rover endpoint: http://localhost:${PORT}/api/mars-rover`);
});

module.exports = app; // Export for testing 
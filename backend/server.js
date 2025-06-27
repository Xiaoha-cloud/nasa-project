require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Import routes
const apodRoutes = require('./routes/apod.route');
const marsRoutes = require('./routes/mars.route');
const neoRoutes = require('./routes/neo.route');
const searchRoutes = require('./routes/search.route');

// Import middlewares
const { errorHandler, notFound } = require('./middlewares/errorHandler');
const corsMiddleware = require('./middlewares/cors');

const app = express();
const PORT = process.env.PORT || 4000;

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    error: 'Too many requests from this IP, please try again later.',
    timestamp: new Date().toISOString()
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', limiter);

// CORS middleware
app.use(corsMiddleware);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'NASA Explorer API is running',
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0'
  });
});

// API documentation endpoint
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'NASA Explorer API',
    version: '1.0.0',
    endpoints: {
      health: {
        method: 'GET',
        path: '/api/health',
        description: 'Health check endpoint'
      },
      apod: {
        method: 'GET',
        path: '/api/apod',
        description: 'Get Astronomy Picture of the Day',
        query: {
          date: 'Optional date in YYYY-MM-DD format'
        }
      },
      mars: {
        method: 'GET',
        path: '/api/mars',
        description: 'Get Mars rover photos',
        query: {
          rover: 'Rover name (curiosity, opportunity, spirit, perseverance)',
          earth_date: 'Date in YYYY-MM-DD format',
          page: 'Page number (default: 1)'
        }
      },
      neo: {
        method: 'GET',
        path: '/api/neo',
        description: 'Get Near Earth Objects',
        query: {
          start_date: 'Start date in YYYY-MM-DD format',
          end_date: 'End date in YYYY-MM-DD format (max 7 days)'
        }
      },
      search: {
        method: 'GET',
        path: '/api/search',
        description: 'Search NASA Image and Video Library',
        query: {
          q: 'Search query (required)',
          page: 'Page number (default: 1, max: 100)',
          media_type: 'Type of media (image, video, audio, default: image)'
        }
      }
    },
    timestamp: new Date().toISOString()
  });
});

// Mount API routes
app.use('/api/apod', apodRoutes);
app.use('/api/mars', marsRoutes);
app.use('/api/neo', neoRoutes);
app.use('/api/search', searchRoutes);

// 404 handler for undefined routes
app.use(notFound);

// Global error handler (must be last)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 NASA Explorer API server running on port ${PORT}`);
  console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📚 API docs: http://localhost:${PORT}/api`);
  console.log(`🌌 NASA API Key: ${process.env.NASA_API_KEY ? 'Configured' : 'Using DEMO_KEY'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});

module.exports = app; 
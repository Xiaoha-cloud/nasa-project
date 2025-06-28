const cors = require('cors');

/**
 * CORS Configuration Middleware
 * Handles Cross-Origin Resource Sharing
 */

// CORS options configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'http://localhost:3000',           // Next.js frontend (development)
      'http://localhost:3001',           // Alternative frontend port
      'http://localhost:3002',           // Next.js frontend (alternative port)
      'https://your-frontend-domain.com', // Production frontend (update this)
      process.env.CORS_ORIGIN            // From environment variable
    ].filter(Boolean); // Remove undefined values

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked request from origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow cookies and authentication headers
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authorization',
    'Cache-Control'
  ],
  exposedHeaders: ['X-Total-Count', 'X-Page-Count'],
  maxAge: 86400 // Cache preflight requests for 24 hours
};

// Create CORS middleware
const corsMiddleware = cors(corsOptions);

module.exports = corsMiddleware; 
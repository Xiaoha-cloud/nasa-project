const express = require('express');
const neoController = require('../controllers/neo.controller');

const router = express.Router();

/**
 * @route   GET /api/neo
 * @desc    Get Near Earth Objects in a date range
 * @access  Public
 * @query   {string} start_date - Start date in YYYY-MM-DD format
 * @query   {string} end_date - End date in YYYY-MM-DD format (max 7 days from start)
 * @example GET /api/neo?start_date=2024-01-01&end_date=2024-01-07
 */
router.get('/', neoController.getNeoFeed);

/**
 * @route   GET /api/neo/stats
 * @desc    Get NEO statistics for a date range (future enhancement)
 * @access  Public
 * @query   {string} start_date - Start date in YYYY-MM-DD format
 * @query   {string} end_date - End date in YYYY-MM-DD format
 * @example GET /api/neo/stats?start_date=2024-01-01&end_date=2024-01-07
 */
router.get('/stats', neoController.getNeoStats);

module.exports = router; 
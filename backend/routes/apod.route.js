const express = require('express');
const apodController = require('../controllers/apod.controller');

const router = express.Router();

/**
 * @route   GET /api/apod
 * @desc    Get Astronomy Picture of the Day
 * @access  Public
 * @query   {string} date - Optional date in YYYY-MM-DD format
 * @example GET /api/apod?date=2024-01-15
 */
router.get('/', apodController.getApod);

/**
 * @route   GET /api/apod/range
 * @desc    Get APOD for a date range (future enhancement)
 * @access  Public
 * @query   {string} start_date - Start date in YYYY-MM-DD format
 * @query   {string} end_date - End date in YYYY-MM-DD format
 * @example GET /api/apod/range?start_date=2024-01-01&end_date=2024-01-07
 */
router.get('/range', apodController.getApodRange);

module.exports = router; 
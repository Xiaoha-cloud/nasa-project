const express = require('express');
const marsController = require('../controllers/mars.controller');

const router = express.Router();

/**
 * @route   GET /api/mars
 * @desc    Get Mars rover photos for a specific date
 * @access  Public
 * @query   {string} rover - Rover name (curiosity, opportunity, spirit, perseverance)
 * @query   {string} earth_date - Date in YYYY-MM-DD format
 * @query   {number} page - Page number for pagination (default: 1)
 * @example GET /api/mars?rover=curiosity&earth_date=2024-01-15&page=1
 */
router.get('/', marsController.getMarsPhotos);

/**
 * @route   GET /api/mars/rovers
 * @desc    Get available Mars rovers information
 * @access  Public
 * @example GET /api/mars/rovers
 */
router.get('/rovers', marsController.getMarsRovers);

module.exports = router; 
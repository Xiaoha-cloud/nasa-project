const express = require('express');
const searchController = require('../controllers/search.controller');

const router = express.Router();

/**
 * @route   GET /api/search
 * @desc    Search NASA Image and Video Library
 * @access  Public
 * @query   {string} q - Search query (required)
 * @query   {number} page - Page number for pagination (default: 1, max: 100)
 * @query   {string} media_type - Type of media (image, video, audio, default: image)
 * @example GET /api/search?q=mars rover&page=1&media_type=image
 */
router.get('/', searchController.searchMedia);

/**
 * @route   GET /api/search/suggestions
 * @desc    Get search suggestions (future enhancement)
 * @access  Public
 * @query   {string} q - Search query for suggestions
 * @example GET /api/search/suggestions?q=mars
 */
router.get('/suggestions', searchController.getSearchSuggestions);

/**
 * @route   GET /api/search/trending
 * @desc    Get trending searches (future enhancement)
 * @access  Public
 * @example GET /api/search/trending
 */
router.get('/trending', searchController.getTrendingSearches);

module.exports = router; 
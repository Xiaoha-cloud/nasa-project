const nasaApiService = require('../services/nasaApi.service');

/**
 * Search Controller - Handles NASA Image and Video Library search requests
 */
class SearchController {
  /**
   * Search NASA Image and Video Library
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async searchMedia(req, res) {
    try {
      const { q, page = 1, media_type = 'image' } = req.query;
      
      // Validate required parameters
      if (!q || q.trim() === '') {
        return res.status(400).json({
          success: false,
          error: 'Search query (q) is required',
          example: '?q=mars rover&page=1&media_type=image',
          available_media_types: ['image', 'video', 'audio']
        });
      }

      // Validate media type
      const validMediaTypes = ['image', 'video', 'audio'];
      if (!validMediaTypes.includes(media_type.toLowerCase())) {
        return res.status(400).json({
          success: false,
          error: 'Invalid media_type',
          available_media_types: validMediaTypes,
          example: '?q=mars rover&media_type=image'
        });
      }

      // Validate page number
      const pageNum = parseInt(page);
      if (isNaN(pageNum) || pageNum < 1) {
        return res.status(400).json({
          success: false,
          error: 'Page must be a positive integer',
          example: '?q=mars rover&page=1'
        });
      }

      // Limit page number to prevent excessive requests
      if (pageNum > 100) {
        return res.status(400).json({
          success: false,
          error: 'Page number cannot exceed 100',
          example: '?q=mars rover&page=1'
        });
      }

      const result = await nasaApiService.searchMedia(q.trim(), pageNum, media_type);
      
      if (result.success) {
        res.json({
          success: true,
          data: result.data,
          message: result.message,
          query: { 
            search_term: q.trim(), 
            page: pageNum, 
            media_type: media_type.toLowerCase() 
          },
          timestamp: new Date().toISOString()
        });
      } else {
        res.status(result.status || 500).json({
          success: false,
          error: result.error,
          query: { 
            search_term: q.trim(), 
            page: pageNum, 
            media_type: media_type.toLowerCase() 
          },
          timestamp: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Search Controller Error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error while searching NASA media',
        timestamp: new Date().toISOString()
      });
    }
  }

  /**
   * Get search suggestions (future enhancement)
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async getSearchSuggestions(req, res) {
    try {
      const { q } = req.query;
      
      if (!q || q.trim() === '') {
        return res.status(400).json({
          success: false,
          error: 'Search query (q) is required for suggestions',
          example: '?q=mars'
        });
      }

      // For now, return a message about future implementation
      res.json({
        success: true,
        message: 'Search suggestions feature coming soon',
        search_term: q.trim(),
        features: [
          'Popular search terms',
          'Auto-complete suggestions',
          'Related search terms',
          'Recent searches'
        ],
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Search Suggestions Controller Error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error while fetching search suggestions',
        timestamp: new Date().toISOString()
      });
    }
  }

  /**
   * Get trending searches (future enhancement)
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async getTrendingSearches(req, res) {
    try {
      res.json({
        success: true,
        message: 'Trending searches feature coming soon',
        features: [
          'Most popular searches',
          'Trending topics',
          'Seasonal searches',
          'Recent discoveries'
        ],
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Trending Searches Controller Error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error while fetching trending searches',
        timestamp: new Date().toISOString()
      });
    }
  }
}

module.exports = new SearchController(); 
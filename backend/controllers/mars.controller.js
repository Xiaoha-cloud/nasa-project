const nasaApiService = require('../services/nasaApi.service');

/**
 * Mars Controller - Handles Mars rover photos requests
 */
class MarsController {
  /**
   * Get Mars rover photos
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async getMarsPhotos(req, res) {
    try {
      const { rover, earth_date, page = 1 } = req.query;
      
      // Validate required parameters
      if (!rover || !earth_date) {
        return res.status(400).json({
          success: false,
          error: 'Both rover and earth_date are required',
          example: '?rover=curiosity&earth_date=2024-01-15',
          available_rovers: ['curiosity', 'opportunity', 'spirit', 'perseverance']
        });
      }

      // Validate rover name
      const validRovers = ['curiosity', 'opportunity', 'spirit', 'perseverance'];
      if (!validRovers.includes(rover.toLowerCase())) {
        return res.status(400).json({
          success: false,
          error: 'Invalid rover name',
          available_rovers: validRovers,
          example: '?rover=curiosity&earth_date=2024-01-15'
        });
      }

      // Validate date format
      if (!/^\d{4}-\d{2}-\d{2}$/.test(earth_date)) {
        return res.status(400).json({
          success: false,
          error: 'Invalid date format. Use YYYY-MM-DD format.',
          example: '2024-01-15'
        });
      }

      // Validate page number
      const pageNum = parseInt(page);
      if (isNaN(pageNum) || pageNum < 1) {
        return res.status(400).json({
          success: false,
          error: 'Page must be a positive integer',
          example: '?rover=curiosity&earth_date=2024-01-15&page=1'
        });
      }

      const result = await nasaApiService.getMarsPhotos(rover, earth_date, pageNum);
      
      if (result.success) {
        res.json({
          success: true,
          data: result.data,
          message: result.message,
          query: { rover, earth_date, page: pageNum },
          timestamp: new Date().toISOString()
        });
      } else {
        res.status(result.status || 500).json({
          success: false,
          error: result.error,
          query: { rover, earth_date, page: pageNum },
          timestamp: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Mars Photos Controller Error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error while fetching Mars photos',
        timestamp: new Date().toISOString()
      });
    }
  }

  /**
   * Get available Mars rovers
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async getMarsRovers(req, res) {
    try {
      const result = await nasaApiService.getMarsRovers();
      
      if (result.success) {
        res.json({
          success: true,
          data: result.data,
          message: result.message,
          timestamp: new Date().toISOString()
        });
      } else {
        res.status(result.status || 500).json({
          success: false,
          error: result.error,
          timestamp: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Mars Rovers Controller Error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error while fetching Mars rovers',
        timestamp: new Date().toISOString()
      });
    }
  }
}

module.exports = new MarsController(); 
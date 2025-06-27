const nasaApiService = require('../services/nasaApi.service');

/**
 * APOD Controller - Handles Astronomy Picture of the Day requests
 */
class ApodController {
  /**
   * Get Astronomy Picture of the Day
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async getApod(req, res) {
    try {
      const { date } = req.query;
      
      // Validate date format if provided
      if (date && !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return res.status(400).json({
          success: false,
          error: 'Invalid date format. Use YYYY-MM-DD format.',
          example: '2024-01-15'
        });
      }

      const result = await nasaApiService.getApod(date);
      
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
      console.error('APOD Controller Error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error while fetching APOD data',
        timestamp: new Date().toISOString()
      });
    }
  }

  /**
   * Get APOD for a date range (future enhancement)
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async getApodRange(req, res) {
    try {
      const { start_date, end_date } = req.query;
      
      // Validate date formats
      if (!start_date || !end_date) {
        return res.status(400).json({
          success: false,
          error: 'Both start_date and end_date are required',
          example: '?start_date=2024-01-01&end_date=2024-01-07'
        });
      }

      if (!/^\d{4}-\d{2}-\d{2}$/.test(start_date) || !/^\d{4}-\d{2}-\d{2}$/.test(end_date)) {
        return res.status(400).json({
          success: false,
          error: 'Invalid date format. Use YYYY-MM-DD format.',
          example: '2024-01-01'
        });
      }

      // For now, return a message about future implementation
      res.json({
        success: true,
        message: 'APOD range feature coming soon',
        requested_range: { start_date, end_date },
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('APOD Range Controller Error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error while fetching APOD range data',
        timestamp: new Date().toISOString()
      });
    }
  }
}

module.exports = new ApodController(); 
const nasaApiService = require('../services/nasaApi.service');

/**
 * NEO Controller - Handles Near Earth Objects requests
 */
class NeoController {
  /**
   * Get Near Earth Objects in a date range
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async getNeoFeed(req, res) {
    try {
      const { start_date, end_date } = req.query;
      
      // Validate required parameters
      if (!start_date || !end_date) {
        return res.status(400).json({
          success: false,
          error: 'Both start_date and end_date are required',
          example: '?start_date=2024-01-01&end_date=2024-01-07',
          note: 'Date range cannot exceed 7 days'
        });
      }

      // Validate date format
      if (!/^\d{4}-\d{2}-\d{2}$/.test(start_date) || !/^\d{4}-\d{2}-\d{2}$/.test(end_date)) {
        return res.status(400).json({
          success: false,
          error: 'Invalid date format. Use YYYY-MM-DD format.',
          example: '2024-01-01'
        });
      }

      // Validate date range (NASA API limit: 7 days)
      const start = new Date(start_date);
      const end = new Date(end_date);
      const daysDiff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      
      if (daysDiff > 7) {
        return res.status(400).json({
          success: false,
          error: 'Date range cannot exceed 7 days',
          requested_range: daysDiff + ' days',
          example: '?start_date=2024-01-01&end_date=2024-01-07'
        });
      }

      // Validate that start_date is not after end_date
      if (start > end) {
        return res.status(400).json({
          success: false,
          error: 'start_date cannot be after end_date',
          example: '?start_date=2024-01-01&end_date=2024-01-07'
        });
      }

      const result = await nasaApiService.getNeoFeed(start_date, end_date);
      
      if (result.success) {
        res.json({
          success: true,
          data: result.data,
          message: result.message,
          query: { start_date, end_date, days_range: daysDiff },
          timestamp: new Date().toISOString()
        });
      } else {
        res.status(result.status || 500).json({
          success: false,
          error: result.error,
          query: { start_date, end_date },
          timestamp: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('NEO Controller Error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error while fetching NEO data',
        timestamp: new Date().toISOString()
      });
    }
  }

  /**
   * Get NEO statistics (future enhancement)
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async getNeoStats(req, res) {
    try {
      const { start_date, end_date } = req.query;
      
      // Validate required parameters
      if (!start_date || !end_date) {
        return res.status(400).json({
          success: false,
          error: 'Both start_date and end_date are required for statistics',
          example: '?start_date=2024-01-01&end_date=2024-01-07'
        });
      }

      // For now, return a message about future implementation
      res.json({
        success: true,
        message: 'NEO statistics feature coming soon',
        requested_range: { start_date, end_date },
        features: [
          'Total NEOs in date range',
          'Potentially hazardous asteroids count',
          'Largest NEO diameter',
          'Closest approach distance'
        ],
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('NEO Stats Controller Error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error while fetching NEO statistics',
        timestamp: new Date().toISOString()
      });
    }
  }
}

module.exports = new NeoController(); 
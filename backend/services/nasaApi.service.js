const axios = require('axios');

class NasaApiService {
  constructor() {
    this.baseURL = 'https://api.nasa.gov';
    this.apiKey = process.env.NASA_API_KEY || 'DEMO_KEY';
    this.imagesApiURL = 'https://images-api.nasa.gov';
  }

  /**
   * Get Astronomy Picture of the Day
   * @param {string} date - Optional date in YYYY-MM-DD format
   * @returns {Promise<Object>} APOD data
   */
  async getApod(date = null) {
    try {
      const params = { api_key: this.apiKey };
      if (date) params.date = date;

      const response = await axios.get(`${this.baseURL}/planetary/apod`, { params });
      return {
        success: true,
        data: response.data,
        message: 'APOD data retrieved successfully'
      };
    } catch (error) {
      console.error('APOD API Error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.error_message || 'Failed to fetch APOD data',
        status: error.response?.status || 500
      };
    }
  }

  /**
   * Get Mars rover photos
   * @param {string} rover - Rover name (curiosity, opportunity, spirit)
   * @param {string} earthDate - Date in YYYY-MM-DD format
   * @param {number} page - Page number for pagination
   * @returns {Promise<Object>} Mars photos data
   */
  async getMarsPhotos(rover, earthDate, page = 1) {
    try {
      const params = {
        earth_date: earthDate,
        api_key: this.apiKey,
        page: page
      };

      const response = await axios.get(
        `${this.baseURL}/mars-photos/api/v1/rovers/${rover}/photos`,
        { params }
      );

      return {
        success: true,
        data: response.data,
        message: `Mars photos for ${rover} on ${earthDate} retrieved successfully`
      };
    } catch (error) {
      console.error('Mars Photos API Error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.error_message || 'Failed to fetch Mars photos',
        status: error.response?.status || 500
      };
    }
  }

  /**
   * Get Near Earth Objects
   * @param {string} startDate - Start date in YYYY-MM-DD format
   * @param {string} endDate - End date in YYYY-MM-DD format
   * @returns {Promise<Object>} NEO data
   */
  async getNeoFeed(startDate, endDate) {
    try {
      const params = {
        start_date: startDate,
        end_date: endDate,
        api_key: this.apiKey
      };

      const response = await axios.get(`${this.baseURL}/neo/rest/v1/feed`, { params });

      return {
        success: true,
        data: response.data,
        message: `NEO data from ${startDate} to ${endDate} retrieved successfully`
      };
    } catch (error) {
      console.error('NEO API Error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.error_message || 'Failed to fetch NEO data',
        status: error.response?.status || 500
      };
    }
  }

  /**
   * Search NASA Image and Video Library
   * @param {string} query - Search query
   * @param {number} page - Page number for pagination
   * @param {string} mediaType - Type of media (image, video, audio)
   * @returns {Promise<Object>} Search results
   */
  async searchMedia(query, page = 1, mediaType = 'image') {
    try {
      const params = {
        q: query,
        page: page,
        media_type: mediaType
      };

      const response = await axios.get(`${this.imagesApiURL}/search`, { params });

      return {
        success: true,
        data: response.data,
        message: `Search results for "${query}" retrieved successfully`
      };
    } catch (error) {
      console.error('NASA Search API Error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.error_message || 'Failed to search NASA media',
        status: error.response?.status || 500
      };
    }
  }

  /**
   * Get available Mars rovers
   * @returns {Promise<Object>} Available rovers data
   */
  async getMarsRovers() {
    try {
      const params = { api_key: this.apiKey };
      const response = await axios.get(`${this.baseURL}/mars-photos/api/v1/rovers`, { params });

      return {
        success: true,
        data: response.data,
        message: 'Mars rovers data retrieved successfully'
      };
    } catch (error) {
      console.error('Mars Rovers API Error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.error_message || 'Failed to fetch Mars rovers',
        status: error.response?.status || 500
      };
    }
  }
}

module.exports = new NasaApiService(); 
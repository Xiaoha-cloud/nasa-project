# NASA Explorer Backend API

Express.js backend API for the NASA Explorer project, serving as a proxy between the frontend and NASA's public APIs.

## Features

- **APOD (Astronomy Picture of the Day)** - Get NASA's daily featured space image
- **Mars Rover Photos** - Browse photos from Curiosity, Opportunity, Spirit, and Perseverance
- **Near Earth Objects (NEO)** - Track asteroids and comets approaching Earth
- **NASA Media Search** - Search NASA's vast collection of images and videos
- **Rate Limiting** - Protect against API abuse
- **CORS Support** - Cross-origin resource sharing for frontend integration
- **Error Handling** - Comprehensive error handling and logging
- **Security** - Helmet.js for security headers

##  Project Structure

```
backend/
├── controllers/          # Request handlers
│   ├── apod.controller.js
│   ├── mars.controller.js
│   ├── neo.controller.js
│   └── search.controller.js
├── routes/              # API route definitions
│   ├── apod.route.js
│   ├── mars.route.js
│   ├── neo.route.js
│   └── search.route.js
├── services/            # Business logic and external API calls
│   └── nasaApi.service.js
├── middlewares/         # Express middlewares
│   ├── errorHandler.js
│   └── cors.js
├── server.js            # Main application file
├── package.json         # Dependencies and scripts
└── .env.example         # Environment variables template
```

## 🛠 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd nasa-project/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your NASA API key
   ```

4. **Get NASA API Key**
   - Visit [https://api.nasa.gov/](https://api.nasa.gov/)
   - Sign up for a free API key
   - Add it to your `.env` file

## 🚀 Usage

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

The server will start on `http://localhost:4000` (or the port specified in your `.env` file).

## 📡 API Endpoints

### Health Check
- `GET /api/health` - Check API status

### APOD (Astronomy Picture of the Day)
- `GET /api/apod` - Get today's APOD
- `GET /api/apod?date=2024-01-15` - Get APOD for specific date

### Mars Rover Photos
- `GET /api/mars?rover=curiosity&earth_date=2024-01-15` - Get rover photos
- `GET /api/mars/rovers` - Get available rovers

### Near Earth Objects
- `GET /api/neo?start_date=2024-01-01&end_date=2024-01-07` - Get NEOs in date range

### NASA Media Search
- `GET /api/search?q=mars rover` - Search NASA media library
- `GET /api/search?q=mars rover&media_type=video` - Search for videos

## 🔧 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NASA_API_KEY` | Your NASA API key | `DEMO_KEY` |
| `PORT` | Server port | `4000` |
| `NODE_ENV` | Environment | `development` |
| `CORS_ORIGIN` | Allowed CORS origins | `http://localhost:3000` |

## 🧪 Testing

```bash
npm test
```

## 📚 API Documentation

Visit `http://localhost:4000/api` for interactive API documentation.

## 🔒 Security Features

- **Helmet.js** - Security headers
- **Rate Limiting** - 100 requests per 15 minutes per IP
- **CORS Protection** - Configurable origin restrictions
- **Input Validation** - Comprehensive parameter validation
- **Error Handling** - No sensitive data leakage in production

## 🚀 Deployment

### Render (Recommended)
1. Connect your GitHub repository to Render
2. Set environment variables in Render dashboard
3. Deploy automatically on push to main branch

### Heroku
1. Create Heroku app
2. Set environment variables
3. Deploy using Heroku CLI or GitHub integration

### Docker
```bash
docker build -t nasa-explorer-backend .
docker run -p 4000:4000 nasa-explorer-backend
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, please open an issue in the GitHub repository or contact the development team. 
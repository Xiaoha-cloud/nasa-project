# NASA Explorer - Space Data Visualization Platform

A comprehensive web application that leverages NASA's Open APIs to showcase space-related data through an interactive and visually appealing interface. Built with React frontend and Node.js backend, this application allows users to explore and interact with NASA's vast array of space data in a creative and engaging way.

## Features

### Core Functionality
- **Astronomy Picture of the Day (APOD)**: Daily featured space images with detailed explanations
- **Mars Rover Photos**: Explore the Red Planet through various Mars rovers' cameras
- **Near Earth Objects (NEO)**: Track asteroids and comets approaching Earth
- **NASA Media Search**: Search through NASA's extensive collection of images and videos

### Advanced Features
- **Interactive Data Visualization**: Charts and graphs for NEO data analysis
- **Real-time API Integration**: Live data from NASA's official APIs
- **Responsive Design**: Optimized for all screen sizes and devices
- **Advanced Search & Filtering**: Multi-criteria search functionality
- **Loading States & Error Handling**: Comprehensive user feedback
- **Performance Optimization**: Efficient data loading and caching

## Technology Stack

### Frontend
- **React 19** with Next.js 15
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **shadcn/ui** for modern UI components
- **Recharts** for data visualization
- **Lucide React** for icons

### Backend
- **Node.js** with Express.js
- **Axios** for HTTP requests
- **CORS** for cross-origin requests
- **Helmet** for security headers
- **Rate Limiting** for API protection

### Development Tools
- **ESLint** for code quality
- **Prettier** for code formatting
- **Husky** for pre-commit hooks
- **GitHub Actions** for CI/CD
- **TypeScript** for type checking

## Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm 8+
- NASA API Key (free from https://api.nasa.gov/)

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp env.example .env

# Add your NASA API key to .env
echo "NASA_API_KEY=your_api_key_here" >> .env

# Start development server
npm run dev
```

### Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### Full Stack Development
```bash
# From project root
npm install
npm run dev
```

## API Endpoints

### Backend API Routes
- `GET /api/health` - Health check endpoint
- `GET /api/apod` - Astronomy Picture of the Day
- `GET /api/mars` - Mars Rover photos
- `GET /api/neo` - Near Earth Objects data
- `GET /api/search` - NASA media search

### NASA API Integration
The application integrates with multiple NASA APIs:
- **APOD API**: Daily space images
- **Mars Rover Photos API**: Curiosity, Opportunity, Spirit, Perseverance
- **NEO Web Service**: Asteroid and comet tracking
- **NASA Image and Video Library**: Media search

## Project Structure

```
nasa-project/
├── backend/
│   ├── controllers/     # API route handlers
│   ├── middlewares/     # Express middlewares
│   ├── routes/          # API route definitions
│   ├── services/        # NASA API integration
│   └── server.js        # Express server setup
├── frontend/
│   ├── src/
│   │   ├── app/         # Next.js app router pages
│   │   ├── components/  # Reusable UI components
│   │   └── lib/         # Utility functions and API client
│   └── public/          # Static assets
├── .github/workflows/   # CI/CD pipelines
└── docs/               # Documentation
```

## Deployment

### Frontend (Vercel)
- Automatic deployment from main branch
- Environment variables configured for API endpoints
- Optimized for Next.js performance

### Backend (Render)
- Node.js web service deployment
- Automatic scaling and health checks
- Environment variables for API keys

### Environment Variables
```env
# Backend
NASA_API_KEY=your_nasa_api_key
NODE_ENV=production
PORT=10000

# Frontend
NEXT_PUBLIC_API_BASE_URL=https://your-backend-url.onrender.com/api
```

## Development Workflow

### Code Quality
- **Pre-commit hooks**: Automatic linting and type checking
- **ESLint**: Code quality enforcement
- **Prettier**: Consistent code formatting
- **TypeScript**: Type safety across the application

### Testing
```bash
# Run all tests
npm run test

# Run frontend tests
cd frontend && npm test

# Run backend tests
cd backend && npm test
```

### Code Quality Checks
```bash
# Run all quality checks
npm run check-all

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Type checking
npm run type-check
```

## Performance Optimization

### Frontend Optimizations
- **Next.js Image Optimization**: Automatic image compression
- **Code Splitting**: Lazy loading of components
- **Caching**: Efficient data caching strategies
- **Bundle Optimization**: Minimized bundle sizes

### Backend Optimizations
- **Rate Limiting**: API request throttling
- **Caching**: Response caching for NASA API calls
- **Error Handling**: Comprehensive error management
- **Security**: Helmet.js security headers

## User Experience Features

### Interactive Elements
- **Date Pickers**: Select specific dates for APOD and Mars photos
- **Rover Selection**: Choose different Mars rovers
- **Search Filters**: Advanced search with multiple criteria
- **Data Visualization**: Interactive charts for NEO data

### Responsive Design
- **Mobile-First**: Optimized for mobile devices
- **Tablet Support**: Responsive layouts for tablets
- **Desktop Enhancement**: Enhanced features for larger screens
- **Touch-Friendly**: Optimized touch interactions

### Loading & Error States
- **Skeleton Loading**: Placeholder content during loading
- **Error Boundaries**: Graceful error handling
- **Retry Mechanisms**: Automatic retry for failed requests
- **User Feedback**: Clear status messages and notifications

## Contributing

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Run quality checks: `npm run check-all`
5. Commit your changes: `git commit -m 'feat: add your feature'`
6. Push to the branch: `git push origin feature/your-feature`
7. Create a Pull Request

### Code Standards
- Follow TypeScript best practices
- Use ESLint and Prettier for code formatting
- Write meaningful commit messages
- Include tests for new features
- Update documentation as needed

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **NASA**: For providing the comprehensive APIs
- **Next.js Team**: For the excellent React framework
- **Express.js**: For the robust Node.js web framework
- **Open Source Community**: For the amazing tools and libraries

## Support

For questions, issues, or contributions, please:
1. Check the [Issues](https://github.com/your-username/nasa-project/issues) page
2. Create a new issue with detailed information
3. Follow the contributing guidelines

---

**Built with passion for space exploration and modern web technologies.** 
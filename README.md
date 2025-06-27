# NASA Project - Full Stack Application

A full-stack web application built with React (frontend) and Node.js + Express (backend) that integrates with NASA's Open APIs including APOD (Astronomy Picture of the Day) and Mars Rover data.

## Project Structure

```
nasa-project/
├── frontend/          # React application
├── backend/           # Node.js + Express API
├── .github/
│   └── workflows/     # GitHub Actions CI/CD workflows
└── README.md          # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd nasa-project
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   npm start
   ```
   The backend will run on `http://localhost:3001`

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm start
   ```
   The frontend will run on `http://localhost:3000`

## 🔧 Environment Variables

### Backend (.env)
```env
PORT=3001
NODE_ENV=development
# Add any NASA API keys if required
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:3001
# Add any other frontend environment variables
```

## 🚀 CI/CD Pipeline

This project uses GitHub Actions for continuous integration and deployment:

### Workflow Overview

1. **Development Branch (`dev`)**
   - Runs tests only
   - No deployment triggered
   - Ensures code quality before merging to main

2. **Main Branch (`main`)**
   - Runs tests
   - Deploys frontend to Vercel
   - Backend deployment handled by Render's GitHub integration

### Workflow Files

- `.github/workflows/frontend-deploy.yml` - Frontend deployment to Vercel
- `.github/workflows/test.yml` - Test execution for both frontend and backend

### Deployment Platforms

- **Frontend**: [Vercel](https://vercel.com) - Automatic deployments on push to main
- **Backend**: [Render](https://render.com) - Uses Render's GitHub integration

### Required Secrets

Configure these secrets in your GitHub repository settings:

#### For Vercel (Frontend)
- `VERCEL_TOKEN` - Your Vercel authentication token
- `VERCEL_PROJECT_ID` - Your Vercel project ID

#### For Render (Backend)
- Render secrets are managed directly in the Render dashboard
- No additional GitHub secrets required for backend deployment

## Testing

### Running Tests Locally

**Backend Tests:**
```bash
cd backend
npm test
```

**Frontend Tests:**
```bash
cd frontend
npm test
```

### CI/CD Test Execution

Tests are automatically run:
- On every push to any branch
- On pull requests
- Before deployment to production

## 📦 Build Commands

### Backend
```bash
npm start          # Start development server
npm run build      # Build for production (if applicable)
npm test           # Run tests
```

### Frontend
```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
```

## API Endpoints

The backend provides the following endpoints:

- `GET /api/apod` - Get Astronomy Picture of the Day
- `GET /api/mars-rover` - Get Mars Rover data
- `GET /api/health` - Health check endpoint

## 🛠️ Development Workflow

1. Create feature branch from `dev`
2. Make changes and test locally
3. Push to feature branch
4. Create pull request to `dev`
5. After review, merge to `dev`
6. Tests run automatically on `dev`
7. When ready for production, merge `dev` to `main`
8. Automatic deployment to production

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository or contact the development team. 
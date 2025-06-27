# Deployment Guide

This guide explains how to deploy the NASA Project to production using GitHub Actions CI/CD with Vercel (frontend) and Render (backend).

## Prerequisites

- GitHub repository with the project code
- Vercel account for frontend deployment
- Render account for backend deployment
- NASA API key (optional, but recommended for production)

## 1. Frontend Deployment (Vercel)

### Step 1: Set up Vercel Project

1. **Create Vercel Account**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with your GitHub account

2. **Import Project**
   - Click "New Project"
   - Import your GitHub repository
   - Set the root directory to `frontend`
   - Configure build settings:
     - Framework Preset: Create React App
     - Build Command: `npm run build`
     - Output Directory: `build`
     - Install Command: `npm ci`

3. **Get Vercel Tokens**
   - Go to Vercel Dashboard → Settings → Tokens
   - Create a new token with appropriate permissions
   - Note down the token

### Step 2: Configure GitHub Secrets

Add these secrets to your GitHub repository (Settings → Secrets and variables → Actions):

```
VERCEL_TOKEN=your_vercel_token_here
VERCEL_ORG_ID=your_vercel_org_id_here
VERCEL_PROJECT_ID=your_vercel_project_id_here
```

**How to find these values:**
- `VERCEL_TOKEN`: From Vercel Dashboard → Settings → Tokens
- `VERCEL_ORG_ID`: From Vercel Dashboard → Settings → General → Team ID
- `VERCEL_PROJECT_ID`: From your Vercel project settings or API

### Step 3: Environment Variables

In your Vercel project settings, add environment variables:

```
REACT_APP_API_URL=https://your-backend-url.onrender.com
```

## 2. Backend Deployment (Render)

### Step 1: Set up Render Service

1. **Create Render Account**
   - Go to [render.com](https://render.com)
   - Sign up with your GitHub account

2. **Create Web Service**
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Configure settings:
     - **Name**: `nasa-project-backend`
     - **Root Directory**: `backend`
     - **Runtime**: `Node`
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Plan**: Free (or paid for production)

3. **Environment Variables**
   Add these in Render dashboard:
   ```
   NODE_ENV=production
   PORT=10000
   NASA_API_KEY=your_nasa_api_key_here
   ```

### Step 2: Enable Auto-Deploy

- In Render dashboard, ensure "Auto-Deploy" is enabled
- Set branch to `main`
- Render will automatically deploy when you push to main

## 3. GitHub Actions Setup

The CI/CD workflows are already configured in `.github/workflows/`:

### Workflow Files

1. **`frontend-deploy.yml`**
   - Triggers on push to `main` branch
   - Runs tests and builds frontend
   - Deploys to Vercel

2. **`test.yml`**
   - Runs on all branches and pull requests
   - Tests both frontend and backend
   - No deployment (except for main branch)

### Workflow Triggers

- **`dev` branch**: Runs tests only
- **`main` branch**: Runs tests + deploys frontend to Vercel
- **Backend**: Auto-deploys via Render's GitHub integration

## 4. Testing the Deployment

### Step 1: Push to Dev Branch

```bash
git checkout -b dev
git add .
git commit -m "Initial setup"
git push origin dev
```

**Expected Result**: Tests run, no deployment

### Step 2: Merge to Main

```bash
git checkout main
git merge dev
git push origin main
```

**Expected Result**: 
- Tests run
- Frontend deploys to Vercel
- Backend auto-deploys to Render

### Step 3: Verify Deployment

1. **Frontend**: Check Vercel dashboard for deployment status
2. **Backend**: Check Render dashboard for deployment status
3. **Test Endpoints**:
   - Frontend: `https://your-project.vercel.app`
   - Backend: `https://your-project.onrender.com/api/health`

## 5. Environment Configuration

### Development Environment

1. **Backend** (`.env`):
   ```
   PORT=3001
   NODE_ENV=development
   NASA_API_KEY=DEMO_KEY
   ```

2. **Frontend** (`.env`):
   ```
   REACT_APP_API_URL=http://localhost:3001
   ```

### Production Environment

1. **Vercel Environment Variables**:
   ```
   REACT_APP_API_URL=https://your-backend-url.onrender.com
   ```

2. **Render Environment Variables**:
   ```
   NODE_ENV=production
   PORT=10000
   NASA_API_KEY=your_actual_nasa_api_key
   ```

## 6. Monitoring and Logs

### Vercel Monitoring
- Dashboard: [vercel.com/dashboard](https://vercel.com/dashboard)
- Function logs available in dashboard
- Performance metrics included

### Render Monitoring
- Dashboard: [render.com/dashboard](https://render.com/dashboard)
- Logs available in service dashboard
- Health checks and uptime monitoring

### GitHub Actions
- Workflow runs: GitHub repository → Actions tab
- Detailed logs for each step
- Test results and coverage reports

## 7. Troubleshooting

### Common Issues

1. **Frontend Build Fails**
   - Check Vercel build logs
   - Verify all dependencies are in `package.json`
   - Ensure environment variables are set

2. **Backend Deployment Fails**
   - Check Render build logs
   - Verify `npm start` command works locally
   - Check environment variables in Render dashboard

3. **Tests Fail**
   - Run tests locally first
   - Check test configuration
   - Verify all test dependencies are installed

4. **API Calls Fail**
   - Check CORS configuration
   - Verify API URLs are correct
   - Check NASA API key validity

### Debugging Steps

1. **Local Testing**:
   ```bash
   # Backend
   cd backend
   npm install
   npm start
   
   # Frontend
   cd frontend
   npm install
   npm start
   ```

2. **Check Logs**:
   - Vercel: Function logs in dashboard
   - Render: Service logs in dashboard
   - GitHub: Action logs in repository

3. **Environment Variables**:
   - Verify all required variables are set
   - Check variable names match code
   - Ensure no typos in values

## 8. Security Considerations

1. **API Keys**: Never commit API keys to repository
2. **Environment Variables**: Use platform-specific secret management
3. **CORS**: Configure CORS properly for production domains
4. **HTTPS**: Both Vercel and Render provide HTTPS by default

## 9. Performance Optimization

1. **Frontend**:
   - Enable Vercel's edge caching
   - Optimize bundle size
   - Use React.lazy for code splitting

2. **Backend**:
   - Enable Render's caching
   - Optimize database queries (if applicable)
   - Use compression middleware

## 10. Next Steps

After successful deployment:

1. **Set up custom domains** (optional)
2. **Configure monitoring and alerts**
3. **Set up staging environment**
4. **Implement CI/CD for feature branches**
5. **Add performance monitoring**

---

## Quick Reference

| Platform | URL | Dashboard |
|----------|-----|-----------|
| Vercel | [vercel.com](https://vercel.com) | [dashboard.vercel.com](https://vercel.com/dashboard) |
| Render | [render.com](https://render.com) | [dashboard.render.com](https://render.com/dashboard) |
| GitHub | [github.com](https://github.com) | Repository → Actions tab |

**Support**: For deployment issues, check the platform documentation or contact support. 
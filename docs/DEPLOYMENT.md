# TalentScript Deployment Guide

## Overview

TalentScript is a client-side React application that can be deployed to any static hosting service. This guide covers deployment to various platforms.

## Prerequisites

- Node.js 18.0 or higher
- npm 9.0 or higher
- Git (for version control)

## Build Process

### 1. Prepare for Production

```bash
# Install dependencies
npm install

# Run linting
npm run lint

# Build the application
npm run build
```

### 2. Verify Build

```bash
# Preview the production build locally
npm run preview
```

The build creates a `dist/` directory with optimized static files.

## Deployment Platforms

### Netlify (Recommended)

Netlify offers the best experience for React applications with automatic deployments.

#### Method 1: Git Integration (Recommended)

1. **Push to Git Repository**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your repository
   - Configure build settings:
     - **Build command**: `npm run build`
     - **Publish directory**: `dist`
     - **Node version**: `18`

3. **Deploy**
   - Click "Deploy site"
   - Netlify will automatically build and deploy
   - Get your live URL (e.g., `https://amazing-site-name.netlify.app`)

#### Method 2: Manual Deploy

```bash
# Build the project
npm run build

# Install Netlify CLI
npm install -g netlify-cli

# Deploy to Netlify
netlify deploy --prod --dir=dist
```

#### Netlify Configuration

Create `netlify.toml` in your project root:

```toml
[build]
  publish = "dist"
  command = "npm run build"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Vercel

Vercel provides excellent React support with zero configuration.

#### Method 1: Git Integration

1. **Connect Repository**
   - Go to [vercel.com](https://vercel.com)
   - Import your Git repository
   - Vercel auto-detects Vite configuration

2. **Deploy**
   - Click "Deploy"
   - Get your live URL

#### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

#### Vercel Configuration

Create `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

### GitHub Pages

Deploy directly from your GitHub repository.

#### Setup

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json**
   ```json
   {
     "homepage": "https://yourusername.github.io/talentscript",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

4. **Configure GitHub Pages**
   - Go to repository Settings > Pages
   - Select "gh-pages" branch as source

### AWS S3 + CloudFront

For enterprise deployments with CDN.

#### S3 Setup

1. **Create S3 Bucket**
   ```bash
   aws s3 mb s3://your-bucket-name
   ```

2. **Configure for Static Hosting**
   ```bash
   aws s3 website s3://your-bucket-name \
     --index-document index.html \
     --error-document index.html
   ```

3. **Upload Files**
   ```bash
   npm run build
   aws s3 sync dist/ s3://your-bucket-name --delete
   ```

#### CloudFront Setup

1. **Create Distribution**
   - Origin: Your S3 bucket
   - Default root object: `index.html`
   - Error pages: Custom error response for 404 → `/index.html`

2. **Update DNS**
   - Point your domain to CloudFront distribution

### Firebase Hosting

Google's hosting solution with global CDN.

#### Setup

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Initialize Firebase**
   ```bash
   firebase login
   firebase init hosting
   ```

3. **Configure firebase.json**
   ```json
   {
     "hosting": {
       "public": "dist",
       "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
       "rewrites": [
         {
           "source": "**",
           "destination": "/index.html"
         }
       ]
     }
   }
   ```

4. **Deploy**
   ```bash
   npm run build
   firebase deploy
   ```

## Environment Configuration

### Production Optimizations

The build process automatically:
- Minifies JavaScript and CSS
- Optimizes images
- Generates source maps
- Enables tree shaking
- Compresses assets

### Custom Domain Setup

#### Netlify
1. Go to Site Settings > Domain management
2. Add custom domain
3. Configure DNS records as instructed

#### Vercel
1. Go to Project Settings > Domains
2. Add your domain
3. Configure DNS records

#### CloudFront
1. Add alternate domain names (CNAMEs)
2. Upload SSL certificate
3. Update DNS to point to CloudFront

## SSL/HTTPS

All recommended platforms provide automatic HTTPS:
- **Netlify**: Automatic Let's Encrypt certificates
- **Vercel**: Automatic SSL for all domains
- **GitHub Pages**: HTTPS enforced for github.io domains
- **Firebase**: Automatic SSL provisioning

## Performance Optimization

### Build Optimizations

```bash
# Analyze bundle size
npm run build
npx vite-bundle-analyzer dist
```

### CDN Configuration

For optimal performance, configure your CDN to:
- Cache static assets (JS, CSS, images) for 1 year
- Cache HTML files for 1 hour
- Enable gzip/brotli compression
- Set proper cache headers

### Monitoring

Set up monitoring for:
- **Core Web Vitals**: LCP, FID, CLS
- **Error tracking**: JavaScript errors
- **Performance**: Page load times
- **Uptime**: Service availability

## CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Netlify

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm run lint
    
    - name: Build
      run: npm run build
    
    - name: Deploy to Netlify
      uses: nwtgck/actions-netlify@v2.0
      with:
        publish-dir: './dist'
        production-branch: main
        github-token: ${{ secrets.GITHUB_TOKEN }}
        deploy-message: "Deploy from GitHub Actions"
      env:
        NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
        NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

### Environment Variables

For CI/CD, set these secrets:
- `NETLIFY_AUTH_TOKEN`: Your Netlify personal access token
- `NETLIFY_SITE_ID`: Your site ID from Netlify

## Troubleshooting

### Common Issues

#### 1. 404 Errors on Refresh
**Problem**: Direct URL access returns 404
**Solution**: Configure server to serve `index.html` for all routes

#### 2. Build Failures
**Problem**: Build fails in production
**Solution**: 
- Check Node.js version compatibility
- Verify all dependencies are in `package.json`
- Run `npm ci` instead of `npm install`

#### 3. Large Bundle Size
**Problem**: Slow loading due to large JavaScript bundle
**Solution**:
- Implement code splitting
- Lazy load components
- Optimize images
- Remove unused dependencies

#### 4. Font Loading Issues
**Problem**: Fonts not loading properly
**Solution**:
- Verify Google Fonts URLs
- Add font-display: swap
- Implement font loading fallbacks

### Debug Commands

```bash
# Check build output
npm run build && ls -la dist/

# Analyze bundle
npx vite-bundle-analyzer dist

# Test production build locally
npm run preview

# Check for unused dependencies
npx depcheck
```

## Security Considerations

### Content Security Policy

Add CSP headers for enhanced security:

```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               font-src 'self' https://fonts.gstatic.com; 
               style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;">
```

### HTTPS Enforcement

Ensure all traffic uses HTTPS:
- Enable HTTPS redirect on your hosting platform
- Use HSTS headers
- Update all internal links to use HTTPS

## Maintenance

### Regular Updates

1. **Dependencies**
   ```bash
   npm audit
   npm update
   ```

2. **Security Patches**
   ```bash
   npm audit fix
   ```

3. **Performance Monitoring**
   - Monitor Core Web Vitals
   - Check bundle size growth
   - Review error logs

### Backup Strategy

- **Code**: Git repository with multiple remotes
- **Deployments**: Keep previous versions accessible
- **Configuration**: Document all environment settings

## Support

For deployment issues:
1. Check platform-specific documentation
2. Review build logs for errors
3. Test locally with production build
4. Contact platform support if needed

---

**Need help?** Check the [main README](../README.md) or open an issue on GitHub.
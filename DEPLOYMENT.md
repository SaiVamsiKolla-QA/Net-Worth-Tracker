# 🚀 Deployment Guide

Deploy your Net Worth Tracker to production using various hosting platforms.

---

## 📋 Pre-Deployment Checklist

- [ ] All tests passing (`npm test`)
- [ ] No linting errors (`npm run lint`)
- [ ] Build successful (`npm run build`)
- [ ] Environment variables configured (if any)
- [ ] GitHub repository created
- [ ] CI/CD pipeline working

---

## 🌐 Deployment Options

### Option 1: Vercel (Recommended)

**Pros**: Zero config, automatic deployments, free SSL, CDN

#### Steps:

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Deploy**
```bash
vercel
```

3. **Follow Prompts**
   - Link to your GitHub account
   - Select project directory
   - Confirm build settings

4. **Auto-Deploy on Git Push**
   - Connect GitHub repository in Vercel dashboard
   - Every push to `main` triggers deployment

**Production URL**: `https://your-app.vercel.app`

---

### Option 2: Netlify

**Pros**: Drag-and-drop deployment, form handling, serverless functions

#### Method A: CLI Deployment

1. **Install Netlify CLI**
```bash
npm install -g netlify-cli
```

2. **Build Project**
```bash
npm run build
```

3. **Deploy**
```bash
netlify deploy --prod
```

#### Method B: Git Integration

1. Go to [Netlify](https://netlify.com)
2. Click "New site from Git"
3. Connect GitHub repository
4. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Deploy!

**Configuration File** (`netlify.toml`):
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

### Option 3: GitHub Pages

**Pros**: Free hosting, integrated with GitHub

#### Steps:

1. **Install gh-pages**
```bash
npm install --save-dev gh-pages
```

2. **Add to package.json**
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "homepage": "https://yourusername.github.io/networth-tracker"
}
```

3. **Update vite.config.ts**
```typescript
export default defineConfig({
  base: '/networth-tracker/',  // Your repo name
  // ... rest of config
});
```

4. **Deploy**
```bash
npm run deploy
```

5. **Enable GitHub Pages**
   - Go to repository settings
   - Pages → Source → gh-pages branch

---

### Option 4: AWS Amplify

**Pros**: AWS ecosystem, CI/CD, custom domains

#### Steps:

1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify)
2. Click "New app" → "Host web app"
3. Connect GitHub repository
4. Configure build settings:
   - **Build command**: `npm run build`
   - **Output directory**: `dist`
5. Deploy!

---

### Option 5: Docker Container

**Pros**: Platform-independent, full control

#### Dockerfile:

```dockerfile
# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### nginx.conf:

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

#### Build and Run:

```bash
# Build image
docker build -t networth-tracker .

# Run container
docker run -p 8080:80 networth-tracker
```

---

## 🔧 Build Optimization

### 1. Environment Variables

Create `.env.production`:
```
VITE_APP_NAME=Net Worth Tracker
VITE_API_URL=https://api.example.com
```

Access in code:
```typescript
const appName = import.meta.env.VITE_APP_NAME;
```

### 2. Optimize Bundle Size

Already configured in `vite.config.ts`:
```typescript
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        'react-vendor': ['react', 'react-dom'],
        'chart-vendor': ['chart.js'],
      },
    },
  },
}
```

### 3. Enable Compression

For Nginx, add to config:
```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript;
```

---

## 📊 Post-Deployment

### 1. Analytics (Optional)

Add Google Analytics or Plausible:

```html
<!-- In index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
```

### 2. Error Monitoring

Consider Sentry for error tracking:

```bash
npm install @sentry/react
```

```typescript
// src/main.tsx
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: 'YOUR_DSN',
  environment: 'production',
});
```

### 3. Performance Monitoring

Use Lighthouse CI in your pipeline:

```yaml
# .github/workflows/ci.yml
- name: Run Lighthouse CI
  uses: treosh/lighthouse-ci-action@v9
  with:
    urls: |
      https://your-app.vercel.app
```

---

## 🔒 Security Checklist

- [ ] HTTPS enabled (automatic on Vercel/Netlify)
- [ ] No sensitive data in client code
- [ ] Content Security Policy headers
- [ ] CORS configured properly
- [ ] No exposed API keys

### Add Security Headers

For Netlify, create `netlify.toml`:
```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

---

## 🌍 Custom Domain

### Vercel

1. Go to project settings
2. Domains → Add domain
3. Configure DNS records as instructed

### Netlify

1. Domain settings → Add custom domain
2. Update DNS records at your registrar

---

## 🔄 Continuous Deployment

### Automatic Deployments

With Vercel/Netlify + GitHub:
- **Main branch** → Production
- **Develop branch** → Preview
- **Pull requests** → Preview deployments

### Manual Deployments

```bash
# Vercel
vercel --prod

# Netlify
netlify deploy --prod
```

---

## 📈 Monitoring

### 1. Uptime Monitoring

Use services like:
- UptimeRobot (free)
- Pingdom
- StatusCake

### 2. Performance Monitoring

- Vercel Analytics (built-in)
- Google PageSpeed Insights
- WebPageTest

### 3. User Analytics

- Google Analytics
- Plausible (privacy-friendly)
- Fathom Analytics

---

## 🐛 Troubleshooting

### Build Fails

```bash
# Clear cache and rebuild
npm run clean
rm -rf node_modules
npm install
npm run build
```

### Routes Not Working (404)

Add rewrite rules for SPA routing:

**Vercel** (`vercel.json`):
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

**Netlify** (`_redirects` in `public/`):
```
/*    /index.html   200
```

### Large Bundle Size

1. Check bundle analyzer:
```bash
npm install --save-dev rollup-plugin-visualizer
```

2. Add to `vite.config.ts`:
```typescript
import { visualizer } from 'rollup-plugin-visualizer';

plugins: [
  react(),
  visualizer({ open: true }),
]
```

---

## 🎉 Success!

Your app is now live! Share the URL and start tracking net worth!

**Next Steps**:
- Set up monitoring
- Configure custom domain
- Enable analytics
- Share with users

---

**Happy Deploying! 🚀**
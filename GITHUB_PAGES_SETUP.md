# 🌐 GitHub Pages Deployment Guide

Alternative deployment option using GitHub Pages for static site hosting.

## 🚀 Quick Setup

### Step 1: Enable GitHub Pages

1. **Go to Repository Settings**
   - Navigate to your GitHub repository
   - Click "Settings" tab

2. **Pages Configuration**
   - Scroll down to "Pages" section
   - Under "Source", select "Deploy from a branch"
   - Choose "gh-pages" branch
   - Click "Save"

### Step 2: Configure for Static Export

Update your `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const repoName = 'EcommercePracticePortal'; // Your repo name
const nextConfig = {
  output: 'export',
  basePath: `/${repoName}`,
  assetPrefix: `/${repoName}/`,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
    ],
  },
};

module.exports = nextConfig;
```

### Step 3: Add Build Scripts

Update `package.json`:

```json
{
  "scripts": {
    "export": "next build",
    "deploy": "npm run export && touch out/.nojekyll && git add out/ && git commit -m 'Deploy to GitHub Pages' && git subtree push --prefix out origin gh-pages"
  }
}
```

### Step 4: Deploy

```bash
# Build and deploy
npm run deploy

# Or manually:
npm run export
git add out/
git commit -m "Deploy to GitHub Pages"
git subtree push --prefix out origin gh-pages
```

## 🔗 Your Site URL

Your site will be available at:
```
https://yourusername.github.io/EcommercePracticePortal/
```

## ⚠️ Important Notes

- **Static Export**: GitHub Pages only supports static sites
- **Base Path**: Required for repository-based deployment
- **Image Optimization**: Disabled for static export
- **Client-Side Routing**: May need additional configuration

## 🔄 Alternative: GitHub Actions

For automated deployment, create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run export
        
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

## 🆚 Netlify vs GitHub Pages

| Feature | Netlify | GitHub Pages |
|---------|---------|--------------|
| **Build Process** | ✅ Full Next.js support | ❌ Static export only |
| **Server-Side Features** | ✅ API routes, SSR | ❌ Not supported |
| **Image Optimization** | ✅ Full support | ❌ Disabled |
| **Custom Domain** | ✅ Easy setup | ✅ Supported |
| **SSL Certificate** | ✅ Automatic | ✅ Automatic |
| **Build Time** | ✅ Fast | ⚠️ Slower |
| **Free Tier** | ✅ Generous | ✅ Unlimited |

## 🎯 Recommendation

- **Use Netlify** for full Next.js features and better performance
- **Use GitHub Pages** for simple static sites or learning purposes

---

*For production e-commerce sites, Netlify is recommended for better performance and features.* 
# 🚀 Deployment Guide: Netlify + GitHub Integration

This guide provides step-by-step instructions for deploying your e-commerce application to Netlify with GitHub integration.

## 📋 Prerequisites

- ✅ GitHub repository with your e-commerce project
- ✅ Netlify account (free tier available)
- ✅ Node.js project with proper build configuration
- ✅ All ESLint errors resolved

## 🔗 Step 1: Connect GitHub to Netlify

### 1.1 Sign Up for Netlify

1. **Visit Netlify**: Go to [netlify.com](https://netlify.com)
2. **Sign Up**: Click "Sign up" and choose "Sign up with GitHub"
3. **Authorize**: Grant Netlify access to your GitHub account

### 1.2 Import Your Repository

1. **Dashboard**: After login, you'll see the Netlify dashboard
2. **New Site**: Click "New site from Git"
3. **Git Provider**: Select "GitHub" as your Git provider
4. **Repository Access**: If prompted, authorize Netlify to access your repositories

### 1.3 Select Your Repository

1. **Repository List**: You'll see all your GitHub repositories
2. **Choose Repository**: Select `EcommercePracticePortal` (or your repo name)
3. **Branch Selection**: Choose `main` as the branch to deploy

## ⚙️ Step 2: Configure Build Settings

### 2.1 Automatic Detection

Netlify should automatically detect Next.js and set these defaults:

```
Build command: npm run build
Publish directory: .next
Node version: 18 (or latest)
```

### 2.2 Manual Configuration (if needed)

If automatic detection doesn't work, manually set:

- **Build command**: `npm run build`
- **Publish directory**: `.next`
- **Node version**: `20` (as specified in `netlify.toml`)

### 2.3 Environment Variables (if needed)

Add any environment variables in the Netlify dashboard:

1. Go to Site settings → Environment variables
2. Add variables like:
   ```
   NODE_ENV=production
   NEXT_PUBLIC_SITE_URL=https://your-site.netlify.app
   ```

## 🚀 Step 3: Deploy Your Site

### 3.1 Initial Deployment

1. **Deploy Site**: Click "Deploy site" button
2. **Build Process**: Watch the build logs in real-time
3. **Success**: Your site will be live at `https://random-name.netlify.app`

### 3.2 Build Logs

Monitor the build process for any errors:

```bash
# Successful build should show:
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages
✓ Finalizing page optimization
```

### 3.3 Common Build Issues

**ESLint Errors**:
```bash
# Fix before deploying
npm run lint
```

**Missing Dependencies**:
```bash
# Ensure all dependencies are in package.json
npm install
```

**Node Version Issues**:
```bash
# Check netlify.toml has correct Node version
NODE_VERSION = "20"
```

## 🔄 Step 4: Continuous Deployment

### 4.1 Automatic Deployments

Once connected, Netlify will automatically:

- ✅ Deploy on every push to `main` branch
- ✅ Deploy on pull request creation
- ✅ Provide preview URLs for PRs
- ✅ Rollback to previous versions if needed

### 4.2 Deployment Triggers

Your site will automatically redeploy when you:

```bash
# Push to main branch
git add .
git commit -m "Update features"
git push origin main

# Create a pull request
git checkout -b feature/new-feature
git push origin feature/new-feature
# Then create PR on GitHub
```

## 🌐 Step 5: Custom Domain Setup

### 5.1 Add Custom Domain

1. **Site Settings**: Go to your site settings in Netlify
2. **Domain Management**: Click "Domain management"
3. **Add Domain**: Click "Add custom domain"
4. **Enter Domain**: Type your domain (e.g., `myecommerce.com`)

### 5.2 DNS Configuration

Netlify will provide DNS records to add to your domain provider:

```
Type: A
Name: @
Value: 75.2.60.5

Type: CNAME
Name: www
Value: your-site.netlify.app
```

### 5.3 SSL Certificate

- **Automatic**: Netlify provides free SSL certificates
- **Verification**: SSL will be active once DNS propagates
- **Force HTTPS**: Enable in site settings for security

## 📊 Step 6: Monitor and Optimize

### 6.1 Performance Monitoring

1. **Analytics**: Enable Netlify Analytics in site settings
2. **Lighthouse**: Run performance audits
3. **Core Web Vitals**: Monitor loading metrics

### 6.2 Build Optimization

```bash
# Optimize bundle size
npm run build

# Check bundle analysis
npm run analyze  # if configured
```

### 6.3 Caching Strategy

Configure caching in `netlify.toml`:

```toml
[[headers]]
  for = "/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

## 🔧 Step 7: Troubleshooting

### 7.1 Build Failures

**Check Build Logs**:
1. Go to your site in Netlify dashboard
2. Click on the failed deployment
3. Review the build log for errors

**Common Issues**:

```bash
# ESLint errors
npm run lint

# Missing dependencies
npm install

# Node version mismatch
# Check netlify.toml NODE_VERSION
```

### 7.2 Runtime Errors

**Check Browser Console**:
1. Open your deployed site
2. Open browser developer tools
3. Check Console tab for JavaScript errors

**Common Runtime Issues**:
- Image loading errors (check `next.config.js`)
- Cart context errors (use `useCart()` hook)
- Navigation issues (check redirects in `netlify.toml`)

### 7.3 Performance Issues

**Optimize Images**:
```javascript
// Use Next.js Image component
import Image from 'next/image';

<Image
  src={product.image}
  alt={product.name}
  width={300}
  height={300}
  priority={true}
/>
```

**Code Splitting**:
```javascript
// Use dynamic imports for large components
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>
});
```

## 🔄 Step 8: GitHub Integration Features

### 8.1 Pull Request Previews

Every PR gets a preview URL:
1. Create a pull request on GitHub
2. Netlify automatically creates a preview deployment
3. Share the preview URL for testing

### 8.2 Branch Deployments

Deploy different branches:
1. **Production**: `main` branch → live site
2. **Staging**: `develop` branch → staging site
3. **Feature**: `feature/*` branches → preview deployments

### 8.3 Deployment Notifications

Configure notifications:
1. **Slack**: Get deployment notifications in Slack
2. **Email**: Receive email notifications
3. **Webhooks**: Custom webhook notifications

## 📈 Step 9: Analytics and Monitoring

### 9.1 Netlify Analytics

Enable in site settings:
1. Go to Site settings → Analytics
2. Enable "Netlify Analytics"
3. View visitor data and performance metrics

### 9.2 Google Analytics

Add Google Analytics:
```javascript
// In your layout.js or _app.js
<Script
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');
  `}
</Script>
```

## 🔒 Step 10: Security and Best Practices

### 10.1 Security Headers

Already configured in `netlify.toml`:
```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

### 10.2 Environment Variables

Never commit sensitive data:
```bash
# .env.local (not committed to Git)
NEXT_PUBLIC_API_URL=https://api.example.com
SECRET_KEY=your-secret-key
```

### 10.3 Regular Updates

Keep dependencies updated:
```bash
# Check for updates
npm outdated

# Update dependencies
npm update

# Update to latest versions
npm install package@latest
```

## 📞 Support and Resources

### Netlify Support
- **Documentation**: [docs.netlify.com](https://docs.netlify.com)
- **Community**: [community.netlify.com](https://community.netlify.com)
- **Status**: [status.netlify.com](https://status.netlify.com)

### GitHub Support
- **Documentation**: [docs.github.com](https://docs.github.com)
- **Community**: [github.community](https://github.community)

### Next.js Support
- **Documentation**: [nextjs.org/docs](https://nextjs.org/docs)
- **GitHub**: [github.com/vercel/next.js](https://github.com/vercel/next.js)

---

## 🎉 Congratulations!

Your e-commerce site is now live and automatically deploying from GitHub! 

**Next Steps:**
1. Test all functionality on the live site
2. Set up monitoring and analytics
3. Configure custom domain (optional)
4. Share your site with others

**Your Live Site**: `https://your-site-name.netlify.app`

---

*Need help? Check the troubleshooting section or reach out to the community!* 
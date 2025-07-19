# 🛍️ E-commerce Practice Portal

A modern, full-featured e-commerce website built with Next.js 15, React 18, and Bootstrap. Features include product catalog, shopping cart, checkout process, payment options (including Cash on Delivery), and order confirmation with animations.

## ✨ Features

- **🛒 Shopping Cart**: Add/remove items, update quantities, persistent storage
- **📱 Responsive Design**: Mobile-first approach with Bootstrap 5
- **🖼️ Image Optimization**: Next.js Image component for optimized loading
- **💳 Payment Options**: Credit Card and Cash on Delivery
- **🎉 Order Confirmation**: Animated success screen with confetti effect
- **🔍 Product Search**: Browse by categories and individual products
- **📧 Order Management**: Detailed order summaries and tracking

## 🚀 Live Demo

- **Netlify**: [Your Netlify URL]
- **GitHub Pages**: [Your GitHub Pages URL]

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 18, Bootstrap 5
- **Styling**: Bootstrap Icons, Custom CSS
- **State Management**: React Context API with localStorage
- **Deployment**: Netlify, GitHub Pages
- **Image Hosting**: Unsplash, Pixabay

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Git
- GitHub account
- Netlify account (for deployment)

## 🏗️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/EcommercePracticePortal.git
cd EcommercePracticePortal
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Run Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### 4. Build for Production

```bash
npm run build
# or
yarn build
```

## 🌐 Deployment Guide

### Option 1: Deploy to Netlify

#### Step 1: Connect GitHub Repository

1. **Sign up/Login to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Sign up with your GitHub account

2. **Import from Git**
   - Click "New site from Git"
   - Choose "GitHub" as your Git provider
   - Authorize Netlify to access your GitHub account

3. **Select Repository**
   - Choose `EcommercePracticePortal` from your repositories
   - Select the `main` branch

#### Step 2: Configure Build Settings

Netlify will automatically detect Next.js and set these settings:

- **Build command**: `npm run build`
- **Publish directory**: `.next`
- **Node version**: 20 (configured in `netlify.toml`)

#### Step 3: Deploy

1. Click "Deploy site"
2. Wait for the build to complete (usually 2-3 minutes)
3. Your site will be live at a Netlify subdomain

#### Step 4: Custom Domain (Optional)

1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Follow the DNS configuration instructions

### Option 2: Deploy to GitHub Pages

#### Step 1: Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to Settings → Pages
3. Select "Deploy from a branch"
4. Choose `gh-pages` branch
5. Click "Save"

#### Step 2: Configure for Static Export

Update `next.config.js` for static export:

```javascript
/** @type {import('next').NextConfig} */
const repoName = 'EcommercePracticePortal';
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
      // ... other patterns
    ],
  },
};

module.exports = nextConfig;
```

#### Step 3: Add Build Script

Add to `package.json`:

```json
{
  "scripts": {
    "export": "next build && next export",
    "deploy": "npm run export && touch out/.nojekyll"
  }
}
```

#### Step 4: Deploy

```bash
npm run deploy
```

## 🔧 Configuration Files

### `netlify.toml`
```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "20"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

### `next.config.js`
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
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

## 📁 Project Structure

```
EcommercePracticePortal/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── cart/              # Shopping cart page
│   │   ├── checkout/          # Checkout process
│   │   ├── products/          # Product listings
│   │   ├── categories/        # Category pages
│   │   └── order-confirmation/ # Order success page
│   ├── components/            # Reusable React components
│   │   ├── ProductCard.js     # Product display component
│   │   ├── Header.js          # Navigation header
│   │   └── Footer.js          # Site footer
│   ├── context/               # React Context providers
│   │   └── CartContext.js     # Shopping cart state management
│   └── data/                  # Static data files
│       └── products.js        # Product catalog data
├── public/                    # Static assets
├── .github/                   # GitHub Actions workflows
├── netlify.toml              # Netlify configuration
├── next.config.js            # Next.js configuration
└── package.json              # Dependencies and scripts
```

## 🛒 Key Features Explained

### Shopping Cart System
- **Context API**: Global state management for cart items
- **localStorage**: Persistent cart data across browser sessions
- **Real-time Updates**: Cart updates immediately when items are added/removed

### Payment Integration
- **Cash on Delivery**: Manual payment option for testing
- **Order Confirmation**: Detailed order summary with animations
- **Order Tracking**: Unique order numbers for each purchase

### Image Optimization
- **Next.js Image**: Automatic image optimization and lazy loading
- **External Domains**: Configured for Unsplash, Pixabay, and placeholder images
- **Responsive Images**: Different sizes for different screen sizes

## 🔍 Troubleshooting

### Common Issues

#### 1. Build Errors on Netlify

**Problem**: ESLint errors causing build failures
**Solution**: 
```bash
npm run lint
# Fix any errors before pushing to GitHub
```

#### 2. Image Loading Issues

**Problem**: Images not loading from external domains
**Solution**: Update `next.config.js` with correct `remotePatterns`:
```javascript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'images.unsplash.com',
    },
    // Add other domains as needed
  ],
}
```

#### 3. Cart Context Errors

**Problem**: "Export CartContext doesn't exist" error
**Solution**: Use `useCart()` hook instead of direct context import:
```javascript
// ❌ Wrong
import { CartContext } from '@/context/CartContext';
const { addToCart } = useContext(CartContext);

// ✅ Correct
import { useCart } from '@/context/CartContext';
const { addToCart } = useCart();
```

#### 4. Navigation Issues

**Problem**: 404 errors on page refresh
**Solution**: Ensure proper redirects in `netlify.toml`:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Performance Optimization

1. **Image Optimization**: Use Next.js Image component
2. **Code Splitting**: Automatic with Next.js
3. **Bundle Analysis**: Run `npm run build` to see bundle sizes
4. **Caching**: Configure proper cache headers in `netlify.toml`

## 🧪 Testing

### Manual Testing Checklist

- [ ] Homepage loads correctly
- [ ] Product cards display properly
- [ ] Add to cart functionality works
- [ ] Cart page shows correct items
- [ ] Checkout process completes
- [ ] Order confirmation displays
- [ ] Responsive design on mobile
- [ ] Images load without errors

### Automated Testing

```bash
# Run linting
npm run lint

# Run build test
npm run build

# Check for TypeScript errors
npm run type-check
```

## 📈 Performance Metrics

- **Lighthouse Score**: 90+ (Performance, Accessibility, Best Practices, SEO)
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team**: For the amazing framework
- **Bootstrap Team**: For the responsive CSS framework
- **Unsplash**: For beautiful product images
- **React Team**: For the powerful UI library

## 📞 Support

If you encounter any issues:

1. Check the [troubleshooting section](#troubleshooting)
2. Search existing [GitHub issues](https://github.com/yourusername/EcommercePracticePortal/issues)
3. Create a new issue with detailed information
4. Contact: [your-email@example.com]

---

**Happy Shopping! 🛍️**

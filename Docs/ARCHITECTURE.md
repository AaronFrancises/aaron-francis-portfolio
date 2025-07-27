# Technical Architecture Document
## Aaron Francis Cinematography Portfolio Website

### Architecture Overview
This document outlines the technical architecture, technology stack, and implementation approach for the Aaron Francis cinematography portfolio website.

### Technology Stack

#### Frontend Framework
**Static Site Generation with Modern Web Technologies**
- **HTML5**: Semantic markup for accessibility and SEO
- **CSS3**: Modern styling with custom properties and grid/flexbox
- **Vanilla JavaScript (ES6+)**: Lightweight, no framework dependencies
- **Reason**: Optimal performance, fast loading, easy maintenance, no build complexity

#### Alternative Considerations
- **React/Next.js**: Considered but unnecessary complexity for portfolio site
- **Vue/Nuxt**: Good option but adds build step overhead
- **Svelte/SvelteKit**: Excellent performance but less familiar ecosystem

#### Styling Architecture
```
CSS Architecture:
├── styles/
│   ├── base/
│   │   ├── reset.css           # CSS reset/normalize
│   │   ├── typography.css      # Font definitions and text styles
│   │   └── variables.css       # CSS custom properties
│   ├── components/
│   │   ├── header.css          # Navigation styling
│   │   ├── hero.css            # Hero section
│   │   ├── portfolio.css       # Portfolio grid and cards
│   │   ├── video-player.css    # Custom video player
│   │   └── contact.css         # Contact form and footer
│   ├── layouts/
│   │   ├── grid.css            # Grid system
│   │   └── responsive.css      # Media queries and breakpoints
│   └── utilities/
│       ├── animations.css      # Transitions and keyframes
│       └── helpers.css         # Utility classes
```

#### JavaScript Architecture
```
JavaScript Module Structure:
├── js/
│   ├── main.js                 # Main application entry point
│   ├── modules/
│   │   ├── navigation.js       # Mobile menu, smooth scrolling
│   │   ├── video-player.js     # Custom video controls
│   │   ├── portfolio.js        # Portfolio filtering and lightbox
│   │   ├── contact-form.js     # Form validation and submission
│   │   └── animations.js       # Scroll animations and effects
│   └── utils/
│       ├── helpers.js          # Utility functions
│       └── constants.js        # Configuration constants
```

### File Structure

```
aaron-francis-portfolio/
├── index.html                  # Main landing page
├── about.html                  # About page (optional separate page)
├── contact.html                # Contact page (optional separate page)
├── assets/
│   ├── images/
│   │   ├── hero/               # Hero section images
│   │   ├── portfolio/          # Project thumbnails and images
│   │   ├── about/              # About section photos
│   │   └── ui/                 # Icons, logos, UI elements
│   ├── videos/
│   │   ├── showreel/           # Main showreel content
│   │   ├── projects/           # Individual project videos
│   │   └── thumbnails/         # Video thumbnail images
│   └── fonts/                  # Web font files
├── styles/
│   └── [CSS architecture as outlined above]
├── js/
│   └── [JavaScript architecture as outlined above]
├── docs/                       # Project documentation
└── README.md
```

### Performance Architecture

#### Image Optimization Strategy
```html
<!-- Responsive Images with WebP fallback -->
<picture>
    <source media="(min-width: 768px)" srcset="image-desktop.webp" type="image/webp">
    <source media="(min-width: 768px)" srcset="image-desktop.jpg" type="image/jpeg">
    <source srcset="image-mobile.webp" type="image/webp">
    <img src="image-mobile.jpg" alt="Description" loading="lazy">
</picture>
```

#### Video Optimization Strategy
- **Format**: MP4 (H.264) with WebM fallback
- **Compression**: Optimized for web (CRF 23-28)
- **Poster Images**: High-quality thumbnails for all videos
- **Progressive Loading**: Videos load metadata first, then content on interaction
- **Lazy Loading**: Videos below fold load on scroll approach

#### Performance Budgets
- **Total Page Size**: < 3MB initial load
- **Critical CSS**: < 14KB (inlined)
- **JavaScript Bundle**: < 50KB gzipped
- **Largest Contentful Paint**: < 2.5s
- **First Input Delay**: < 100ms
- **Cumulative Layout Shift**: < 0.1

### Responsive Design Architecture

#### Breakpoint Strategy
```css
/* Mobile First Approach */
:root {
    --breakpoint-sm: 360px;    /* Small mobile */
    --breakpoint-md: 720px;    /* Tablet */
    --breakpoint-lg: 1280px;   /* Desktop */
    --breakpoint-xl: 1440px;   /* Large desktop */
}

/* Grid System */
.container {
    max-width: min(90vw, 1440px);
    margin: 0 auto;
}

/* Responsive Typography */
.hero-title {
    font-size: clamp(2rem, 8vw, 6rem);
}
```

#### Layout Strategy
- **CSS Grid**: Primary layout system for complex arrangements
- **Flexbox**: Component-level alignment and distribution
- **Container Queries**: Future-proofing for component-based responsive design
- **Logical Properties**: Modern CSS for international compatibility

### SEO and Accessibility Architecture

#### SEO Implementation
```html
<!-- Semantic HTML Structure -->
<main>
    <section aria-labelledby="hero-heading">
        <h1 id="hero-heading">Aaron Francis</h1>
    </section>
    <section aria-labelledby="portfolio-heading">
        <h2 id="portfolio-heading">Portfolio</h2>
    </section>
</main>

<!-- Structured Data -->
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Aaron Francis",
    "jobTitle": "Cinematographer",
    "description": "Award-winning cinematographer and storyteller"
}
</script>
```

#### Accessibility Implementation
- **ARIA Labels**: Comprehensive labeling for screen readers
- **Focus Management**: Logical tab order and visible focus indicators
- **Color Contrast**: Minimum 4.5:1 ratio for all text
- **Alternative Text**: Descriptive alt text for all images
- **Video Captions**: Closed captions for all video content

### Browser Support Strategy

#### Target Browser Matrix
| Browser | Version | Support Level |
|---------|---------|---------------|
| Chrome | Latest 2 | Full Support |
| Firefox | Latest 2 | Full Support |
| Safari | Latest 2 | Full Support |
| Edge | Latest 2 | Full Support |
| iOS Safari | Latest 2 | Full Support |
| Android Chrome | Latest 2 | Full Support |

#### Progressive Enhancement Strategy
1. **Base Experience**: Core content accessible without JavaScript
2. **Enhanced Experience**: Smooth animations, video controls with JavaScript
3. **Premium Experience**: Advanced interactions for modern browsers

### Security Considerations

#### Content Security Policy
```http
Content-Security-Policy: 
    default-src 'self'; 
    img-src 'self' data: https:; 
    video-src 'self'; 
    style-src 'self' 'unsafe-inline'; 
    script-src 'self';
```

#### Form Security
- **Client-side Validation**: Input sanitization and validation
- **CSRF Protection**: Form tokens for contact submissions
- **Rate Limiting**: Prevent form spam
- **Input Sanitization**: XSS prevention

### Hosting and Deployment

#### Recommended Hosting Solutions
1. **Netlify** (Primary Choice)
   - Automatic HTTPS
   - Global CDN
   - Form handling
   - Easy deployment from Git

2. **Vercel** (Alternative)
   - Excellent performance
   - Edge functions capability
   - Simple deployment

3. **GitHub Pages** (Budget Option)
   - Free hosting
   - Git-based deployment
   - Custom domain support

#### Deployment Pipeline
```
Development → Staging → Production
     ↓           ↓         ↓
   Local      Preview    Live Site
  Testing     Testing    Monitoring
```

### Monitoring and Analytics

#### Performance Monitoring
- **Core Web Vitals**: Lighthouse CI integration
- **Real User Monitoring**: Web Vitals API implementation
- **Error Tracking**: JavaScript error logging

#### Analytics Implementation
```javascript
// Privacy-focused analytics
const trackEvent = (eventName, properties) => {
    // Implementation respecting user privacy
    // No personal data collection
};
```

### Content Management Strategy

#### Static Content Updates
- **Markdown Files**: Portfolio project descriptions
- **JSON Configuration**: Site settings and metadata
- **Asset Management**: Organized folder structure for easy updates

#### Future CMS Integration
- **Headless CMS Options**: Contentful, Strapi, or Sanity
- **API Integration**: RESTful or GraphQL endpoints
- **Build Triggers**: Automatic deployment on content updates

### Development Environment Setup

#### Prerequisites
- **Node.js**: Version 18+ for build tools
- **Git**: Version control
- **Modern Browser**: For testing
- **Code Editor**: VS Code with extensions

#### Development Tools
```json
{
    "devDependencies": {
        "live-server": "Local development server",
        "imagemin": "Image optimization",
        "autoprefixer": "CSS vendor prefixes",
        "eslint": "JavaScript linting",
        "prettier": "Code formatting"
    }
}
```

#### Local Development Workflow
1. **Setup**: Clone repository and install dependencies
2. **Development**: Live reload server for immediate feedback
3. **Testing**: Cross-browser testing and validation
4. **Optimization**: Asset optimization and performance testing
5. **Deployment**: Push to staging for review

### Maintenance and Updates

#### Update Schedule
- **Security Updates**: As needed, immediate priority
- **Content Updates**: Monthly or as projects complete
- **Feature Updates**: Quarterly major enhancements
- **Performance Reviews**: Bi-annual optimization audits

#### Backup Strategy
- **Git Repository**: Primary backup and version control
- **Asset Backup**: Cloud storage for large media files
- **Database Backup**: If future CMS integration required
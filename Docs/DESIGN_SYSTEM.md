# Design System Document
## Aaron Francis Cinematography Portfolio Website

### Design Philosophy
The Aaron Francis portfolio design system is inspired by modern minimalism and cinematic aesthetics, drawing from the sophisticated approach of reference sites like nainoalanger.com. The system prioritizes visual storytelling, professional presentation, and seamless user experience across all devices.

### Design Principles

#### 1. Visual Hierarchy
- **Content-first approach**: The work speaks first, UI supports second
- **Generous whitespace**: Allow breathing room for visual impact
- **Purposeful contrast**: Strategic use of contrast to guide attention

#### 2. Cinematic Experience
- **Immersive presentation**: Full-screen video capabilities
- **Smooth transitions**: Film-quality motion and animations
- **Professional polish**: Every detail reflects cinematographic precision

#### 3. Accessibility & Inclusion
- **Universal access**: WCAG 2.1 AA compliance throughout
- **Progressive enhancement**: Core experience works for everyone
- **Performance-conscious**: Fast loading regardless of connection

## Color System

### Primary Palette
```css
:root {
    /* Primary Colors */
    --color-black: #000000;
    --color-white: #FFFFFF;
    --color-gray-900: #0A0A0A;
    --color-gray-800: #1A1A1A;
    --color-gray-700: #2A2A2A;
    --color-gray-600: #404040;
    --color-gray-500: #6B6B6B;
    --color-gray-400: #9B9B9B;
    --color-gray-300: #CCCCCC;
    --color-gray-200: #E5E5E5;
    --color-gray-100: #F5F5F5;
}
```

### Semantic Colors
```css
:root {
    /* Semantic Applications */
    --color-background: var(--color-black);
    --color-surface: var(--color-gray-900);
    --color-text-primary: var(--color-white);
    --color-text-secondary: var(--color-gray-300);
    --color-text-muted: var(--color-gray-500);
    --color-border: var(--color-gray-700);
    --color-accent: var(--color-white);
}
```

### Accent Colors (Minimal Use)
```css
:root {
    /* Accent Colors - Use Sparingly */
    --color-accent-gold: #D4A574;
    --color-accent-warm: #8B7355;
    --color-status-success: #22C55E;
    --color-status-warning: #F59E0B;
    --color-status-error: #EF4444;
}
```

### Color Usage Guidelines
- **Primary Background**: Pure black (#000000) for maximum contrast and cinematic feel
- **Text Hierarchy**: White for primary text, grays for secondary information
- **Interactive Elements**: Subtle hover states using gray variations
- **Accent Usage**: Gold tones only for special emphasis (awards, highlights)

## Typography System

### Font Selection
```css
/* Primary Typeface: Inter */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

:root {
    --font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    --font-secondary: Georgia, 'Times New Roman', serif; /* For quotes/emphasis */
}
```

### Type Scale
```css
:root {
    /* Font Sizes - Fluid Typography */
    --text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);      /* 12-14px */
    --text-sm: clamp(0.875rem, 0.8rem + 0.375vw, 1rem);        /* 14-16px */
    --text-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);        /* 16-18px */
    --text-lg: clamp(1.125rem, 1rem + 0.625vw, 1.25rem);       /* 18-20px */
    --text-xl: clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);        /* 20-24px */
    --text-2xl: clamp(1.5rem, 1.3rem + 1vw, 2rem);             /* 24-32px */
    --text-3xl: clamp(2rem, 1.7rem + 1.5vw, 3rem);             /* 32-48px */
    --text-4xl: clamp(3rem, 2.5rem + 2.5vw, 4rem);             /* 48-64px */
    --text-5xl: clamp(4rem, 3rem + 5vw, 6rem);                 /* 64-96px */
    --text-6xl: clamp(6rem, 4rem + 10vw, 9rem);                /* 96-144px */
}
```

### Typography Hierarchy
```css
/* Heading Styles */
.text-display {
    font-size: var(--text-6xl);
    font-weight: 300;
    line-height: 0.9;
    letter-spacing: -0.02em;
}

.text-h1 {
    font-size: var(--text-5xl);
    font-weight: 400;
    line-height: 1.1;
    letter-spacing: -0.01em;
}

.text-h2 {
    font-size: var(--text-4xl);
    font-weight: 500;
    line-height: 1.2;
    letter-spacing: -0.005em;
}

.text-h3 {
    font-size: var(--text-3xl);
    font-weight: 600;
    line-height: 1.3;
}

/* Body Text Styles */
.text-body-lg {
    font-size: var(--text-lg);
    line-height: 1.6;
    font-weight: 400;
}

.text-body {
    font-size: var(--text-base);
    line-height: 1.7;
    font-weight: 400;
}

.text-caption {
    font-size: var(--text-sm);
    line-height: 1.5;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}
```

## Spacing System

### Spatial Scale
```css
:root {
    /* Base spacing unit: 8px */
    --space-1: 0.25rem;    /* 4px */
    --space-2: 0.5rem;     /* 8px */
    --space-3: 0.75rem;    /* 12px */
    --space-4: 1rem;       /* 16px */
    --space-5: 1.25rem;    /* 20px */
    --space-6: 1.5rem;     /* 24px */
    --space-8: 2rem;       /* 32px */
    --space-10: 2.5rem;    /* 40px */
    --space-12: 3rem;      /* 48px */
    --space-16: 4rem;      /* 64px */
    --space-20: 5rem;      /* 80px */
    --space-24: 6rem;      /* 96px */
    --space-32: 8rem;      /* 128px */
    --space-40: 10rem;     /* 160px */
    --space-48: 12rem;     /* 192px */
    --space-64: 16rem;     /* 256px */
}
```

### Responsive Spacing
```css
:root {
    /* Fluid spacing for responsive design */
    --space-section: clamp(4rem, 8vw, 8rem);      /* Section spacing */
    --space-component: clamp(2rem, 4vw, 4rem);    /* Component spacing */
    --space-element: clamp(1rem, 2vw, 2rem);      /* Element spacing */
}
```

## Layout System

### Grid System
```css
/* Container System */
.container {
    max-width: min(90vw, 1440px);
    margin-left: auto;
    margin-right: auto;
    padding-left: var(--space-4);
    padding-right: var(--space-4);
}

.container-narrow {
    max-width: min(85vw, 1200px);
}

.container-wide {
    max-width: min(95vw, 1600px);
}

.container-full {
    max-width: 100vw;
    width: 100%;
}
```

### CSS Grid Layouts
```css
/* Portfolio Grid */
.portfolio-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--space-8);
    padding: var(--space-section) 0;
}

/* Two Column Layout */
.two-column {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-16);
    align-items: start;
}

@media (max-width: 768px) {
    .two-column {
        grid-template-columns: 1fr;
        gap: var(--space-8);
    }
}
```

### Responsive Breakpoints
```css
:root {
    --breakpoint-sm: 360px;
    --breakpoint-md: 720px;
    --breakpoint-lg: 1280px;
    --breakpoint-xl: 1440px;
    --breakpoint-2xl: 1920px;
}

/* Media Query Mixins */
@custom-media --sm (min-width: 360px);
@custom-media --md (min-width: 720px);
@custom-media --lg (min-width: 1280px);
@custom-media --xl (min-width: 1440px);
```

## Component Design System

### Button Variants
```css
/* Primary Button */
.btn-primary {
    padding: var(--space-3) var(--space-6);
    background: var(--color-white);
    color: var(--color-black);
    border: 1px solid var(--color-white);
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    transition: all 0.2s ease;
}

.btn-primary:hover {
    background: transparent;
    color: var(--color-white);
}

/* Secondary Button */
.btn-secondary {
    padding: var(--space-3) var(--space-6);
    background: transparent;
    color: var(--color-white);
    border: 1px solid var(--color-gray-600);
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    transition: all 0.2s ease;
}

.btn-secondary:hover {
    border-color: var(--color-white);
    background: var(--color-white);
    color: var(--color-black);
}
```

### Card Components
```css
.card {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 0; /* Sharp, cinematic edges */
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.card-image {
    width: 100%;
    aspect-ratio: 16/9;
    object-fit: cover;
}

.card-content {
    padding: var(--space-6);
}
```

### Navigation Components
```css
.nav-primary {
    position: fixed;
    top: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.95);
    backdrop-filter: blur(10px);
    z-index: 1000;
    border-bottom: 1px solid var(--color-border);
}

.nav-link {
    color: var(--color-text-secondary);
    text-decoration: none;
    text-transform: uppercase;
    font-size: var(--text-sm);
    letter-spacing: 0.1em;
    font-weight: 500;
    transition: color 0.2s ease;
}

.nav-link:hover,
.nav-link.active {
    color: var(--color-white);
}
```

## Animation System

### Timing Functions
```css
:root {
    --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
    --ease-out: cubic-bezier(0, 0, 0.2, 1);
    --ease-in: cubic-bezier(0.4, 0, 1, 1);
    --ease-cinematic: cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
```

### Transition Durations
```css
:root {
    --duration-fast: 150ms;
    --duration-normal: 250ms;
    --duration-slow: 350ms;
    --duration-cinematic: 600ms;
}
```

### Animation Presets
```css
/* Fade In Animation */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in {
    animation: fadeIn var(--duration-slow) var(--ease-out);
}

/* Parallax Effect */
.parallax {
    transform: translateY(calc(var(--scroll-y) * 0.5px));
}

/* Hover Zoom */
.hover-zoom {
    transition: transform var(--duration-cinematic) var(--ease-cinematic);
}

.hover-zoom:hover {
    transform: scale(1.05);
}
```

## Responsive Design Patterns

### Mobile-First Approach
```css
/* Base styles for mobile */
.hero-title {
    font-size: var(--text-4xl);
    text-align: center;
}

/* Tablet styles */
@media (min-width: 720px) {
    .hero-title {
        font-size: var(--text-5xl);
        text-align: left;
    }
}

/* Desktop styles */
@media (min-width: 1280px) {
    .hero-title {
        font-size: var(--text-6xl);
    }
}
```

### Component Responsiveness
```css
/* Portfolio Grid Responsive Behavior */
.portfolio-grid {
    grid-template-columns: 1fr;
    gap: var(--space-6);
}

@media (min-width: 720px) {
    .portfolio-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: var(--space-8);
    }
}

@media (min-width: 1280px) {
    .portfolio-grid {
        grid-template-columns: repeat(3, 1fr);
        gap: var(--space-10);
    }
}
```

## Accessibility Guidelines

### Focus States
```css
/* Visible focus indicators */
.focusable:focus {
    outline: 2px solid var(--color-white);
    outline-offset: 2px;
}

/* Skip link for keyboard navigation */
.skip-link {
    position: absolute;
    top: -40px;
    left: 6px;
    background: var(--color-white);
    color: var(--color-black);
    padding: 8px;
    text-decoration: none;
    transition: top 0.3s;
}

.skip-link:focus {
    top: 6px;
}
```

### Color Contrast
- **Normal text**: Minimum 4.5:1 ratio
- **Large text**: Minimum 3:1 ratio
- **UI components**: Minimum 3:1 ratio for interactive elements

### Screen Reader Support
```css
/* Screen reader only content */
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}
```

## Implementation Guidelines

### CSS Organization
1. **Base styles first**: Reset, variables, typography
2. **Layout components**: Grid, containers, spacing
3. **UI components**: Buttons, cards, forms
4. **Utilities last**: Helper classes, overrides

### Component Naming Convention
```css
/* Block Element Modifier (BEM) methodology */
.component {}              /* Block */
.component__element {}     /* Element */
.component--modifier {}    /* Modifier */

/* Examples */
.portfolio {}
.portfolio__item {}
.portfolio__item--featured {}
.portfolio__image {}
.portfolio__title {}
```

### Performance Considerations
- **Critical CSS**: Inline above-the-fold styles
- **Font loading**: Use font-display: swap
- **Animation performance**: Prefer transform and opacity
- **Reduce paint operations**: Use will-change sparingly

This design system provides a comprehensive foundation for creating a sophisticated, accessible, and performant cinematography portfolio website that reflects Aaron Francis's professional brand and showcases his work effectively.
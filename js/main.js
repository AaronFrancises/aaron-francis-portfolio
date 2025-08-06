// Main JavaScript Entry Point - Aaron Francis Portfolio
import { ready } from './utils/helpers.js';
import Navigation from './modules/navigation.js';
import Animations from './modules/animations.js';
import Forms from './modules/forms.js';
import VideoPlayer from './modules/video-player.js';
import ScrollAnimations from './modules/scroll-animations.js';
import { initCarousel } from './modules/carousel.js';
import { initFloatingParticles } from './modules/floating-particles.js';

class App {
    constructor() {
        this.modules = {};
        this.isInitialized = false;
        
        this.init();
    }

    init() {
        ready(() => {
            this.initializeModules();
            this.bindGlobalEvents();
            this.handlePageLoad();
            
            this.isInitialized = true;
            console.log('Aaron Francis Portfolio - Loaded successfully ✨');
        });
    }

    initializeModules() {
        try {
            // Initialize core modules
            this.modules.navigation = new Navigation();
            this.modules.animations = new Animations();
            this.modules.forms = new Forms();
            
            // Initialize video players
            this.initializeVideoPlayers();
            
            // Initialize scroll animations
            this.modules.scrollAnimations = new ScrollAnimations();
            
            // Initialize carousel
            this.modules.carousel = initCarousel();
            
            // Initialize floating particles
            this.modules.floatingParticles = initFloatingParticles();
            
            console.log('All modules initialized successfully');
        } catch (error) {
            console.error('Error initializing modules:', error);
        }
    }

    bindGlobalEvents() {
        // Global keyboard shortcuts
        document.addEventListener('keydown', this.handleGlobalKeyboard.bind(this));
        
        // Window events
        window.addEventListener('beforeunload', this.handleBeforeUnload.bind(this));
        window.addEventListener('resize', this.handleWindowResize.bind(this));
        
        // Error handling
        window.addEventListener('error', this.handleGlobalError.bind(this));
        window.addEventListener('unhandledrejection', this.handleUnhandledRejection.bind(this));
    }

    handlePageLoad() {
        // Remove loading classes
        document.body.classList.remove('loading');
        document.body.classList.add('loaded');
        
        // Handle URL hash on page load
        if (window.location.hash) {
            setTimeout(() => {
                const target = document.querySelector(window.location.hash);
                if (target && this.modules.navigation) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
        
        // Initialize any lazy-loaded content
        this.initializeLazyContent();
    }

    handleGlobalKeyboard(e) {
        // Global keyboard shortcuts
        switch (e.key) {
            case '/':
                // Focus search or navigation (if implemented)
                e.preventDefault();
                const firstNavLink = document.querySelector('.nav-link');
                if (firstNavLink) {
                    firstNavLink.focus();
                }
                break;
                
            case 'Escape':
                // Close any open modals, menus, etc.
                document.body.classList.remove('modal-open', 'menu-open');
                break;
        }
    }

    handleWindowResize() {
        // Handle responsive breakpoint changes
        const viewport = {
            width: window.innerWidth,
            height: window.innerHeight
        };
        
        // Update CSS custom properties for viewport-based calculations
        document.documentElement.style.setProperty('--viewport-width', `${viewport.width}px`);
        document.documentElement.style.setProperty('--viewport-height', `${viewport.height}px`);
    }

    handleBeforeUnload() {
        // Cleanup before page unload
        this.cleanup();
    }

    handleGlobalError(event) {
        console.error('Global error:', event.error);
        
        // Optional: Send error to analytics
        // this.trackError(event.error);
    }

    handleUnhandledRejection(event) {
        console.error('Unhandled promise rejection:', event.reason);
        
        // Optional: Send error to analytics
        // this.trackError(event.reason);
    }

    initializeLazyContent() {
        // Initialize any content that should be loaded after the main page
        // This is where video players, image galleries, etc. would be initialized
        
        // Example: Initialize video players when they're in view
        const videoPlaceholders = document.querySelectorAll('.video-placeholder');
        if (videoPlaceholders.length > 0) {
            this.initializeVideoPlaceholders(videoPlaceholders);
        }
    }

    initializeVideoPlayers() {
        // Initialize all video player containers
        const videoContainers = document.querySelectorAll('[data-video-container]');
        this.modules.videoPlayers = [];
        
        videoContainers.forEach(container => {
            const options = this.getVideoPlayerOptions(container);
            const player = new VideoPlayer(container, options);
            this.modules.videoPlayers.push(player);
        });
    }
    
    getVideoPlayerOptions(container) {
        const dataset = container.dataset;
        return {
            autoplay: dataset.autoplay === 'true',
            muted: dataset.muted !== 'false', // Default to true
            loop: dataset.loop === 'true',
            controls: dataset.controls !== 'false', // Default to true
            poster: dataset.poster || null,
            sources: this.parseVideoSources(dataset.sources || '')
        };
    }
    
    parseVideoSources(sourcesString) {
        if (!sourcesString) return [];
        
        try {
            return JSON.parse(sourcesString);
        } catch (error) {
            console.error('Error parsing video sources:', error);
            return [];
        }
    }

    initializeVideoPlaceholders(placeholders) {
        // Legacy placeholder handling - kept for compatibility
        placeholders.forEach(placeholder => {
            placeholder.addEventListener('click', () => {
                console.log('Video placeholder clicked - ready for video implementation');
            });
        });
    }

    // Utility methods for module communication
    getModule(name) {
        return this.modules[name];
    }

    // Analytics/tracking methods (for future implementation)
    trackEvent(eventName, properties = {}) {
        // Example: Google Analytics 4, Adobe Analytics, etc.
        console.log('Track event:', eventName, properties);
        
        // if (typeof gtag !== 'undefined') {
        //     gtag('event', eventName, properties);
        // }
    }

    trackPageView(path = window.location.pathname) {
        console.log('Track page view:', path);
        
        // if (typeof gtag !== 'undefined') {
        //     gtag('config', 'GA_TRACKING_ID', {
        //         page_path: path
        //     });
        // }
    }

    // Performance monitoring
    measurePerformance() {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    console.log('Page load performance:', {
                        domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
                        loadComplete: perfData.loadEventEnd - perfData.loadEventStart,
                        totalTime: perfData.loadEventEnd - perfData.fetchStart
                    });
                }, 0);
            });
        }
    }

    // Cleanup method
    cleanup() {
        // Clean up modules
        Object.values(this.modules).forEach(module => {
            if (module && typeof module.destroy === 'function') {
                module.destroy();
            }
        });
        
        // Remove event listeners
        document.removeEventListener('keydown', this.handleGlobalKeyboard);
        window.removeEventListener('beforeunload', this.handleBeforeUnload);
        window.removeEventListener('resize', this.handleWindowResize);
    }
}

// Initialize the application
const app = new App();

// Make app available globally for debugging
if (typeof window !== 'undefined') {
    window.AaronFrancisPortfolio = app;
}

export default app;
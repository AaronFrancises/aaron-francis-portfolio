// Animation Module
import { prefersReducedMotion, isInViewport, throttle } from '../utils/helpers.js';

class Animations {
    constructor() {
        this.animatedElements = [];
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.init();
    }

    init() {
        // Skip animations if user prefers reduced motion
        if (prefersReducedMotion()) {
            this.disableAnimations();
            return;
        }

        this.setupIntersectionObserver();
        this.initScrollAnimations();
        this.initPageLoadAnimations();
        this.bindEvents();
    }

    setupIntersectionObserver() {
        // Use Intersection Observer for efficient scroll animations
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                    this.observer.unobserve(entry.target);
                }
            });
        }, this.observerOptions);
    }

    initScrollAnimations() {
        // Portfolio items
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        portfolioItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.dataset.animationDelay = index * 100;
            this.observer.observe(item);
        });

        // Section titles
        const sectionTitles = document.querySelectorAll('.section-title');
        sectionTitles.forEach(title => {
            title.style.opacity = '0';
            title.style.transform = 'translateY(20px)';
            this.observer.observe(title);
        });

        // Form elements
        const formGroups = document.querySelectorAll('.form-group');
        formGroups.forEach((group, index) => {
            group.style.opacity = '0';
            group.style.transform = 'translateY(20px)';
            group.dataset.animationDelay = index * 50;
            this.observer.observe(group);
        });

        // About content
        const aboutText = document.querySelector('.about-text');
        const aboutMedia = document.querySelector('.about-media');
        
        if (aboutText) {
            aboutText.style.opacity = '0';
            aboutText.style.transform = 'translateX(-30px)';
            this.observer.observe(aboutText);
        }
        
        if (aboutMedia) {
            aboutMedia.style.opacity = '0';
            aboutMedia.style.transform = 'translateX(30px)';
            this.observer.observe(aboutMedia);
        }
    }

    initPageLoadAnimations() {
        // Hero content is already animated via CSS
        // Add any additional page load animations here
        document.body.classList.add('loaded');
    }

    animateElement(element) {
        const delay = parseInt(element.dataset.animationDelay) || 0;
        
        setTimeout(() => {
            element.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0) translateX(0)';
            
            // Add animation complete class for cleanup
            setTimeout(() => {
                element.classList.add('animation-complete');
                element.style.transition = '';
            }, 800);
        }, delay);
    }

    bindEvents() {
        // Portfolio item hover animations
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        portfolioItems.forEach(item => {
            item.addEventListener('mouseenter', this.handlePortfolioHover.bind(this));
            item.addEventListener('mouseleave', this.handlePortfolioLeave.bind(this));
        });

        // Button hover effects
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', this.handleButtonHover.bind(this));
            button.addEventListener('mouseleave', this.handleButtonLeave.bind(this));
        });

        // Parallax effect for hero background (subtle)
        window.addEventListener('scroll', throttle(this.handleParallax.bind(this), 16));
    }

    handlePortfolioHover(e) {
        const item = e.currentTarget;
        const media = item.querySelector('.portfolio-media');
        
        if (media) {
            media.style.transform = 'scale(1.05)';
            media.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        }
    }

    handlePortfolioLeave(e) {
        const item = e.currentTarget;
        const media = item.querySelector('.portfolio-media');
        
        if (media) {
            media.style.transform = 'scale(1)';
        }
    }

    handleButtonHover(e) {
        const button = e.currentTarget;
        button.style.transform = 'translateY(-2px)';
    }

    handleButtonLeave(e) {
        const button = e.currentTarget;
        button.style.transform = 'translateY(0)';
    }

    handleParallax() {
        const heroMedia = document.querySelector('.hero-media');
        if (!heroMedia) return;

        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        const yPos = -(scrolled * parallaxSpeed);
        
        heroMedia.style.transform = `translateY(${yPos}px)`;
    }

    // Utility method to add staggered animation to elements
    staggerAnimation(elements, delay = 100) {
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('animate-in');
            }, index * delay);
        });
    }

    // Method to trigger custom animations
    triggerAnimation(element, animationClass, delay = 0) {
        setTimeout(() => {
            element.classList.add(animationClass);
        }, delay);
    }

    disableAnimations() {
        // Show all elements immediately if reduced motion is preferred
        const animatedElements = document.querySelectorAll('[style*="opacity: 0"]');
        animatedElements.forEach(element => {
            element.style.opacity = '1';
            element.style.transform = 'none';
        });
        
        document.body.classList.add('loaded', 'reduced-motion');
    }

    // Cleanup method
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
}

export default Animations;
// Scroll Animations Module - Aaron Francis Portfolio

class ScrollAnimations {
    constructor() {
        this.observer = null;
        this.animatedElements = [];
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupAnimatedElements();
        this.bindScrollEvents();
    }

    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '-10% 0px -10% 0px',
            threshold: [0, 0.1, 0.5, 1]
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, options);
    }

    setupAnimatedElements() {
        // Define elements that should animate on scroll
        const selectors = [
            '.section-header',
            '.portfolio-item',
            '.about-content',
            '.about-media',
            '.contact-form'
        ];

        selectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach((element, index) => {
                // Add animation delay based on index
                element.style.setProperty('--animation-delay', `${index * 0.1}s`);
                element.classList.add('animate-on-scroll');
                this.observer.observe(element);
            });
        });

        // Special handling for portfolio grid items
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        portfolioItems.forEach((item, index) => {
            item.style.setProperty('--stagger-delay', `${index * 0.15}s`);
        });
    }

    animateElement(element) {
        element.classList.add('animate-in');
        this.observer.unobserve(element);
    }

    bindScrollEvents() {
        let ticking = false;

        const updateScrollPosition = () => {
            const scrollY = window.pageYOffset;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            
            // Parallax effect for hero background
            this.updateParallax(scrollY);
            
            // Update navigation opacity based on scroll
            this.updateNavigationOpacity(scrollY);
            
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollPosition);
                ticking = true;
            }
        });
    }

    updateParallax(scrollY) {
        const heroMedia = document.querySelector('.hero-media');
        if (heroMedia) {
            const speed = 0.5;
            const yPos = -(scrollY * speed);
            heroMedia.style.transform = `translate3d(0, ${yPos}px, 0)`;
        }
    }

    updateNavigationOpacity(scrollY) {
        const header = document.querySelector('.header');
        if (header) {
            const opacity = Math.min(scrollY / 100, 1);
            header.style.backgroundColor = `rgba(0, 0, 0, ${0.9 * opacity})`;
        }
    }

    // Method to manually trigger animations for dynamic content
    observeNewElements(elements) {
        elements.forEach(element => {
            element.classList.add('animate-on-scroll');
            this.observer.observe(element);
        });
    }

    // Cleanup method
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
        window.removeEventListener('scroll', this.updateScrollPosition);
    }
}

export default ScrollAnimations;
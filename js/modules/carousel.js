// Visual Showcase Carousel Component
// Handles navigation, auto-play, and accessibility

class VisualCarousel {
    constructor(carouselElement) {
        this.carousel = carouselElement;
        this.track = this.carousel.querySelector('.carousel-track');
        this.items = this.carousel.querySelectorAll('.carousel-item');
        this.indicators = this.carousel.querySelectorAll('.carousel-indicator');
        this.prevBtn = this.carousel.querySelector('.carousel-btn--prev');
        this.nextBtn = this.carousel.querySelector('.carousel-btn--next');
        
        this.currentIndex = 0;
        this.autoplayInterval = null;
        this.isAutoPlaying = false;
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.updateCarousel();
        this.startAutoplay();
        
        // Pause autoplay when user interacts
        this.carousel.addEventListener('mouseenter', () => this.pauseAutoplay());
        this.carousel.addEventListener('mouseleave', () => this.startAutoplay());
        
        // Pause on focus (accessibility)
        this.carousel.addEventListener('focusin', () => this.pauseAutoplay());
        this.carousel.addEventListener('focusout', () => this.startAutoplay());
    }
    
    bindEvents() {
        // Navigation buttons
        this.prevBtn?.addEventListener('click', () => this.goToPrevious());
        this.nextBtn?.addEventListener('click', () => this.goToNext());
        
        // Indicator dots
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Keyboard navigation
        this.carousel.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    this.goToPrevious();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.goToNext();
                    break;
                case ' ':
                case 'Enter':
                    e.preventDefault();
                    this.toggleAutoplay();
                    break;
            }
        });
        
        // Touch/Swipe support
        this.addSwipeSupport();
    }
    
    addSwipeSupport() {
        let startX = 0;
        let isDragging = false;
        
        this.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            this.pauseAutoplay();
        });
        
        this.track.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            
            if (Math.abs(diff) > 50) { // Minimum swipe distance
                if (diff > 0) {
                    this.goToNext();
                } else {
                    this.goToPrevious();
                }
            }
            
            isDragging = false;
            this.startAutoplay();
        });
    }
    
    goToNext() {
        this.currentIndex = (this.currentIndex + 1) % this.getVisibleSlides();
        this.updateCarousel();
        this.resetAutoplay();
    }
    
    goToPrevious() {
        this.currentIndex = this.currentIndex === 0 ? this.getVisibleSlides() - 1 : this.currentIndex - 1;
        this.updateCarousel();
        this.resetAutoplay();
    }
    
    goToSlide(index) {
        this.currentIndex = Math.max(0, Math.min(index, this.getVisibleSlides() - 1));
        this.updateCarousel();
        this.resetAutoplay();
    }
    
    getVisibleSlides() {
        // Calculate number of visible slides based on viewport
        const containerWidth = this.carousel.offsetWidth;
        const itemWidth = this.items[0]?.offsetWidth || containerWidth;
        const visibleSlides = Math.floor(containerWidth / itemWidth);
        
        return Math.max(1, this.items.length - visibleSlides + 1);
    }
    
    updateCarousel() {
        // Calculate transform based on current viewport
        const itemWidth = this.items[0]?.offsetWidth || 0;
        const translateX = -this.currentIndex * itemWidth;
        
        this.track.style.transform = `translateX(${translateX}px)`;
        
        // Update indicators
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentIndex);
        });
        
        // Update accessibility
        this.updateAriaLabels();
    }
    
    updateAriaLabels() {
        // Update button states
        if (this.prevBtn) {
            this.prevBtn.setAttribute('aria-disabled', this.currentIndex === 0);
        }
        
        if (this.nextBtn) {
            this.nextBtn.setAttribute('aria-disabled', this.currentIndex === this.getVisibleSlides() - 1);
        }
        
        // Update carousel state
        this.carousel.setAttribute('aria-live', this.isAutoPlaying ? 'off' : 'polite');
    }
    
    startAutoplay() {
        if (this.autoplayInterval) return;
        
        this.autoplayInterval = setInterval(() => {
            this.goToNext();
        }, 4000); // 4 second intervals
        
        this.isAutoPlaying = true;
        this.updateAriaLabels();
    }
    
    pauseAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
        
        this.isAutoPlaying = false;
        this.updateAriaLabels();
    }
    
    toggleAutoplay() {
        if (this.isAutoPlaying) {
            this.pauseAutoplay();
        } else {
            this.startAutoplay();
        }
    }
    
    resetAutoplay() {
        this.pauseAutoplay();
        setTimeout(() => this.startAutoplay(), 1000); // Resume after 1 second
    }
    
    // Handle window resize
    onResize() {
        this.updateCarousel();
    }
    
    // Cleanup
    destroy() {
        this.pauseAutoplay();
        // Remove event listeners if needed
    }
}

// Initialize carousel when DOM is ready
export function initCarousel() {
    const carouselElement = document.querySelector('#visualCarousel')?.parentElement;
    
    if (carouselElement) {
        const carousel = new VisualCarousel(carouselElement);
        
        // Handle window resize
        window.addEventListener('resize', () => carousel.onResize());
        
        // Respect reduced motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            carousel.pauseAutoplay();
        }
        
        return carousel;
    }
    
    return null;
}

// Auto-init if module is loaded directly
if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', initCarousel);
}
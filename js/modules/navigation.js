// Navigation Module
import { smoothScrollTo, debounce, throttle } from '../utils/helpers.js';

class Navigation {
    constructor() {
        this.header = document.querySelector('.header');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.mobileMenuButton = document.querySelector('.mobile-menu-toggle');
        this.mobileMenu = document.querySelector('.mobile-menu');
        
        this.isScrolled = false;
        this.currentSection = '';
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.handleActiveSection();
    }

    bindEvents() {
        // Smooth scroll for navigation links
        this.navLinks.forEach(link => {
            link.addEventListener('click', this.handleNavClick.bind(this));
        });

        // Header background on scroll
        window.addEventListener('scroll', throttle(this.handleScroll.bind(this), 16));

        // Handle mobile menu if it exists
        if (this.mobileMenuButton) {
            this.mobileMenuButton.addEventListener('click', this.toggleMobileMenu.bind(this));
        }

        // Close mobile menu on outside click
        document.addEventListener('click', this.handleOutsideClick.bind(this));

        // Handle window resize
        window.addEventListener('resize', debounce(this.handleResize.bind(this), 250));

        // Keyboard navigation
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
    }

    handleNavClick(e) {
        e.preventDefault();
        const href = e.target.getAttribute('href');
        
        if (href && href.startsWith('#')) {
            const targetSection = document.querySelector(href);
            if (targetSection) {
                smoothScrollTo(targetSection);
                this.updateActiveLink(href);
                
                // Close mobile menu if open
                if (this.mobileMenu) {
                    this.closeMobileMenu();
                }
            }
        }
    }

    handleScroll() {
        const scrollTop = window.pageYOffset;
        
        // Header background effect
        this.updateHeaderBackground(scrollTop);
        
        // Update active section
        this.updateActiveSection(scrollTop);
    }

    updateHeaderBackground(scrollTop) {
        const shouldBeScrolled = scrollTop > 50;
        
        if (shouldBeScrolled !== this.isScrolled) {
            this.isScrolled = shouldBeScrolled;
            
            if (this.isScrolled) {
                this.header.style.background = 'rgba(0, 0, 0, 0.98)';
                this.header.style.backdropFilter = 'blur(20px)';
            } else {
                this.header.style.background = 'rgba(0, 0, 0, 0.95)';
                this.header.style.backdropFilter = 'blur(10px)';
            }
        }
    }

    updateActiveSection(scrollTop) {
        const sections = document.querySelectorAll('section[id]');
        const headerHeight = this.header.offsetHeight;
        
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollTop >= sectionTop && scrollTop < sectionBottom) {
                currentSection = `#${section.id}`;
            }
        });

        if (currentSection !== this.currentSection) {
            this.currentSection = currentSection;
            this.updateActiveLink(currentSection);
        }
    }

    updateActiveLink(activeHref) {
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === activeHref) {
                link.classList.add('active');
            }
        });
    }

    handleActiveSection() {
        // Set initial active section on page load
        const hash = window.location.hash;
        if (hash) {
            this.updateActiveLink(hash);
            // Smooth scroll to hash on page load
            setTimeout(() => {
                const target = document.querySelector(hash);
                if (target) {
                    smoothScrollTo(target);
                }
            }, 100);
        }
    }

    toggleMobileMenu() {
        if (!this.mobileMenu) return;
        
        const isOpen = this.mobileMenu.classList.contains('open');
        
        if (isOpen) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }

    openMobileMenu() {
        if (!this.mobileMenu) return;
        
        this.mobileMenu.classList.add('open');
        this.mobileMenuButton.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Focus first menu item for accessibility
        const firstLink = this.mobileMenu.querySelector('.nav-link');
        if (firstLink) {
            firstLink.focus();
        }
    }

    closeMobileMenu() {
        if (!this.mobileMenu) return;
        
        this.mobileMenu.classList.remove('open');
        this.mobileMenuButton.classList.remove('active');
        document.body.style.overflow = '';
    }

    handleOutsideClick(e) {
        if (!this.mobileMenu || !this.mobileMenu.classList.contains('open')) return;
        
        if (!this.mobileMenu.contains(e.target) && !this.mobileMenuButton.contains(e.target)) {
            this.closeMobileMenu();
        }
    }

    handleResize() {
        // Close mobile menu on resize to larger screen
        if (window.innerWidth > 768 && this.mobileMenu) {
            this.closeMobileMenu();
        }
    }

    handleKeyDown(e) {
        // Close mobile menu on Escape key
        if (e.key === 'Escape' && this.mobileMenu && this.mobileMenu.classList.contains('open')) {
            this.closeMobileMenu();
            this.mobileMenuButton.focus();
        }
        
        // Handle keyboard navigation within mobile menu
        if (this.mobileMenu && this.mobileMenu.classList.contains('open')) {
            this.handleMobileMenuKeyboard(e);
        }
    }

    handleMobileMenuKeyboard(e) {
        const focusableElements = this.mobileMenu.querySelectorAll('a, button');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                // Shift + Tab
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                // Tab
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        }
    }
}

export default Navigation;
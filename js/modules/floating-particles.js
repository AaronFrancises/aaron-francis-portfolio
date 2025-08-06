// Floating Particles Module - Aaron Francis Portfolio
// Creates and manages floating dust particles for cinematic atmosphere

class FloatingParticles {
    constructor(options = {}) {
        this.options = {
            particleCount: 25,
            minDuration: 15,
            maxDuration: 25,
            spawnRate: 2000, // milliseconds between particle spawns
            ...options
        };
        
        this.container = null;
        this.particles = [];
        this.spawnInterval = null;
        this.isActive = false;
        
        this.init();
    }
    
    init() {
        console.log('FloatingParticles: Initializing...');
        this.createContainer();
        this.createLightBeams();
        this.start();
        
        // Handle reduced motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            console.log('FloatingParticles: Reduced motion detected, stopping');
            this.stop();
            return;
        }
        
        // Handle mobile performance
        if (window.innerWidth <= 480) {
            console.log('FloatingParticles: Mobile detected, reducing particles');
            this.options.particleCount = 8;
            this.options.spawnRate = 3000;
        }
        
        console.log('FloatingParticles: Initialized with options:', this.options);
    }
    
    createContainer() {
        this.container = document.createElement('div');
        this.container.className = 'floating-particles';
        this.container.setAttribute('aria-hidden', 'true');
        document.body.appendChild(this.container);
        console.log('FloatingParticles: Container created and added to DOM');
        
        // Add a test particle that's always visible
        const testParticle = document.createElement('div');
        testParticle.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            width: 20px;
            height: 20px;
            background: red;
            border-radius: 50%;
            z-index: 9999;
            pointer-events: none;
        `;
        document.body.appendChild(testParticle);
        console.log('FloatingParticles: Test red dot added to center of screen');
    }
    
    createLightBeams() {
        const beamCount = 3;
        
        for (let i = 1; i <= beamCount; i++) {
            const beam = document.createElement('div');
            beam.className = `light-beam light-beam--${i}`;
            this.container.appendChild(beam);
        }
    }
    
    createParticle() {
        const particle = document.createElement('div');
        const size = this.getRandomSize();
        const duration = this.getRandomDuration();
        const delay = Math.random() * 2; // Random start delay
        const horizontalPosition = Math.random() * 100; // Random horizontal position
        
        particle.className = `particle particle--${size}`;
        particle.style.left = `${horizontalPosition}%`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        // Add some variation to the animation
        const variation = Math.random() * 0.3 - 0.15; // -0.15 to 0.15
        particle.style.setProperty('--drift-x', `${variation * 50}px`);
        
        this.container.appendChild(particle);
        this.particles.push(particle);
        
        console.log(`FloatingParticles: Created ${size} particle at ${horizontalPosition.toFixed(1)}%, duration: ${duration.toFixed(1)}s`);
        
        // Remove particle after animation completes
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
                this.particles = this.particles.filter(p => p !== particle);
                console.log('FloatingParticles: Removed particle');
            }
        }, (duration + delay) * 1000);
    }
    
    getRandomSize() {
        const sizes = ['small', 'medium', 'large'];
        const weights = [0.6, 0.3, 0.1]; // More small particles
        
        const random = Math.random();
        let weightSum = 0;
        
        for (let i = 0; i < sizes.length; i++) {
            weightSum += weights[i];
            if (random <= weightSum) {
                return sizes[i];
            }
        }
        
        return sizes[0];
    }
    
    getRandomDuration() {
        return this.options.minDuration + 
               Math.random() * (this.options.maxDuration - this.options.minDuration);
    }
    
    start() {
        if (this.isActive) return;
        
        this.isActive = true;
        
        // Create initial particles
        for (let i = 0; i < Math.min(this.options.particleCount / 3, 8); i++) {
            setTimeout(() => this.createParticle(), i * 500);
        }
        
        // Set up continuous spawning
        this.spawnInterval = setInterval(() => {
            if (this.particles.length < this.options.particleCount) {
                this.createParticle();
            }
        }, this.options.spawnRate);
    }
    
    stop() {
        this.isActive = false;
        
        if (this.spawnInterval) {
            clearInterval(this.spawnInterval);
            this.spawnInterval = null;
        }
    }
    
    pause() {
        this.stop();
        
        // Pause existing particles
        this.particles.forEach(particle => {
            particle.style.animationPlayState = 'paused';
        });
    }
    
    resume() {
        if (!this.isActive) {
            this.start();
        }
        
        // Resume existing particles
        this.particles.forEach(particle => {
            particle.style.animationPlayState = 'running';
        });
    }
    
    // Adjust particle density based on performance
    adjustForPerformance() {
        const fps = this.measureFPS();
        
        if (fps < 30) {
            this.options.particleCount = Math.max(5, this.options.particleCount * 0.5);
            this.options.spawnRate *= 1.5;
        } else if (fps > 50) {
            this.options.particleCount = Math.min(40, this.options.particleCount * 1.2);
            this.options.spawnRate *= 0.8;
        }
    }
    
    measureFPS() {
        // Simple FPS estimation
        let frames = 0;
        const startTime = performance.now();
        
        const countFrames = () => {
            frames++;
            if (performance.now() - startTime < 1000) {
                requestAnimationFrame(countFrames);
            }
        };
        
        requestAnimationFrame(countFrames);
        
        return new Promise(resolve => {
            setTimeout(() => resolve(frames), 1000);
        });
    }
    
    // Handle visibility change (pause when tab not active)
    handleVisibilityChange() {
        if (document.hidden) {
            this.pause();
        } else {
            this.resume();
        }
    }
    
    // Cleanup
    destroy() {
        this.stop();
        
        if (this.container && this.container.parentNode) {
            this.container.parentNode.removeChild(this.container);
        }
        
        this.particles = [];
        this.container = null;
    }
}

// Initialize floating particles
export function initFloatingParticles() {
    // Check if effects should be disabled
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
        window.innerWidth <= 480) {
        return null;
    }
    
    const particles = new FloatingParticles({
        particleCount: 20,
        minDuration: 18,
        maxDuration: 28,
        spawnRate: 2500
    });
    
    // Handle page visibility changes
    document.addEventListener('visibilitychange', () => {
        particles.handleVisibilityChange();
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 480 && particles.isActive) {
            particles.destroy();
        }
    });
    
    return particles;
}

// Auto-init if module is loaded directly
if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', initFloatingParticles);
}

export default FloatingParticles;
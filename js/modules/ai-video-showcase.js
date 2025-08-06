/**
 * AI Video Showcase - Simple and Direct Approach
 */

// Video data - Fixed paths with URL encoding for spaces
const videoData = {
    trailer: {
        src: 'Content/Ai%20carousel/Trailer.mp4',
        title: 'Trailer',
        description: 'Cutting-edge AI cinematography showcasing the future of filmmaking with advanced machine learning techniques.'
    },
    abstract: {
        src: 'Content/Ai%20carousel/Abstract.mp4',
        title: 'Abstract',
        description: 'Experimental visual narratives exploring the intersection of artificial intelligence and artistic expression.'
    },
    brand: {
        src: 'Content/Ai%20carousel/Brand.mp4',
        title: 'Brand',
        description: 'Innovative brand storytelling through AI-enhanced cinematography and visual effects.'
    },
    narrative: {
        src: 'Content/Ai%20carousel/Narrative.mp4',
        title: 'Narrative',
        description: 'Character-driven stories enhanced by AI-powered cinematography and post-production techniques.'
    },
    showreel: {
        src: 'Content/Ai%20carousel/Showreel.mp4',
        title: 'Showreel',
        description: 'A comprehensive showcase of AI-assisted cinematography work across various projects and styles.'
    }
};

let currentIndex = 0;
let autoRotateTimer = null;
let isVideoPlaying = false;
const videoKeys = Object.keys(videoData);

function initAIVideoShowcase() {
    console.log('🎬 Initializing AI Video Showcase...');
    
    const video = document.getElementById('ai-video');
    const title = document.getElementById('ai-title');
    const description = document.getElementById('ai-description');
    const buttons = document.querySelectorAll('.ai-nav-btn');
    
    console.log('Debug - Video element:', video);
    console.log('Debug - Title element:', title);
    console.log('Debug - Description element:', description);
    console.log('Debug - Buttons found:', buttons.length, buttons);
    
    if (!video) {
        console.error('❌ Video element not found with ID: ai-video');
        return;
    }
    
    if (!buttons.length) {
        console.error('❌ No buttons found with class: ai-nav-btn');
        return;
    }
    
    console.log('✅ Found video and', buttons.length, 'buttons');
    
    // Add click handlers to buttons
    buttons.forEach((button, index) => {
        console.log(`🔗 Adding click handler to button ${index}:`, button.textContent, button.dataset.video);
        
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const videoType = button.dataset.video;
            console.log('🖱️ Button clicked:', videoType, 'Button text:', button.textContent);
            switchVideo(videoType);
            stopAutoRotate();
        });
        
        // Make sure button is clickable
        button.style.cursor = 'pointer';
        button.style.pointerEvents = 'auto';
    });
    
    // Video event listeners
    video.addEventListener('play', () => {
        console.log('▶️ Video playing - stopping auto rotate');
        isVideoPlaying = true;
        stopAutoRotate();
    });
    
    video.addEventListener('pause', () => {
        console.log('⏸️ Video paused - starting auto rotate');
        isVideoPlaying = false;
        startAutoRotate();
    });
    
    video.addEventListener('ended', () => {
        console.log('🔚 Video ended - starting auto rotate');
        isVideoPlaying = false;
        startAutoRotate();
    });
    
    // Start auto rotation
    startAutoRotate();
    
    function switchVideo(videoType) {
        console.log('🔄 Switching to:', videoType);
        console.log('🔄 Available video data:', Object.keys(videoData));
        
        const data = videoData[videoType];
        if (!data) {
            console.error('❌ No data for video type:', videoType);
            console.log('Available types:', Object.keys(videoData));
            return;
        }
        
        console.log('📺 Video data:', data);
        
        // Update active button
        buttons.forEach(btn => {
            if (btn.dataset.video === videoType) {
                btn.classList.add('active');
                console.log('✅ Activated button:', btn.textContent);
            } else {
                btn.classList.remove('active');
            }
        });
        
        // Update video source
        const source = video.querySelector('source');
        console.log('🎬 Video source element:', source);
        
        if (source) {
            console.log('📁 Old source:', source.src);
            source.src = data.src;
            console.log('📁 New source:', data.src);
            video.load();
            console.log('🔄 Video load() called');
        } else {
            console.error('❌ No source element found in video');
        }
        
        // Update text content
        if (title) {
            title.textContent = data.title;
            console.log('📝 Title updated to:', data.title);
        }
        if (description) {
            description.textContent = data.description;
            console.log('📝 Description updated');
        }
        
        // Update current index
        currentIndex = videoKeys.indexOf(videoType);
        
        console.log('✅ Video switched successfully');
    }
    
    function startAutoRotate() {
        if (autoRotateTimer || isVideoPlaying) return;
        
        console.log('🔄 Starting auto rotation');
        autoRotateTimer = setInterval(() => {
            if (!isVideoPlaying) {
                currentIndex = (currentIndex + 1) % videoKeys.length;
                const nextVideo = videoKeys[currentIndex];
                console.log('⏭️ Auto rotating to:', nextVideo);
                switchVideo(nextVideo);
            }
        }, 5000); // 5 seconds
    }
    
    function stopAutoRotate() {
        if (autoRotateTimer) {
            console.log('⏹️ Stopping auto rotation');
            clearInterval(autoRotateTimer);
            autoRotateTimer = null;
        }
    }
    
    console.log('🚀 AI Video Showcase initialized successfully');
    
    // Add global test functions for debugging
    window.testVideoSwitch = function(videoType) {
        console.log('🧪 Manual test - switching to:', videoType);
        switchVideo(videoType);
    };
    
    window.testButtonClick = function(index) {
        console.log('🧪 Manual test - clicking button:', index);
        if (buttons[index]) {
            buttons[index].click();
        } else {
            console.error('Button not found at index:', index);
        }
    };
}

// Initialize when DOM is ready
console.log('🚀 AI Video Showcase script loaded!');
console.log('📊 Document ready state:', document.readyState);

if (document.readyState === 'loading') {
    console.log('⏳ Waiting for DOMContentLoaded...');
    document.addEventListener('DOMContentLoaded', initAIVideoShowcase);
} else {
    console.log('✅ DOM already loaded, initializing immediately...');
    initAIVideoShowcase();
}

// Also add a backup initialization
setTimeout(() => {
    console.log('🔄 Backup initialization after 2 seconds...');
    initAIVideoShowcase();
}, 2000);

export { initAIVideoShowcase };
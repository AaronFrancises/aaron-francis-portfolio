// Video Player Module - Aaron Francis Portfolio

class VideoPlayer {
    constructor(element, options = {}) {
        this.element = element;
        this.video = null;
        this.isPlaying = false;
        this.isLoading = false;
        this.currentTime = 0;
        this.duration = 0;
        
        // Default options
        this.options = {
            autoplay: false,
            muted: true,
            loop: false,
            controls: true,
            poster: null,
            sources: [],
            ...options
        };
        
        this.init();
    }
    
    init() {
        this.createPlayerHTML();
        this.bindEvents();
        this.setupVideo();
    }
    
    createPlayerHTML() {
        const posterAttr = this.options.poster ? `data-poster="${this.options.poster}"` : '';
        
        this.element.innerHTML = `
            <div class="video-player" ${posterAttr}>
                <div class="video-player__wrapper">
                    <video class="video-player__video" 
                           ${this.options.muted ? 'muted' : ''}
                           ${this.options.loop ? 'loop' : ''}
                           preload="metadata"
                           playsinline>
                        ${this.generateSourceElements()}
                    </video>
                    
                    ${this.options.poster ? `
                        <img class="video-player__poster" 
                             src="${this.options.poster}" 
                             alt="Video thumbnail">
                    ` : ''}
                    
                    <div class="video-player__overlay">
                        <button class="video-player__play-button" 
                                aria-label="Play video">
                        </button>
                    </div>
                    
                    <div class="video-player__loading" style="display: none;">
                        <div class="video-player__spinner"></div>
                    </div>
                    
                    <div class="video-player__error" style="display: none;">
                        <div class="video-player__error-icon">⚠</div>
                        <div class="video-player__error-message">
                            Unable to load video. Please try again.
                        </div>
                        <button class="video-player__retry-button">Retry</button>
                    </div>
                    
                    ${this.options.controls ? `
                        <div class="video-player__controls">
                            <div class="video-player__progress" role="slider" 
                                 aria-label="Video progress" 
                                 tabindex="0">
                                <div class="video-player__progress-filled"></div>
                            </div>
                            <div class="video-player__button-group">
                                <button class="video-player__button video-player__play-pause" 
                                        aria-label="Play/Pause">
                                    ⏸
                                </button>
                                <button class="video-player__button video-player__mute" 
                                        aria-label="Mute/Unmute">
                                    🔊
                                </button>
                                <div class="video-player__time">
                                    <span class="video-player__current-time">0:00</span> / 
                                    <span class="video-player__duration">0:00</span>
                                </div>
                            </div>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
        
        // Cache DOM elements
        this.player = this.element.querySelector('.video-player');
        this.video = this.element.querySelector('.video-player__video');
        this.overlay = this.element.querySelector('.video-player__overlay');
        this.playButton = this.element.querySelector('.video-player__play-button');
        this.loading = this.element.querySelector('.video-player__loading');
        this.error = this.element.querySelector('.video-player__error');
        this.retryButton = this.element.querySelector('.video-player__retry-button');
        
        if (this.options.controls) {
            this.controls = this.element.querySelector('.video-player__controls');
            this.progress = this.element.querySelector('.video-player__progress');
            this.progressFilled = this.element.querySelector('.video-player__progress-filled');
            this.playPauseButton = this.element.querySelector('.video-player__play-pause');
            this.muteButton = this.element.querySelector('.video-player__mute');
            this.currentTimeDisplay = this.element.querySelector('.video-player__current-time');
            this.durationDisplay = this.element.querySelector('.video-player__duration');
        }
    }
    
    generateSourceElements() {
        return this.options.sources.map(source => 
            `<source src="${source.src}" type="${source.type}">`
        ).join('');
    }
    
    bindEvents() {
        // Play button events
        this.playButton?.addEventListener('click', () => this.togglePlay());
        this.overlay?.addEventListener('click', () => this.togglePlay());
        
        // Video events
        this.video.addEventListener('loadstart', () => this.handleLoadStart());
        this.video.addEventListener('loadedmetadata', () => this.handleLoadedMetadata());
        this.video.addEventListener('canplay', () => this.handleCanPlay());
        this.video.addEventListener('play', () => this.handlePlay());
        this.video.addEventListener('pause', () => this.handlePause());
        this.video.addEventListener('ended', () => this.handleEnded());
        this.video.addEventListener('timeupdate', () => this.handleTimeUpdate());
        this.video.addEventListener('error', () => this.handleError());
        
        // Control events
        if (this.options.controls) {
            this.playPauseButton?.addEventListener('click', () => this.togglePlay());
            this.muteButton?.addEventListener('click', () => this.toggleMute());
            this.progress?.addEventListener('click', (e) => this.handleProgressClick(e));
            this.progress?.addEventListener('keydown', (e) => this.handleProgressKeydown(e));
        }
        
        // Error retry
        this.retryButton?.addEventListener('click', () => this.retry());
        
        // Keyboard accessibility
        this.element.addEventListener('keydown', (e) => this.handleKeydown(e));
    }
    
    setupVideo() {
        if (this.options.autoplay) {
            this.play();
        }
    }
    
    // Event handlers
    handleLoadStart() {
        this.showLoading();
    }
    
    handleLoadedMetadata() {
        this.duration = this.video.duration;
        this.updateDurationDisplay();
    }
    
    handleCanPlay() {
        this.hideLoading();
        this.hideError();
    }
    
    handlePlay() {
        this.isPlaying = true;
        this.player.classList.add('playing');
        this.updatePlayButton('⏸');
    }
    
    handlePause() {
        this.isPlaying = false;
        this.player.classList.remove('playing');
        this.updatePlayButton('▶');
    }
    
    handleEnded() {
        this.isPlaying = false;
        this.player.classList.remove('playing');
        this.updatePlayButton('▶');
        
        if (!this.options.loop) {
            this.video.currentTime = 0;
            this.updateProgress();
        }
    }
    
    handleTimeUpdate() {
        this.currentTime = this.video.currentTime;
        this.updateProgress();
        this.updateTimeDisplay();
    }
    
    handleError() {
        this.hideLoading();
        this.showError();
        console.error('Video error:', this.video.error);
    }
    
    handleProgressClick(e) {
        const rect = this.progress.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        const time = percent * this.duration;
        this.seekTo(time);
    }
    
    handleProgressKeydown(e) {
        const step = this.duration * 0.05; // 5% steps
        
        switch (e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                this.seekTo(Math.max(0, this.currentTime - step));
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.seekTo(Math.min(this.duration, this.currentTime + step));
                break;
        }
    }
    
    handleKeydown(e) {
        switch (e.key) {
            case ' ':
            case 'Enter':
                e.preventDefault();
                this.togglePlay();
                break;
            case 'ArrowLeft':
                if (e.target !== this.progress) {
                    e.preventDefault();
                    this.seekTo(Math.max(0, this.currentTime - 10));
                }
                break;
            case 'ArrowRight':
                if (e.target !== this.progress) {
                    e.preventDefault();
                    this.seekTo(Math.min(this.duration, this.currentTime + 10));
                }
                break;
            case 'm':
            case 'M':
                e.preventDefault();
                this.toggleMute();
                break;
        }
    }
    
    // Public methods
    play() {
        if (this.video && !this.isPlaying) {
            const playPromise = this.video.play();
            
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.error('Play failed:', error);
                    this.handleError();
                });
            }
        }
    }
    
    pause() {
        if (this.video && this.isPlaying) {
            this.video.pause();
        }
    }
    
    togglePlay() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }
    
    toggleMute() {
        if (this.video) {
            this.video.muted = !this.video.muted;
            this.updateMuteButton();
        }
    }
    
    seekTo(time) {
        if (this.video && !isNaN(time)) {
            this.video.currentTime = Math.max(0, Math.min(time, this.duration));
        }
    }
    
    retry() {
        this.hideError();
        this.showLoading();
        this.video.load();
    }
    
    // UI update methods
    showLoading() {
        this.isLoading = true;
        this.player.classList.add('loading');
        this.loading.style.display = 'block';
    }
    
    hideLoading() {
        this.isLoading = false;
        this.player.classList.remove('loading');
        this.loading.style.display = 'none';
    }
    
    showError() {
        this.player.classList.add('error');
        this.error.style.display = 'flex';
    }
    
    hideError() {
        this.player.classList.remove('error');
        this.error.style.display = 'none';
    }
    
    updatePlayButton(symbol) {
        if (this.playPauseButton) {
            this.playPauseButton.textContent = symbol;
        }
    }
    
    updateMuteButton() {
        if (this.muteButton) {
            this.muteButton.textContent = this.video.muted ? '🔇' : '🔊';
        }
    }
    
    updateProgress() {
        if (this.progressFilled && this.duration > 0) {
            const percent = (this.currentTime / this.duration) * 100;
            this.progressFilled.style.width = `${percent}%`;
        }
    }
    
    updateTimeDisplay() {
        if (this.currentTimeDisplay) {
            this.currentTimeDisplay.textContent = this.formatTime(this.currentTime);
        }
    }
    
    updateDurationDisplay() {
        if (this.durationDisplay) {
            this.durationDisplay.textContent = this.formatTime(this.duration);
        }
    }
    
    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
    
    // Cleanup
    destroy() {
        if (this.video) {
            this.video.pause();
            this.video.src = '';
            this.video.load();
        }
        
        // Remove event listeners would go here if needed
        // (browser handles cleanup when element is removed)
    }
}

export default VideoPlayer;
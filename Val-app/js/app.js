// Main Application Entry Point
document.addEventListener('DOMContentLoaded', function() {
    console.log('💖 Valentine\'s Day App Initializing...');

    // Initialize all modules
    AppState; // State is self-initializing

    // Initialize router
    Router.init();

    // Initialize effects
    Effects.init();

    // Initialize music player
    initMusicPlayer();

    // Initialize additional page-specific styles
    initPageStyles();

    // Add CSS for dynamically created pages
    addDynamicStyles();

    console.log('💖 App Ready! Navigate with love.');

    // Auto-navigate to welcome page if on a different hash
    if (!window.location.hash || window.location.hash === '#') {
        window.location.hash = 'welcome';
    }
});

// Initialize background music player
function initMusicPlayer() {
    const musicToggle = document.getElementById('musicToggle');
    const backgroundMusic = document.getElementById('backgroundMusic');

    if (!musicToggle || !backgroundMusic) return;

    // Set initial state
    const musicIcon = musicToggle.querySelector('i');
    const musicText = musicToggle.querySelector('span');

    // Check if music was previously playing
    const wasPlaying = localStorage.getItem('valentineMusicPlaying') === 'true';

    if (wasPlaying) {
        backgroundMusic.play().catch(e => console.log('Autoplay prevented:', e));
        musicIcon.className = 'fas fa-volume-up';
        musicText.textContent = 'Pause Music';
        AppState.toggleMusic(); // Sync with state
    }

    // Toggle music on button click
    musicToggle.addEventListener('click', function() {
        const isPlaying = AppState.toggleMusic();

        if (isPlaying) {
            backgroundMusic.play();
            musicIcon.className = 'fas fa-volume-up';
            musicText.textContent = 'Pause Music';
        } else {
            backgroundMusic.pause();
            musicIcon.className = 'fas fa-music';
            musicText.textContent = 'Play Music';
        }

        // Save preference
        localStorage.setItem('valentineMusicPlaying', isPlaying);
    });

    // Handle audio errors
    backgroundMusic.addEventListener('error', function() {
        console.log('Audio error - using fallback audio source');
        // Try fallback source if primary fails
        backgroundMusic.innerHTML = `
            <source src="assets/music/8ème merveille.mp3" type="audio/mpeg">
        `;
        backgroundMusic.load();
    });
}

// Initialize page-specific styles
function initPageStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* Page Header */
        .page-header {
            text-align: center;
            margin-bottom: 3rem;
        }
        
        .page-title {
            font-family: var(--font-script);
            font-size: 3rem;
            color: var(--color-primary);
            margin-bottom: 0.5rem;
        }
        
        .page-subtitle {
            font-size: 1.2rem;
            color: var(--color-dark);
            opacity: 0.8;
        }
        
        /* Story Page */
        .story-page {
            background: var(--glass-bg);
            backdrop-filter: blur(10px);
            border: 1px solid var(--glass-border);
            border-radius: var(--border-radius);
            padding: 2.5rem;
            box-shadow: var(--shadow-heavy);
        }
        
        .timeline-container {
            position: relative;
            max-width: 800px;
            margin: 3rem auto;
        }
        
        .timeline-container::before {
            content: '';
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            width: 3px;
            height: 100%;
            background: linear-gradient(to bottom, var(--color-primary), var(--color-accent));
        }
        
        .timeline-item {
            display: flex;
            margin-bottom: 3rem;
            position: relative;
        }
        
        .timeline-item.left {
            justify-content: flex-start;
            padding-right: calc(50% + 30px);
        }
        
        .timeline-item.right {
            justify-content: flex-end;
            padding-left: calc(50% + 30px);
        }
        
        .timeline-content {
            background: white;
            padding: 1.5rem;
            border-radius: 12px;
            box-shadow: var(--shadow-soft);
            width: 100%;
            max-width: 350px;
            position: relative;
        }
        
        .timeline-content::before {
            content: '';
            position: absolute;
            top: 20px;
            width: 20px;
            height: 20px;
            background: white;
            transform: rotate(45deg);
        }
        
        .timeline-item.left .timeline-content::before {
            right: -10px;
        }
        
        .timeline-item.right .timeline-content::before {
            left: -10px;
        }
        
        .timeline-icon {
            font-size: 1.5rem;
            color: var(--color-primary);
            margin-bottom: 0.8rem;
        }
        
        .timeline-date {
            font-weight: 600;
            color: var(--color-primary);
            margin-bottom: 0.5rem;
            font-size: 0.9rem;
        }
        
        .timeline-title {
            font-family: var(--font-heading);
            font-size: 1.5rem;
            color: var(--color-dark);
            margin-bottom: 0.8rem;
        }
        
        .timeline-description {
            color: var(--color-dark);
            opacity: 0.9;
            line-height: 1.5;
        }
        
        .story-quote {
            text-align: center;
            font-style: italic;
            font-size: 1.3rem;
            color: var(--color-primary);
            max-width: 600px;
            margin: 3rem auto 0;
            padding: 2rem;
            background: rgba(255, 255, 255, 0.7);
            border-radius: 12px;
            border-left: 4px solid var(--color-primary);
        }
        
        .story-quote i:first-child {
            margin-right: 10px;
        }
        
        .story-quote i:last-child {
            margin-left: 10px;
        }
        
        /* Love Page */
        .love-page {
            background: var(--glass-bg);
            backdrop-filter: blur(10px);
            border: 1px solid var(--glass-border);
            border-radius: var(--border-radius);
            padding: 2.5rem;
            box-shadow: var(--shadow-heavy);
        }
        
        .love-cards-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 2rem;
            margin: 3rem 0;
        }
        
        .love-card {
            background: white;
            border-radius: 16px;
            padding: 2rem;
            box-shadow: var(--shadow-soft);
            transition: var(--transition-smooth);
            position: relative;
            overflow: hidden;
            cursor: pointer;
        }
        
        .love-card:hover {
            transform: translateY(-10px);
            box-shadow: var(--shadow-heavy);
        }
        
        .love-card.card-pulse {
            animation: pulse 0.6s ease;
        }
        
        .card-icon {
            font-size: 2.5rem;
            color: var(--color-primary);
            margin-bottom: 1.2rem;
        }
        
        .card-title {
            font-family: var(--font-heading);
            font-size: 1.6rem;
            color: var(--color-dark);
            margin-bottom: 1rem;
        }
        
        .card-description {
            color: var(--color-dark);
            opacity: 0.9;
            line-height: 1.5;
            margin-bottom: 1.5rem;
        }
        
        .card-heart {
            position: absolute;
            bottom: 1rem;
            right: 1.5rem;
            color: var(--color-accent);
            font-size: 1.5rem;
            opacity: 0.7;
        }
        
        .love-message {
            text-align: center;
            font-size: 1.2rem;
            color: var(--color-primary);
            padding: 2rem;
            background: rgba(255, 255, 255, 0.7);
            border-radius: 12px;
            max-width: 800px;
            margin: 0 auto;
        }
        
        /* Gallery Page */
        .gallery-page {
            background: var(--glass-bg);
            backdrop-filter: blur(10px);
            border: 1px solid var(--glass-border);
            border-radius: var(--border-radius);
            padding: 2.5rem;
            box-shadow: var(--shadow-heavy);
        }
        
        .gallery-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 1.5rem;
            margin: 3rem 0;
        }
        
        .gallery-item {
            position: relative;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: var(--shadow-soft);
            transition: var(--transition-smooth);
            aspect-ratio: 1/1;
        }
        
        .gallery-item:hover {
            transform: scale(1.05);
            box-shadow: var(--shadow-heavy);
        }
        
        .image-placeholder {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: white;
        }
        
        .image-placeholder i {
            font-size: 3rem;
            margin-bottom: 1rem;
            opacity: 0.9;
        }
        
        .image-alt {
            font-size: 1.1rem;
            font-weight: 500;
            text-align: center;
            padding: 0 1rem;
        }
        
        .image-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .gallery-item:hover .image-overlay {
            opacity: 1;
        }
        
        .view-image-btn {
            background: var(--color-primary);
            color: white;
            border: none;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-size: 1.2rem;
            transition: var(--transition-smooth);
        }
        
        .view-image-btn:hover {
            background: var(--color-primary-light);
            transform: scale(1.1);
        }
        
        .gallery-note {
            text-align: center;
            font-size: 1.2rem;
            color: var(--color-primary);
            padding: 2rem;
            background: rgba(255, 255, 255, 0.7);
            border-radius: 12px;
            max-width: 600px;
            margin: 0 auto;
        }
        
        /* Modal */
        .modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 1;
            transition: opacity 0.3s ease;
        }
        
        .modal.hidden {
            opacity: 0;
            pointer-events: none;
        }
        
        .modal-content {
            background: white;
            border-radius: 20px;
            max-width: 800px;
            width: 90%;
            max-height: 90vh;
            overflow: hidden;
            position: relative;
            box-shadow: var(--shadow-heavy);
        }
        
        .modal-close {
            position: absolute;
            top: 20px;
            right: 20px;
            background: var(--color-primary);
            color: white;
            border: none;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            font-size: 1.5rem;
            cursor: pointer;
            z-index: 10;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .modal-image {
            width: 100%;
            height: 400px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .modal-image-placeholder {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
        }
        
        .modal-image-placeholder i {
            font-size: 5rem;
            opacity: 0.9;
        }
        
        .modal-info {
            padding: 2rem;
        }
        
        .modal-info h3 {
            font-family: var(--font-heading);
            font-size: 1.8rem;
            color: var(--color-dark);
            margin-bottom: 1rem;
        }
        
        .modal-info p {
            color: var(--color-dark);
            opacity: 0.9;
            line-height: 1.5;
        }
        
        /* Letter Page */
        .letter-page {
            background: var(--glass-bg);
            backdrop-filter: blur(10px);
            border: 1px solid var(--glass-border);
            border-radius: var(--border-radius);
            padding: 2.5rem;
            box-shadow: var(--shadow-heavy);
        }
        
        .letter-container {
            max-width: 800px;
            margin: 3rem auto;
        }
        
        .letter-paper {
            background: #fffef0;
            padding: 3rem;
            border-radius: 4px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
            position: relative;
            border: 1px solid #f5e9da;
        }
        
        .letter-paper::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 100%;
            background: linear-gradient(to bottom, transparent 95%, rgba(0, 0, 0, 0.03) 100%);
            pointer-events: none;
        }
        
        .letter-header {
            text-align: center;
            margin-bottom: 2.5rem;
            position: relative;
        }
        
        .letter-wax-seal {
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, var(--color-primary), #c1121f);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1rem;
            color: white;
            font-size: 1.8rem;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }
        
        .letter-date {
            font-style: italic;
            color: var(--color-dark);
            opacity: 0.7;
        }
        
        .letter-content {
            font-size: 1.1rem;
            line-height: 1.8;
            color: #333;
            margin-bottom: 2.5rem;
            white-space: pre-line;
        }
        
        .letter-signature {
            text-align: right;
            margin-top: 3rem;
            padding-top: 2rem;
            border-top: 1px solid #eee;
        }
        
        .letter-signature p {
            font-style: italic;
            color: var(--color-dark);
            margin-bottom: 0.5rem;
        }
        
        .signature {
            font-family: var(--font-script);
            font-size: 2.5rem;
            color: var(--color-primary);
        }
        
        .letter-controls {
            display: flex;
            justify-content: center;
            gap: 1.5rem;
            margin-top: 3rem;
        }
        
        .letter-btn {
            background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
            color: white;
            border: none;
            border-radius: 50px;
            padding: 12px 24px;
            font-size: 1rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 10px;
            transition: var(--transition-smooth);
        }
        
        .letter-btn:hover {
            transform: translateY(-3px);
            box-shadow: var(--shadow-medium);
        }
        
        /* Surprise Page */
        .surprise-page {
            background: var(--glass-bg);
            backdrop-filter: blur(10px);
            border: 1px solid var(--glass-border);
            border-radius: var(--border-radius);
            padding: 2.5rem;
            box-shadow: var(--shadow-heavy);
        }
        
        .surprise-content {
            text-align: center;
            max-width: 600px;
            margin: 0 auto;
        }
        
        .surprise-heart {
            font-size: 8rem;
            color: var(--color-primary);
            margin: 2rem 0;
            cursor: pointer;
            animation: heartbeat 1.5s ease-in-out infinite;
        }
        
        .surprise-message {
            font-size: 1.3rem;
            line-height: 1.6;
            color: var(--color-dark);
            margin: 2rem 0;
            padding: 1.5rem;
            background: rgba(255, 255, 255, 0.7);
            border-radius: 12px;
        }
        
        .surprise-question {
            margin: 3rem 0;
        }
        
        .surprise-question h3 {
            font-family: var(--font-heading);
            font-size: 1.8rem;
            color: var(--color-primary);
            margin-bottom: 2rem;
        }
        
        .surprise-options {
            display: flex;
            justify-content: center;
            gap: 2rem;
            flex-wrap: wrap;
        }
        
        .surprise-option {
            background: white;
            border: 2px solid transparent;
            border-radius: 50px;
            padding: 18px 36px;
            font-size: 1.2rem;
            font-weight: 600;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 12px;
            transition: var(--transition-smooth);
            min-width: 200px;
            justify-content: center;
        }
        
        .yes-option {
            background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
            color: white;
        }
        
        .no-option {
            background: white;
            color: var(--color-dark);
            border: 2px solid var(--color-accent);
        }
        
        .surprise-option:hover {
            transform: translateY(-5px) scale(1.05);
            box-shadow: var(--shadow-heavy);
        }
        
        .surprise-countdown {
            margin: 3rem 0;
            padding: 2rem;
            background: rgba(255, 255, 255, 0.7);
            border-radius: 16px;
        }
        
        .countdown-timer {
            display: flex;
            justify-content: center;
            gap: 2rem;
            margin-top: 1.5rem;
        }
        
        .countdown-item {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        
        .countdown-number {
            font-family: var(--font-heading);
            font-size: 3rem;
            color: var(--color-primary);
            font-weight: bold;
            line-height: 1;
        }
        
        .countdown-label {
            font-size: 1rem;
            color: var(--color-dark);
            margin-top: 0.5rem;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .easter-egg-hint {
            text-align: center;
            margin-top: 3rem;
            padding: 1rem;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 12px;
            font-size: 0.9rem;
            color: var(--color-dark);
            opacity: 0.8;
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
            .page-title {
                font-size: 2.2rem;
            }
            
            .timeline-container::before {
                left: 30px;
            }
            
            .timeline-item {
                padding-left: 60px !important;
                padding-right: 0 !important;
            }
            
            .timeline-content::before {
                left: -10px !important;
                right: auto !important;
            }
            
            .love-cards-container {
                grid-template-columns: 1fr;
            }
            
            .gallery-container {
                grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            }
            
            .letter-paper {
                padding: 2rem 1.5rem;
            }
            
            .signature {
                font-size: 2rem;
            }
            
            .letter-controls {
                flex-direction: column;
                align-items: center;
            }
            
            .surprise-options {
                flex-direction: column;
                align-items: center;
            }
            
            .surprise-heart {
                font-size: 6rem;
            }
            
            .countdown-timer {
                gap: 1rem;
            }
            
            .countdown-number {
                font-size: 2.2rem;
            }
        }
        
        @media (max-width: 480px) {
            .story-page,
            .love-page,
            .gallery-page,
            .letter-page,
            .surprise-page {
                padding: 1.5rem;
            }
            
            .page-header {
                margin-bottom: 2rem;
            }
            
            .love-card {
                padding: 1.5rem;
            }
            
            .modal-content {
                width: 95%;
            }
            
            .modal-image {
                height: 250px;
            }
        }
    `;

    document.head.appendChild(style);
}

// Add additional dynamic styles
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .confetti {
            pointer-events: none;
        }
        
        @keyframes confettiFall {
            0% {
                transform: translateY(-100px) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }
        
        /* Additional animations for interactive elements */
        .card-pulse {
            animation: pulse 0.6s ease;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
            width: 10px;
        }
        
        ::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb {
            background: linear-gradient(to bottom, var(--color-primary), var(--color-accent));
            border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(to bottom, var(--color-primary-light), var(--color-primary));
        }
        
        /* Selection color */
        ::selection {
            background-color: var(--color-accent);
            color: white;
        }
        
        /* Focus styles for accessibility */
        button:focus,
        a:focus {
            outline: 3px solid var(--color-primary);
            outline-offset: 3px;
        }
        
        /* Reduced motion preference */
        @media (prefers-reduced-motion: reduce) {
            *,
            *::before,
            *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        }
    `;

    document.head.appendChild(style);
}
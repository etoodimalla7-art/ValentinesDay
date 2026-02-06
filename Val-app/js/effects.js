// Visual Effects and Animations Manager
const Effects = (function() {
    // Private variables
    let heartClickCount = 0;
    let easterEggActivated = false;

    // Initialize all effects
    function init() {
        createBackgroundHearts();
        createParticles();
        setupEventListeners();
    }

    // Create floating hearts in background
    function createBackgroundHearts() {
        const container = document.querySelector('.background-hearts');
        if (!container) return;

        // Clear existing hearts
        container.innerHTML = '';

        // Create hearts based on screen size
        const heartCount = Math.floor(window.innerWidth / 50);

        for (let i = 0; i < heartCount; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = '<i class="fas fa-heart"></i>';
            heart.style.position = 'absolute';
            heart.style.left = `${Math.random() * 100}%`;
            heart.style.top = `${Math.random() * 100}%`;
            heart.style.fontSize = `${Math.random() * 20 + 10}px`;
            heart.style.opacity = `${Math.random() * 0.3 + 0.1}`;
            heart.style.color = getRandomHeartColor();
            heart.style.animation = `float ${Math.random() * 10 + 10}s ease-in-out infinite`;
            heart.style.animationDelay = `${Math.random() * 5}s`;
            heart.style.zIndex = '-2';

            container.appendChild(heart);
        }
    }

    // Create animated particles
    function createParticles() {
        const container = document.querySelector('.particles-container');
        if (!container) return;

        // Clear existing particles
        container.innerHTML = '';

        // Create particles based on screen size
        const particleCount = Math.floor(window.innerWidth / 10);

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.position = 'absolute';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.width = `${Math.random() * 4 + 1}px`;
            particle.style.height = particle.style.width;
            particle.style.backgroundColor = getRandomParticleColor();
            particle.style.borderRadius = '50%';
            particle.style.opacity = `${Math.random() * 0.5 + 0.1}`;
            particle.style.animation = `float ${Math.random() * 15 + 5}s linear infinite`;
            particle.style.animationDelay = `${Math.random() * 5}s`;
            particle.style.zIndex = '-1';

            container.appendChild(particle);
        }
    }

    // Get random heart color from palette
    function getRandomHeartColor() {
        const colors = [
            '#e63946', // primary
            '#f28482', // secondary
            '#ffafcc', // accent
            '#ff6b7c', // primary-light
            '#ffcad4' // light
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    // Get random particle color
    function getRandomParticleColor() {
        const colors = [
            '#e63946', '#f28482', '#ffafcc', '#ffcad4',
            '#ffffff', '#fff0f3'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    // Create confetti animation
    function createConfetti() {
        const container = document.querySelector('.particles-container');
        if (!container) return;

        // Create confetti pieces
        const confettiCount = 150;

        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.position = 'fixed';
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.top = '-20px';
            confetti.style.width = `${Math.random() * 10 + 5}px`;
            confetti.style.height = `${Math.random() * 10 + 5}px`;
            confetti.style.backgroundColor = getRandomHeartColor();
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            confetti.style.opacity = `${Math.random() * 0.7 + 0.3}`;
            confetti.style.zIndex = '9999';

            // Random rotation
            const rotation = Math.random() * 360;
            confetti.style.transform = `rotate(${rotation}deg)`;

            // Animation
            const animationDuration = Math.random() * 3 + 2;
            const animationDelay = Math.random() * 2;

            confetti.style.animation = `confettiFall ${animationDuration}s linear ${animationDelay}s forwards`;

            container.appendChild(confetti);

            // Remove confetti after animation
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, (animationDuration + animationDelay) * 1000);
        }
    }

    // Create heart explosion effect
    function createHeartExplosion(x, y) {
        const explosionCount = 20;

        for (let i = 0; i < explosionCount; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = '<i class="fas fa-heart"></i>';
            heart.style.position = 'fixed';
            heart.style.left = `${x}px`;
            heart.style.top = `${y}px`;
            heart.style.fontSize = '20px';
            heart.style.color = getRandomHeartColor();
            heart.style.zIndex = '10000';
            heart.style.pointerEvents = 'none';

            // Random direction and distance
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 100 + 50;
            const targetX = x + Math.cos(angle) * distance;
            const targetY = y + Math.sin(angle) * distance;

            // Animation
            heart.style.transition = `all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)`;

            document.body.appendChild(heart);

            // Animate
            setTimeout(() => {
                heart.style.left = `${targetX}px`;
                heart.style.top = `${targetY}px`;
                heart.style.opacity = '0';
                heart.style.transform = 'scale(0.5) rotate(180deg)';
            }, 10);

            // Remove after animation
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 1000);
        }
    }

    // Setup event listeners for interactive effects
    function setupEventListeners() {
        // Enter button on welcome page
        document.addEventListener('click', function(e) {
            // Enter button
            if (e.target.closest('#enterBtn')) {
                Router.navigateTo('story');
                createConfetti();
            }

            // Love cards interaction
            if (e.target.closest('.love-card')) {
                const card = e.target.closest('.love-card');
                card.classList.add('card-pulse');

                // Remove pulse class after animation
                setTimeout(() => {
                    card.classList.remove('card-pulse');
                }, 600);

                // Create small heart effect
                const rect = card.getBoundingClientRect();
                createHeartExplosion(rect.left + rect.width / 2, rect.top + rect.height / 2);
            }

            // Gallery image click
            if (e.target.closest('.view-image-btn')) {
                const btn = e.target.closest('.view-image-btn');
                const imageId = btn.getAttribute('data-id');
                openImageModal(imageId);
            }

            // Modal close
            if (e.target.closest('.modal-close') || e.target.closest('#image-modal')) {
                closeImageModal();
            }

            // Surprise page buttons
            if (e.target.closest('.surprise-option')) {
                const option = e.target.closest('.surprise-option');

                if (option.classList.contains('yes-option')) {
                    createConfetti();

                    // Show message
                    setTimeout(() => {
                        alert('You just made me the happiest person in the world! 💖');
                    }, 1000);
                } else {
                    // For the "no" option (which actually says "Always and Always")
                    createHeartExplosion(
                        option.getBoundingClientRect().left + option.offsetWidth / 2,
                        option.getBoundingClientRect().top + option.offsetHeight / 2
                    );

                    // Show message
                    setTimeout(() => {
                        alert('I knew you would say that! Our forever begins now. 💕');
                    }, 1000);
                }
            }

            // Easter egg - heart click counter
            if (e.target.closest('.surprise-heart') || e.target.closest('.surprise-heart i')) {
                heartClickCount++;

                // Create pulse effect
                const heart = document.querySelector('.surprise-heart i');
                if (heart) {
                    heart.style.animation = 'none';
                    setTimeout(() => {
                        heart.style.animation = 'heartbeat 1.5s ease-in-out';
                    }, 10);
                }

                // Create small heart effect
                const heartElement = document.querySelector('.surprise-heart');
                if (heartElement) {
                    const rect = heartElement.getBoundingClientRect();
                    createHeartExplosion(rect.left + rect.width / 2, rect.top + rect.height / 2);
                }

                // Check for easter egg activation
                if (heartClickCount >= 10 && !easterEggActivated) {
                    activateEasterEgg();
                    easterEggActivated = true;
                }
            }

            // Typewriter effect button
            if (e.target.closest('#typewriterBtn')) {
                activateTypewriterEffect();
            }

            // Read aloud button
            if (e.target.closest('#readAloudBtn')) {
                readLoveLetterAloud();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            // Escape key closes modal
            if (e.key === 'Escape') {
                closeImageModal();
            }

            // Arrow keys for gallery navigation when modal is open
            const modal = document.getElementById('image-modal');
            if (modal && !modal.classList.contains('hidden')) {
                const images = AppState.getImages();
                const currentId = parseInt(modal.getAttribute('data-current-id') || '1');

                if (e.key === 'ArrowRight') {
                    const nextId = currentId < images.length ? currentId + 1 : 1;
                    openImageModal(nextId);
                } else if (e.key === 'ArrowLeft') {
                    const prevId = currentId > 1 ? currentId - 1 : images.length;
                    openImageModal(prevId);
                }
            }
        });

        // Window resize - recreate background elements
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                createBackgroundHearts();
                createParticles();
            }, 250);
        });
    }

    // Open image modal
    function openImageModal(imageId) {
        const modal = document.getElementById('image-modal');
        const images = AppState.getImages();
        const image = images.find(img => img.id === parseInt(imageId));

        if (!modal || !image) return;

        // Set modal content
        const placeholder = document.getElementById('modal-image-placeholder');
        const title = document.getElementById('modal-title');
        const description = document.getElementById('modal-description');

        if (placeholder) {
            placeholder.style.backgroundColor = image.color;
        }

        if (title) {
            title.textContent = image.alt;
        }

        if (description) {
            description.textContent = `A beautiful memory of ${image.alt.toLowerCase()}. Every moment with you is precious.`;
        }

        // Show modal
        modal.classList.remove('hidden');
        modal.setAttribute('aria-hidden', 'false');
        modal.setAttribute('data-current-id', imageId);
        document.body.style.overflow = 'hidden';
    }

    // Close image modal
    function closeImageModal() {
        const modal = document.getElementById('image-modal');
        if (!modal) return;

        modal.classList.add('hidden');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    // Activate typewriter effect for love letter
    function activateTypewriterEffect() {
        const letterText = document.getElementById('typewriter-text');
        if (!letterText) return;

        // Save original text
        const originalText = letterText.textContent;

        // Clear text
        letterText.textContent = '';
        letterText.classList.add('animate-typewriter');

        // Reset after animation completes
        setTimeout(() => {
            letterText.classList.remove('animate-typewriter');
            letterText.textContent = originalText;
        }, 4000);
    }

    // Read love letter aloud using Web Speech API
    function readLoveLetterAloud() {
        const letterText = document.getElementById('typewriter-text');
        if (!letterText) return;

        // Check if browser supports speech synthesis
        if (!('speechSynthesis' in window)) {
            alert('Your browser does not support text-to-speech. Try using Chrome or Safari.');
            return;
        }

        // Get text
        const text = letterText.textContent;

        // Create speech synthesis
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9; // Slightly slower for romantic effect
        utterance.pitch = 1.1; // Slightly higher pitch
        utterance.volume = 1;

        // Speak the text
        speechSynthesis.speak(utterance);

        // Change button text
        const button = document.getElementById('readAloudBtn');
        if (button) {
            const originalHTML = button.innerHTML;
            button.innerHTML = '<i class="fas fa-pause"></i><span>Pause Reading</span>';

            // Reset button when speech ends
            utterance.onend = function() {
                button.innerHTML = originalHTML;
            };

            // Add click to stop
            button.onclick = function() {
                speechSynthesis.cancel();
                button.innerHTML = originalHTML;
            };
        }
    }

    // Activate easter egg
    function activateEasterEgg() {
        // Create massive confetti
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                createConfetti();
            }, i * 500);
        }

        // Show special message
        setTimeout(() => {
            // Create floating message
            const message = document.createElement('div');
            message.style.position = 'fixed';
            message.style.top = '50%';
            message.style.left = '50%';
            message.style.transform = 'translate(-50%, -50%)';
            message.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            message.style.backdropFilter = 'blur(10px)';
            message.style.padding = '40px';
            message.style.borderRadius = '20px';
            message.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.3)';
            message.style.zIndex = '10001';
            message.style.textAlign = 'center';
            message.style.maxWidth = '90%';
            message.style.width = '500px';
            message.style.border = '3px solid #e63946';

            message.innerHTML = `
                <h3 style="color: #e63946; font-family: 'Dancing Script', cursive; font-size: 2.5rem; margin-bottom: 20px;">
                    You Found the Secret! 💖
                </h3>
                <p style="font-size: 1.2rem; line-height: 1.6; margin-bottom: 25px;">
                    Your curiosity and love have unlocked a special message:
                </p>
                <div style="background: linear-gradient(135deg, #ffafcc, #e63946); padding: 20px; border-radius: 10px; color: white;">
                    <p style="font-size: 1.3rem; font-style: italic;">
                        "My love for you is infinite, just like your patience in clicking that heart 10 times! 😉
                        You're amazing, and I'm so lucky to have you."
                    </p>
                </div>
                <button id="closeEasterEgg" style="margin-top: 25px; padding: 12px 30px; background: #e63946; color: white; 
                       border: none; border-radius: 50px; font-size: 1.1rem; cursor: pointer; font-weight: bold;">
                    Close & Keep Exploring
                </button>
            `;

            document.body.appendChild(message);

            // Add close button event
            document.getElementById('closeEasterEgg').addEventListener('click', function() {
                document.body.removeChild(message);
            });
        }, 2000);
    }

    // Public API
    return {
        init: init,
        createConfetti: createConfetti,
        createHeartExplosion: createHeartExplosion
    };
})();
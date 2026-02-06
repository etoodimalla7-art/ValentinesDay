// Single Page Application Router
const Router = (function() {
            // Private variables
            let currentPage = null;
            const pageContainer = document.getElementById('page-container');
            const navLinks = document.querySelectorAll('.nav-link');

            // Page templates
            const pageTemplates = {
                    // Welcome page is already in the HTML
                    welcome: null,

                    // Our Story page
                    story: function() {
                            const timelineEvents = AppState.getTimelineEvents();

                            return `
                <div class="story-page">
                    <div class="page-header animate-fadeInUp">
                        <h2 class="page-title">Our Story</h2>
                        <p class="page-subtitle">The beautiful journey of us</p>
                    </div>
                    
                    <div class="timeline-container">
                        ${timelineEvents.map((event, index) => `
                            <div class="timeline-item ${index % 2 === 0 ? 'left' : 'right'} animate-fadeInUp delay-${index % 4}">
                                <div class="timeline-content">
                                    <div class="timeline-icon">
                                        <i class="${event.icon}"></i>
                                    </div>
                                    <div class="timeline-date">${event.date}</div>
                                    <h3 class="timeline-title">${event.title}</h3>
                                    <p class="timeline-description">${event.description}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="story-quote animate-fadeInUp delay-4">
                        <i class="fas fa-quote-left"></i>
                        <p>The best love stories don't have endings; they have new beginnings every day.</p>
                        <i class="fas fa-quote-right"></i>
                    </div>
                </div>
            `;
        },
        
        // Why I Love You page
        love: function() {
            const loveReasons = AppState.getLoveReasons();
            
            return `
                <div class="love-page">
                    <div class="page-header animate-fadeInUp">
                        <h2 class="page-title">Why I Love You</h2>
                        <p class="page-subtitle">Just a few of the infinite reasons</p>
                    </div>
                    
                    <div class="love-cards-container">
                        ${loveReasons.map((reason, index) => `
                            <div class="love-card animate-fadeInUp delay-${index % 6}" data-id="${reason.id}">
                                <div class="card-icon">
                                    <i class="${reason.icon}"></i>
                                </div>
                                <h3 class="card-title">${reason.title}</h3>
                                <p class="card-description">${reason.description}</p>
                                <div class="card-heart">
                                    <i class="fas fa-heart"></i>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="love-message animate-fadeInUp delay-5">
                        <p>These are just a glimpse of why I love you. The truth is, I fall in love with you more every day, in a thousand different ways.</p>
                    </div>
                </div>
            `;
        },
        
        // Gallery page
        gallery: function() {
            const images = AppState.getImages();
            
            return `
                <div class="gallery-page">
                    <div class="page-header animate-fadeInUp">
                        <h2 class="page-title">Our Memories</h2>
                        <p class="page-subtitle">Moments I'll cherish forever</p>
                    </div>
                    
                    <div class="gallery-container">
                        ${images.map((image, index) => `
                            <div class="gallery-item animate-fadeInUp delay-${index % 6}" data-id="${image.id}">
                                <div class="image-placeholder" style="background-color: ${image.color};">
                                    <i class="fas fa-heart"></i>
                                    <span class="image-alt">${image.alt}</span>
                                </div>
                                <div class="image-overlay">
                                    <button class="view-image-btn" data-id="${image.id}">
                                        <i class="fas fa-expand"></i>
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="gallery-note animate-fadeInUp delay-5">
                        <p>Every memory with you is a treasure I keep close to my heart.</p>
                    </div>
                </div>
                
                <div id="image-modal" class="modal" aria-hidden="true">
                    <div class="modal-content">
                        <button class="modal-close" aria-label="Close modal">&times;</button>
                        <div class="modal-image">
                            <div class="modal-image-placeholder" id="modal-image-placeholder">
                                <i class="fas fa-heart"></i>
                            </div>
                        </div>
                        <div class="modal-info">
                            <h3 id="modal-title"></h3>
                            <p id="modal-description"></p>
                        </div>
                    </div>
                </div>
            `;
        },
        
        // Love Letter page
        letter: function() {
            const loveLetter = AppState.getLoveLetter();
            
            return `
                <div class="letter-page">
                    <div class="page-header animate-fadeInUp">
                        <h2 class="page-title">My Love Letter to You</h2>
                        <p class="page-subtitle">Words from my heart</p>
                    </div>
                    
                    <div class="letter-container animate-fadeInUp">
                        <div class="letter-paper">
                            <div class="letter-header">
                                <div class="letter-wax-seal">
                                    <i class="fas fa-heart"></i>
                                </div>
                                <div class="letter-date">February 14, 2024</div>
                            </div>
                            
                            <div class="letter-content">
                                <div class="letter-text" id="typewriter-text">${loveLetter}</div>
                            </div>
                            
                            <div class="letter-signature">
                                <p>With all my love,</p>
                                <div class="signature">Forever Yours</div>
                            </div>
                        </div>
                        
                        <div class="letter-controls">
                            <button class="letter-btn" id="readAloudBtn">
                                <i class="fas fa-volume-up"></i>
                                <span>Read Aloud</span>
                            </button>
                            <button class="letter-btn" id="typewriterBtn">
                                <i class="fas fa-keyboard"></i>
                                <span>Typewriter Effect</span>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        },
        
        // Final Surprise page
        surprise: function() {
            return `
                <div class="surprise-page">
                    <div class="page-header animate-fadeInUp">
                        <h2 class="page-title">My Forever Valentine</h2>
                        <p class="page-subtitle">The greatest surprise is you</p>
                    </div>
                    
                    <div class="surprise-content animate-fadeInUp delay-1">
                        <div class="surprise-heart">
                            <i class="fas fa-heart"></i>
                        </div>
                        
                        <div class="surprise-message">
                            <p>You are the most beautiful surprise life has given me.</p>
                            <p>Every day with you feels like Valentine's Day.</p>
                        </div>
                        
                        <div class="surprise-question">
                            <h3>Will you be my Valentine...</h3>
                            <div class="surprise-options">
                                <button class="surprise-option yes-option">
                                    <span>Yes, Forever!</span>
                                    <i class="fas fa-heart"></i>
                                </button>
                                <button class="surprise-option no-option">
                                    <span>Always and Always</span>
                                    <i class="fas fa-heart"></i>
                                </button>
                            </div>
                        </div>
                        
                        <div class="surprise-countdown">
                            <p>Our love story continues for</p>
                            <div class="countdown-timer">
                                <div class="countdown-item">
                                    <span class="countdown-number" id="days">∞</span>
                                    <span class="countdown-label">Days</span>
                                </div>
                                <div class="countdown-item">
                                    <span class="countdown-number" id="hours">∞</span>
                                    <span class="countdown-label">Hours</span>
                                </div>
                                <div class="countdown-item">
                                    <span class="countdown-number" id="minutes">∞</span>
                                    <span class="countdown-label">Minutes</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="easter-egg-hint animate-fadeInUp delay-3">
                        <p><i class="fas fa-lightbulb"></i> Hint: Click the heart 10 times for a special surprise!</p>
                    </div>
                </div>
            `;
        }
    };

    // Private methods
    function updateActiveNavLink(page) {
        navLinks.forEach(link => {
            if (link.getAttribute('data-page') === page) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    function createPageContent(page) {
        if (page === 'welcome') {
            // Welcome page is already in DOM, just show it
            return document.getElementById('welcome-page');
        }
        
        const template = pageTemplates[page];
        if (!template) {
            return createPageContent('welcome');
        }
        
        // Create new page element
        const pageElement = document.createElement('section');
        pageElement.className = 'page';
        pageElement.id = `${page}-page`;
        pageElement.setAttribute('data-page', page);
        pageElement.innerHTML = template();
        
        return pageElement;
    }

    function animatePageTransition(newPageElement) {
        // Hide current page with animation
        if (currentPage) {
            currentPage.style.opacity = '0';
            currentPage.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                currentPage.classList.remove('active');
                currentPage.style.display = 'none';
                
                // Show new page
                newPageElement.style.display = 'block';
                setTimeout(() => {
                    newPageElement.classList.add('active');
                    newPageElement.style.opacity = '1';
                    newPageElement.style.transform = 'translateY(0)';
                    currentPage = newPageElement;
                }, 50);
            }, 300);
        } else {
            // Initial page load
            newPageElement.style.display = 'block';
            newPageElement.classList.add('active');
            newPageElement.style.opacity = '1';
            newPageElement.style.transform = 'translateY(0)';
            currentPage = newPageElement;
        }
    }

    // Public API
    return {
        // Initialize router
        init: function() {
            // Get initial page from URL hash or default to welcome
            const hash = window.location.hash.substring(1) || 'welcome';
            this.navigateTo(hash);
            
            // Set up hash change listener
            window.addEventListener('hashchange', () => {
                const newHash = window.location.hash.substring(1) || 'welcome';
                this.navigateTo(newHash);
            });
            
            // Set up navigation link click handlers
            navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const page = link.getAttribute('data-page');
                    window.location.hash = page;
                });
            });
            
            // Set up mobile menu toggle
            const navToggle = document.querySelector('.nav-toggle');
            const navMenu = document.querySelector('.nav-menu');
            
            if (navToggle) {
                navToggle.addEventListener('click', () => {
                    navMenu.classList.toggle('active');
                    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
                    navToggle.setAttribute('aria-expanded', !isExpanded);
                });
            }
            
            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.main-nav') && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.setAttribute('aria-expanded', 'false');
                }
            });
        },
        
        // Navigate to specific page
        navigateTo: function(page) {
            // Update state
            AppState.setCurrentPage(page);
            
            // Update active nav link
            updateActiveNavLink(page);
            
            // Close mobile menu if open
            const navMenu = document.querySelector('.nav-menu');
            const navToggle = document.querySelector('.nav-toggle');
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
            
            // Check if page already exists in DOM
            let pageElement = document.getElementById(`${page}-page`);
            
            if (!pageElement) {
                // Create new page content
                pageElement = createPageContent(page);
                pageContainer.appendChild(pageElement);
            }
            
            // Animate page transition
            animatePageTransition(pageElement);
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        
        // Get current page
        getCurrentPage: function() {
            return AppState.getState().currentPage;
        }
    };
})();
// Application State Management
const AppState = (function() {
    // Private state
    let state = {
        currentPage: 'welcome',
        isMusicPlaying: false,
        visitedPages: new Set(['welcome']),
        loveReasons: [{
                id: 1,
                title: "Your Smile",
                description: "The way your smile lights up any room and makes my heart skip a beat.",
                icon: "fas fa-smile"
            },
            {
                id: 2,
                title: "Your Kindness",
                description: "How you always put others before yourself and show compassion to everyone.",
                icon: "fas fa-hands-helping"
            },
            {
                id: 3,
                title: "Your Laugh",
                description: "Your infectious laugh that I could listen to forever.",
                icon: "fas fa-laugh"
            },
            {
                id: 4,
                title: "Your Intelligence",
                description: "The way your mind works and how you see the world differently.",
                icon: "fas fa-brain"
            },
            {
                id: 5,
                title: "Your Strength",
                description: "How you face challenges with grace and determination.",
                icon: "fas fa-fist-raised"
            },
            {
                id: 6,
                title: "Your Support",
                description: "You always believe in me, even when I don't believe in myself.",
                icon: "fas fa-heart"
            }
        ],
        timelineEvents: [{
                id: 1,
                date: "The Day We Met",
                title: "First Glance",
                description: "I remember seeing you for the first time and feeling like everything else faded away.",
                icon: "fas fa-eye"
            },
            {
                id: 2,
                date: "First Date",
                title: "Ice cream & Conversation",
                description: "That Ice cream  date that lasted hours because we couldn't stop talking.",
                icon: "fas fa-ice cream"
            },
            {
                id: 3,
                date: "Second Date",
                title: "Ice cream & Conversation + Melva",
                description: "My first time of meeting one of your friends, It was a very special day for me.",
                icon: "fas fa-route"
            },
            {
                id: 4,
                date: "Our Fun and wonderful moments",
                title: "Growing Together",
                description: "All the little moments that added up to an incredible year of love.",
                icon: "fas fa-seedling"
            },
            {
                id: 5,
                date: "Today",
                title: "My Forever",
                description: "Every day with you feels like a beautiful new chapter in our story.",
                icon: "fas fa-infinity"
            }
        ],
        images: [
            { id: 1, alt: "Beautiful sunset", color: "#e63946" },
            { id: 2, alt: "Romantic dinner", color: "#f28482" },
            { id: 3, alt: "Adventure together", color: "#ffafcc" },
            { id: 4, alt: "Cozy moments", color: "#ffcad4" },
            { id: 5, alt: "Celebrating love", color: "#ff6b7c" },
            { id: 6, alt: "Future dreams", color: "#590d22" }
        ],
        loveLetter: `My Dearest Love,

From the moment I met you, my life changed in ways I never imagined possible. You brought color to my world, music to my silence, and meaning to my existence.

I love the way your eyes light up when you talk about things you're passionate about. I love how you laugh without holding back, how you care deeply about others, and how you always know exactly what to say to make me feel better.

Every day with you is a gift. Even the ordinary moments become extraordinary because I get to share them with you. Whether we're exploring new places or simply enjoying quiet time together, every second is precious.

You've shown me what true love means - it's in the small gestures, the thoughtful words, the unwavering support, and the deep connection that grows stronger with time.

On this Valentine's Day, I want to remind you that my love for you grows stronger with each passing day. You are my greatest adventure, my most beautiful dream, and my forever home.

With all my heart,
Forever Yours`
    };

    // Public API
    return {
        // Get current state
        getState: function() {
            return {...state };
        },

        // Set current page
        setCurrentPage: function(page) {
            state.currentPage = page;
            state.visitedPages.add(page);

            // Dispatch custom event for state change
            window.dispatchEvent(new CustomEvent('stateChange', {
                detail: { page: page }
            }));
        },

        // Toggle music state
        toggleMusic: function() {
            state.isMusicPlaying = !state.isMusicPlaying;
            return state.isMusicPlaying;
        },

        // Get music state
        getMusicState: function() {
            return state.isMusicPlaying;
        },

        // Check if page has been visited
        hasVisitedPage: function(page) {
            return state.visitedPages.has(page);
        },

        // Get love reasons
        getLoveReasons: function() {
            return [...state.loveReasons];
        },

        // Get timeline events
        getTimelineEvents: function() {
            return [...state.timelineEvents];
        },

        // Get images
        getImages: function() {
            return [...state.images];
        },

        // Get love letter
        getLoveLetter: function() {
            return state.loveLetter;
        }
    };
})();
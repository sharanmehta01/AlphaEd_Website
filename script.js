// Carousel functionality for Features and Testimonials
function createCarousel(carouselSelector, prevButtonSelector, nextButtonSelector, options = {}) {
    const defaults = {
        isAutomatic: false,
        itemsPerView: 1,
        autoRotateTime: 5000
    };
    
    const settings = { ...defaults, ...options };
    
    const carousel = document.querySelector(carouselSelector);
    const items = Array.from(carousel.querySelectorAll('.carousel-item'));

    // Clone first two items and append them to the end
    if (settings.itemsPerView === 3) {  // Only for features carousel
        const firstTwoItems = items.slice(0, 2).map(item => item.cloneNode(true));
        firstTwoItems.forEach(clone => carousel.appendChild(clone));
    }

    const allItems = Array.from(carousel.querySelectorAll('.carousel-item')); // Get updated list including clones
    const prevButton = document.querySelector(prevButtonSelector);
    const nextButton = document.querySelector(nextButtonSelector);
    let currentIndex = 0;
    let intervalId;

    // Initialize first items
    function initializeItems() {
        if (settings.itemsPerView === 1) {
            allItems[0].classList.add('active');
        } else {
            // Show first set of items
            for (let i = 0; i < settings.itemsPerView; i++) {
                if (allItems[i]) allItems[i].classList.add('active');
            }
        }
    }

    function showItems(startIndex) {
        allItems.forEach(item => item.classList.remove('active'));
        
        if (settings.itemsPerView === 1) {
            allItems[startIndex].classList.add('active');
        } else {
            // Show multiple items
            for (let i = 0; i < settings.itemsPerView; i++) {
                const index = (startIndex + i) % allItems.length;
                allItems[index].classList.add('active');
            }
        }
    }

    function nextItem() {
        currentIndex = (currentIndex + 1) % (allItems.length - (settings.itemsPerView - 1));
        showItems(currentIndex);
    }

    function prevItem() {
        currentIndex = (currentIndex - 1 + allItems.length) % allItems.length;
        showItems(currentIndex);
    }

    // Add click event listeners to buttons
    if (prevButton && nextButton) {
        prevButton.addEventListener('click', () => {
            prevItem();
            if (settings.isAutomatic) {
                clearInterval(intervalId);
                startAutoRotation();
            }
        });

        nextButton.addEventListener('click', () => {
            nextItem();
            if (settings.isAutomatic) {
                clearInterval(intervalId);
                startAutoRotation();
            }
        });
    }

    // Set up automatic rotation if specified
    function startAutoRotation() {
        intervalId = setInterval(nextItem, settings.autoRotateTime);
    }

    if (settings.isAutomatic) {
        startAutoRotation();

        // Pause rotation when hovering over carousel
        carousel.addEventListener('mouseenter', () => clearInterval(intervalId));
        carousel.addEventListener('mouseleave', startAutoRotation);
    }

    // Initialize the carousel
    initializeItems();
}

// Initialize carousels with different settings
document.addEventListener('DOMContentLoaded', () => {
    // Features carousel: 3 items per view, no auto-rotation
    createCarousel('.features-carousel', '#features-prev', '#features-next', {
        itemsPerView: 3,
        isAutomatic: true,
        autoRotateTime: 5000
    });
    
    // Testimonials carousel: 1 item per view, auto-rotate every 5 seconds
    createCarousel('.testimonials-carousel', '#testimonials-prev', '#testimonials-next', {
        itemsPerView: 1,
        isAutomatic: true,
        autoRotateTime: 5000
    });
});

// Contact Form Handler
document.getElementById('contact-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    // Add form submission logic here
});

// Newsletter Form Handler
document.getElementById('newsletter-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    // Add form submission logic here
});

// Mobile Navigation
document.addEventListener('DOMContentLoaded', function() {
    // Hamburger menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            const spans = this.getElementsByTagName('span');
            spans[0].classList.toggle('rotate-45');
            spans[1].classList.toggle('opacity-0');
            spans[2].classList.toggle('rotate-negative-45');
        });
    }

    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to clicked button and corresponding panel
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // FAQ functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                // Close other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                // Toggle current item
                item.classList.toggle('active');
            });
        }
    });
});

// Add these additional styles for hamburger animation
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    .rotate-45 {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .opacity-0 {
        opacity: 0;
    }
    
    .rotate-negative-45 {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    .hamburger span {
        transition: all 0.3s ease-in-out;
    }
`;
document.head.appendChild(styleSheet);

// Tab functionality for product page
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    if (tabButtons.length > 0 && tabPanels.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.getAttribute('data-tab');
                
                // Remove active class from all buttons and panels
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanels.forEach(panel => panel.classList.remove('active'));
                
                // Add active class to clicked button and corresponding panel
                button.classList.add('active');
                document.getElementById(targetTab).classList.add('active');
            });
        });
    }

    // FAQ functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                // Toggle current item
                item.classList.toggle('active');
            });
        }
    });
});

// Video Modal functionality
function openVideoModal(type) {
    const modal = document.getElementById('videoModal');
    const videoContainer = document.getElementById('videoContainer');
    
    if (!modal || !videoContainer) return;

    // Set video URL based on type (replace with actual video IDs)
    const videoUrl = type === 'demo' 
        ? 'https://www.youtube.com/embed/demo-video-id'
        : 'https://www.youtube.com/embed/live-demo-id';
    
    // Create and set iframe
    videoContainer.innerHTML = `
        <iframe 
            src="${videoUrl}" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
        </iframe>
    `;
    
    modal.style.display = 'block';
}

// Add event listeners for modal closing
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('videoModal');
    const closeBtn = document.querySelector('.close-modal');
    
    if (closeBtn && modal) {
        // Close modal with close button
        closeBtn.addEventListener('click', () => {
            const videoContainer = document.getElementById('videoContainer');
            if (videoContainer) videoContainer.innerHTML = '';
            modal.style.display = 'none';
        });

        // Close modal when clicking outside
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                const videoContainer = document.getElementById('videoContainer');
                if (videoContainer) videoContainer.innerHTML = '';
                modal.style.display = 'none';
            }
        });
    }
});

// Add this to your existing script.js
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the contact page
    const subjectSelect = document.getElementById('subject');
    if (subjectSelect) {
        // Get URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const subject = urlParams.get('subject');
        
        // If there's a subject parameter and it's 'demo', select the demo option
        if (subject === 'demo') {
            // Set the select value to 'demo'
            subjectSelect.value = 'demo';
            
            // Add visual feedback
            subjectSelect.style.borderColor = 'var(--primary-color)';
            setTimeout(() => {
                subjectSelect.style.borderColor = ''; // Reset border after animation
            }, 1000);

            // Log for debugging
            console.log('Demo selected:', subjectSelect.value);
            console.log('Selected index:', subjectSelect.selectedIndex);
        }
    }
});

// Add this to verify the select element is working properly
document.getElementById('subject')?.addEventListener('change', function() {
    console.log('Subject changed to:', this.value);
});

// Add this to the existing script.js
document.addEventListener('DOMContentLoaded', function() {
    // Check if we've already handled location permission in this session
    const locationHandled = sessionStorage.getItem('locationHandled');
    const locationPermission = localStorage.getItem('locationPermission');

    if (!locationHandled && locationPermission !== 'granted') {
        // Ask for location only if we haven't handled it this session
        // and don't have permanent permission
        navigator.geolocation.getCurrentPosition(
            function(position) {
                // Success - store permanent permission
                localStorage.setItem('locationPermission', 'granted');
                sessionStorage.setItem('locationHandled', 'true');
                
                // Update any location fields if they exist
                const locationField = document.getElementById('location');
                if (locationField) {
                    locationField.value = `Lat: ${position.coords.latitude}, Lon: ${position.coords.longitude}`;
                }
            },
            function(error) {
                // Error/Denied - store session handling
                sessionStorage.setItem('locationHandled', 'true');
                if (error.code === 1) { // Permission denied
                    console.log('Location permission denied');
                    const locationField = document.getElementById('location');
                    if (locationField) {
                        locationField.value = 'Location unavailable';
                    }
                }
            }
        );
    } else if (locationPermission === 'granted') {
        // If we already have permission, just get the location
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const locationField = document.getElementById('location');
                if (locationField) {
                    locationField.value = `Lat: ${position.coords.latitude}, Lon: ${position.coords.longitude}`;
                }
            }
        );
    }
});

// Add this to your existing script.js
document.addEventListener('DOMContentLoaded', function() {
    // Existing FAQ toggle functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const toggleBtn = item.querySelector('.toggle-icon');
        const answer = item.querySelector('.faq-answer');
        
        if (toggleBtn && answer) {
            toggleBtn.addEventListener('click', () => {
                // Toggle active class on the FAQ item
                item.classList.toggle('active');
                
                // Change the button text
                toggleBtn.textContent = item.classList.contains('active') ? '−' : '+';
                
                // Toggle the answer visibility with animation
                if (item.classList.contains('active')) {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                } else {
                    answer.style.maxHeight = '0';
                }
            });
        }
    });

    // New FAQ expansion functionality
    const expandButton = document.getElementById('expandFAQ');
    const faqContainer = document.querySelector('.faq-container');
    
    if (expandButton && faqContainer) {
        expandButton.addEventListener('click', function() {
            faqContainer.classList.toggle('expanded');
            
            // Update button text
            const buttonText = this.childNodes[0];
            if (faqContainer.classList.contains('expanded')) {
                buttonText.textContent = 'View Less ';
            } else {
                buttonText.textContent = 'View More FAQs ';
            }
            
            // Animate hidden FAQs
            const hiddenFAQs = document.querySelectorAll('.hidden-faq');
            hiddenFAQs.forEach((faq, index) => {
                if (faqContainer.classList.contains('expanded')) {
                    // Stagger the appearance of each FAQ
                    setTimeout(() => {
                        faq.style.opacity = '1';
                        faq.style.transform = 'translateY(0)';
                    }, index * 150);
                } else {
                    faq.style.opacity = '0';
                    faq.style.transform = 'translateY(20px)';
                }
            });
        });
    }
});

// Add this to your existing script.js
document.addEventListener('DOMContentLoaded', function() {
    const expandButton = document.getElementById('expandTeam');
    const teamGrid = document.querySelector('.team-grid');
    
    if (expandButton && teamGrid) {
        expandButton.addEventListener('click', function() {
            teamGrid.classList.toggle('expanded');
            
            // Update button text and arrow
            const buttonText = this.childNodes[0];
            if (teamGrid.classList.contains('expanded')) {
                buttonText.textContent = 'View Less ';
            } else {
                buttonText.textContent = 'View More Leaders ';
            }
            
            // Animate hidden members
            const hiddenMembers = document.querySelectorAll('.hidden-member');
            hiddenMembers.forEach((member, index) => {
                if (teamGrid.classList.contains('expanded')) {
                    // Stagger the appearance of each member
                    setTimeout(() => {
                        member.style.opacity = '1';
                        member.style.transform = 'translateY(0)';
                    }, index * 150);
                } else {
                    member.style.opacity = '0';
                    member.style.transform = 'translateY(20px)';
                }
            });
        });
    }
});

// Add this to handle form pre-filling from URL parameters
document.addEventListener('DOMContentLoaded', function() {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    
    // Handle subject pre-filling
    const subjectParam = urlParams.get('subject');
    if (subjectParam) {
        const subjectSelect = document.getElementById('subject');
        if (subjectSelect) {
            // Convert URL parameter to match option value format
            const formattedSubject = subjectParam.toLowerCase();
            
            // Find and select the matching option
            Array.from(subjectSelect.options).forEach(option => {
                if (option.value.toLowerCase() === formattedSubject) {
                    option.selected = true;
                    // Trigger any necessary form updates
                    subjectSelect.dispatchEvent(new Event('change'));
                }
            });
        }
    }
    
    // Handle other form fields if needed
    const formFields = ['name', 'email', 'organization', 'message'];
    formFields.forEach(field => {
        const fieldValue = urlParams.get(field);
        if (fieldValue) {
            const inputElement = document.getElementById(field);
            if (inputElement) {
                inputElement.value = fieldValue;
            }
        }
    });
});

// Add this to your existing script.js
document.addEventListener('DOMContentLoaded', function() {
    // Debug log to check if script is running
    console.log('Script loaded');

    const navToggle = document.getElementById('navToggle');
    const navWrapper = document.getElementById('navWrapper');
    
    // Debug log to check if elements are found
    console.log('Nav Toggle:', navToggle);
    console.log('Nav Wrapper:', navWrapper);

    if (navToggle && navWrapper) {
        navToggle.addEventListener('click', function() {
            console.log('Toggle clicked'); // Debug log
            navToggle.classList.toggle('active');
            navWrapper.classList.toggle('active');
            
            // Log the current state
            console.log('Nav Toggle classes:', navToggle.classList);
            console.log('Nav Wrapper classes:', navWrapper.classList);
        });
    }
});

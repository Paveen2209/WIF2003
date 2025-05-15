// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const body = document.body;

    // Create overlay element
    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    body.appendChild(overlay);

    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        overlay.classList.toggle('active');
        body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking overlay
    overlay.addEventListener('click', function() {
        nav.classList.remove('active');
        overlay.classList.remove('active');
        body.style.overflow = '';
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('nav') && !event.target.closest('.menu-toggle')) {
            nav.classList.remove('active');
            overlay.classList.remove('active');
            body.style.overflow = '';
        }
    });

    // Handle notifications page functionality
    if (window.location.pathname.includes('notifications.html')) {
        initNotificationsPage();
    }

    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('nav ul');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
        });
    }

    // Form validation
    const form = document.querySelector('.login-card-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const passwordC = document.getElementById('passwordC').value;
            const terms = document.getElementById('terms').checked;
            
            // Basic validation
            if (!username || !email || !password || !passwordC) {
                showError('Please fill in all fields');
                return;
            }
            
            if (password !== passwordC) {
                showError('Passwords do not match');
                return;
            }
            
            if (!terms) {
                showError('Please agree to the terms and conditions');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showError('Please enter a valid email address');
                return;
            }
            
            // Password strength validation
            if (password.length < 8) {
                showError('Password must be at least 8 characters long');
                return;
            }
            
            // If all validation passes, show loading state and submit
            const submitBtn = form.querySelector('.primary-btn');
            submitBtn.classList.add('loading');
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                submitBtn.classList.remove('loading');
                // Redirect to login page after successful registration
                window.location.href = 'Login.html';
            }, 1500);
        });
    }
});

function initNotificationsPage() {
    const notificationContainer = document.getElementById('notifications-container');
    const notificationMessage = document.getElementById('notification-message');
    
    if (!notificationContainer || !notificationMessage) return;
    
    // Add event listeners to all "Mark as Done" buttons
    const markDoneButtons = document.querySelectorAll('.mark-done-btn');
    markDoneButtons.forEach(button => {
        button.addEventListener('click', function() {
            const notificationCard = this.closest('.notification-card');
            const notificationTitle = notificationCard.querySelector('h3').textContent;
            
            // Add the removal animation class
            notificationCard.classList.add('removed');
            
            // Remove the card after animation completes
            setTimeout(() => {
                notificationCard.remove();
                
                // Check if there are no more notifications
                if (notificationContainer.children.length === 0) {
                    showMessage('All caught up! No more notifications.', 'success');
                }
            }, 500); // Same as animation duration
            
            showMessage(`"${notificationTitle}" marked as done!`, 'success');
        });
    });
    
    // Add event listeners to all "Snooze" buttons
    const snoozeButtons = document.querySelectorAll('.snooze-btn');
    snoozeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const notificationCard = this.closest('.notification-card');
            const notificationTitle = notificationCard.querySelector('h3').textContent;
            
            showMessage(`"${notificationTitle}" snoozed for 1 hour`, 'info');
        });
    });
    
    function showMessage(text, type = 'info') {
        notificationMessage.textContent = text;
        notificationMessage.className = 'notification-message show';
        
        if (type === 'success') {
            notificationMessage.style.backgroundColor = '#A5D6A7';
            notificationMessage.style.color = '#388E3C';
        } else if (type === 'info') {
            notificationMessage.style.backgroundColor = '#BBDEFB';
            notificationMessage.style.color = '#1976D2';
        }
        
        // Hide message after 3 seconds
        setTimeout(() => {
            notificationMessage.classList.remove('show');
        }, 3000);
    }
}

// Check URL for any hash links and scroll to them
function checkUrlForHash() {
    if (window.location.hash) {
        const targetElement = document.querySelector(window.location.hash);
        if (targetElement) {
            setTimeout(() => {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }
}

// Add smooth scrolling to all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId !== '#') {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Run this when the page loads
window.addEventListener('load', checkUrlForHash);

function showError(message) {
    // Remove any existing error message
    const existingError = document.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Create and show new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    const form = document.querySelector('.login-card-form');
    form.insertBefore(errorDiv, form.firstChild);
    
    // Remove error message after 3 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 3000);
}

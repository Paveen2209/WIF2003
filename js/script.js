// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');

    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('nav') && !event.target.closest('.menu-toggle')) {
            nav.classList.remove('active');
        }
    });

    // Handle notifications page functionality
    if (window.location.pathname.includes('notifications.html')) {
        initNotificationsPage();
    }
});

function initNotificationsPage() {
    const notificationContainer = document.getElementById('notifications-container');
    const notificationMessage = document.getElementById('notification-message');
    
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

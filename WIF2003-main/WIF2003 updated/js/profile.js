document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Profile picture change functionality
    const changeAvatarBtn = document.querySelector('.change-avatar-btn');
    const profilePicture = document.getElementById('profile-picture');

    changeAvatarBtn.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    profilePicture.src = e.target.result;
                    // Here you would typically upload the image to your server
                    showMessage('Profile picture updated successfully!', 'success');
                };
                reader.readAsDataURL(file);
            }
        };
        
        input.click();
    });

    // Form submission handling
    const profileForm = document.querySelector('.profile-form');
    if (profileForm) {
        profileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = {
                fullName: document.getElementById('full-name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                dob: document.getElementById('dob').value
            };

            // Here you would typically send this data to your server
            console.log('Form data:', formData);
            showMessage('Profile updated successfully!', 'success');
        });
    }

    // Settings toggle functionality
    const settingsToggles = document.querySelectorAll('.setting-item input[type="checkbox"]');
    settingsToggles.forEach(toggle => {
        toggle.addEventListener('change', (e) => {
            const settingName = e.target.closest('.setting-item').querySelector('label').textContent;
            const isEnabled = e.target.checked;
            
            // Here you would typically update the setting on your server
            console.log(`${settingName} ${isEnabled ? 'enabled' : 'disabled'}`);
            showMessage(`${settingName} ${isEnabled ? 'enabled' : 'disabled'}`, 'info');
        });
    });

    // Delete account functionality
    const deleteAccountBtn = document.querySelector('.danger-btn');
    if (deleteAccountBtn) {
        deleteAccountBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                // Here you would typically send a request to delete the account
                console.log('Account deletion requested');
                showMessage('Account deletion request sent. Please check your email for confirmation.', 'info');
            }
        });
    }
});

// Message display functionality
function showMessage(text, type = 'info') {
    // Create message element if it doesn't exist
    let messageElement = document.querySelector('.profile-message');
    if (!messageElement) {
        messageElement = document.createElement('div');
        messageElement.className = 'profile-message';
        document.querySelector('.profile-container').prepend(messageElement);
    }

    // Set message content and style
    messageElement.textContent = text;
    messageElement.className = 'profile-message show';
    
    if (type === 'success') {
        messageElement.style.backgroundColor = '#A5D6A7';
        messageElement.style.color = '#388E3C';
    } else if (type === 'info') {
        messageElement.style.backgroundColor = '#BBDEFB';
        messageElement.style.color = '#1976D2';
    }

    // Hide message after 3 seconds
    setTimeout(() => {
        messageElement.classList.remove('show');
    }, 3000);
}

// Add message styles to the page
const style = document.createElement('style');
style.textContent = `
    .profile-message {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow);
        z-index: 1000;
        opacity: 0;
        transform: translateY(-20px);
        transition: all 0.3s ease;
    }

    .profile-message.show {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style); 
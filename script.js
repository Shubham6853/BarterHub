// Page Navigation
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
    window.scrollTo(0, 0);
}

// Tab Navigation
function showTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.getElementById(tabId).classList.add('active');
}

// Admin Tab Navigation
function showAdminTab(tabId) {
    // Update tab buttons
    document.querySelectorAll('#admin .flex button').forEach(btn => {
        btn.classList.remove('border-primary-600', 'text-primary-600');
        btn.classList.add('text-gray-500', 'dark:text-gray-400');
    });
    event.target.classList.remove('text-gray-500', 'dark:text-gray-400');
    event.target.classList.add('border-primary-600', 'text-primary-600');
    
    // Show selected tab content
    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.classList.add('hidden');
    });
    document.getElementById(`admin-${tabId}`).classList.remove('hidden');
}

// Profile Tab Navigation
function showProfileTab(tabId) {
    document.querySelectorAll('.profile-tab').forEach(tab => {
        tab.classList.add('hidden');
    });
    document.getElementById(tabId + '-tab').classList.remove('hidden');
}

// Settings Tab Navigation
function showSettingsTab(tabId) {
    document.querySelectorAll('.settings-tab').forEach(tab => {
        tab.classList.add('hidden');
    });
    document.getElementById(tabId + '-settings').classList.remove('hidden');
}

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

if (localStorage.getItem('theme') === 'dark') {
    html.classList.add('dark');
}

themeToggle.addEventListener('click', () => {
    html.classList.toggle('dark');
    localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
});

// User Dropdown
const userMenu = document.getElementById('user-menu');
const userDropdown = document.getElementById('user-dropdown');

userMenu.addEventListener('click', (e) => {
    e.stopPropagation();
    userDropdown.classList.toggle('hidden');
});

document.addEventListener('click', (e) => {
    if (!userMenu.contains(e.target)) {
        userDropdown.classList.add('hidden');
    }
});

// Toast Notification
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    const bgColor = type === 'success' ? 'bg-green-600' : type === 'error' ? 'bg-red-600' : 'bg-blue-600';
    toast.className = `fixed bottom-4 right-4 px-6 py-3 ${bgColor} text-white rounded-lg shadow-lg transform translate-y-20 opacity-0 transition duration-300 z-50`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.remove('translate-y-20', 'opacity-0');
        toast.classList.add('translate-y-0', 'opacity-100');
    }, 100);
    
    setTimeout(() => {
        toast.classList.add('translate-y-20', 'opacity-0');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Image Upload Preview
function handleImageUpload(event) {
    const files = event.target.files;
    const previewContainer = document.getElementById('image-preview');
    previewContainer.innerHTML = '';
    
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            previewContainer.appendChild(img);
        }
        
        reader.readAsDataURL(file);
    }
}

// Wishlist Toggle
function toggleWishlist(button) {
    const heart = button.querySelector('i');
    heart.classList.toggle('far');
    heart.classList.toggle('fas');
    heart.classList.toggle('text-red-500');
    
    const message = heart.classList.contains('fas') ? 
        'Added to wishlist!' : 'Removed from wishlist!';
    showToast(message);
}

// Chat Functionality
function openChat(chatId) {
    document.querySelectorAll('.chat-list > div').forEach(chat => {
        chat.classList.remove('active-chat');
    });
    event.currentTarget.classList.add('active-chat');
    showToast(`Opening chat ${chatId}`, 'info');
}

function sendMessage() {
    const input = document.getElementById('message-input');
    const message = input.value.trim();
    
    if (message) {
        const chatMessages = document.getElementById('chat-messages');
        
        const messageDiv = document.createElement('div');
        messageDiv.className = 'flex mb-4 justify-end';
        messageDiv.innerHTML = `
            <div>
                <div class="bg-primary-500 text-white p-4 rounded-lg chat-bubble sent">
                    <p>${message}</p>
                </div>
                <p class="text-xs text-gray-500 mt-1 text-right">Just now</p>
            </div>
            <div class="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 ml-2 mt-1"></div>
        `;
        
        chatMessages.appendChild(messageDiv);
        input.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        setTimeout(() => {
            const replyDiv = document.createElement('div');
            replyDiv.className = 'flex mb-4';
            replyDiv.innerHTML = `
                <div class="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 mr-2 mt-1"></div>
                <div>
                    <div class="bg-white dark:bg-gray-800 p-4 rounded-lg chat-bubble received">
                        <p>Thanks for your message! I'll get back to you soon.</p>
                    </div>
                    <p class="text-xs text-gray-500 mt-1">Just now</p>
                </div>
            `;
            
            chatMessages.appendChild(replyDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 2000);
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function attachFile() {
    showToast('File attachment feature coming soon!', 'info');
}

// Trade Actions
function acceptTrade(tradeId) {
    showToast(`Trade #${tradeId} accepted! Starting verification process...`);
    closeTradeDetailsModal();
    showPage('proposals');
    showTab('verification');
}

function declineTrade(tradeId) {
    showToast(`Trade #${tradeId} declined`);
    closeTradeDetailsModal();
}

function submitTradeProposal() {
    showToast('Trade proposal sent successfully!');
    closeTradeModal();
}

// Item Actions
function editItem(itemId) {
    showToast(`Editing item #${itemId}`, 'info');
    showPage('add-item');
}

function deleteItem(itemId) {
    if (confirm('Are you sure you want to delete this item?')) {
        showToast(`Item #${itemId} deleted`);
    }
}

// Settings Actions
function saveSettings() {
    showToast('Account settings saved successfully!');
}

function changePassword() {
    showToast('Password updated successfully!');
}

function enable2FA() {
    showToast('Two-factor authentication enabled!');
}

function saveNotificationSettings() {
    showToast('Notification preferences saved!');
}

function saveProfile() {
    showToast('Profile updated successfully!');
    closeEditProfile();
}

function changeProfilePhoto() {
    showToast('Profile photo updated!');
}

function reportItem() {
    showToast('Item reported. Our team will review it shortly.');
}

function shareItem() {
    showToast('Item link copied to clipboard!');
}

function applyFilters() {
    showToast('Filters applied successfully!');
}

function sortItems(value) {
    showToast(`Sorted by: ${value}`, 'info');
}

// Modal Functions
function showTradeModal() {
    document.getElementById('trade-modal').classList.remove('hidden');
}

function closeTradeModal() {
    document.getElementById('trade-modal').classList.add('hidden');
}

function showEditProfile() {
    document.getElementById('edit-profile-modal').classList.remove('hidden');
}

function closeEditProfile() {
    document.getElementById('edit-profile-modal').classList.add('hidden');
}

function showTradeDetails(tradeId) {
    document.getElementById('trade-details-modal').classList.remove('hidden');
}

function closeTradeDetailsModal() {
    document.getElementById('trade-details-modal').classList.add('hidden');
}

function showVerificationDetails(verificationId) {
    document.getElementById('verification-details-modal').classList.remove('hidden');
}

function closeVerificationDetailsModal() {
    document.getElementById('verification-details-modal').classList.add('hidden');
}

// Video Verification Functionality
let mediaRecorder;
let recordedChunks = [];
let stream;

async function initVideoVerification() {
    try {
        stream = await navigator.mediaDevices.getUserMedia({ 
            video: true, 
            audio: true 
        });
        const video = document.getElementById('verification-video');
        video.srcObject = stream;
        
        const startBtn = document.getElementById('start-record-btn');
        const stopBtn = document.getElementById('stop-record-btn');
        const retakeBtn = document.getElementById('retake-btn');
        const submitBtn = document.getElementById('submit-verification-btn');
        
        startBtn.addEventListener('click', startRecording);
        stopBtn.addEventListener('click', stopRecording);
        retakeBtn.addEventListener('click', retakeVideo);
        submitBtn.addEventListener('click', submitVerification);
        
    } catch (err) {
        console.error('Error accessing camera:', err);
        showToast('Unable to access camera. Please check permissions.', 'error');
    }
}

function startRecording() {
    recordedChunks = [];
    
    mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm'
    });
    
    mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
            recordedChunks.push(event.data);
        }
    };
    
    mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        
        const recordedVideo = document.getElementById('recorded-video');
        recordedVideo.src = url;
        
        document.getElementById('verification-video').classList.add('hidden');
        document.getElementById('recorded-video-container').classList.remove('hidden');
        document.getElementById('submit-verification-btn').disabled = false;
    };
    
    mediaRecorder.start();
    
    document.getElementById('start-record-btn').classList.add('hidden');
    document.getElementById('stop-record-btn').classList.remove('hidden');
    
    showToast('Recording started', 'info');
}

function stopRecording() {
    mediaRecorder.stop();
    
    document.getElementById('stop-record-btn').classList.add('hidden');
    document.getElementById('retake-btn').classList.remove('hidden');
    
    showToast('Recording stopped', 'info');
}

function retakeVideo() {
    recordedChunks = [];
    
    document.getElementById('verification-video').classList.remove('hidden');
    document.getElementById('recorded-video-container').classList.add('hidden');
    document.getElementById('retake-btn').classList.add('hidden');
    document.getElementById('start-record-btn').classList.remove('hidden');
    document.getElementById('submit-verification-btn').disabled = true;
    
    showToast('Ready to record again', 'info');
}

function submitVerification() {
    if (recordedChunks.length === 0) {
        showToast('Please record a verification video first', 'error');
        return;
    }
    
    showToast('Verification video submitted successfully!');
    
    setTimeout(() => {
        showPage('proposals');
        showTab('verification');
    }, 1500);
}

// Authentication System
let currentUser = null;

// Demo users database
const users = {
    'admin@barterhub.com': {
        password: 'admin123',
        role: 'admin',
        name: 'Admin User',
        email: 'admin@barterhub.com'
    },
    'user@barterhub.com': {
        password: 'user123',
        role: 'user',
        name: 'Shubham gupta',
        email: 'user@barterhub.com'
    }
};

// Check if user is logged in on page load
function checkAuth() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateUIForLoggedInUser();
    } else {
        showPage('login');
    }
}

// Handle Login
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // Check credentials
    if (users[email] && users[email].password === password) {
        currentUser = users[email];
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        showToast(`Welcome back, ${currentUser.name}!`);
        updateUIForLoggedInUser();
        
        // Redirect based on role
        if (currentUser.role === 'admin') {
            showPage('admin');
        } else {
            showPage('home');
        }
    } else {
        showToast('Invalid email or password', 'error');
    }
}

// Handle Signup
function handleSignup(event) {
    event.preventDefault();
    
    const fullname = document.getElementById('fullname').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;
    
    // Validate passwords match
    if (password !== confirmPassword) {
        showToast('Passwords do not match', 'error');
        return;
    }
    
    // Check if user already exists
    if (users[email]) {
        showToast('Email already registered', 'error');
        return;
    }
    
    // Create new user
    users[email] = {
        password: password,
        role: 'user',
        name: fullname,
        email: email
    };
    
    currentUser = users[email];
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    showToast('Account created successfully!');
    updateUIForLoggedInUser();
    showPage('home');
}

// Handle Logout
function handleLogout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    showToast('Logged out successfully');
    showPage('login');
    updateUIForLoggedInUser();
}

// Update UI based on user authentication
function updateUIForLoggedInUser() {
    const userNameDisplay = document.querySelector('#user-menu span');
    const userInitials = document.querySelector('#user-menu .rounded-full span');
    const adminLink = document.getElementById('admin-link');
    
    if (currentUser) {
        // Update user display
        if (userNameDisplay) {
            userNameDisplay.textContent = currentUser.name;
        }
        
        if (userInitials) {
            const initials = currentUser.name.split(' ').map(n => n[0]).join('');
            userInitials.textContent = initials;
        }
        
        // Show/hide admin link based on role
        if (adminLink) {
            if (currentUser.role === 'admin') {
                adminLink.style.display = 'block';
            } else {
                adminLink.style.display = 'none';
            }
        }
        
        // Update logout link to call handleLogout
        const logoutLink = document.querySelector('a[onclick*="login"]');
        if (logoutLink) {
            logoutLink.onclick = function(e) {
                e.preventDefault();
                handleLogout();
            };
        }
    } else {
        // Hide admin link for non-logged in users
        if (adminLink) {
            adminLink.style.display = 'none';
        }
    }
}

// Check auth before showing protected pages
function showPageWithAuth(pageId) {
    // Public pages that don't require authentication
    const publicPages = ['login', 'signup'];
    
    if (!publicPages.includes(pageId) && !currentUser) {
        showToast('Please login to access this page', 'error');
        showPage('login');
        return;
    }
    
    // Check if trying to access admin page without admin role
    if (pageId === 'admin' && currentUser?.role !== 'admin') {
        showToast('Access denied. Admin privileges required.', 'error');
        showPage('home');
        return;
    }
    
    showPage(pageId);
}

// Override original showPage function to include auth check
const originalShowPage = showPage;
showPage = function(pageId) {
    showPageWithAuth(pageId);
};

// Modified original showPage function (keep the navigation logic)
function showPageWithAuth(pageId) {
    // Public pages that don't require authentication
    const publicPages = ['login', 'signup'];
    
    if (!publicPages.includes(pageId) && !currentUser) {
        showToast('Please login to access this page', 'error');
        originalShowPage('login');
        return;
    }
    
    // Check if trying to access admin page without admin role
    if (pageId === 'admin' && currentUser?.role !== 'admin') {
        showToast('Access denied. Admin privileges required.', 'error');
        originalShowPage('home');
        return;
    }
    
    originalShowPage(pageId);
}

// Initialize auth on page load
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    
    // Attach login form handler
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Attach signup form handler
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
});

// Session management - logout after 30 minutes of inactivity
let inactivityTimeout;

function resetInactivityTimeout() {
    clearTimeout(inactivityTimeout);
    if (currentUser) {
        inactivityTimeout = setTimeout(() => {
            showToast('Session expired due to inactivity', 'error');
            handleLogout();
        }, 30 * 60 * 1000); // 30 minutes
    }
}

// Reset timeout on user activity
document.addEventListener('mousemove', resetInactivityTimeout);
document.addEventListener('keypress', resetInactivityTimeout);
document.addEventListener('click', resetInactivityTimeout);
document.addEventListener('scroll', resetInactivityTimeout);

// User profile management
function getCurrentUserProfile() {
    return currentUser;
}

function updateUserProfile(updates) {
    if (currentUser) {
        currentUser = { ...currentUser, ...updates };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        users[currentUser.email] = currentUser;
        updateUIForLoggedInUser();
        return true;
    }
    return false;
}

// Export functions for use in other parts of the app
window.authSystem = {
    getCurrentUser: () => currentUser,
    isLoggedIn: () => currentUser !== null,
    isAdmin: () => currentUser?.role === 'admin',
    logout: handleLogout,
    getProfile: getCurrentUserProfile,
    updateProfile: updateUserProfile
};

// Admin Panel Functions
function viewUser(userId) {
    showToast(`Viewing user #${userId}`, 'info');
}

function suspendUser(userId) {
    if (confirm('Are you sure you want to suspend this user?')) {
        showToast(`User #${userId} suspended`);
    }
}

function deleteUser(userId) {
    if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
        showToast(`User #${userId} deleted`, 'error');
    }
}

function approveItem(itemId) {
    showToast(`Item #${itemId} approved`);
}

function rejectItem(itemId) {
    if (confirm('Are you sure you want to reject this item?')) {
        showToast(`Item #${itemId} rejected`, 'error');
    }
}

function viewTrade(tradeId) {
    showToast(`Viewing trade #${tradeId}`, 'info');
}

function investigateReport(reportId) {
    showToast(`Investigating report #${reportId}`, 'info');
}

function dismissReport(reportId) {
    if (confirm('Are you sure you want to dismiss this report?')) {
        showToast(`Report #${reportId} dismissed`);
    }
}

function approveVerification(verificationId) {
    showToast(`Verification ${verificationId} approved. Items will be shipped.`);
}

function rejectVerification(verificationId) {
    if (confirm('Are you sure you want to reject this verification? Both parties will be notified.')) {
        showToast(`Verification ${verificationId} rejected`, 'error');
    }
}

// Form Submissions
document.addEventListener('DOMContentLoaded', function() {
    // Login Form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('Login successful!');
            showPage('home');
        });
    }
    
    // Signup Form
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('Account created successfully!');
            showPage('home');
        });
    }
    
    // Item Form
    const itemForm = document.getElementById('item-form');
    if (itemForm) {
        itemForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('Item listed successfully!');
            showPage('home');
        });
    }
    
    // Initialize profile tab
    showProfileTab('about');

    // SIMPLIFIED WORKING PROFILE SYSTEM

// Update preview display in real-time
function updatePreviewDisplay() {
    const firstname = document.getElementById('edit-firstname')?.value || '';
    const lastname = document.getElementById('edit-lastname')?.value || '';
    const fullname = `${firstname} ${lastname}`.trim();
    const bio = document.getElementById('edit-bio')?.value || '';
    const email = document.getElementById('edit-email')?.value || '';
    const phone = document.getElementById('edit-phone')?.value || '';
    const city = document.getElementById('edit-city')?.value || '';
    const state = document.getElementById('edit-state')?.value || '';
    
    // Update all preview elements
    const els = {
        'preview-name': fullname || 'Your Name',
        'preview-initials': fullname.split(' ').map(n => n[0]).join('').toUpperCase() || 'UN',
        'preview-location': `${city}, ${state}` || 'Your Location',
        'preview-bio': bio || 'Tell us about yourself...',
        'preview-email': email || 'your@email.com',
        'preview-phone': phone || 'Not provided'
    };
    
    Object.keys(els).forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = els[id];
    });
    
    // Update header
    const headerName = document.querySelector('#user-menu span:not(.font-semibold)');
    if (headerName) headerName.textContent = fullname;
    
    const headerInitials = document.querySelector('#user-menu .font-semibold');
    if (headerInitials) headerInitials.textContent = fullname.split(' ').map(n => n[0]).join('').toUpperCase() || 'UN';
    
    // Trigger auto-save
    triggerProfileAutoSave();
}

// Bio character count
function updateBioCount(textarea) {
    const counter = document.getElementById('bio-count');
    if (counter) {
        const len = textarea.value.length;
        const max = textarea.maxLength || 200;
        counter.textContent = `${len}/${max}`;
        counter.className = len > max * 0.9 ? 'text-xs text-red-500' : 'text-xs text-gray-500 dark:text-gray-400';
    }
}

// Auto-save indicator
let profileAutoSaveTimeout;
function triggerProfileAutoSave() {
    const indicator = document.getElementById('autosave-indicator');
    const text = document.getElementById('autosave-text');
    
    if (indicator) {
        indicator.className = 'w-2 h-2 rounded-full bg-yellow-500 animate-pulse';
    }
    if (text) text.textContent = 'Saving...';
    
    clearTimeout(profileAutoSaveTimeout);
    profileAutoSaveTimeout = setTimeout(() => {
        saveToLocalStorage();
        if (indicator) indicator.className = 'w-2 h-2 rounded-full bg-green-500';
        if (text) text.textContent = 'Saved';
    }, 1000);
}

// Save to localStorage
function saveToLocalStorage() {
    const data = {
        firstname: document.getElementById('edit-firstname')?.value,
        lastname: document.getElementById('edit-lastname')?.value,
        bio: document.getElementById('edit-bio')?.value,
        email: document.getElementById('edit-email')?.value,
        phone: document.getElementById('edit-phone')?.value,
        city: document.getElementById('edit-city')?.value,
        state: document.getElementById('edit-state')?.value,
        zipcode: document.getElementById('edit-zipcode')?.value
    };
    
    localStorage.setItem('userProfile', JSON.stringify(data));
    
    // Update auth system if available
    if (window.authSystem && window.authSystem.updateProfile) {
        window.authSystem.updateProfile({
            name: `${data.firstname} ${data.lastname}`,
            email: data.email
        });
    }
}

// Load from localStorage
function loadFromLocalStorage() {
    const saved = localStorage.getItem('userProfile');
    if (saved) {
        try {
            const data = JSON.parse(saved);
            if (document.getElementById('edit-firstname')) document.getElementById('edit-firstname').value = data.firstname || 'John';
            if (document.getElementById('edit-lastname')) document.getElementById('edit-lastname').value = data.lastname || 'Doe';
            if (document.getElementById('edit-bio')) {
                document.getElementById('edit-bio').value = data.bio || "I'm an avid collector of vintage items and tech gadgets.";
                updateBioCount(document.getElementById('edit-bio'));
            }
            if (document.getElementById('edit-email')) document.getElementById('edit-email').value = data.email || 'john.doe@example.com';
            if (document.getElementById('edit-phone')) document.getElementById('edit-phone').value = data.phone || '(555) 123-4567';
            if (document.getElementById('edit-city')) document.getElementById('edit-city').value = data.city || 'San Francisco';
            if (document.getElementById('edit-state')) document.getElementById('edit-state').value = data.state || 'CA';
            if (document.getElementById('edit-zipcode')) document.getElementById('edit-zipcode').value = data.zipcode || '94102';
            
            updatePreviewDisplay();
        } catch (e) {
            console.error('Error loading profile:', e);
        }
    } else {
        // Set defaults if no saved data
        setTimeout(() => {
            updatePreviewDisplay();
            const bioEl = document.getElementById('edit-bio');
            if (bioEl) updateBioCount(bioEl);
        }, 100);
    }
    
    // Load avatar
    const avatar = localStorage.getItem('userAvatar');
    if (avatar) {
        const previewAvatar = document.getElementById('preview-avatar');
        const previewInitials = document.getElementById('preview-initials');
        if (previewAvatar && previewInitials) {
            previewInitials.style.display = 'none';
            previewAvatar.style.backgroundImage = `url(${avatar})`;
            previewAvatar.style.backgroundSize = 'cover';
            previewAvatar.style.backgroundPosition = 'center';
        }
    }
    
    // Load cover
    const cover = localStorage.getItem('userCover');
    if (cover) {
        const coverEl = document.getElementById('profile-cover');
        if (coverEl) {
            coverEl.style.backgroundImage = `url(${cover})`;
            coverEl.style.backgroundSize = 'cover';
            coverEl.style.backgroundPosition = 'center';
            coverEl.className = 'h-32 relative';
        }
    }
}

// Handle avatar upload
function handleAvatarUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
        showToast('Please upload an image file', 'error');
        return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
        showToast('Image must be less than 5MB', 'error');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        localStorage.setItem('userAvatar', e.target.result);
        
        const previewAvatar = document.getElementById('preview-avatar');
        const previewInitials = document.getElementById('preview-initials');
        if (previewAvatar && previewInitials) {
            previewInitials.style.display = 'none';
            previewAvatar.style.backgroundImage = `url(${e.target.result})`;
            previewAvatar.style.backgroundSize = 'cover';
            previewAvatar.style.backgroundPosition = 'center';
        }
        
        showToast('Profile photo updated!');
    };
    reader.readAsDataURL(file);
}

// Change cover photo
function changeCoverPhoto() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        if (file.size > 5 * 1024 * 1024) {
            showToast('Image must be less than 5MB', 'error');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(event) {
            localStorage.setItem('userCover', event.target.result);
            
            const coverEl = document.getElementById('profile-cover');
            if (coverEl) {
                coverEl.style.backgroundImage = `url(${event.target.result})`;
                coverEl.style.backgroundSize = 'cover';
                coverEl.style.backgroundPosition = 'center';
                coverEl.className = 'h-32 relative';
            }
            
            showToast('Cover photo updated!');
        };
        reader.readAsDataURL(file);
    };
    input.click();
}

// Save profile changes (form submission)
function saveProfileChanges(event) {
    event.preventDefault();
    saveToLocalStorage();
    showToast('Profile saved successfully!');
    return false;
}

// Reset form
function resetProfileForm() {
    if (confirm('Reset all changes to defaults?')) {
        localStorage.removeItem('userProfile');
        localStorage.removeItem('userAvatar');
        localStorage.removeItem('userCover');
        
        // Reset to defaults
        if (document.getElementById('edit-firstname')) document.getElementById('edit-firstname').value = 'John';
        if (document.getElementById('edit-lastname')) document.getElementById('edit-lastname').value = 'Doe';
        if (document.getElementById('edit-bio')) document.getElementById('edit-bio').value = "I'm an avid collector of vintage items and tech gadgets.";
        if (document.getElementById('edit-email')) document.getElementById('edit-email').value = 'john.doe@example.com';
        if (document.getElementById('edit-phone')) document.getElementById('edit-phone').value = '(555) 123-4567';
        if (document.getElementById('edit-city')) document.getElementById('edit-city').value = 'San Francisco';
        if (document.getElementById('edit-state')) document.getElementById('edit-state').value = 'CA';
        if (document.getElementById('edit-zipcode')) document.getElementById('edit-zipcode').value = '94102';
        
        updatePreviewDisplay();
        
        // Reset avatar
        const previewInitials = document.getElementById('preview-initials');
        const previewAvatar = document.getElementById('preview-avatar');
        if (previewInitials) previewInitials.style.display = 'block';
        if (previewAvatar) {
            previewAvatar.style.backgroundImage = '';
            previewAvatar.style.backgroundSize = '';
            previewAvatar.style.backgroundPosition = '';
        }
        
        // Reset cover
        const coverEl = document.getElementById('profile-cover');
        if (coverEl) {
            coverEl.className = 'bg-gradient-to-r from-primary-500 to-secondary-500 h-32 relative';
            coverEl.style.backgroundImage = '';
        }
        
        showToast('Form reset to defaults');
    }
}

// Initialize profile when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Watch for profile page becoming active
    const profileObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.target.id === 'profile' && mutation.target.classList.contains('active')) {
                loadFromLocalStorage();
            }
        });
    });
    
    const profilePage = document.getElementById('profile');
    if (profilePage) {
        profileObserver.observe(profilePage, { 
            attributes: true, 
            attributeFilter: ['class'] 
        });
    }
});

// Reset form
function resetForm() {
    if (confirm('Are you sure you want to reset all changes?')) {
        localStorage.removeItem('userProfile');
        localStorage.removeItem('userAvatar');
        localStorage.removeItem('userCover');
        
        // Reset to defaults
        profileData = {
            firstname: 'John',
            lastname: 'Doe',
            bio: "I'm an avid collector of vintage items and tech gadgets. Love trading items that I no longer use for something new and exciting.",
            email: 'john.doe@example.com',
            phone: '(555) 123-4567',
            city: 'San Francisco',
            state: 'CA',
            zipcode: '94102',
            facebook: '',
            twitter: '',
            instagram: '',
            tradeRadius: '10',
            avatar: null,
            cover: null,
            joined: 'January 2023'
        };
        
        loadProfileFromStorage();
        showToast('Form reset to default values');
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize profile data
    initializeProfileData();
    
    // Handle form submission
    const profileForm = document.getElementById('profile-edit-form');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveProfileToStorage();
            showToast('Profile updated successfully!');
            
            // Optional: Stay on profile page instead of navigating away
            setTimeout(() => {
                updateAllProfileDisplays();
            }, 500);
        });
    }
    
    // Watch for profile page activation
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.target.id === 'profile' && mutation.target.classList.contains('active')) {
                loadProfileFromStorage();
            }
        });
    });
    
    const profilePage = document.getElementById('profile');
    if (profilePage) {
        observer.observe(profilePage, { attributes: true, attributeFilter: ['class'] });
    }
    
    // Initialize character count
    setTimeout(() => {
        const bioTextarea = document.getElementById('edit-bio');
        if (bioTextarea) {
            updateCharCount(bioTextarea, 'bio-count');
        }
    }, 100);
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    const profilePage = document.getElementById('profile');
    if (profilePage && profilePage.classList.contains('active')) {
        // Ctrl/Cmd + S to save
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            saveProfileToStorage();
            showToast('Profile saved!', 'success');
        }
        
        // Ctrl/Cmd + R to reset
        if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
            e.preventDefault();
            resetForm();
        }
    }
});

// Export/Import functions
function exportProfile() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(profileData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "barterhub_profile.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Profile data exported!');
}

function importProfile() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                try {
                    const imported = JSON.parse(event.target.result);
                    profileData = { ...profileData, ...imported };
                    localStorage.setItem('userProfile', JSON.stringify(profileData));
                    loadProfileFromStorage();
                    showToast('Profile data imported successfully!');
                } catch (error) {
                    showToast('Invalid profile data file', 'error');
                }
            };
            reader.readAsText(file);
        }
    };
    input.click();
}

// Reset form to original values
function resetForm() {
    if (confirm('Are you sure you want to reset all changes?')) {
        // Clear localStorage
        localStorage.removeItem('userProfile');
        
        // Reload default values
        if (window.authSystem && window.authSystem.isLoggedIn()) {
            const currentUser = window.authSystem.getCurrentUser();
            const nameParts = currentUser.name.split(' ');
            
            document.getElementById('edit-firstname').value = nameParts[0] || '';
            document.getElementById('edit-lastname').value = nameParts.slice(1).join(' ') || '';
            document.getElementById('edit-email').value = currentUser.email || '';
            document.getElementById('edit-bio').value = 'I\'m an avid collector of vintage items and tech gadgets. Love trading items that I no longer use for something new and exciting.';
            document.getElementById('edit-phone').value = '(555) 123-4567';
            document.getElementById('edit-city').value = 'San Francisco';
            document.getElementById('edit-state').value = 'CA';
            document.getElementById('edit-zipcode').value = '94102';
            
            updatePreview();
            showToast('Form reset to default values');
        }
    }
}

// Handle form submission
document.addEventListener('DOMContentLoaded', function() {
    const profileForm = document.getElementById('profile-edit-form');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Save final data
            saveProfileToStorage();
            
            // Show success message
            showToast('Profile updated successfully!');
            
            // Optional: redirect to view profile
            setTimeout(() => {
                showPage('profile');
            }, 1500);
        });
    }
    
    // Load saved profile when profile page is shown
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.target.id === 'profile' && mutation.target.classList.contains('active')) {
                loadProfileFromStorage();
                
                // Load saved avatar
                const savedAvatar = localStorage.getItem('userAvatar');
                if (savedAvatar) {
                    const previewAvatar = document.getElementById('preview-avatar');
                    const previewInitials = document.getElementById('preview-initials');
                    if (previewAvatar && previewInitials) {
                        previewInitials.style.display = 'none';
                        previewAvatar.style.backgroundImage = `url(${savedAvatar})`;
                        previewAvatar.style.backgroundSize = 'cover';
                        previewAvatar.style.backgroundPosition = 'center';
                    }
                }
                
                // Load saved cover photo
                const savedCover = localStorage.getItem('userCover');
                if (savedCover) {
                    const coverPhoto = document.querySelector('.bg-gradient-to-r');
                    if (coverPhoto) {
                        coverPhoto.style.backgroundImage = `url(${savedCover})`;
                        coverPhoto.style.backgroundSize = 'cover';
                        coverPhoto.style.backgroundPosition = 'center';
                    }
                }
            }
        });
    });
    
    const profilePage = document.getElementById('profile');
    if (profilePage) {
        observer.observe(profilePage, { attributes: true, attributeFilter: ['class'] });
    }
    
    // Initialize character count on page load
    const bioTextarea = document.getElementById('edit-bio');
    if (bioTextarea) {
        updateCharCount(bioTextarea, 'bio-count');
    }
});

// Keyboard shortcuts for profile editing
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + S to save
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        const profilePage = document.getElementById('profile');
        if (profilePage && profilePage.classList.contains('active')) {
            e.preventDefault();
            saveProfileToStorage();
            showToast('Profile saved!', 'success');
        }
    }
    
    // Ctrl/Cmd + R to reset (when in profile page)
    if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
        const profilePage = document.getElementById('profile');
        if (profilePage && profilePage.classList.contains('active')) {
            e.preventDefault();
            resetForm();
        }
    }
});

// Export profile data
function exportProfile() {
    const profileData = localStorage.getItem('userProfile');
    if (profileData) {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(profileData);
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", "barterhub_profile.json");
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
        showToast('Profile data exported!');
    }
}

// Import profile data
function importProfile() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                try {
                    const profileData = JSON.parse(event.target.result);
                    localStorage.setItem('userProfile', event.target.result);
                    loadProfileFromStorage();
                    showToast('Profile data imported successfully!');
                } catch (error) {
                    showToast('Invalid profile data file', 'error');
                }
            };
            reader.readAsText(file);
        }
    };
    input.click();
}
    
    // Check if on video verification page
    if (document.getElementById('video-verification')) {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.target.classList.contains('active') && 
                    mutation.target.id === 'video-verification') {
                    initVideoVerification();
                }
            });
        });
        
        observer.observe(document.getElementById('video-verification'), {
            attributes: true,
            attributeFilter: ['class']
        });
    }
});

// Close modals on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeTradeModal();
        closeEditProfile();
        closeTradeDetailsModal();
        closeVerificationDetailsModal();
    }
});

// Click outside modal to close
document.querySelectorAll('.fixed').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Initialize tooltips
function initTooltips() {
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(element => {
        element.addEventListener('mouseenter', (e) => {
            const tooltip = document.createElement('div');
            tooltip.className = 'absolute bg-gray-900 text-white text-xs rounded py-1 px-2 z-50';
            tooltip.textContent = e.target.dataset.tooltip;
            tooltip.style.top = `${e.target.offsetTop - 30}px`;
            tooltip.style.left = `${e.target.offsetLeft}px`;
            document.body.appendChild(tooltip);
            
            e.target.addEventListener('mouseleave', () => {
                document.body.removeChild(tooltip);
            }, { once: true });
        });
    });
}

// Auto-save functionality for forms
let autoSaveTimeout;
function autoSave(formId) {
    clearTimeout(autoSaveTimeout);
    autoSaveTimeout = setTimeout(() => {
        const form = document.getElementById(formId);
        if (form) {
            const formData = new FormData(form);
            localStorage.setItem(`autosave_${formId}`, JSON.stringify(Object.fromEntries(formData)));
            showToast('Draft saved', 'info');
        }
    }, 2000);
}

// Restore auto-saved data
function restoreAutoSave(formId) {
    const saved = localStorage.getItem(`autosave_${formId}`);
    if (saved) {
        const data = JSON.parse(saved);
        const form = document.getElementById(formId);
        if (form) {
            Object.keys(data).forEach(key => {
                const input = form.querySelector(`[name="${key}"]`);
                if (input) {
                    input.value = data[key];
                }
            });
        }
    }
}

// Notification system
let notifications = [];
function addNotification(title, message, type = 'info') {
    const notification = {
        id: Date.now(),
        title,
        message,
        type,
        timestamp: new Date()
    };
    notifications.push(notification);
    updateNotificationBadge();
}

function updateNotificationBadge() {
    const badges = document.querySelectorAll('.notification-badge');
    badges.forEach(badge => {
        badge.textContent = notifications.length;
    });
}

// Search functionality
function performSearch(query) {
    if (query.trim() === '') return;
    
    showToast(`Searching for: ${query}`, 'info');
    showPage('browse');
}

// Add search event listener
const searchInput = document.querySelector('input[placeholder="Search items..."]');
if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch(e.target.value);
        }
    });
}

// Analytics tracking (placeholder)
function trackEvent(eventName, eventData = {}) {
    console.log('Event tracked:', eventName, eventData);
}

// Initialize app
console.log('BarterHub initialized successfully');
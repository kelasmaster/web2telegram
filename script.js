document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mainNav = document.getElementById('main-nav');
  const chatSelect = document.getElementById('chat-select');
  const messageInput = document.getElementById('message-input');
  const sendBtn = document.getElementById('send-btn');
  const statusIndicator = document.getElementById('status-indicator');
  const historyList = document.getElementById('history-list');

  // Sample data for demonstration
  const sampleMessages = [
    {
      id: 1,
      recipient: 'My Personal Chat',
      message: 'Hello, this is a test message!',
      time: '2 min ago',
      status: 'success'
    },
    {
      id: 2,
      recipient: 'Group: Dev Team',
      message: 'Meeting at 3pm tomorrow',
      time: '1 hour ago',
      status: 'success'
    },
    {
      id: 3,
      recipient: 'Channel: Announcements',
      message: 'System maintenance scheduled',
      time: 'Yesterday',
      status: 'error'
    }
  ];

  // Initialize the app
  function init() {
    // Load sample messages
    loadSampleMessages();
    
    // Set up event listeners
    setupEventListeners();
  }

  // Set up all event listeners
  function setupEventListeners() {
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    
    // Send message
    sendBtn.addEventListener('click', sendMessage);
    
    // Simulate pressing Enter in textarea to send message
    messageInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });
  }

  // Toggle mobile menu
  function toggleMobileMenu() {
    mainNav.classList.toggle('active');
  }

  // Send message to Telegram (simulated)
  function sendMessage() {
    const recipient = chatSelect.options[chatSelect.selectedIndex].text;
    const message = messageInput.value.trim();
    
    if (!message) {
      showStatus('Please enter a message', 'error');
      return;
    }
    
    // Show sending status
    showStatus('Sending message...', 'sending');
    sendBtn.disabled = true;
    
    // Simulate API call with timeout
    setTimeout(() => {
      // For demo purposes, we'll simulate success 80% of the time
      const isSuccess = Math.random() > 0.2;
      
      if (isSuccess) {
        // Add to history
        addMessageToHistory({
          recipient,
          message,
          time: 'Just now',
          status: 'success'
        });
        
        showStatus('Message sent successfully!', 'success');
        messageInput.value = ''; // Clear input
      } else {
        showStatus('Failed to send message. Please try again.', 'error');
      }
      
      sendBtn.disabled = false;
    }, 1500);
  }

  // Show status message
  function showStatus(text, type) {
    statusIndicator.textContent = `Status: ${text}`;
    statusIndicator.className = 'status';
    
    if (type === 'success') {
      statusIndicator.classList.add('success');
    } else if (type === 'error') {
      statusIndicator.classList.add('error');
    } else if (type === 'sending') {
      statusIndicator.classList.add('sending');
    }
  }

  // Add message to history
  function addMessageToHistory({ recipient, message, time, status }) {
    const messageItem = document.createElement('div');
    messageItem.className = 'message-item';
    
    messageItem.innerHTML = `
      <div class="message-header">
        <span class="message-recipient">To: ${recipient}</span>
        <span class="message-time">${time}</span>
      </div>
      <p class="message-content">${message}</p>
      <div class="message-status ${status}">
        ${status === 'success' ? '✓ Delivered' : '✗ Failed'}
      </div>
    `;
    
    historyList.prepend(messageItem);
  }

  // Load sample messages (for demo)
  function loadSampleMessages() {
    sampleMessages.forEach(msg => {
      addMessageToHistory({
        recipient: msg.recipient,
        message: msg.message,
        time: msg.time,
        status: msg.status
      });
    });
  }

  // Initialize the application
  init();
});

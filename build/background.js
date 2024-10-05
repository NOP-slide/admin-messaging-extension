// Array of simulated messages
let messages = [
    {
      id: 'msg123',
      content: 'Team meeting at 3 PM today 🙂',
      priority: 'high',
      timestamp: '',
      read: false,
    },
    {
      id: 'msg124',
      content: "Don't forget to submit your reports!",
      priority: 'low',
      timestamp: '',
      read: false,
    },
    {
      id: 'msg125',
      content: 'Happy birthday to our team member!',
      priority: 'medium',
      timestamp: '',
      read: false,
    },
    {
      id: 'msg126',
      content: 'Quarterly results are out. Check the dashboard.',
      priority: 'high',
      timestamp: '',
      read: false,
    },
    {
      id: 'msg127',
      content: 'Reminder: All hands meeting next week.',
      priority: 'high',
      timestamp: '',
      read: false,
    },
    {
      id: 'msg128',
      content: 'New policy updates are available. Please review.',
      priority: 'medium',
      timestamp: '',
      read: false,
    },
    {
      id: 'msg129',
      content: 'Office will be closed for a holiday on Friday.',
      priority: 'low',
      timestamp: '',
      read: false,
    },
    {
      id: 'msg130',
      content: "Don't forget to submit your vacation requests.",
      priority: 'low',
      timestamp: '',
      read: false,
    },
    {
      id: 'msg131',
      content: 'Join us for a virtual happy hour this Friday!',
      priority: 'low',
      timestamp: '',
      read: false,
    },
    {
      id: 'msg132',
      content: 'New training resources are now available.',
      priority: 'medium',
      timestamp: '',
      read: false,
    },
  ];
  
  // Update badge with number of unread messages
  const updateBadge = (unreadCount) => {
    const badgeText = unreadCount > 0 ? unreadCount.toString() : '';
    chrome.action.setBadgeText({ text: badgeText });
  };
  
  // Search through the current messages in Chrome's local storage and check the "read" flag
  const checkUnreadMessages = () => {
    chrome.storage.local.get('messages', (data) => {
      let unreadMessagesCount = (data.messages || []).filter(
        (message) => !message.read
      ).length;
      updateBadge(unreadMessagesCount);
    });
  };
  
  let messageIndex = 0;
  
  // Main loop happens every 3 seconds
  const sendMessagesInterval = setInterval(() => {
    // Get current badge colour (from options page)
    chrome.storage.sync.get(['badgeColour'], (result) => {
      if (result.badgeColour) {
        chrome.action.setBadgeBackgroundColor({ color: result.badgeColour });
      } else {
        chrome.action.setBadgeBackgroundColor({ color: '#0000A0' }); // Initial blue badge colour if none set in options
      }
    });
  
    // Get the current messages array stored in Chrome's local storage,
    // and send a new message every 3 sec until all messages have been sent
    if (messageIndex < messages.length) {
      chrome.storage.local.get('messages', (data) => {
        const currentMessages = data.messages || [];
        messages[messageIndex].timestamp = new Date().toISOString();
        currentMessages.push(messages[messageIndex]);
        chrome.storage.local.set({ messages: currentMessages }, () => {
          checkUnreadMessages(); // Check unread messages and update the badge
        });
        messageIndex++;
      });
    }
  }, 3000);
  
import React, { useState, useEffect } from 'react';

function App() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // When loading popup window, get messages from local storage
  useEffect(() => {
    chrome.storage.local.get(['messages'], (result) => {
      console.log('Result:', result);
      if (result.messages) {
        setMessages(result.messages);
      }
      setLoading(false);
    });
  }, [messages]);

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

  // Loop through messages and mark the selected message id as "read"
  const markAsRead = (id) => {
    const updatedMessages = messages.map((message) =>
      message.id === id ? { ...message, read: true } : message
    );
    setMessages(updatedMessages);
    chrome.storage.local.set({ messages: updatedMessages }, () => {
      checkUnreadMessages(); // Recalculate unread count and update badge
    });
  };

  return (
    <div className="py-4">
      <h1 className="text-xl text-center font-bold mb-4">Admin Messages</h1>
      {loading ? (
        <p className="text-gray-500">Loading messages...</p>
      ) : messages.length === 0 ? (
        <p>No messages to show.</p>
      ) : (
        <ul className="space-y-4">
          {messages.map((msg) => (
            <li
              key={msg.id}
              className={`p-4 border ${msg.read ? 'bg-gray-100' : 'bg-white'}`}
            >
              <div className="flex items-center">
                <div className="w-3/4">
                  <span
                    className={`font-semibold ${
                      msg.priority === 'high' && 'text-red-700'
                    }`}
                  >
                    {msg.content}
                  </span>
                </div>
                <div className="w-1/4">
                  {!msg.read && (
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                      onClick={() => markAsRead(msg.id)}
                    >
                      Mark as Read
                    </button>
                  )}
                </div>
              </div>
              {/* Convert to nice readable time */}
              <p className="text-gray-400 text-sm">
                {new Date(msg.timestamp).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;


import React from 'react';
import './ChatLoading.css'; // Import CSS file for custom styling

const ChatLoading = () => {
  return (
    <div className="chat-loading-container">
      {[...Array(12)].map((_, index) => (
        <div key={index} className="chat-loading-skeleton"></div>
      ))}
    </div>
  );
};

export default ChatLoading;

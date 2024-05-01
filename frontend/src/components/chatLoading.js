import React from 'react';
import "./ChatLoading.css"

const ChatLoading = () => {
  return (
    <div>
      <form>
        {[...Array(5)].map((_, index) => (
          <div key={index} className="chat-loading-skeleton">
            <div className="avatar-skeleton"></div>
            <div className="text-skeleton"></div>
          </div>
        ))}
      </form>
    </div>
  );
};

export default ChatLoading;

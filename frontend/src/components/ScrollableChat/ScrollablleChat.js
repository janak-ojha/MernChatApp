import React from 'react';
import ScrollableFeed from 'react-scrollable-feed';
import { isLastMessage, isSameSender } from '../../config/chatLogic';
import { ChatState } from '../../context/ChatProvider';
import './ScrollableChat.css'; // Import the CSS file

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();
  console.log(messages);

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => {
          console.log(m?.sender?.pic);
          console.log(isLastMessage(messages, i, user._id));
          return (
            <div style={{ display: "flex" }} key={m._id}>
              {(isSameSender(messages, m, i, user._id) ||
                isLastMessage(messages, i, user._id)) && (
                <div className="sender-info">
                  {m && <img style={{height:"50px",width:"50px"}} src={m.sender.pic} alt="Profile" />}
                  <span className="sender-name">{m.sender.name}</span>
                </div>
               )}
            </div>
          );
        })}
    </ScrollableFeed>
  );
}

export default ScrollableChat;

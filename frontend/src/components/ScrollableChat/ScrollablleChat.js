import React from 'react';
import ScrollableFeed from 'react-scrollable-feed';
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from '../../config/chatLogic';
import { ChatState } from '../../context/ChatProvider';
import './ScrollableChat.css'; // Import the CSS file

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();
  console.log(messages);

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => {
          // console.log(m?.sender?.pic);
          console.log(isLastMessage(messages, i, user._id));
          console.log(isSameSender(messages, m, i, user._id));
          return (
            <div style={{ display: "flex" }} key={m._id}>
              {(isSameSender(messages, m, i, user._id) ||
                isLastMessage(messages, i, user._id)) && (
                  
                <div className="sender-info">
                  {m && <img style={{height:"25px",width:"25px",borderRadius:"50%"}} src={m.sender.pic} alt="Profile" />}
                  {/* <span className="sender-name">{m.sender.name}</span> */}
                </div>
               )}
               <span
               style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                }`,
                borderRadius: "20px",
                padding: "5px 10px",
                maxWidth: "70%",
                marginLeft: isSameSenderMargin(messages,m,i,user._id),
                marginTop: isSameUser(messages,m,i,user._id)? 3 : 10,
               }}>
                {m.content}
               </span>
            </div>
          );
        })}
    </ScrollableFeed>
  );
}

export default ScrollableChat;

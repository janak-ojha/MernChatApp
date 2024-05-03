import React, { useEffect, useState } from 'react';
import { ChatState } from '../context/ChatProvider';
import axios from 'axios';
import './MyChat.css';
import ChatLoading from './chatLoading';
import { getSender } from '../config/chatLogic';
import GroupChatModel from './miscellenous/GroupChatModel';

const MyChat = () => {
  const [loggedUser, setLoggedUser] = useState();
  const { setSelectedChat, user, chats, setChats } = ChatState();
  const [selectedChatId, setSelectedChatId] = useState(null); // State to track selected chat ID

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get("http://localhost:5000/api/chat/chatfetch", config);
      setChats(data);
    } catch (error) {
      alert("Failed to load the chat");
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, []);

  const handleChatSelection = (chat) => {
    setSelectedChat(chat);
    setSelectedChatId(chat._id); // Update selected chat ID
  };

  return (
    <div className='MyChatContainer'>
      <div className='MyChatbox1'>
        <div className='myChats'>My Chat</div>
        <GroupChatModel>
        
        </GroupChatModel>
      </div>
      <div className='MyChatBox2'>
        {chats ? (
          <div className='stack-container'>
            {chats.map((chat) => (
              <div
                className={`MyChatSelector ${selectedChatId === chat._id ? 'selected' : ''}`} // Apply 'selected' class if chat is selected
                key={chat._id}
                onClick={() => handleChatSelection(chat)} // Use handleChatSelection function
              >
                <div>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <ChatLoading />
        )}
      </div>
    </div>
  );
};

export default MyChat;

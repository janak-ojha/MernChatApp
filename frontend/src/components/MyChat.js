import React, { useState } from 'react'
import { ChatState } from '../context/ChatProvider';
import axios from 'axios';

const MyChat = () => {
  const[ loggedUser,setLoggedUser] = useState();
  const{ selectedChat,setSelectedChat,user,chats,setChats}=ChatState();

  const fetchChats = async() =>{
    try {
      const config = {
        headers:{
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } =await axios.get("/api/chat",config);
      setChats(data)
      
    } catch (error) {
      
    }
  }
  return (
    <div></div>
  )
}

export default MyChat
import React from 'react'
import { ChatState } from '../context/ChatProvider'
import "./CHatBox.css";



const ChatBox = () => {
  const {selectedChat} = ChatState();
  return (
    <div className='chatBox'>ChatBox</div>
  )
}

export default ChatBox
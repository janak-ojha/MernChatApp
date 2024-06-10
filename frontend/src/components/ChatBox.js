import React from 'react'
import { ChatState } from '../context/ChatProvider'
import "./CHatBox.css";
import SingleChat from './SingleChat';



const ChatBox = ({fetchAgain,setFetchAgain}) => {
  // const {selectedChat} = ChatState();
  return (
    <div className='chatBox1'>
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
    </div>
  )
}

export default ChatBox
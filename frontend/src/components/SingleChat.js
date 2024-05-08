import React from 'react'
import { ChatState } from '../context/ChatProvider'
import './singleChat.css';
import { getSender ,getSenderFull } from '../config/chatLogic';
import ProfileModel from './miscellenous/ProfileModel';
import UpdateGroupChatModel from './miscellenous/UpdateGroupChatModel';

const SingleChat = ({fetchAgain,setFetchAgain}) => {
    const {  user , selectedChat,setSelectedChat} =ChatState();
  return (
    <div className='SingleContainer'>
    {selectedChat ? (
        
            <div className='SingleText'>
                
                {!selectedChat.isGroupChat ? (
                    <div className='SingleProfileIcon'>{getSender(user,selectedChat.users)}
                    <ProfileModel 
                     
                    user={getSenderFull(user,selectedChat.users)}/>
                    
                    </div>
                ):(
                    <div className='GroupChatsingle'>
                    {selectedChat.chatName.toUpperCase()}
                    <UpdateGroupChatModel
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                    />
                    </div>
                )}
                <div className='SingleDivSection'>
                    hello
                </div>
            </div>
        
    ): (
        <div className='SingleClick'>
            Click on user to start chatting 
            
            </div>
    )}
    
    </div>
    
  )
}

export default SingleChat
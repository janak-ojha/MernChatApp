import React, { useEffect, useState } from 'react';
import { ChatState } from '../context/ChatProvider';
import './singleChat.css';
import { getSender, getSenderFull } from '../config/chatLogic';
import ProfileModel from './miscellenous/ProfileModel';
import UpdateGroupChatModel from './miscellenous/UpdateGroupChatModel';
import axios from 'axios';
import ScrollableChat from './ScrollableChat/ScrollablleChat'; // Corrected import
import io from 'socket.io-client'


const ENDPOINT = "http://localhost:5000";
var socket , selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
    const { user, selectedChat } = ChatState();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const [socketConnected,setsocketConnected] = useState(false);

    const fetchMessages = async () => {
        if (!selectedChat) return;
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            setLoading(true);
            const { data } = await axios.get(
                `http://localhost:5000/api/message/${selectedChat._id}`,
                config
            );
            console.log(data);
            setMessages(data);
            setLoading(false);

            socket.emit("join chat",selectedChat._id);
        } catch (error) {
            alert("Error while fetching message");
        }
    };

    useEffect(() => {
        fetchMessages();
        selectedChatCompare = selectedChat;
    },[selectedChat]);

    useEffect(() =>{
        socket.on("message recieved", (newMessageRecieved) =>{
            if(!selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.chat._id)
                {
                    //  give notification
                }
            else{
                setMessages([...messages,newMessageRecieved]);
            }    
        });
    });

    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit("setup", user);
        socket.on("connection", () => setsocketConnected(true));
    }, []);



    const sendMessage = async () => {
        if (newMessage.trim() !== '') {
            try {
                setLoading(true);
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                setNewMessage("");

                const { data } = await axios.post(
                    'http://localhost:5000/api/message/',
                    {
                        content: newMessage,
                        chatId: selectedChat._id,
                    },
                    config
                );
                console.log("Message sent successfully:", data);

                setMessages([...messages, data]);
            } catch (error) {
                console.error('Failed to send the message:', error);
                alert('Failed to send the message');
            } finally {
                setLoading(false);
            }
        }
    };

    const typingHandler = (e) => {
        setNewMessage(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        sendMessage(); // Call sendMessage function when form is submitted
    };

    return (
        <div className="SingleContainer">
            {selectedChat ? (
                <div className="SingleText">
                    {!selectedChat.isGroupChat ? (
                        <div className="SingleProfileIcon">
                            {getSender(user, selectedChat.users)}
                            <ProfileModel user={getSenderFull(user, selectedChat.users)} />
                        </div>
                    ) : (
                        <div className="GroupChatsingle">
                            {selectedChat.chatName.toUpperCase()}
                            <UpdateGroupChatModel
                                fetchAgain={fetchAgain}
                                setFetchAgain={setFetchAgain}
                                fetchMessages={fetchMessages}
                            />
                        </div>
                    )}

                    <div className="SingleDivSection">
                        {loading ? 
                        (<div>Loading...</div>) :
                        (<div className='messagePassingSingle'>
                           <ScrollableChat messages={messages}/>
                        </div>)}

                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                className="SingleChatInput"
                                onClick={typingHandler}
                                placeholder="Enter a message"
                                value={newMessage}
                                onChange={typingHandler}
                            />
                        </form>
                    </div>
                </div>
            ) : (
                <div className="SingleClick">Click on a user to start chatting</div>
            )}
        </div>
    );
};

export default SingleChat;

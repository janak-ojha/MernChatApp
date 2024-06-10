import React, { useEffect, useState } from 'react';
import { ChatState } from '../context/ChatProvider';
import './singleChat.css';
import { getSender, getSenderFull } from '../config/chatLogic';
import ProfileModel from './miscellenous/ProfileModel';
import UpdateGroupChatModel from './miscellenous/UpdateGroupChatModel';
import axios from 'axios';
import ScrollableChat from './ScrollableChat/ScrollablleChat'; // Corrected import
import io from 'socket.io-client'
import Lottie, { }  from 'react-lottie'
import animationData from "../animation/typing.json";



const ENDPOINT = `${process.env.REACT_APP_BASE_URL_BACKEND}`;
var socket , selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
    const { user, selectedChat ,notification,setNotification } = ChatState();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const [socketConnected,setsocketConnected] = useState(false);
    const [typing,setTyping] = useState(false);
    const [isTyping,setIsTyping] = useState(false);

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",

        },
    };

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
                `${process.env.REACT_APP_BASE_URL_BACKEND}/api/message/${selectedChat._id}`,
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
        socket = io(ENDPOINT);
        socket.emit("setup", user);
        socket.on("connected", () => setsocketConnected(true));
        socket.on("typing",() => setIsTyping(true));
        socket.on("stop typing" , () => setIsTyping(false));

    }, []);

    useEffect(() => {
        fetchMessages();
        selectedChatCompare = selectedChat;
    },[selectedChat]);


    useEffect(() =>{
        socket.on("message recieved", (newMessageRecieved) =>{
            if(!selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.chat._id)
                {
                    if(!notification.includes(newMessageRecieved)) {
                        setNotification([newMessageRecieved, ...notification]);
                        setFetchAgain(!fetchAgain);
                    }
                }
            else{
                setMessages([...messages,newMessageRecieved]);
            }    
        });
    });

  



    const sendMessage = async () => {
        if (newMessage.trim() !== '') {
            socket.emit("stop typing",selectedChat._id);
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
                    `${process.env.REACT_APP_BASE_URL_BACKEND}/api/message/`,
                    {
                        content: newMessage,
                        chatId: selectedChat._id,
                    },
                    config
                );
               
                
                socket.emit("new message",data);
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

        if(!socketConnected) return;

        if(!typing){
            setTyping(true);
            socket.emit("typing",selectedChat._id)
        }
        let lastTypingTime = new Date().getTime();
        var timeLength = 3000;
        setTimeout(() =>{
            var timNow= new Date().getTime();
            var timeDiff = timNow-lastTypingTime;

            if(timeDiff>=timeLength && typing)
                {
                    socket.emit("stop typing",selectedChat._id);
                    setTyping(false);

                }
        },timeLength);

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
                        (<div></div>) :
                        (<div className='messagePassingSingle'>
                           <ScrollableChat messages={messages}/>
                        </div>)}

                        <form onSubmit={handleSubmit}>
                            {isTyping ? <div>
                                <Lottie
                                options={defaultOptions}
                                width={50}
                                style={{marginBottom:3,marginLeft:0}}
                                /></div>: <></>}
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

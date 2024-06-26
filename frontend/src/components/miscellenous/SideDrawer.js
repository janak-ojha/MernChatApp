import React, { useState, useEffect, useRef } from 'react';
import './SideDrawer.css';
import { ChatState } from '../../context/ChatProvider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import ChatLoading from '../chatLoading';
import UserListItem from '../userAvatar/UserListItem';
import { getSender } from '../../config/chatLogic';

const SideDrawer = () => {
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
     // eslint-disable-next-line no-unused-vars
    const [loadingChat, setLoadingChat] = useState(false);
    const { user, setSelectedChat, chats, setChats, notification, setNotification } = ChatState();
    const [showDetails, setShowDetails] = useState(false);
    const [showDrawer, setShowDrawer] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const detailsRef = useRef(null);
    const sideDrawerRef = useRef(null); // Ref for the side drawer container
    const notificationsRef = useRef(null); // Ref for the notifications container
    const history = useNavigate();

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    const toggleDrawer = () => {
        setShowDrawer(!showDrawer);
    };

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    const handleClickOutside = (event) => {
        if (sideDrawerRef.current && !sideDrawerRef.current.contains(event.target)) {
            setShowDrawer(false);
            setSearchResult([]);
        }
        if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
            setShowNotifications(false);
        }
        if(detailsRef.current && !detailsRef.current.contains(event.target)){
            setShowDetails(false);

        }
    };

    const logoutHandler = () => {
        localStorage.removeItem('userInfo');
        history('/');
    };

    const handleSearch = async () => {
        if (!search) {
            alert("Please enter something in the search field.");
            return;
        }

        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL_BACKEND}/api/user/userall?search=${search}`, config);
            setLoading(false);
            setSearchResult(data);
        } catch (error) {
            alert("Failed to load search results.");
        }
    };

    const accessChat = async (userId) => {
        try {
            setLoadingChat(true);

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL_BACKEND}/api/chat/chataccess`, { userId }, config);
            

            if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);

            setSelectedChat(data);
            setLoadingChat(false);
            setShowDrawer(false);
        } catch (error) {
            alert("Error fetching the chat.");
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div ref={sideDrawerRef} className={`Sidecontainer ${showDrawer ? 'open' : ''}`}>
            <div className="buttons">
                <button className="SidesearchIcon" onClick={toggleDrawer}>
                    <i className="fas fa-search"></i>
                    <span className="Sidetooltip">Search user to chat</span>
                    <span className="Sidesearch">Search User</span>
                </button>
            </div>
            {showDrawer && (
                <div className={`drawer-navigation`}>
                    <div className='DrawInput'>
                        <input
                            className='drawI'
                            placeholder='Search by name or email'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <button className='drawB' onClick={handleSearch}>
                            Go
                        </button>
                    </div>
                    {loading ? (
                        <ChatLoading />
                    ) : (
                        searchResult?.map((user) => (
                            <UserListItem
                                key={user._id}
                                user={user}
                                handleFunction={() => accessChat(user._id)}
                            />
                        ))
                    )}
                </div>
            )}
            <div className="Sidetalk">Bukki-Chat</div>
            <div className="Sideicon" ref={notificationsRef}>
                <button className="Sidebell" onClick={toggleNotifications}>
                {notification.length > 0 && (
                        <div className="custom-badge">{notification.length}</div>
                    )}
                    <i className="fa-solid fa-bell"></i>
                </button>
                {showNotifications && (
                    <ul className='SideNotification'>
                        {!notification.length && "No New Message"}
                        {notification.map((notif) => (
                            <li 
                            key={notif._id} 
                            onClick={() =>{
                                setSelectedChat(notif.chat);
                                setNotification(notification.filter((n) => n !== notif));
                            }}
                             >
                                {notif.chat.isGroupChat
                                    ? `New Message in ${notif.chat.chatName}`
                                    : `New Message from ${getSender(user, notif.chat.users)}`}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="Sidepicture">
                <button className="Sideprofile" onClick={toggleDetails}>
                    {user.pic ? (
                        <img src={user.pic} alt="Profile" />
                    ) : (
                        <span>{user.name}</span>
                    )}
                </button>
            </div>
            {showDetails && (
                <div className="Sideuser-details" ref={detailsRef}>
                    <p>
                        Pic: <img src={user.pic} alt="Profile" style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} />
                    </p>
                    <p>Name: {user.name}</p>
                    <p className='Sideemails'>Email: {user.email}</p>
                    {/* You can add more details here */}
                </div>
            )}
            <div className="Sidescroll">
                <button onClick={logoutHandler}>logout</button>
            </div>
        </div>
    );
};

export default SideDrawer;

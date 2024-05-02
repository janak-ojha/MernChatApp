  import React, { useState, useEffect, useRef } from 'react';
  import './SideDrawer.css';
  import { ChatState } from '../../context/ChatProvider';
  import { useNavigate } from 'react-router-dom';
  import axios from 'axios'
  import ChatLoading from '../chatLoading';
  import UserListItem from '../userAvatar/UserListItem';

  
  const SideDrawer = () => {
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);
    const { user,setSelectedChat,chats,setChats } = ChatState();
    const [showDetails, setShowDetails] = useState(false);
    const [showDrawer, setShowDrawer] = useState(false); // New state for drawer toggle
    const detailsRef = useRef(null);
    const history = useNavigate();

    const toggleDetails = () => {
      setShowDetails(!showDetails);
    };

    const toggleDrawer = () => {
      // Toggle the drawer state when clicking the search icon
      setShowDrawer(!showDrawer);
    };

    const handleClickOutside = (event) => {
      if (detailsRef.current && !detailsRef.current.contains(event.target)) {
        setShowDetails(false);
      }
    };

    const logoutHandler = () => {
      localStorage.removeItem('userInfo');
      history('/');
    };

    const handleSearch = async() => {
      if(!search)
      {
        alert("enter the something in search");
        return;
      }
      try{
        setLoading(true);
        const config = {
          headers:{
              Authorization:`Bearer ${user.token}`,
          },
        };
        
        const {data} = await axios.get(`http://localhost:5000/api/user/userall?search=${search}`,config);
        setLoading(false);
        setSearchResult(data);
      
      }
      catch(error){
        alert("failed to load search result");

      }
    };

    const accessChat = async(userId) => {
      try{
        setLoadingChat(true);

        const config = {
          headers:{
            "Content-Type":"application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data }  = await axios.post("http://localhost:5000/api/chat/chataccess",{ userId },config);
        console.log(data);
        
        if(!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);

        setSelectedChat(data);
        setLoadingChat(false);
        setShowDrawer(false);

      }
      catch(error){
        alert("Error fetching the chat");

      };


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
      <div className={`Sidecontainer ${showDrawer ? 'open' : ''}`}>
        <div className="buttons">
          {/* Toggle the drawer when clicking the search button */}
          <button className="SidesearchIcon" onClick={toggleDrawer}>
            <i className="fas fa-search"></i>
            <span className="Sidetooltip">Search user to chat</span>
            <span className="Sidesearch">Search User</span>
          </button>
        </div>
        {/* Navigation menu */}
        {showDrawer && ( // Render the navigation menu only when showDrawer is true
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
              {loading ? (<ChatLoading/>)
              :(
                searchResult?.map((user) =>(
                  <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={()=>accessChat(user._id)}
                  />
                ))
              )}
          </div>
        )}
        <div className="Sidetalk">Talk-A-Tive</div>
        <div className="Sideicon">
          <button className="Sidebell">
            <i className="fa-solid fa-bell"></i>
          </button>
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
            <p>Email: {user.email}</p>
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

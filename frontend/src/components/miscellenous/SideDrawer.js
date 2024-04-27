import React, { useState, useEffect, useRef } from 'react';
import "./SideDrawer.css";
import { ChatState } from "../../context/ChatProvider";
import { useNavigate } from 'react-router-dom';

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const { user } = ChatState();
  const [showDetails, setShowDetails] = useState(false);
  const detailsRef = useRef(null);
  const history = useNavigate();

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleClickOutside = (event) => {
    if (detailsRef.current && !detailsRef.current.contains(event.target)) {
      setShowDetails(false);
    }
  };

  const logoutHandler = () =>{
    localStorage.removeItem("userInfo");
    history("/")
  }



  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className='container'>
      <div className='buttons'>
        <button className='searchIcon'>
          <i className="fas fa-search"></i>
          <span className="tooltip">Search user to chat</span>
          <span className='search'>Search User</span>
        </button>
      </div>
      <div className='talk'>Talk-A-Tive</div>
      <div className='icon'>
        <button className='bell'> 
          <i className="fa-solid fa-bell"></i>
        </button>
      </div>
      <div className='picture'>
        <button className='profile' onClick={toggleDetails}>
          {user.pic ? (
            <img src={user.pic} alt="Profile" />
          ) : (
            <span>{user.name}</span>
          )}
        </button>
      </div>
      {showDetails && (
        <div className="user-details" ref={detailsRef}>
          <p>Pic: <img src={user.pic} alt="Profile" style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} /></p>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          {/* You can add more details here */}
        </div>
      )}
      <div className='scroll'> 
        <button onClick={logoutHandler}>logout</button>
      </div>
    </div>
  );
}

export default SideDrawer;

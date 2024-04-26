import React, { useState } from 'react';
import "./SideDrawer.css";
import { ChatState } from "../../context/ChatProvider";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const { user } = ChatState();

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
        <button className='profile'>
          {user.pic ? (
            <img src={user.pic} alt="Profile" />
          ) : (
            <span>{user.name}</span>
          )}
        </button>
      </div>

      <div className='scroll'> 
        <select className="usertype" id="usertype" required>
          <option value="My profile">MyProfile</option>
          <option value="logout">Logout</option>
        </select>
      </div>
     
    </div>
  );
}

export default SideDrawer;

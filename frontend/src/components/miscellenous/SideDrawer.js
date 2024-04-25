import React, { useState } from 'react';
import "./SideDrawer.css";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();

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
        <i class="fa-solid fa-bell"></i>
        </button>
      </div>
      
      <div>
        <button className='profile'>
        <i class="fa-solid fa-user"></i>
        </button>
      </div>
    </div>
  )
}

export default SideDrawer;

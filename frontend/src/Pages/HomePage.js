import React, { useEffect, useState } from 'react';
import './homePage.css';
import Login from '../components/Authentication/Login';
import Signup from '../components/Authentication/Signup';
import { useNavigate } from 'react-router-dom';



function HomePage() {
  const [showLogin, setShowLogin] = useState(true);
  const [showSignup, setShowSignup] = useState(false);
  const history=useNavigate()

  useEffect(() =>{
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if(user) history("/chats");
  },[history]);

  const toggleForm = (form) => {
    if (form === 'login') {
      setShowLogin(true);
      setShowSignup(false);
    } else if (form === 'signup') {
      setShowLogin(false);
      setShowSignup(true);
    }
  };

  return (
    <div className='Homecontainer'>
      <div className="Homebox">
         Bukki-chat
      </div>
      <div>
      <div className='Homebox2'>
        <div className='Homelogin' onClick={() => toggleForm('login')}>Login</div>
        <div className="Homesignup" onClick={() => toggleForm('signup')}>Sign up</div> 
      </div>
      <div>
        <div className='homebox3'> 
        {showLogin && <Login />}
        {showSignup && <Signup />}
        </div>
      </div>
      </div>
    </div>
  )
}

export default HomePage;

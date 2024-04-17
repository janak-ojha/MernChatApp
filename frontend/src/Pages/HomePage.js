import React, { useState } from 'react';
import './homePage.css';
import Login from '../components/Authentication/Login';
import Signup from '../components/Authentication/Signup';

function HomePage() {
  const [showLogin, setShowLogin] = useState(true);
  const [showSignup, setShowSignup] = useState(false);

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
    <div className='container'>
      <div className="box">
         Talk-A-Tive
      </div>
      <div>
      <div className='box2'>
        <div className='login' onClick={() => toggleForm('login')}>Login</div>
        <div className="signup" onClick={() => toggleForm('signup')}>Sign up</div> 
      </div>
      <div>
        {showLogin && <Login />}
        {showSignup && <Signup />}
      </div>
      </div>
    </div>
  )
}

export default HomePage;

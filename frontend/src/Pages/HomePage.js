import React from 'react';
import './homePage.css';
import Login from '../components/Authentication/Login';
import Signup from '../components/Authentication/Signup';


function HomePage() {
  return (
    <div className='container'>
      <div className="box">
         Talk-A-Tive
      </div>
      <div className='box2'>
        <div className='login'>Login</div>
        <div className="signup">Sign up</div> 
        
      </div>
      

        
    </div>
  )
}

export default HomePage
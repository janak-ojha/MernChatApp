import React from 'react'
import './Signup.css'

const Signup = () => {
  return (
    <div className='Signup'>
        <form className='SignupForm'>
            <label>Name</label>
            <input
            type="text"
            className='SignupInput'
            placeholder='Enter your name'
             />
             <label>Email</label>
             <input 
             type="text"
             className='SignupInput'
             placeholder='Enter your email'
              />
              <label>Password</label>
              <input 
              type="password"
              className='SignupInput'
              placeholder='Enter your password' />
              <label >Confirm Password</label>
              <input 
              type="text"
              className='SignupInput'
              placeholder='Confirm Password' />
              <label>Upload your picture</label>
              <input type="file" />
              <button type="submit">Sign Up</button>
        </form>
        
    </div>
  )
}

export default Signup
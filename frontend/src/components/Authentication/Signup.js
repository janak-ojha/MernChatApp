import React, { useState } from 'react';
import './Signup.css';

 // Import your CSS file for styling

const Signup = () => {
  const [show,setShow] = useState(false);
  const [show1,setShow1] = useState(false);
  const [name,setName] = useState();
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  const [confirmPassword,setConfirmPassword] = useState();
  const [pic,setPic] = useState();
  
  const handleClick = () =>setShow(!show)
  const handleClick1 = () =>setShow1(!show1)

  const postDetails = (pics) => { };
  const submitHandler = () => {};


  return (
    <div className='Signup'>
      <form className='SignupForm'>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          className='SignupInput'
          id="name" // Add an ID to match the label's `for` attribute
          placeholder='Enter your name'
          required // Mark the input field as required
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email" // Use the appropriate input type for email addresses
          className='SignupInput'
          id="email" // Add an ID to match the label's `for` attribute
          placeholder='Enter your email'
          required // Mark the input field as required
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <div className="paswordInputContainer">
        <input
          type={show1 ? "text" : "password"}
          className='SignupInput'
          id="password" // Add an ID to match the label's `for` attribute
          placeholder='Enter your password'
          required // Mark the input field as required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button style={{backgroundColor:"white",color:"black" , fontWeight:"600" }} 
        type='button' onClick={handleClick1}>
          {show1 ? "hide" : "Show"}
        </button>

        </div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <div className="paswordInputContainer2">
        <input
          type={show ? "text" : "password"}
          className='SignupInput'
          id="confirmPassword" // Add an ID to match the label's `for` attribute
          placeholder='Confirm Password'
          onChange={(e) => setConfirmPassword(e.target.value)}
          required // Mark the input field as required
        />
        <button style={{backgroundColor:"white",color:"black",fontWeight:"600" }} 
        type='button' onClick={handleClick}>
          {show ? "hide" : "Show"}
        </button>
        </div>
        <label>Upload your picture (optional)</label> {/* Remove asterisk and colon */}
        <input type="file" 
        id="pic"
        onChange={(e) => postDetails(e.target.files[0])} />
        <button  style={{backgroundColor:"blue", color:"white",padding:"6px" ,borderRadius:"10px",  marginTop:"15px"}} 
        type="submit" onClick={submitHandler}>Sign Up</button>
        
      </form>
    </div>
  );
};

export default Signup;

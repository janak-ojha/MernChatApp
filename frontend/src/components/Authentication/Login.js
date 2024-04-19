import React, { useState } from 'react'
import "./Login.css";


const Login = () => {
  const [email,setEmail] = useState();
  const [password,setPassword] =useState();
  const [show,setShow] = useState(false);
  
  const handleClick = () =>setShow(!show)

  const submitHandler = () => {};



  return (
    <div className='Login'>
      <form className='LoginForm'>
        <label htmlFor='email' >Email</label>
        <input type="email"
        className='LoginInput'
        id='email'
        placeholder='Enter your email' 
        required
        onChange={(e) => setEmail(e.target.value)}
        />
        
        <label htmlFor="password">Password</label>
        <div className="paswordInputContainer">
        <input
          type={show ? "text" : "password"}
          className='SignupInput'
          id="password" // Add an ID to match the label's `for` attribute
          placeholder='Enter your password'
          required // Mark the input field as required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button style={{backgroundColor:"white",color:"black" , fontWeight:"600" }} 
        type='button' onClick={handleClick}>
          {show ? "hide" : "Show"}
        </button>

        </div>

        <button  style={{backgroundColor:"blue", color:"white",width:"100%",padding:"8px" ,borderRadius:"10px",  marginTop:"15px"}} 
        type="submit" onClick={submitHandler}>login</button>
        <button  
        style={{backgroundColor:"red", color:"white",width:"100%" ,padding:"8px",borderRadius:"10px",  marginTop:"3px"}} 
        type="submit" onClick={() => {
          setEmail("guest@gmail.com");
          setPassword("12345");
        }}>Get Guest User Credentials</button>
         
      </form>
    </div>
  )
}

export default Login
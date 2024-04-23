import React, { useState } from 'react'
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email,setEmail] = useState();
  const [password,setPassword] =useState();
  const [show,setShow] = useState(false);
  const [loading,setLoading] = useState(false);  
  const history = useNavigate();
  const handleClick = () =>setShow(!show)

  const submitHandler = async(e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(false);

    if (!email || !password) {
      alert("Please fill all the fields");
      setLoading(false);
      return;
    }
    try {
      
    
      
      let fields = {email,password};
      console.log(fields);
      let data = await fetch(`http://localhost:5000/api/user/login`,{
        method:"post",
        body: JSON.stringify(fields),
        headers:{
          "Content-Type": "application/json"
        }
      });
      data = await data.json();
      

      alert("login succesfull");
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history("/chats"); 
    } 
    catch (error) {
      console.log(error);
      alert("An error occurred while login");
      setLoading(false);
    }

   
      


  };



  return (
    <div className='Login'>
      <form className='LoginForm' onSubmit={submitHandler}>
        <label htmlFor='email' >Email</label>
        <input type="email"
        className='LoginInput'
        id='email'
        placeholder='Enter your email' 
        value={email}
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
          value={password}
          required // Mark the input field as required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button style={{backgroundColor:"white",color:"black" , fontWeight:"600" }} 
        type='button' onClick={handleClick}>
          {show ? "hide" : "Show"}
        </button>

        </div>

        <button  style={{backgroundColor:"blue", color:"white",width:"100%",padding:"8px" ,borderRadius:"10px",  marginTop:"15px"}} 
        type="submit" 
        disabled={loading}
        >
        {loading ? "Login.." : "Login"}
        </button>
        <button  
        style={{backgroundColor:"red", color:"white",width:"100%" ,padding:"8px",borderRadius:"10px",  marginTop:"3px"}} 
        type="submit" 
        onClick={() => {
          setEmail("guest@gmail.com");
          setPassword("12345");
        }}>Get Guest User Credentials</button>
         
      </form>
    </div>
  )
}

export default Login
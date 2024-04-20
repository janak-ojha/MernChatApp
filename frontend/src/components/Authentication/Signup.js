import React, { useState } from 'react';
import './Signup.css';
import axios from "axios"
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useNavigate();

  const handleClick = () => setShow(!show);
  const handleClick1 = () => setShow1(!show1);

  const submitHandler = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true);

    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill all the fields");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user",
        { name, email, password, pic},
        config
      );
    
      alert("Registered Successfully");
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
    } catch (error) {
      console.error(error);
      alert("An error occurred while registering");
      setLoading(false);
      history('/login');
    }
  };

  const postDetails = (pics) => {
    setLoading(false);
    if (!pics) {
      alert("Please select the image");
      setLoading(false);
      return;
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "daq3galr7");
      fetch("https://api.cloudinary.com/v1_1/daq3galr7/image/upload", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setPic(data.url.toString());
          console.log(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          alert("An error occurred while uploading the image");
          setLoading(false);
        });
    } else {
      alert("please select the image");
      setLoading(false);
      return;
    }
  };

  return (
    <div className='Signup'>
      <form className='SignupForm' onSubmit={submitHandler}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          className='SignupInput'
          id="name"
          placeholder='Enter your name'
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          className='SignupInput'
          id="email"
          placeholder='Enter your email'
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <div className="passwordInputContainer">
          <input
            type={show1 ? "text" : "password"}
            className='SignupInput'
            id="password"
            placeholder='Enter your password'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            style={{ backgroundColor: "white", color: "black", fontWeight: "600" }}
            type='button'
            onClick={handleClick1}
          >
            {show1 ? "Hide" : "Show"}
          </button>
        </div>

        <label htmlFor="confirmPassword">Confirm Password</label>
        <div className="passwordInputContainer2">
          <input
            type={show ? "text" : "password"}
            className='SignupInput'
            id="confirmPassword"
            placeholder='Confirm Password'
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            style={{ backgroundColor: "white", color: "black", fontWeight: "600" }}
            type='button'
            onClick={handleClick}
          >
            {show ? "Hide" : "Show"}
          </button>
        </div>

        <label>Upload your picture (optional)</label>
        <input
          type="file"
          id="pic"
          onChange={(e) => {
            // Check if the event target is the file input element
            if (e.target.id === "pic") {
              postDetails(e.target.files[0]);
            }
          }}
        />

        <button
          style={{
            backgroundColor: "blue",
            color: "white",
            padding: "6px",
            borderRadius: "10px",
            marginTop: "15px",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.6 : 1,
          }}
          type="submit"
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Signup;

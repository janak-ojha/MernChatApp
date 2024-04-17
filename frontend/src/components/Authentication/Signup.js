import React from 'react';
import './Signup.css'; // Import your CSS file for styling

const Signup = () => {
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
        />
        <label htmlFor="email">Email</label>
        <input
          type="email" // Use the appropriate input type for email addresses
          className='SignupInput'
          id="email" // Add an ID to match the label's `for` attribute
          placeholder='Enter your email'
          required // Mark the input field as required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className='SignupInput'
          id="password" // Add an ID to match the label's `for` attribute
          placeholder='Enter your password'
          required // Mark the input field as required
        />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          className='SignupInput'
          id="confirmPassword" // Add an ID to match the label's `for` attribute
          placeholder='Confirm Password'
          required // Mark the input field as required
        />
        <label>Upload your picture (optional)</label> {/* Remove asterisk and colon */}
        <input type="file" />
        <button  type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;

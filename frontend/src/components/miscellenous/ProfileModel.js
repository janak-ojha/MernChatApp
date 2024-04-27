import React, { useState } from 'react';

const ProfileModel = ({ user, children }) => {
  // State to manage whether the profile is visible or not
  const [showProfile, setShowProfile] = useState(false);

  // Function to toggle the visibility of the profile
  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  return (
    <div>
      {/* Button to toggle the profile visibility */}
      <button onClick={toggleProfile}>{children}</button>

      {/* Conditional rendering of the profile based on state */}
      {showProfile && (
        <div>
          {/* Display the user's profile details here */}
          <h2>User Profile</h2>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          {/* You can add more profile details here */}
        </div>
      )}
    </div>
  );
};

export default ProfileModel;

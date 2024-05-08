import React, { useState, useEffect, useRef } from 'react';
import "./ProfileModel.css";

const ProfileModel = ({ user }) => {
  // State to manage whether the profile modal is visible or not
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);

  // Function to toggle the visibility of the modal
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  // Function to handle click outside the modal
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    // Add event listener when component mounts
    document.addEventListener("mousedown", handleClickOutside);
    // Remove event listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className='model'>
      {/* Icon to toggle the profile modal visibility */}
      <div className='Eyeicon'>
        <i className="fa-regular fa-eye" onClick={toggleModal}></i>
      </div>

      {/* Modal for displaying the profile details */}
      {showModal && (
        <div className='modelcontainer' ref={modalRef}>
          <span className="close" onClick={toggleModal}>&times;</span>
          {/* Display the user's profile details */}
          <div style={{fontSize:"25px"}}>{user.name}</div>
          <div className='ImgProfileModel'><img src={user.pic} alt="User Profile Picture" /></div>
          <div style={{fontFamily:"sans-serif", fontSize:"15px"}}>{user.email}</div>
          {/* You can add more profile details here */}
        </div>
      )}
    </div>
  );
};

export default ProfileModel;

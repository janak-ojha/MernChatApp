import React from 'react';
import './userListItem.css';

const UserListItem = ({ user, handleFunction }) => {
  return (
    <div className='UserList' onClick={handleFunction}>
      <div className="avatar-skeleton">
        {user.pic ? (
          <img src={user.pic} alt="Profile" className="avatar-image" />
        ) : (
          <div className="avatar-placeholder">No Image</div>
        )}
      </div>
      <div className="text-skeleton">
        <div className="user-name">{user.name}</div>
        <div className="user-email">{user.email}</div>
      </div>
    </div>
  );
};

export default UserListItem;

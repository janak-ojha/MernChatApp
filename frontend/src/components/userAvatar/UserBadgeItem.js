import React from 'react';

const UserBadgeItem = ({ user, handleFunction }) => {
    return (
        <div style={{ display: "inline-block", marginRight: "10px" }} onClick={handleFunction}>
            <div style={{ width: "auto", padding: "2px", borderRadius: "5px", cursor: "pointer", color: "white", display: "inline-flex", alignItems: "center" ,backgroundColor:"blue"}}>
                {user.name}
                <i className="fa-solid fa-xmark" style={{ marginLeft: "5px" }}></i>
            </div>
        </div>
    );
};

export default UserBadgeItem;

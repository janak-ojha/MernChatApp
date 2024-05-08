import React from 'react';

const UserBadgeItem = ({ user, handleFunction }) => {
    return (
        <div style={{ display: "inline-block", marginRight: "10px" }} onClick={handleFunction}>
            <div style={{ width: "100%", padding: "1px", borderRadius: "5px",fontSize:"15px" , marginTop:"20px", cursor: "pointer", color: "white", display: "inline-flex", alignItems: "center" ,backgroundColor:" rgb(10, 99, 110)"}}>
                {user.name}
                <i className="fa-solid fa-xmark" style={{ marginLeft: "5px" }}></i>
            </div>
        </div>
    );
};

export default UserBadgeItem;

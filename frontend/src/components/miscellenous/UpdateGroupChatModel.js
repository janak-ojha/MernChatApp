import React, { useState } from 'react';
import "./GroupModel.css"; // Import your CSS file for styling
import { ChatState } from '../../context/ChatProvider';
import UserBadgeItem from "../userAvatar/UserBadgeItem"
import axios from 'axios';
import UserListItem from '../userAvatar/UserListItem';

const GroupModel = ({ fetchAgain,setFetchAgain }) => {
  // State to manage whether the group modal is visible or not
  const [showModal, setShowModal] = useState(false);
  const {selectedChat,setSelectedChat,user}=ChatState();
  const [groupChatName,setGroupChatName] = useState();
  const [search,setSearch] = useState("");
  const [searchResult,setSearchResult] = useState([]);
  const [loading ,setLoading] = useState(false);
  const [renameLoading, setRenameLoading]=useState(false);


  // Function to toggle the visibility of the modal
  const toggleModal = () => {
    setShowModal(!showModal);
  };
 const handleRemove = async(user1) =>{
  if(selectedChat.groupAdmin._id !== user._id && user1._id !== user._id)
    {
      alert("Only admin can remove the someone");
      return;
    }
 try {
  setLoading(true);
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  const {data} =await axios.put(`http://localhost:5000/api/chat/groupremove`,
    {
      chatId: selectedChat._id,
      userId: user1._id,
    },
    config
  );
  user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
  setFetchAgain(!fetchAgain)
  setLoading(false);
  
 } catch (error) {
  alert("error occured while removing the user");
  setLoading(false);
  
 }
 };

 const handleAddUser = async(user1) =>{
  if(selectedChat.users.find((user) =>user._id=== user1._id))
    {
      alert("user already in group");
      return;
    }
  if(selectedChat.groupAdmin._id !== user._id) {
    alert("only admin can add someone");
    return;
  }  

  try {
    setLoading(true);
    const config={
      headers:{
        Authorization:`Bearer ${user.token}`,
      },
    };
    const {data} = await axios.put(`http://localhost:5000/api/chat/groupadd`,{
      chatId:selectedChat._id,
      userId:user1._id,
    },
    config
  );
  setSelectedChat(data);
  setFetchAgain(!fetchAgain);
  setLoading(false);
    
  } catch (error) {
    alert("error occured during adding user ")
    
  }


 }

 const handleRename= async() =>{
  if(!groupChatName) return

  try {
    setRenameLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const {data} = await axios.put('http://localhost:5000/api/chat/rename',
      {
        chatId: selectedChat._id,
        chatName: groupChatName,  
      },
      config
    );
    setSelectedChat(data);
    setFetchAgain(!fetchAgain);
    setRenameLoading(false);

  } catch (error) {
    alert("Error occured during rename");
    setRenameLoading(false);
  };

 setGroupChatName("");

 };



 const handleSearch= async(query) =>{
  setSearch(query);
  if(!query){
    return;
  }
  try {
    setLoading(true);
    const config ={
        headers:{
          Authorization: `Bearer ${user.token}`,

        },
    };
    const {data} =await axios.get(`http://localhost:5000/api/user/userall?search=${search}`,config);
    setLoading(false);
    setSearchResult(data);
    
  } catch (error) {
    alert("the  error occured while searching");
    setLoading(false);
    
  }
 };

  return (
    <div className='group'>
      {/* Icon to toggle the group modal visibility */}
      <div className='groupIcon'>
        <i className="fa-regular fa-eye" onClick={toggleModal}></i>
      </div>

      {/* Modal for displaying the group details */}
      {showModal && (
        <div className='groupModal'>
          {/* Close button for the modal */}
          <span className="close" onClick={toggleModal}>&times;</span>
          <div className='GroupModelHeader'>{selectedChat.chatName}</div>
          <div className='GroupModelBody' >
            {selectedChat.users.map((user) => (
              <UserBadgeItem
              key={user._id}
              user={user}
              handleFunction={() =>handleRemove(user)}
                />
            ))}
        
          <form style={{display:"flex", marginTop:"20px",width:"100%"}}>
          
              <input 
              style={{width:"80%",borderRadius:"8px" ,border:" 1px solid #747171"}}
              type='text'
              value={groupChatName}
              placeholder='Chat Name'
              onChange={(e) => setGroupChatName(e.target.value)}
              />
           
       
              <button 
              style={{backgroundColor:"blueviolet", padding:"8px",color:"white" ,borderRadius:"8px" ,marginLeft:"10px",border:"None"} }
              disabled={renameLoading}
              onClick={handleRename}
              >
                Update
              </button>
       
          </form>
          <form action="" style={{width:"100%"}}>
            <input 
            type="text" 
            placeholder='Add User to group'
            style={{padding:"7px",marginTop:'5px',width:"95%",borderRadius:"5px",border:" 1px solid #747171"}}
            onChange={(e) => handleSearch(e.target.value)} 
            />
          </form>
          <div className='searchedGroupMember'>
          
          {loading ? (
            loading
          ):(
            searchResult?.map((user) => (
              <UserListItem
              key={user._id}
              user={user}
              handleFunction={() => handleAddUser(user)}
              />
            ))
            
          )}
          
          </div>
          


          
          {/* Add more group details as needed */}
        </div>
        <div style={{display:"flex",justifyContent:"flex-end" ,width:"100%"}}>
          <button style={{backgroundColor:"blue", color:"white" ,display:'flex', marginTop:"10px",padding:"10px",borderRadius:"8px",border:"None"} } onClick={() => handleRemove(user)} >
            Leave Group
          </button>
        </div>
        </div>  

      )}
    </div>
  );
};

export default GroupModel;

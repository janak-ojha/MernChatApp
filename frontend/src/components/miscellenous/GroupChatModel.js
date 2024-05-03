import React, { useState } from 'react';
import "./GroupChatModel.css";
import { ChatState } from '../../context/ChatProvider';
import axios from 'axios';

const GroupChatModel = ({ children }) => {    
    const [isOpen, setIsOpen] = useState(false); // State to manage whether the modal is open

    const openModal = () => {
        setIsOpen(true); // Set isOpen to true to open the modal
    };

    const closeModal = () => {
        setIsOpen(false); // Set isOpen to false to close the modal
    };

    const [groupChatName,setGroupChatName] = useState();
    const [selectedUsers,setSelectedusers] =useState();
    const [searchResult,setSearchResult] =useState([]);
    const [search,setSearch]=useState("");
    const [loading,setLoading] =useState(false);

    const { user,chats,setChats} =ChatState();
    const RemoveModel = () => {
        closeModal(); // Close the modal when the 'X' icon is clicked
    };

    const handleSearch = async(query) => {
        setSearch(query);
        if(!query)
        {
            return;
        }
        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const {data} = await axios.get(`http://localhost:5000/api/user?search=${search}`,config);
            console.log(data);
            setLoading(false);
            setSearchResult(data);
            
        } catch (error) {
            alert("Failed to load the search result");
            
        }
    };

    const handleSubmit = () => {};


    return (
        <div className='groupChat'>
            <button className='MyChatButtonG' onClick={openModal}>New Group chat
                <i className="fa-solid fa-plus"></i>
            </button>
            {isOpen && (
                <div className="modal">
                   
                    <div className="modal-content">
                    <div className='icon' onClick={RemoveModel}>
                            <i class="fa-solid fa-xmark"></i> 
                            </div> 
                        <div className='GroupHeader'>
                        
                            Create group chat
                            
                        </div>
                        <div className='GroupBody'>
                            <form action="">
                                <div className='GroupName'>
                
                                <input 
                                type="text"
                                className='Text'
                                placeholder='Chat Name'
                                onChange={(e) => setGroupChatName(e.target.value)}
                                 />
                                 </div>
                                 <div className='GroupSearch'>
                                <input 
                                type="text"
                                className='Searchs'
                                placeholder='Add user: janak,ankit,bj'
                                onClick={(e) => handleSearch(e.target.value)}
                                 />
                                 </div>
                                 {/* {render search user} */}
                            </form>
                
                        </div>
                        <div className='GroupFooter'>
                            <button
                            className='GroupHandleButton'
                            onClick={handleSubmit}>
                                Create Chat
                            </button>
                        </div>
                        
                        <span className="close" onClick={closeModal}>&times;</span>
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
};

export default GroupChatModel;

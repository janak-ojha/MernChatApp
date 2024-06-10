import React, { useState, useRef, useEffect } from 'react';
import "./GroupChatModel.css";
import { ChatState } from '../../context/ChatProvider';
import axios from 'axios';
import UserListItem from "../userAvatar/UserListItem";
import UserBadgeItem from '../userAvatar/UserBadgeItem';

const GroupChatModel = () => {    
    const [isOpen, setIsOpen] = useState(false); // State to manage whether the modal is open
    const modalRef = useRef(); // Reference to the modal element

    const [groupChatName, setGroupChatName] = useState("");
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const { user, chats, setChats } = ChatState();
    
    useEffect(() => {
        // Function to handle clicks outside the modal
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setIsOpen(false);
                resetModal(); // Reset the modal fields
            }
        };

        // Add event listener to detect clicks outside the modal
        document.addEventListener("mousedown", handleClickOutside);

        // Cleanup function to remove event listener when component unmounts
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [modalRef]);

    const openModal = () => {
        setIsOpen(true); // Set isOpen to true to open the modal
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const resetModal = () => {
        setGroupChatName("");
        setSelectedUsers([]);
        setSearchResult([]); // Clear the search results
    };

    const handleSearch = async (query) => {
        setSearch(query);
        if (!query) {
            return;
        }
        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL_BACKEND}/api/user/userall?search=${query}`, config);
            setLoading(false);
            setSearchResult(data);
        } catch (error) {
            alert("Failed to load the search result");
        }
    };

    const handleSubmit = async() => {
        if(!groupChatName || !selectedUsers){
            alert("please fill all the fields");
            return;
        }
        try {
            const config ={
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            
            const { data } =await axios.post(`${process.env.REACT_APP_BASE_URL_BACKEND}/api/chat/group`,{
                name: groupChatName,
                users: JSON.stringify(selectedUsers.map((u) => u._id)),
            },config);
            setChats([data, ...chats]);
            closeModal(); // Close the modal after creating the chat
            resetModal(); // Reset the modal fields
            alert("New group chat created");
            
        } catch (error) {
            alert("Failed to create chat");
        }
    };

    const handleDelete = (delUser) => {
        setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
    };

    const handleGroup = (userToAdd) => {
        if(selectedUsers.includes(userToAdd)){
           alert("User already exists");
           return;
        }
        setSelectedUsers([...selectedUsers,userToAdd]);
    };

    return (
        <div className='groupChat'>
            <button className='MyChatButtonG' onClick={openModal}>New Group chat
                <i className="fa-solid fa-plus"></i>
            </button>
            {isOpen && (
                <div className="modal">
                    <div className="modal-content" ref={modalRef}>
                        <div className='icon' onClick={closeModal}>
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
                                        placeholder='Chat Name '
                                        onChange={(e) => setGroupChatName(e.target.value)}
                                        value={groupChatName} // Add value attribute to bind the input with state
                                    />
                                </div>
                                <div className='GroupSearch'>
                                    <input 
                                        type="text"
                                        className='Searchs'
                                        placeholder='Add user: janak,ankit,bj'
                                        onChange={(e) => handleSearch(e.target.value)} // Call handleSearch on input change
                                    />
                                    <div className='UserBadhe'> 
                                   {selectedUsers.map((user) => (
                                    <UserBadgeItem
                                      key={user._id}
                                      user={user}
                                      handleFunction={() => handleDelete(user)}
                                    />
                                   ))}
                                   </div >
                                    {loading ? <div>loading</div> : (
                                        searchResult?.slice(0, 4).map(user => (
                                            <UserListItem
                                                key={user._id} 
                                                user={user} 
                                                handleFunction={() => handleGroup(user)}
                                            />
                                        ))
                                    )}
                                </div>
                            </form>
                        </div>
                        <div className='GroupFooter'>
                            <button
                                className='GroupHandleButton'
                                onClick={handleSubmit}>
                                Create Chat
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GroupChatModel;

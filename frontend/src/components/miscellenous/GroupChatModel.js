import React, { useState, useRef, useEffect } from 'react';
import "./GroupChatModel.css";
import { ChatState } from '../../context/ChatProvider';
import axios from 'axios';
import UserListItem from "../userAvatar/UserListItem";
import UserBadgeItem from '../userAvatar/UserBadgeItem';
const GroupChatModel = ({ children }) => {    
    const [isOpen, setIsOpen] = useState(false); // State to manage whether the modal is open
    const modalRef = useRef(); // Reference to the modal element

    useEffect(() => {
        // Function to handle clicks outside the modal
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setIsOpen(false);
                setSearchResult([]);  // Close the modal if the click is outside
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
        setSearchResult([]);  // Set isOpen to false to close the modal
    };

    const [groupChatName, setGroupChatName] = useState();
    const [selectedUsers, setSelectedusers] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const { user, chats, setChats } = ChatState();
    
    const RemoveModel = () => {
        closeModal(); // Close the modal when the 'X' icon is clicked
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
            const { data } = await axios.get(`http://localhost:5000/api/user/userall?search=${query}`, config);
            setLoading(false);
            setSearchResult(data);
        } catch (error) {
            alert("Failed to load the search result");
        }
    };

    const handleSubmit = async() => {
        if(!groupChatName || !selectedUsers){
            alert("please fill all the field")
            return;
        }
        try {
            const config ={
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            
            const { data } =await axios.post("http://localhost:5000/api/chat/group",{
                name: groupChatName,
                users: JSON.stringify(selectedUsers.map((u) => u._id)),
               
            },config);
            setChats([data, ...chats]);
            setIsOpen(false);
            alert("new group chat created");

            
        } catch (error) {
            alert("failed to create chat");
            
        }

    };

    const handleDelete = (delUser) => {
        setSelectedusers(
          selectedUsers.filter((sel) => sel._id !== delUser._id));
    };

    const handleGroup = (userToAdd) => {
        if(selectedUsers.includes(userToAdd)){
           alert("user already exist")
           return;
        };

        setSelectedusers([...selectedUsers,userToAdd]);


    };

    return (
        <div className='groupChat'>
            <button className='MyChatButtonG' onClick={openModal}>New Group chat
                <i className="fa-solid fa-plus"></i>
            </button>
            {isOpen && (
                <div className="modal">
                    <div className="modal-content" ref={modalRef}>
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
                                        placeholder='Chat Name '
                                        onChange={(e) => setGroupChatName(e.target.value)}
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
                        <span className="close" onClick={closeModal}>&times;</span>
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
};

export default GroupChatModel;

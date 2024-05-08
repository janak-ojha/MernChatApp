import { ChatState } from "../context/ChatProvider";
import SideDrawer from "../components/miscellenous/SideDrawer";
import MyChat from "../components/MyChat";
import ChatBox from "../components/ChatBox";
import "./ChatPage.css"
import { useState } from "react";

const ChatPage = () => {
  const { user } = ChatState();
  const [fetchAgain,setFetchAgain] = useState(false);
  

  return (
    <div className="chatContainer">
      <div className="sidebox">
      {user &&  <SideDrawer/>}
      </div>
      <div className="chatbox">
        {user && <MyChat fetchAgain={fetchAgain} />}
        {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>} 
      </div>
    </div>
  );
};

export default ChatPage;

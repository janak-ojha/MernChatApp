import { ChatState } from "../context/ChatProvider";
import SideDrawer from "../components/miscellenous/SideDrawer";
import MyChat from "../components/MyChat";
import ChatBox from "../components/ChatBox";
import "./ChatPage.css"

const ChatPage = () => {
  const { user } = ChatState();
  

  return (
    <div className="chatContainer">
      <div className="sidebox">
      {user &&  <SideDrawer/>}
      </div>
      <div className="chatbox">
        {user && <MyChat/>}
        {user && <ChatBox/>} 
      </div>
    </div>
  );
};

export default ChatPage;

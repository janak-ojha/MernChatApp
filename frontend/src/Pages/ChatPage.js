import { ChatState } from "../context/ChatProvider";
import SideDrawer from "../components/miscellenous/SideDrawer";
import MyChat from "../components/miscellenous/MyChat";
import ChatBox from "../components/miscellenous/ChatBox";
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

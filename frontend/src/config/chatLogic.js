// import Message from "../../../backend/models/messageModel";

export const getSender= (loggedUser,users)=>{
    return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
};

export const getSenderFull= (loggedUser,users)=>{
    return users[0]._id === loggedUser._id ? users[1] : users[0];
};

export const isSameSender = (messages, m, i, userId) => {
  console.log(messages,m,i,messages.length-1);
    return (
      i < messages.length - 1 &&
      (messages[i + 1].sender._id !== m.sender._id ||
        messages[i + 1].sender._id === undefined) &&
      messages[i].sender._id !== userId
    );
  };

  export const isLastMessage = (messages, i, userId) => {
    console.log(userId,messages[messages.length - 1].sender._id );
    return (
      i === messages.length - 1 &&
      messages[messages.length - 1].sender._id !== userId &&
      messages[messages.length - 1].sender._id
    );
  };

  export const isSameSenderMargin = (messages,m,i,userId) => {
    if(
      i<messages.length-1 && 
      messages[i+1].sender._id === m.sender._id &&
      messages[i].sender._id !== userId
    )
    return 33;

  // if deiffrent user 33 margin

    else if(
      (i < messages.length -1 && 
        messages[i+1].sender._id !== m.sender._id &&
        messages[i].sender._id !== userId) ||

        (i === messages.length-1 && messages[i].sender._id !== userId)
      )
      return 0;
      else return "auto";
      // if last message no margin
    
  };

  export const isSameUser = (messages,m,i) => {
    return i > 0 && messages[i-1].sender._id === m.sender._id;
  };
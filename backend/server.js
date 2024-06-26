const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const connectDB = require("./config/db"); // Corrected import statement
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require('./middleware/errorMiddleware');


const app = express();
dotenv.config();
connectDB();
const cors = require("cors");
const { Socket } = require("socket.io");

app.use(cors()); // Moved cors middleware to the top

app.use(express.json()); // to accept the json data

app.get("/", (req, res) => {
    res.send("Api is running Successfully");
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

// deployment




app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

 const server = app.listen(PORT, console.log(`Server Started on PORT ${PORT}`.yellow.bold));

 const io = require("socket.io")(server,{
    pingTimeout: 60000,
    cors: {
        origin: `${process.env.FRONTEND_URL}`,
    },

 });

 io.on("connection",(socket) => {
    console.log("connected to sockeg.io");

    socket.on("setup",(userData) => {
        socket.join(userData._id);
        socket.emit("connected");
    });

    socket.on("join chat",(room) => {
        socket.join(room);
        console.log("user joined room " + room);
    });

    socket.on("typing",(room) => socket.in(room).emit("typing"));
    socket.on("stop typing",(room) => socket.in(room).emit("stop typing"));
    

    socket.on("new message",(newMessageRecieved) =>{
        var chat = newMessageRecieved.chat;
        if(!chat.users) return console.log("chat user is not defined");

        chat.users.forEach((user) => {
            if(user._id == newMessageRecieved.sender._id) return;
            socket.in(user._id).emit("message recieved",newMessageRecieved);
        });



    socket.off("setup",() => {
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
    });
    });
 });

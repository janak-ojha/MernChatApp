const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const connectDB = require("./config/db"); // Corrected import statement
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const app = express();
dotenv.config();
connectDB();
const cors = require("cors");

app.use(cors()); // Moved cors middleware to the top

app.use(express.json()); // to accept the json data

app.get("/", (req, res) => {
    res.send("Api is running Successfully");
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server Started on PORT ${PORT}`.yellow.bold));

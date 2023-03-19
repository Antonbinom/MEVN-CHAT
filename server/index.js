require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const helmet = require("helmet");
const cors = require("cors");
const colors = require("colors");

const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is Running");
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.use(notFound);
app.use(errorHandler);

const server = app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`.yellow.bold)
);

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:9000",
  },
});

io.on("connection", (socket) => {
  console.log("connected socket.io");
  socket.on('setup', (userData) => {
    socket.join(userData._id);
    console.log(userData.name, 'connected');
    socket.emit('connected')
  });

  socket.on('join chat', (room) => {
    socket.join(room);
    console.log('User Joined Room:', room);
  });

  socket.on('typing', room => socket.in(room).emit('typing'));
  socket.on('stop typing', room => socket.in(room).emit('stop typing'));

  socket.on('new message', (messageReceived) => {
    let { chat, sender } = messageReceived
    if (!chat.users) console.log('users not defined');
    chat.users.forEach(user => {
      if (user._id === sender._id) return
      socket.in(user._id).emit('message received', messageReceived)
    });
  })
});

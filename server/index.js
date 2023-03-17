// получаем доступ к файлу .env
require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const colors = require("colors");

const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");

const app = express();
// Номер порта будет вызван из файла .env, либо будет равен 5000
const PORT = process.env.PORT || 5000;

connectDB();

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(cors());
// разрешаем использовать json
app.use(express.json());

const start = async () => {
  try {
    app.get("/", (req, res) => {
      res.send("API is Running");
    });

    app.use("/api/user", userRoutes);
    app.use("/api/chat", chatRoutes);
    app.use("/api/message", messageRoutes);

    app.use(notFound);
    app.use(errorHandler);

    app.listen(PORT, () =>
      console.log(`Server is running on http://localhost:${PORT}`.yellow.bold)
    );
  } catch (err) {
    console.log(err.red.bold);
  }
};

start();

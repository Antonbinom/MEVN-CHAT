// получаем доступ к файлу .env
require('dotenv').config()

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const colors = require('colors');

// const cookieParser = require('cookie-parser');
const { chats } = require('./data/data');
const connectDB = require('./config/db');

connectDB()
const app = express();

// Номер порта будет вызван из файла .env, либо присвоем ему 5000
const PORT = process.env.PORT || 5000

const start = async () => {
  try {
    app.use(helmet({
      contentSecurityPolicy: false
    }));
    app.use(cors());
    app.get("/", (req, res) => {
      res.send("API is Running");
    });
    // Раут страницы с чатами
    app.get('/api/chat', (req, res) => res.send(chats));
    // Раут отдельного чата
    app.get('/api/chat/:id', (req, res) => {
      const singleChat = chats.find(item => item._id === req.params.id);
      res.send(singleChat);
    })

    app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`.yellow.bold));

  } catch (err) {
    console.log(err.red.bold);
  }
}

start()

const mongoose = require('mongoose');

// Поджключаем базу
const connectDB = async () => {
  try {
    mongoose.set('strictQuery', true);
    const { connection } = await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${connection.host}`.cyan.underline);

  } catch (error) {
    console.log(`Error: ${error.message}`.red.bold);
    process.exit()
  }
}

module.exports = connectDB;

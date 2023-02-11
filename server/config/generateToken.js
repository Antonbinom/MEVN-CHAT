const jwt = require('jsonwebtoken');
// создаем уникальный jwt токен с помощью библиотеки jsonwebtoken
const generateToken = (id) => {
  // в качестве подписи использую id пользователя, секретное слово
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    // срок жизни 30 дней
    expiresIn: "30d"
  })
}

module.exports = generateToken;

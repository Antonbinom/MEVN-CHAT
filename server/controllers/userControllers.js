const asyncHandler = require('express-async-handler')
const User = require('../models/userModel');
const generateToken = require('../config/generateToken');

// Создаем контролер, который будет создавать нового пользователя
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, pic } = req.body
    // если нет данных
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please Enter all the Fields')
    }
    // проверяем наличие пользователя с таким же email
    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400);
        throw new Error('User already exists')
    }
    // если нет такого, создаем нового пользователя в базе
    const user = await User.create({
        name,
        email,
        password,
        pic
    });

    // если удалось создать пользователя
    if (user) {
        // передаем в ответ статус 201 и данные пользователя
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            // создаем метод генерации токена
            token: generateToken(user, _id)
        });
    } else {
        res.status(400);
        throw new Error('Failed tot Create the User')
    }
});

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user, _id)
        });
    } else {
        res.status(401);
        throw new Error('Invalid Email or Password')
    }
});

module.exports = { registerUser, authUser }
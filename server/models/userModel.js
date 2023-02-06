const mongoose = require('mongoose');

const userModel = mongoose.Schema(
    {
        name: { type: String, require: true },
        email: { type: String, require: true, unique: true },
        password: { type: String, require: true },
        pic: {
            type: String,
            default: 'https://avatars.githubusercontent.com/u/86820380?s=400&u=b41c1ce0824526093b57ef4afcd6a3a7193cfd64&v=4'
        },
    },
    { timestamps: true }
)

const User = mongoose.model('User', userModel)

module.exports = User;
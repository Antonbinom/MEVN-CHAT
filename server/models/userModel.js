import mongoose from 'mongoose';

const userModel = mongoose.Schema(
    {
        name: { type: String, trim: true },
        email: { type: String, trim: true },
        password: { type: String, trim: true },
        pic: { type: String, trim: true, default: 'https://avatars.githubusercontent.com/u/86820380?s=400&u=b41c1ce0824526093b57ef4afcd6a3a7193cfd64&v=4' },
    },
    { timestamps: true }
)

const User = mongoose.model('User', userModel)

export default { User }
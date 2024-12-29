import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: [6, 'Eamil must be at least 6 charcters'],
        maxLength: [50, 'Eamil must not be longer than 50 charcters'],
    },

    password: {
        type: String,
        select: false,
    }
})

userSchema.static.hashPassword = async function (password){
    return  await bcrypt.hash(password, 10);
} 

userSchema.method.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.method.generateJWT = function() {
    return jwt.sign({ email: this.email}, process.env.JWT_SECRET)
}

const User = mongoose.model('user', userSchema);

export default User;
const mongoose = require('mongoose');
const validator = require('validator');


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: [true, "email alredy taken"],
        lowercase: true,
        validate: [validator.isEmail, "Email is invalid"],
        required: [true, "email is required"]
    },
    password: {
        type: String,
        required: [true, "password is reqired"],
        minlength: 8,
        select: false
    },
    clearance: {
        type: String,
        enum: ['level 1', 'level 2', 'admin'],
        default: 'level 1'
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;


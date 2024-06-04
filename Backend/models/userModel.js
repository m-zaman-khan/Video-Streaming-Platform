const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    isadmin: {
        type: Boolean,
        default:false,
        required: true,
    }
});

const User = mongoose.model('User', userSchema);

module.exports = { User };

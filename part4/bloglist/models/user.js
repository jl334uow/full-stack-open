const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
    },
    name: String,
    passwordHash: {
        type: String,
        required: true,
        minlength: 3,
    }
})

module.exports = mongoose.model('User', userSchema)
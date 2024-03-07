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
    },
    blogs: [
        {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Blog'
            },
            url: {
                type: String,
                ref: 'Blog'
            },
            title: {
                type: String,
                ref: 'Blog'
            },
            author: {
                type: String,
                ref: 'Blog'
            }
        }
    ]
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

module.exports = mongoose.model('User', userSchema)
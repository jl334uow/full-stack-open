const mongoose = require('mongoose')


const blogSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    likes: Number,
    user: {
      username: {
        type: String,
        ref: 'User'
      },
      name: {
        type: String,
        ref: 'User'
      },
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
    },
  })
  
  blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
    }
})

module.exports = mongoose.model('Blog', blogSchema)
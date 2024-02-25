const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
    Blog.find({}).then(blogs => {
        response.json(blogs)
        console.log(blogs)
      })
  })

  blogsRouter.get('/api/blogs', (request, response) => {
  Blog.find({}).then(blogs => {
      response.json(blogs)
      console.log(blogs)
    })
})

blogsRouter.post('/api/blogs', (request, response) => {
  const blog = new Blog({
    title: 'Mr',
    author: 'bill',
    url: 'xyz',
    likes: 1
  })

  blog.save().then(result => {response.status(201).json(result)})
})

module.exports = blogsRouter
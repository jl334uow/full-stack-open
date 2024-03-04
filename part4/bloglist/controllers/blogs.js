const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', (request, response) => {
    Blog.find({}).then(blogs => {
        response.json(blogs)
        console.log(blogs)
      })
  })

blogsRouter.get('/api/blogs', (request, response) => {
  Blog.find({}).then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post('/api/blogs', (request, response) => {
    const body = request.body
    if (body.title && body.author && body.url){
      const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0
      })
  
      blog.save().then(result => {response.status(201).json(result)}).catch(error => next(error))
    }
    else {
      blog.abort().then(() => response.status(400))
    }
})

blogsRouter.get('/:id', async (request, response) => {
  await Blog.findById(request.params.id)
  .then(blog => {
    response.json(blog)
  })
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  }
  await Blog.findByIdAndUpdate(request.params.id, blog, {runValidators: true}, {new:true})
  .then(updatedBlog => {
    response.status(204).json(updatedBlog)
  })
  .catch(error => next(error))
})

blogsRouter.delete('/:id', async (request, response, next) => {
  await Blog.findByIdAndDelete(request.params.id)
  .then(() => {
    response.status(204).end()
  })
  .catch(error => next(error))
})

module.exports = blogsRouter
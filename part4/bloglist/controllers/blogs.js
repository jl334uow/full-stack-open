const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

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

blogsRouter.post('/api/blogs', async (request, response) => {
    const body = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)

    if (body.title && body.author && body.url){
      const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: {
          username: user.username,
          name: user.name,
          id: user.id,
        }
      })

      user.blogs = user.blogs.concat(blog)
      await user.save()
      await blog.save().then(result => {response.status(201).json(result)}).catch(error => next(error))

    }
    else {
      return response.status(400).json({ error: `missing value(s) in request` })
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
    user: body.user,
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
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const blog = await Blog.findById(request.params.id).exec()
  if (blog.user.id.toString() === decodedToken.id) {
    console.log("Removing blog " + blog.title + " from user: " + blog.user.name)
    await Blog.findByIdAndDelete(request.params.id).then(response.status(204).end())
  }
})

module.exports = blogsRouter
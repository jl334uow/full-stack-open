const { test, after, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app.js')
const config = require('../utils/config')
const api = supertest(app)
const logger = require('../utils/logger')
const Blog = require('../models/blog')
const initialBlogs = require('./data')
helper = require('./test_helper')
beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
  
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

describe('check id', () => {
  test('check _id and id is the same', async () => {
    const response = await api.get('/api/blogs')
    response.body.map(e => assert(e._id === e.id))
  })
})

describe('check that blogs are posted to api/blogs url correctly', () => {
  test('check blog post uploaded correctly', async () => {
      var newBlogPost =   {
        "title": "Mr",
        "author": "bill",
        "url": "xyz",
        "likes": 1,
        "id": "65db20f0db5b0fe26ef321d0"
      }

      var initialLength = initialBlogs.length

      await api.post('/api/blogs').send(newBlogPost).expect(201)
      var response = await api.get('/api/blogs')
      assert.strictEqual(response.body.length, initialLength + 1)

      initialLength = initialLength + 1
      newBlogPost = {
        "url": "ooo",
        "likes": 1,        
      }

      const contents = await api.post('/api/blogs').send(newBlogPost)
      response = await api.get('/api/blogs')
      assert(response.body.length === initialLength)
  })
})

test('check likes property default is 0', async () => {
  const newBlogPost =   {
    "title": "Dr",
    "author": "ooga",
    "url": "oogabooga"
  }

  const request = await api.post('/api/blogs').send(newBlogPost).expect(201)
  assert(newBlogPost.hasOwnProperty("likes") === false)
  assert(request.body.likes === 0)

  const response = await api.get('/api/blogs')
  const addedBlog = response.body[response.body.length - 1]
  assert(addedBlog.url === newBlogPost.url, addedBlog.url + " not equal to " + newBlogPost.url)

  assert(addedBlog.likes ===  0, addedBlog.likes + " not equal to expected value of " + 0)
})

test('delete a blog post', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]
  await api.delete(`/api/blogs/${blogToDelete._id}`).expect(204)
  const blogsAtEnd = await helper.blogsInDb()

  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)

  const contents = blogsAtEnd.map(r => r.content)
  assert(blogsAtStart !== blogsAtEnd)
})

test('update a blog post', async () => {
  const blogAtStart = await helper.blogsInDb()
  const blogToUpdate = {
    "_id" : blogAtStart[0]._id,
    "title" : "yeh",
    "author" : "nah",
    "url" : "true hey"
  }
  await api.put(`/api/blogs/${blogToUpdate._id}`).send(blogToUpdate)
  const blogAtEnd = await helper.blogsInDb()

  assert(blogAtStart[0]._id === blogAtEnd[0]._id)
  assert(blogAtStart[0].title !== blogAtEnd[0].title)
  assert(blogAtStart[0].author !== blogAtEnd[0].author)
  assert(blogAtStart[0].url !== blogAtEnd[0].url)
})
after(async () => {
  await mongoose.connection.close()
})
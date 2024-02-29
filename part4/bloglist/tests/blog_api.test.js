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
    console.log("BOBS YA UNCLE" + JSON.stringify(response.body))
    response.body.map(e => assert(e._id === e.id))
  })
})

describe('check that blogs are posted to api/blogs url correctly', () => {
  test('check blog post uploaded correctly', async () => {
      const newBlogPost =   {
        "title": "Mr",
        "author": "bill",
        "url": "xyz",
        "likes": 1,
        "id": "65db20f0db5b0fe26ef321d0"
      }

      const initialLength = initialBlogs.length

      await api.post('/api/blogs').send(newBlogPost).expect(201)
      const response = await api.get('/api/blogs')
      const contents = JSON.stringify(response.body)
      assert.strictEqual(response.body.length, initialLength + 1)
  })
    after(async () => {
      await mongoose.connection.close()
    })
})
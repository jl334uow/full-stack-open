const { test, after, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app.js')

const api = supertest(app)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

after(async () => {
  await mongoose.connection.close()
})

describe('check id', () => {
    test('check _id and id is the same', async () => {
      const response = await api.get('/api/blogs')
      console.log("BOBS YA UNCLE" + JSON.stringify(response.body))
      response.body.map(e => assert(e._id === e.id))
    })
    after(async () => {
        await mongoose.connection.close()
      })
  })
const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const data = require('./data')
test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {

  test('when there is a list of blogs, equals the likes of that', () => {
    const result = listHelper.totalLikes(data)
    assert.strictEqual(result, 36)
  })
})

describe('favourite blog', () => {

  test('find most liked blog', () => {
    const result = listHelper.favouriteBlog(data)
    assert.deepEqual(result,
      JSON.stringify({
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 12
    }))
  })
})
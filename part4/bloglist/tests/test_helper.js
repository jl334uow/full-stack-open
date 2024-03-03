const Blog = require('../models/blog')
const user = require('../models/user')
const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await user.find({})
    return users.map(user => user.toJSON())
}

module.exports = {blogsInDb, usersInDb}
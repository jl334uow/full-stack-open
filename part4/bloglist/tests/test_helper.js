const Blog = require('../models/blog')
const blogsInDb = async () => {
    const blogs = await Blog.find({})
    console.log("blogs!!!!" + blogs)
    return blogs.map(blog => blog.toJSON())
}

module.exports = {blogsInDb}
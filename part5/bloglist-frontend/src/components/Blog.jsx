import { useState } from "react"
import blogService from '../services/blogs'
const Blog = ({ blog }) => {
  const [blogVisible, setBlogVisible] = useState(false)

  const hideWhenVisible = { display: blogVisible ? 'none' : ''}
  const showWhenVisible = { display: blogVisible ? '' : 'none'}
  const increaseBlogLikes = async (blog) => {
    await blogService.update(blog.id, {likes: blog.likes + 1})
      .then(window.location.reload())
  }
  const handleRemoveBlog = async (blog) => {
    if (window.confirm('Remove ' + blog.title + ' by ' + blog.author)) {
      await blogService.remove(blog.id).then(window.location.reload())
    }
  }
  return (
  <div>
    <div className='blog' style={ hideWhenVisible }>
      {blog.title} {blog.author} <button onClick = {() =>{setBlogVisible(true)}}>view</button>
    </div>
    <div className='toggleableContent' style={ showWhenVisible }>
      <p>{blog.title} <button onClick = {() => {setBlogVisible(false)}}>hide</button></p>
      <p>{blog.url}</p>
      <p>likes {blog.likes} <button onClick = {() => {increaseBlogLikes(blog)}}>like</button></p>
      <p>{blog.author}</p>
      <button onClick={() => {handleRemoveBlog(blog)}}>remove</button>
    </div>
  </div>
  )
}

export default Blog
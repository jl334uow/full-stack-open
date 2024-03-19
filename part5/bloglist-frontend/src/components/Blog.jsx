import { useState } from "react"
const Blog = ({ blog }) => {
  const [blogVisible, setBlogVisible] = useState(false)

  const hideWhenVisible = { display: blogVisible ? 'none' : ''}
  const showWhenVisible = { display: blogVisible ? '' : 'none'}

  return (
  <div>
    <div style={ hideWhenVisible }>
      {blog.title} {blog.author} <button onClick = {() =>{setBlogVisible(true)}}>view</button>
    </div>
    <div style={ showWhenVisible }>
      <p>{blog.title} <button onClick = {() => {setBlogVisible(false)}}>hide</button></p>
      <p>{blog.url}</p>
      <p>likes {blog.likes}</p>
      <p>{blog.author}</p>
    </div>
  </div>
  )
}

export default Blog
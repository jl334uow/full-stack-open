import { useState } from "react"
import blogService from '../services/blogs'
const BlogForm = ({setMessage, blogs, setBlogs}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [addBlogVisible, setAddBlogVisible] = useState(false)
    const hideWhenVisible = { display: addBlogVisible ? 'none' : ''}
    const showWhenVisible = { display: addBlogVisible ? '' : 'none'}
    const handleAddBlog = async (event) => {
        event.preventDefault()
        const blogObject = {
          title: title,
          author: author,
          url: url
        }
        console.log('Adding blog: ' + JSON.stringify(blogObject))
        blogs.map(blog => console.log(blog))
        await blogService
          .create(blogObject)
          .then(response => {
            const blogCopy = [...blogs]
            blogCopy.push(response.data)
            setBlogs(blogCopy)
            setTitle('')
            setAuthor('')
            setUrl('')
            setMessage('A new blog ' + blogObject.title + ' by ' + blogObject.author + ' has been added')
            setAddBlogVisible(false)
          })
          .catch(error => {
            setMessage(String(error.response.data.message))
            setTimeout(() => setMessage(null), 5000)
          })
    }

    return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={() =>{setAddBlogVisible(true)}}>add blog</button>
      </div>
      <div style={showWhenVisible}>
        <form onSubmit={handleAddBlog}>
          <h2>Add blog</h2>
          <div>
            <div>
              title
              <input
                type="text"
                value={title}
                name="Title"
                title="Title"
                onChange={({ target }) => setTitle(target.value)}
              />
            </div>
            <div>
              author
              <input 
                type="text"
                value={author}
                name="Author"
                title="Author"
                onChange={({ target }) => setAuthor(target.value)}
              />
            </div>
            <div>
              url
              <input
                type="text"
                value={url}
                name="Url"
                title="Url"
                onChange={({ target }) => setUrl(target.value)}
              />
            </div>
          </div>
          <button type="submit">add blog</button>
        </form>
        <button onClick={() =>{setAddBlogVisible(false)}}>cancel</button>
      </div>
    </div>
    )
}

export default BlogForm
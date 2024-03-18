import { useState } from "react"
import blogService from '../services/blogs'
const BlogForm = ({setMessage, blogs, setBlogs}) => {
    const [form, setForm] = useState({
        title: '',
        author: '',
        url: '',
    })
    const [addBlogVisible, setAddBlogVisible] = useState(false)
    const hideWhenVisible = { display: addBlogVisible ? 'none' : ''}
    const showWhenVisible = { display: addBlogVisible ? '' : 'none'}
    const handleAddBlog = async (event) => {
        event.preventDefault()

        console.log('Adding blog: ' + JSON.stringify(form))
        await blogService
          .create(form)
          .then(response => {
            const blogCopy = [...blogs]
            blogCopy.push(response.data)
            setBlogs(blogCopy)
            setForm({
                title: '',
                author: '',
                url: '',
            })
            setMessage('A new blog ' + form.title + ' by ' + form.author + ' has been added')
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
                value={form.title}
                name="Title"
                title="Title"
                onChange={({ target }) => setForm({...form, title: target.value})}
              />
            </div>
            <div>
              author
              <input 
                type="text"
                value={form.author}
                name="Author"
                title="Author"
                onChange={({ target }) => setForm({...form, author: target.value})}
              />
            </div>
            <div>
              url
              <input
                type="text"
                value={form.url}
                name="Url"
                title="Url"
                onChange={({ target }) => setForm({...form, url: target.value})}
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
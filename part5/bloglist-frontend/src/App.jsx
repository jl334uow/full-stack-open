import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')  
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])
  const loginForm = () => {
    return (<form onSubmit={handleLogin}>
      <h2>Login</h2>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          title="Username"
          placeholder=''
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input 
          type="text"
          value={password}
          name="Password"
          title="Password"
          placeholder=''
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>)
  }
  const blogForm = () => {
    return (<form>
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
    </form>)
  }
  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch (error) {
      setErrorMessage('Incorrect credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  if (user === null) {
    return loginForm()
  }
  return (
    <div>
      <h2>blogs</h2>
      <form onSubmit={() => {
        window.localStorage.removeItem('loggedBlogappUser')
      }}>
        <p>{user.name} logged-in <button type="submit">logout</button></p>
      </form>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
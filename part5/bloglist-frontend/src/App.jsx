import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [message, setMessage] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON != "undefined") {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className='message'>
        {message}
      </div>
    )
  }
  const loginForm = () => {
    return (<form onSubmit={handleLogin}>
      <h2>Login</h2>
      <Notification message={message}/>
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
      setMessage('wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  if (user === null) {
    return loginForm()
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message}/>
      <form onSubmit={() => {
        window.localStorage.removeItem('loggedBlogappUser')
      }}>
        <p>{user.name} logged-in <button type="submit">logout</button></p>
      </form>
      <BlogForm setMessage = {setMessage} blogs = {blogs} setBlogs = {setBlogs}/>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
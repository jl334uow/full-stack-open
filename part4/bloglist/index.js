const app = require('./app')
const config = require('./utils/config')

// require('dotenv').config()
// const express = require('express')
// const app = express()
// const cors = require('cors')
// app.use(cors())
// app.use(express.json())

// const config = require('./utils/config')
// const blogsRouter = require('./controllers/blogs')

// app.use('/api/blogs', blogsRouter)

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})
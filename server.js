// bring in env variables and all configuration
require('dotenv').config()

// todo: add file compression
const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const { makeDbConnection } = require('./api/database/db/index')
const {
	prodErrorHandler,
	errorHandler,
	notFoundHandler,
	handleListen
} = require('./api/middleware/route/handlers')

const articleApiRoutes = require('./api/routes/article')
const userApiRoutes = require('./api/routes/user')
const profileApiRoutes = require('./api/routes/profile')
const tagsApiRoute = require('./api/routes/tags')
const isProduction = process.env.NODE_ENV === 'production'

const app = express()

app.use(logger('dev'))
app.use(helmet())
app.use(cookieParser(process.env.SESSION_COOKIE_SECRET))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))

makeDbConnection()

app.use('/api/v1/users', userApiRoutes)
app.use('/api/v1/articles', articleApiRoutes)
app.use('/api/v1/profiles', profileApiRoutes)
app.use('/api/v1/tags', tagsApiRoute)

// error and 404 handler middleware
app.use(notFoundHandler)
app.use(isProduction ? prodErrorHandler : errorHandler)

const port = process.env.PORT || 3002
const environment = process.env.NODE_ENV || 'development'

app.listen(port, handleListen(port, environment))

module.exports = app

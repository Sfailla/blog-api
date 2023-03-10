const colorTerminal = require('../../../vendor/terminalColors')

// catch 404 and forward to error handler
const notFoundHandler = (req, res, next) => {
	let error = new Error(`Not Found 🤔 - ${req.originalUrl}`)
	error.status = 404
	res.status(404)
	next(error)
}

// no stacktraces leaked to user in production
const prodErrorHandler = (err, req, res, next) => {
	res.status(err.status || 500)
	res.json({
		errors: {
			message: err.message,
			error: {}
		}
	})
}

const errorHandler = (error, req, res, next) => {
	const isDevelopment = req.app.get('env') === 'development'
	const { code, status, name, message, stack } = error

	// set locals, only providing error in development
	res.locals.status = status
	res.locals.code = code
	res.locals.name = name
	res.locals.message = message
	res.locals.error = isDevelopment ? error.toString() : {}

	res.status(status || 500).send({
		error: {
			status,
			code,
			name,
			message,
			stack
		}
	})
}

const handleListen = (port, env) => {
	console.log(colorTerminal('blue'), `port listening on ${port}`)
	console.log(colorTerminal('green'), `NODE_ENV=${env}`)
}

module.exports = {
	notFoundHandler,
	prodErrorHandler,
	errorHandler,
	handleListen
}

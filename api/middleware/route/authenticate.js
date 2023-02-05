const { verifyToken, makeAuthUser } = require('../../helpers/user-auth')
const { ValidationError, TokenExpiredError } = require('../utils/errors')
const UserModel = require('../../models/user')

const required = async (req, _res, next) => {
	try {
		const token = req.header('x-auth-token')
		const verifiedUser = await verifyToken(token, process.env.ACCESS_TOKEN_SECRET)

		if (!verifiedUser) {
			const errMsg = 'error verifying user token in validation middleware'
			throw new ValidationError(400, errMsg)
		}

		const user = await UserModel.findById(verifiedUser.userId)
		req.user = makeAuthUser(user)

		await next()
	} catch (error) {
		if (error.name === 'TokenExpiredError' || error.name === 'JsonWebTokenError') {
			const tokenError = new TokenExpiredError(403, 'token expired')
			await next(tokenError)
		}
		await next(error)
	}
}

module.exports = { required }

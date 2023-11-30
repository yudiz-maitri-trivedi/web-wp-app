const User = require('../models-routes-controllers/user/model')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const { catchError, responseMessage } = require('../helpers/utilityServices')
const { status, message } = require('../responses/index')

async function verifyToken (req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader) return res.status(status.unAuthorize).json({
    message: message.headerMissing
  })
  const bearerToken = authHeader.split(' ')[1]
  try {
    jwt.verify(bearerToken, config.JWT_SECRET_KEY, async (err, decoded) => {
      if (err?.message === 'jwt expired') return res.status(status.unAuthorize).json({ message : message.needToLogin })
      if (err) return res.status(status.unAuthorize).json({ message : message.authorizationError })
      const user = await User.findById({ _id: decoded._id }, { eStatus: 1, aJwtToken: 1, sFirstName: 1, sBaseDirectory: 1 }).lean()
      if (!user) {
        return res.status(status.notFound).json({ message : message.userNotFound })
      }

      if (user.eStatus === 'b') return responseMessage(req, res, 'forbidden', 'userBlocked')

      if (user.eStatus === 'd') return responseMessage(req, res, 'notFound', 'notFound', 'User')

      const userToken = user.sJwtToken

      if (!userToken) return responseMessage(req, res, 'badRequest', 'needToLogin')

      req.iUserId = decoded._id
      req.sToken = bearerToken
      req.sBaseDirectory = user.sBaseDirectory
      next()
    })
  } catch (error) {
    return catchError(req, res, error)
  }
}

module.exports = { verifyToken }

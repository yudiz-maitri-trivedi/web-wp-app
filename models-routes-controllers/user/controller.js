const User = require('./model')
const { status, message } = require('../../responses/index')
const crypto = require('crypto')

async function registerUser (req, res) {
  try {
    removeNull(req.body)
    const {
      sUsername,
      sPhoneNumber,
      sPassword,
      eGender,
      dDob
    } = req.body

    const sHashedPassword = crypto.createHash('sha512').update(sPassword).digest('hex')
    const oUserExist = await User.findOne({ sUsername }).lean()
    if (oUserExist) {
      return res.status(status.resourceExist).json({
        status: status.resourceExist,
        message: message.userAlreadyExist
      })
    }
    const user = await User.create({
        sUsername,
        sPhoneNumber,
        sPassword: sHashedPassword,
        eGender
    })
    return res.status(status.success).json({
      status: status.created,
      message: message.registerSuccess,
      user
    })
  } catch (error) {
    return catchError(req, res)
  }
}

async function login (req, res) {
  try {
    const { sUsername, sPassword } = req.body
    const sHashedPassword = crypto
      .createHash('sha512')
      .update(sPassword)
      .digest('hex')
    const user = await User.findOne({ sUsername }).lean()
    if (!user) {
      return res.status(status.notFound).json({
        status: status.notFound,
        message: message.invalidCredential
      })
    }
    if (user.eStatus === 'd') {
      return res.status(status.notFound).json({
        status: status.notFound,
        message: message.userNotFound
      })
    }
    if (user.sPassword !== sHashedPassword) {
      return res.status(status.forbidden).json({
        status: status.badRequest,
        message: message.incorrectPassword
      })
    }

    return res.status(status.success).json({
      status: status.success,
      message: message.loginSuccessfully,
      token: generateToken({ id: user._id })
    })
  } catch (error) {
    return catchError(req, res)
  }
}

module.exports = { registerUser, login }
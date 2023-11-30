const { status, message } = require('../../responses/index')
const { isValidEmail, isValidMobile, isValidPassword } = require('../../helpers/utilityServices')
// const mobileNumberRegEx = /^[0-9]{10}$/

const validateUser = async (req, res, next) => {
  const { sUsername, sPhoneNumber, sPassword, eGender } = req.body
  if (!sUsername || !sPhoneNumber || !sPassword || !eGender) {
    return res.status(status.success).json({
      status: status.badRequest,
      message: message.allFieldsAreRequired
    })
  }

  if (!isValidMobile(sPhoneNumber)) {
    return res.status(status.success).json({
      status: status.badRequest,
      message: message.invalidMobileNumber
    })
  }

  if (!isValidPassword(sPassword)) {
    return res.status(status.success).json({
      status: status.badRequest,
      message: message.invalidPassword
    })
  }
  next()
}

const validateLogin = async (req, res, next) => {
  const { sUsername, sPassword } = req.body
  if (!sUsername || !sPassword) {
    return res.status(status.success).json({
      status: status.badRequest,
      message: message.allFieldsAreRequired
    })
  }
  if (!isValidUsername(sUsername)) {
    return res.status(status.success).json({
      status: status.badRequest,
      message: message.invalidUsername
    })
  }
  if (!isValidPassword(sPassword)) {
    return res.status(status.success).json({
      status: status.badRequest,
      message: message.invalidPassword
    })
  }
  next()
}

module.exports = { validateUser, validateLogin }
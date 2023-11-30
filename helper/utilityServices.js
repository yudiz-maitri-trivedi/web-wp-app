const jwt = require('jsonwebtoken')
const { status, message } = require('../responses')
const config = require('../config/config')
const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/
const mobileRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/
// const usernameRegex = cd
const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/
const mongoose = require('mongoose')
const enums = require('../enum')

const catchError = (req, res, error) => {
  return res.status(500).json({ message: message.internalServerError, error : error.message })
}

const generateToken = (payload) => jwt.sign(
  payload,
  config.JWT_SECRET_KEY,
  { expiresIn: config.JWT_VALIDITY }
)

const removeNull = (obj) => {
  for (const propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined || obj[propName] === '') {
      delete obj[propName]
    }
  }
}

const isValidDate = (date) => {
  if (isNaN(new Date(date))) return false
  return true
}

const isValidUsername = (sUsername) => {
    return usernameRegex.test(sUsername)
}
const isValidPassword = (sPassword) => {
  return passwordRegex.test(sPassword)
}

const isValidMobile = (sPhoneNumber) => {
  return mobileRegex.test(sPhoneNumber)
}

// const responseMessage = (req, res, Status, Message, Replace, ...args) => {
//   let mes
//   if (!Replace) mes = message[req.userLanguage][Message]
//   else mes = message[req.userLanguage][Message].replace('##', message[req.userLanguage][Replace])
//   if (!args?.length) return res.status(status[Status]).json({ status: status[Status], message: mes })
//   return res.status(status[Status]).json({ status: status[Status], message: mes, data: args[0] })
// }

module.exports = { catchError, generateToken, removeNull, isValidDate, isValidPassword, isValidEmail, isValidMobile }

const mongoose = require('mongoose')
const { config } = require('../config/config')
const { message } = require('../responses/index')

async function connectDb () {
  try {
    await mongoose.connect(config.MONGODB_URI)
    console.log(message.en.mongoDBConnected)
  } catch (error) {
    console.log(message.en.mongoDBError, error)
  }
}

module.exports = connectDb

const mongoose = require('mongoose')
const enums = require('../../enum')

const userSchema = new mongoose.Schema({
  sUsername: {
    type: String,
    trim: true,
    required: true
  },
  sPhoneNumber: {
    type: String
  },
  sPassword: {
    type: String,
    required: true
  },
  eGender: {
    type: String,
    enum: enums.eGender.values
  },
  eStatus: {
    type: String,
    default: 'a',
    enum: enums.eUserStatus.values,
    default: enums.eUserStatus.default
  }
}, {
  timestamps: {
    createdAt: 'dCreatedAt',
    updatedAt: 'dUpdatedAt'
  }
})

module.exports = mongoose.model('User', userSchema)

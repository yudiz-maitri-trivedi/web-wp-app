const { registerUser } = require('./controller')
const router = require('express').Router()

router.post('/registerUser', registerUser)
router.post('/login', login)

module.exports = router
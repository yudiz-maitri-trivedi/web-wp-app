const router = require('express').Router()
const { initAccount } = require('./controller')

router.get('/api/generateQR', initAccount)

module.exports = router

const express = require('express')
const morgan = require('morgan')
const { config } = require('./config/config')
const connectDb = require('./database/mongoose')
const accRoutes = require('./models-routes-controllers/account/controller')

const app = express()

connectDb()
app.use(morgan('dev'))
app.use(express.json())
app.use('/wp', accRoutes)

app.listen(config.PORT, () => {
  console.log('Server is listening on port', config.PORT)
})

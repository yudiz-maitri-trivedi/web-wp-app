require('dotenv').config()

const config = {
    PORT: process.env.PORT || 8001,
    MONGODB_URI:  process.env.MONGODB_URI || 'mongodb://localhost:5000/whatsapp-demo',
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 'secretKey',
    JWT_VALIDITY: process.env.JWT_VALIDITY || '3d'
}

module.exports  = { config }



const mongoose = require('mongoose')
const DBError = require('../errors/DBError')

const startDB = async () => {
  mongoose.connect(
    'mongodb+srv://admin-george:1234@cluster0.shird.mongodb.net/Calendly?retryWrites=true&w=majority',
    (err) => {
      if (err) {
        throw new DBError('Connection to Mongo FAILED!!')
      }

      console.log('Mongo Connected Successfully!!')
    }
  )
}

module.exports = { startDB }

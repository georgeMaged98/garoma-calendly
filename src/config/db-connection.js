const mongoose = require('mongoose')
const DBError = require('../errors/DBError')

const startDB = async () => {
  mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.shird.mongodb.net/Calendly?retryWrites=true&w=majority`,
    (err) => {
      if (err) {
        throw new DBError('Connection to Mongo FAILED!!')
      }

      console.log('Mongo Connected Successfully!!')
    }
  )
}

module.exports = { startDB }

const mongoose = require('mongoose')
const DBError = require('../errors/DBError')

const startDB = async () => {
  mongoose.connect(process.env.MONGO_URI, (err) => {
    if (err) {
      throw new DBError('Connection to Mongo FAILED!!')
    }

    console.log('Mongo Connected Successfully!!')
  })
}

module.exports = { startDB }

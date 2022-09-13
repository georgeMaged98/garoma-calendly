const express = require('express')
const meetingRouter = require('../meeting/meeting.router')
const errorHandler = require('./error-handler')

const createServer = () => {
  const app = express()

  app.use(express.json())
  app.use('/meetings', meetingRouter)

  app.use('*', (req, res) =>
    res.status(404).send({ message: 'Route Not Found' })
  )

  app.use(errorHandler)
  return app
}

module.exports = createServer

const { startDB } = require('./config/db-connection')
require('dotenv').config()

startDB()
  .then(() => {
    const createServer = require('./config/server')
    const server = createServer()
    server.listen(3000, () => {
      console.log('Listening on port 3000')
    })
  })
  .catch((err) => console.log(err))

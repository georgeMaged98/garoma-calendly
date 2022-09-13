class DBError extends Error {
  statusCode
  constructor(message) {
    super(message)
    this.message = message
    this.statusCode = 500
  }
}

module.exports = DBError

class LogicError extends Error {
  statusCode
  constructor(message) {
    super(message)
    this.message = message
    this.statusCode = 400
  }
}

module.exports = LogicError

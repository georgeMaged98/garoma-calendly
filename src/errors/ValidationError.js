class ValidationError extends Error {
  statusCode
  constructor(message) {
    const errorMsg = message[0].message
    // Validation Error from Joi comes as an Array, so extract the error message of the first item
    super(errorMsg)
    this.message = errorMsg
    this.statusCode = 400
  }
}

module.exports = ValidationError

const handleError = (err, req, res, next) => {
  if (err) {
    return res.status(err.statusCode || 500).send({
      error: err.message,
    })
  }
}

module.exports = handleError

const Joi = require('joi')
const ValidationError = require('../errors/ValidationError')

const createMeetingValidation = (req, res, next) => {
  try {
    const schema = Joi.object({
      inviter: Joi.string().required(),
      invitee: Joi.string().required(),
      date: Joi.string()
        .regex(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/)
        .required(),
      startTime: Joi.string()
        .regex(/^([01]\d|2[0-3]):([0-5]\d)$/)
        .required(),
      endTime: Joi.string()
        .regex(/^([01]\d|2[0-3]):([0-5]\d)$/)
        .required(),
    }).required()

    const reqBody = req.body

    const isValid = schema.validate(reqBody)

    if (isValid.error) {
      throw isValid.error.details
    }
    next()
  } catch (err) {
    const error = new ValidationError(err)
    return next(error)
  }
}

module.exports = {
  createMeetingValidation,
}

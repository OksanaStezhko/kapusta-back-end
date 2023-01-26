const { BadRequest } = require('http-errors')

const validationParam = (schema) => {
  return async (req, res, next) => {
    const { error } = schema.validate(req.params)
    if (error) {
      return next(new BadRequest(error.message))
    }
    next()
  }
}

module.exports = validationParam

const { BadRequest } = require('http-errors')

const validationQuery = (schema) => {
  return async (req, res, next) => {
    const { error } = schema.validate(req.query)
    if (error) {
      return next(new BadRequest(error.message))
    }
    next()
  }
}

module.exports = validationQuery

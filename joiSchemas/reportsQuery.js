const Joi = require('joi')
const {
  constants: { signValue },
} = require('../utils')

const reportsParamSchema = Joi.object({
  sign: Joi.any().valid(...signValue),
  year: Joi.number().min(1900).max(2050).required(),
  month: Joi.number().min(0).max(11).required(),
})

module.exports = reportsParamSchema

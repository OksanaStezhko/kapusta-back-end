const Joi = require('joi')
const {
  constants: { signValue },
} = require('../utils')

const reportsByYearParamSchema = Joi.object({
  sign: Joi.any().valid(...signValue),
})

module.exports = reportsByYearParamSchema

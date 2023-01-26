const Joi = require('joi')
const {
  constants: { signValue },
} = require('../utils')

const signValueSchema = Joi.object({
  signValue: Joi.any().valid(...signValue),
})

module.exports = signValueSchema

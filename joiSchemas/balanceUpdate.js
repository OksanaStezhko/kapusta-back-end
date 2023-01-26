const Joi = require('joi')

const balanceUpdateSchema = Joi.object({
  balance: Joi.number().positive().required(),
})

module.exports = balanceUpdateSchema

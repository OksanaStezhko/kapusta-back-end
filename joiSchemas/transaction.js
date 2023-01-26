const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const transactionSchema = Joi.object({
  date: Joi.date(),
  category: Joi.objectId().required(),
  description: Joi.string().max(50),
  value: Joi.number().positive().required(),
})

module.exports = transactionSchema

const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const transIdSchema = Joi.object({
  transId: Joi.objectId(),
})

module.exports = transIdSchema

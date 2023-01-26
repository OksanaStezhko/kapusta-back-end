const Joi = require('joi')

const nameEnUpdateSchema = Joi.object({
  idCategory: Joi.objectId().required(),
  nameEn: Joi.string().min(1).max(20).required(),
})

module.exports = nameEnUpdateSchema

const Joi = require('joi')

const userSchema = Joi.object({
  name: Joi.string().required().min(1).max(20),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'org', 'ua', 'ru', 'gov', 'uk'] },
    })
    .required(),
  password: Joi.string().min(6).required(),
})

module.exports = userSchema

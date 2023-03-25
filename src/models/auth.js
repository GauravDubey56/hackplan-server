const Joi = require("joi");

module.exports.signup = Joi.object().keys({
  email: Joi.string()
    .regex(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    )
    .required(),
  mobile: Joi.string().optional().allow(null, ""),
  password: Joi.string().required().min(6),
  fname: Joi.string().required(),
  lname: Joi.string().optional().allow(null, ""),
});

module.exports.login = Joi.object().keys({
  email: Joi.string()
    .regex(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    )
    .required(),
  password: Joi.string().required(),
});

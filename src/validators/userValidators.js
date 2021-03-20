const Joi = require('joi');

// Register validation
const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(4).max(16).required(),
    email: Joi.string().min(4).max(32).required()
      .email(),
    password: Joi.string().min(8).max(1024).required(),
    name: Joi.string().min(2).max(32).required(),
  });
  return schema.validate(data);
};

// Login validation
const loginValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(4).max(16).required(),
    password: Joi.string().min(8).max(1024).required(),
  });
  return schema.validate(data);
};

module.exports = {
  loginValidation,
  registerValidation,
};

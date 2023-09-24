const { celebrate, Joi } = require('celebrate');

const signinValidation = celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string()
        .required()
        .email(),
      password: Joi.string()
        .required(),
    }).unknown(true),
});

const signupValidation = celebrate({
  body: Joi.object()
    .keys({
      username: Joi.string()
        .min(2)
        .max(30),
      email: Joi.string()
        .required()
        .email(),
      password: Joi.string()
        .required(),
    }),
});

const createArticleValidation = celebrate({
  body: Joi.object()
    .keys({
      keyword: Joi.string()
        .required(),
      title: Joi.string()
        .required(),
      text: Joi.string()
        .required(),
      date: Joi.string()
        .required(),
      source: Joi.string()
        .required(),
      link: Joi.string()
        .required()
        .uri(),
      image: Joi.string()
        .required()
        .uri(),
    }),
});

const deleteArticleValidation = celebrate({
  params: Joi.object()
    .keys({
      id: Joi.string()
        .alphanum()
        .length(24),
    }),
});

module.exports = {
  signinValidation,
  signupValidation,
  createArticleValidation,
  deleteArticleValidation,
};

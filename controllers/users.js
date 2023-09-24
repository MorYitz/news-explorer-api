const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const errors = require('../utils/errors');
const {
  DUPLICATE_KEY_ERROR_CODE,
} = require('../utils/consts');
const {
  SECRET_KEY,
} = require('../utils/configuration');

module.exports.getUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .orFail(() => {
      next(new errors.NotFoundError('No user found with that id'));
    })
    .then((user) => res.send({ data: { email: user.email, name: user.name } }))
    .catch(
      (err) => {
        if (err.name === 'CastError') {
          next(new errors.BadRequestError('Invalid data passed for user'));
        } else if (err.name === 'NoDataError') {
          next(new errors.NotFoundError('There is no user with the requested id'));
        } else {
          next(new errors.DefaultError());
        }
      },
    );
};

module.exports.createUser = (req, res, next) => {
  const {
    username,
    email,
  } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      User.create({
        username,
        email,
        password: hash,
      })
        .then((user) => {
          const { password, ...responseUser } = user._doc;
          return res.send({ data: responseUser });
        })
        .catch(
          (err) => {
            if (err.name === 'ValidationError') {
              next(new errors.BadRequestError('Invalid data passed for user'));
            } else if (err.name === 'NoDataError') {
              next(new errors.NotFoundError('There is no user with the requested id'));
            } else if (err.code === DUPLICATE_KEY_ERROR_CODE) {
              next(new errors.EmailExistsError('The user with this email has already been registered'));
            } else {
              next(err);
            }
          },
        );
    });
};

module.exports.login = (req, res, next) => {
  const {
    email,
    password,
  } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user._id }, SECRET_KEY, { expiresIn: '7d' }),
      });
    })
    .catch((err) => {
      next(new errors.AuthorizationError(err.message));
    });
};

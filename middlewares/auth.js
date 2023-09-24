const jwt = require('jsonwebtoken');
const {
  SECRET_KEY,
} = require('../utils/configuration');

const errors = require('../utils/errors');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new errors.AuthorizationError('Authorization Required'));
  }

  const token = authorization ? authorization.replace('Bearer ', '') : authorization;
  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return next(new errors.AuthorizationError('Authorization Required'));
  }

  req.user = payload; // assigning the payload to the request object

  return next(); // sending the request to the next middleware
};

const utils = require('./utils');

module.exports.centralizedErrorHandling = (err, req, res, next) => {
  const {
    statusCode = 500,
    message,
  } = err;
  utils.saveMessage(`Centralized error handler: Error statusCode = ${statusCode} message = ${message}`);
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'An error occurred on the server'
        : message,
    });
};

const { AUTHORIZATION_ERROR_CODE } = require('../utils/consts');
const utils = require('../utils/utils');

class AuthorizationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = AUTHORIZATION_ERROR_CODE;
    utils.saveMessage(`AuthorizationError (${this.statusCode}): ${message}`);
  }
}

module.exports = AuthorizationError;

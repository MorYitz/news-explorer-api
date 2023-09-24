const { BAD_REQUEST_ERROR_CODE } = require('../utils/consts');
const utils = require('../utils/utils');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = BAD_REQUEST_ERROR_CODE;
    utils.saveMessage(`BadRequestError (${this.statusCode}): ${message}`);
  }
}

module.exports = BadRequestError;

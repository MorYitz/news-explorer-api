const { NOT_FOUND_ERROR_CODE } = require('../utils/consts');
const utils = require('../utils/utils');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOT_FOUND_ERROR_CODE;
    utils.saveMessage(`NotFoundError (${this.statusCode}): ${message}`);
  }
}

module.exports = NotFoundError;

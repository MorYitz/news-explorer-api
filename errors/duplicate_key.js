const { DUPLICATE_KEY_ERROR_CODE } = require('../utils/consts');
const utils = require('../utils/utils');

class DuplicateKeyError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = DUPLICATE_KEY_ERROR_CODE;
    utils.saveMessage(`DuplicateKeyError (${this.statusCode}): ${message}`);
  }
}

module.exports = DuplicateKeyError;

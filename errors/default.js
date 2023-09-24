const { DEFAULT_ERROR_CODE } = require('../utils/consts');
const utils = require('../utils/utils');

class DefaultError extends Error {
  constructor(message = 'An error has occurred on the server') {
    super(message);
    this.statusCode = DEFAULT_ERROR_CODE;
    utils.saveMessage(`DefaultError (${this.statusCode}): ${message}`);
  }
}

module.exports = DefaultError;

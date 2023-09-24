const { EMAIL_EXISTS_ERROR_CODE } = require('../utils/consts');
const utils = require('../utils/utils');

class EmailExistsError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = EMAIL_EXISTS_ERROR_CODE;
    utils.saveMessage(`EmailExistsError (${this.statusCode}): ${message}`);
  }
}

module.exports = EmailExistsError;

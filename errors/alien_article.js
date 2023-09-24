const { ALIEN_ARTICLE_ERROR_CODE } = require('../utils/consts');
const utils = require('../utils/utils');

class AlienArticleError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ALIEN_ARTICLE_ERROR_CODE;
    utils.saveMessage(`AlienArticleError (${this.statusCode}): ${message}`);
  }
}

module.exports = AlienArticleError;

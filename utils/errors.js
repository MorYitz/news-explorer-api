const DuplicateKeyError = require('../errors/duplicate_key');
const BadRequestError = require('../errors/bad_request');
const AlienArticleError = require('../errors/alien_article');
const NotFoundError = require('../errors/not_found');
const EmailExistsError = require('../errors/email_exists');
const AuthorizationError = require('../errors/authorization');
const DefaultError = require('../errors/default');

module.exports = {
  DuplicateKeyError,
  BadRequestError,
  AlienArticleError,
  NotFoundError,
  EmailExistsError,
  AuthorizationError,
  DefaultError,
};

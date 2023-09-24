const router = require('express')
  .Router(); // creating a router
const express = require('express');
const articlesRouter = require('./articles');
const usersRouter = require('./users');
const newsApiRouter = require('./news_api');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const appErrors = require('../utils/errors');
const {
  signinValidation,
  signupValidation,
} = require('../utils/validation');
const utils = require('../utils/utils');

router.get('/api-enabled', (req, res) => {
  res.send('Project 16 api is enabled');
});

router.use(express.json());

router.use((req, res, next) => {
  utils.saveMessage('req.url =', req.url);
  next();
});

router.post('/signin', signinValidation, login);
router.post('/signup', signupValidation, createUser);

router.use('/newsApi', newsApiRouter);

router.use(auth);

router.use('/articles', articlesRouter);
router.use('/users', usersRouter);
router.use('/*', (req, res, next) => {
  next(new appErrors.NotFoundError('Requested resource not found'));
});

module.exports = router; // exporting the router

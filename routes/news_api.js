const router = require('express').Router();
const { search } = require('../controllers/news_api');

router.get('/:query', search);

module.exports = router;

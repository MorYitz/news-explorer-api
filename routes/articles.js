const router = require('express')
  .Router(); // creating a router
const {
  createArticleValidation,
  deleteArticleValidation,
} = require('../utils/validation');
const {
  getAllArticles,
  createArticle,
  deleteArticle,
} = require('../controllers/articles');

router.get('/', getAllArticles);
router.post('/', createArticleValidation, createArticle);
router.delete('/:id', deleteArticleValidation, deleteArticle);

module.exports = router; // exporting the router

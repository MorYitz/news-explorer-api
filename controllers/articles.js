const Article = require('../models/article');
const errors = require('../utils/errors');

module.exports.getAllArticles = (req, res, next) => {
  Article.find()
    .populate('owner')
    .then((articles) => {
      const ownersCards = articles.filter((card) => card.owner._id.toString() === req.user._id);
      res.send({ data: ownersCards });
    }).catch(() => next(new errors.DefaultError('An error has occurred on the server')));
};
module.exports.deleteArticle = (req, res, next) => {
  Article.findById(req.params.id)
    .populate('owner')
    .orFail(() => {
      next(new errors.NotFoundError('No Article found with that id'));
    })
    .then((article) => {
      if (article.owner._id.toString() !== req.user._id) {
        return next(new errors.AlienArticleError('An attempt to delete someone else\'s article.'));
      }
      article.deleteOne();
      return res.send({ data: article });
    })
    .catch(
      (err) => {
        if (err.name === 'CastError') {
          next(new errors.BadRequestError('Invalid data passed for article'));
        } else if (err.name === 'NoDataError') {
          next(new errors.NotFoundError('There is no article with the requested id'));
        } else {
          next(new errors.DefaultError());
        }
      },
    );
};

module.exports.createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  const owner = req.user._id;

  Article.create({
    keyword, title, text, date, source, link, image, owner,
  })
    .then((article) => {
      Article.findById(article._id)
        .then((newArticle) => {
          res.send({ data: newArticle });
        })
        .catch(
          (err) => {
            if (err.name === 'CastError') {
              next(new errors.BadRequestError('Invalid data passed for article'));
            } else if (err.name === 'NoDataError') {
              next(new errors.NotFoundError('There is no article with the requested id'));
            } else {
              next(new errors.DefaultError());
            }
          },
        );
    })
    .catch(
      (err) => {
        if (err.name === 'ValidationError') {
          next(new errors.BadRequestError('Invalid data passed for article'));
        } else if (err.name === 'NoDataError') {
          next(new errors.NotFoundError('There is no article with the requested id'));
        } else {
          next(new errors.DefaultError());
        }
      },
    );
};

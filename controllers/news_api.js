const NewsAPI = require('newsapi');
const { dateAddDays, dateToStr, saveMessage } = require('../utils/utils');
const errors = require('../utils/errors');
const { NEWS_API_KEY } = require('../utils/configuration');

const newsApi = new NewsAPI(NEWS_API_KEY);

module.exports.search = (req, res, next) => {
  const { query } = req.params;
  const dateTo = new Date();
  const dateFrom = dateAddDays(dateTo, -7);
  const strDateFrom = dateToStr(dateFrom);
  const strDateTo = dateToStr(dateTo);
  newsApi.v2.everything({
    q: query,
    from: strDateFrom,
    to: strDateTo,
    pageSize: 100,
  }).then((response) => {
    res.send({ data: response.articles });
  })
    .catch((err) => {
      saveMessage(err);
      next(new errors.DefaultError('An error has occurred on the server'));
    });
};

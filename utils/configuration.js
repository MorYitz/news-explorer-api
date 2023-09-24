require('dotenv')
  .config();

const {
  NODE_ENV,
  JWT_SECRET,
  MONGOOSE_CONNECT,
  NEWS_API_KEY,
} = process.env;

const SECRET_KEY = NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key';

const MONGOOSE_CONNECT_STRING = MONGOOSE_CONNECT || 'mongodb://127.0.0.1:27017/project16db';

module.exports = {
  SECRET_KEY,
  NEWS_API_KEY,
  MONGOOSE_CONNECT_STRING,
};

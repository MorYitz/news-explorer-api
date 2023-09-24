const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const {
  errors,
} = require('celebrate');
const limiter = require('./utils/limiter');
const indexRouter = require('./routes/index');
const {
  MONGOOSE_CONNECT_STRING,
} = require('./utils/configuration');
const {
  requestLogger,
  errorLogger,
} = require('./middlewares/logger');
const utils = require('./utils/utils');
const {
  centralizedErrorHandling,
} = require('./utils/centralized_error_handling');

const { PORT = 3000 } = process.env;
const app = express();

app.use(limiter);

app.use(helmet());

app.use(cors());
app.options('*', cors());

app.use(requestLogger); // enabling the request logger

const allowedOrigins = [
  'http://localhost:3001',
  'http://oin16.ovcharik.com',
  'http://www.oin16.ovcharik.com',
];

app.use((req, res, next) => {
  const { origin } = req.headers; // assign the corresponding header to the origin variable

  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');

  if (allowedOrigins.includes(origin)) { // check that the origin value is among the allowed domains
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (req.method === 'OPTIONS') {
    res.send();
  } else {
    next();
  }
});

utils.saveMessage(`MONGOOSE_CONNECT_STRING = ${MONGOOSE_CONNECT_STRING}`);
mongoose.connect(MONGOOSE_CONNECT_STRING);
utils.saveMongooseConnectionReadyState(mongoose.connection.readyState);

app.use('/', indexRouter);
app.use(errorLogger);

app.use(errors());

app.use(centralizedErrorHandling);

utils.saveMessage(`App running on port = ${PORT}`);

app.listen(PORT, () => {
});

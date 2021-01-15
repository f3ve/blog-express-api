const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { NODE_ENV, CLIENT_ORIGIN } = require('./config');

const app = express();

const corsOptions = {
  origin: CLIENT_ORIGIN,
  credentials: true,
};

const morganOption = NODE_ENV === 'production' ? 'tiny' : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(function errorHandler(error, req, res, next) {
  let response;
  NODE_ENV === 'production'
    ? (response = { error: { message: 'server error' } })
    : console.error(error);
  response = { message: error.message, error };
  res.status(500).json(response);
});

app.use('/api/articles', require('./routes/articles'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/categories', require('./routes/categories'));

module.exports = app;

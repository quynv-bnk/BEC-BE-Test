const express = require('express');
const createError = require('http-errors');

require('./services/passport');
const passportLocal = require('./middlewares/passportLocal');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).send('Hello BEC Technologies');
});

app.post('/api/auth/login', passportLocal, (req, res) => {
  const { token } = req.headers;

  res.status(200).json({
    token
  });
})

app.get('/api/unhandledRejection', (req, res) => {
  throw createError();
});

app.get('/api/handledRejection', (req, res, next) => {
  next(createError(400, 'This is Handled Rejection.'));
});

app.use(errorHandler);

const server = app.listen(3000, () => {
  console.log('Listening on port 3000.');
});

module.exports = server;
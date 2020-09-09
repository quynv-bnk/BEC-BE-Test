const passport = require('passport');
const createError = require('http-errors');

module.exports = (req, res, next) => {
  passport.authenticate('local', (err, data) => {
    if (err) {
      next(createError(400, err.message));
    }
    res.json(data);
  })(req);
}
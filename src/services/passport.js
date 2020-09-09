const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// YOUR CODE HERE
passport.use(new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
    session: false,
  },
  (username, password, done) => {
    console.log(username, password);
    if (username === "admin@admin.com" && password === "password") {
      return done(null, { token: "Chó Tịt" });
    }
    return done(new Error("Invalid Email or Password"), false);
  }
));

const express = require('express');


const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

passport.use(passport.initialize());
const localauthmiddleware = passport.authenticate('local', { session: false })
const person = require('./models/person');

passport.use(new localStrategy(async (username, password, done) => {
  try {
    console.log('Received credentials', username, password);
    const user = await person.findOne({ username });
    if (!user)
      return done(null, false, { message: 'Incorrect username' });

    const isPasswordMatch = await user.comparePassword(password);
    if (isPasswordMatch) {
      return done(null, user);
    } else {
      return done(null, false, { message: 'Incorrect password' });
    }
  } catch (error) {
    return done(error);
  }
}))


module.exports = passport;
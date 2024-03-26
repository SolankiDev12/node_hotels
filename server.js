const express = require('express');
const app = express();

const db = require('./db');
const person = require('./models/person');
require('dotenv').config();
const passport = require('./auth');


const bodyParser = require('body-parser');
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

const logRequest = (req, res, next) => {
  console.log(`${new Date().toLocaleString()} Request Made to:${req.originalUrl}`);
  next();
}

app.use(logRequest);
app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', { session: false });

app.get('/', localAuthMiddleware, function (req, res) {
  res.send('Welcome to Dhaba');
});

const personrouter = require('./routes/personRoutes');
app.use('/person', personrouter);

const menurouter = require('./routes/menuItemRoutes');
app.use('/menu', localAuthMiddleware, menurouter);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

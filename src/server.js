const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const cookieParser = require('cookie-parser');

const { closeConnection } = require('./connection');
const { createUser } = require('./utils/create-admin');

const { jwtParser } = require('./middlewares/auth');
const session = require('./session');
const routes = require('./routes');

const { formatDate, spliceContent } = require('./utils/templates-helper');

const app = express();

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: '.handlebars',
  layoutsDir: path.join(__dirname, 'templates', 'layouts'),
  partialsDir: path.join(__dirname, 'templates', 'partials'),
  helpers: {
    formatDate: formatDate,
    spliceContent: spliceContent
  }
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'templates'));
app.use('/public', express.static(path.join(__dirname, 'assets')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(jwtParser);
app.use(session);

app.use(routes);

createUser();

process.on('SIGINT', async () => {
  try {
    await closeConnection();
  } catch (error) {
    console.error('Error closing the connection', error);
  } finally {
    console.log('Server stopped');
    process.exit(0);
  }
});

module.exports = app;

const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const cookieParser = require('cookie-parser');

const { closeConnection } = require('./connection');

const { jwtParser } = require('./middlewares/auth');
const session = require('./session');
const routes = require('./routes');

const app = express();

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: '.handlebars',
  layoutsDir: path.join(__dirname, 'templates', 'layouts'),
  partialsDir: path.join(__dirname, 'templates', 'partials')
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'templates'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(jwtParser);
app.use(session);

app.use(routes);

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

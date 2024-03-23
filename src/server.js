const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('./session');

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
app.use(session);

process.on('SIGINT', async () => {
  try {
  } catch (error) {
    console.error('Error closing the connection', error);
  } finally {
    console.log('Server stopped');
    process.exit(0);
  }
});

module.exports = app;

const express = require('express');
const cookieParser = require('cookie-parser');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const path = require('path');

const { closeConnection } = require('./connection');
const {
  formatDate,
  spliceContent,
  isEquals,
  isActive
} = require('./utils/template-helpers');
const routerModule = require('./routes');

const app = express();

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: '.handlebars',
  layoutsDir: path.join(__dirname, 'templates', 'layouts'),
  partialsDir: path.join(__dirname, 'templates', 'partials'),
  helpers: {
    formatDate: formatDate,
    spliceContent: spliceContent,
    equal: isEquals,
    isActive: isActive
  }
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'templates'));
app.use('/public', express.static(path.join(__dirname, '..', 'assets')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));

app.use('/', routerModule);

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

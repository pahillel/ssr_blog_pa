const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');

// const { createUser } = require('./utils/create-admin');

const { closeConnection } = require('./connection');
const { jwtParser } = require('./middlewares');
const session = require('./session');
const { formatDate, spliceContent } = require('./utils/template-helpers');
// const routes = require('./routes');

const apiModule = require('./api');
const publicModule = require('./public');

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

const allowedOrigins = ['http://localhost:3000'];

app.use(
  cors({
    origin: 'http://localhost:3000', // замените на ваш домен
    credentials: true // разрешаем передачу куки
  })
);

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'templates'));
app.use('/public', express.static(path.join(__dirname, 'assets')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(jwtParser);
app.use(session);
app.use(morgan('dev'));

app.use('/api', apiModule);
app.use('/', publicModule);

// app.use(routes);

// createUser();

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

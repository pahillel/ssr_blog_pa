require('dotenv').config();
const config = require('config');
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');

const { openConnection, closeConnection } = require('./services/connection');
const { tokenSession } = require('./middlewares');

const pageRouter = require('./pages/page.router');
const api = require('./api');

(async () => await openConnection())();

const storeInstance = MongoStore.create({
  mongoUrl: config.mongo.url,
  ttl: config.cookies.maxAge,
  collectionName: 'sessions',
  autoRemove: 'native',
  stringify: false,
  dbName: config.mongo.options.dbName
});

const app = express();

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: '.handlebars',
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
  partialsDir: path.join(__dirname, 'views', 'partials')
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    name: 'token',
    secret: config.secret,
    resave: false,
    saveUninitialized: false,
    store: storeInstance,
    cookie: {
      ...config.cookies,
      name: 'token',
      secure: false
    }
  })
);

app.use('/', pageRouter);
app.use('/api', api);
app.use(tokenSession);

process.on('SIGINT', async () => {
  try {
    await closeConnection();
  } catch (error) {
    console.error('Error closing the connection', error);
  } finally {
    process.exit(0);
  }
});

module.exports = app;

require('dotenv').config();
const config = require('config');

const session = require('express-session');
const MongoStore = require('connect-mongo');

const store = MongoStore.create({
  mongoUrl: config.mongo.url,
  collectionName: 'sessions',
  ttl: config.cookies.maxAge,
  autoRemove: 'native',
  stringify: false,
  dbName: config.mongo.dbName
});

const serverSession = session({
  name: 'token',
  secret: config.secret,
  resave: false,
  saveUninitialized: false,
  store,
  unset: 'destroy',
  cookie: {
    ...config.cookies,
    secure: process.env.NODE_ENV === 'production'
  }
});

module.exports = serverSession;

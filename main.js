require('dotenv').config();
const config = require('./config');
const morgan = require('morgan');
const express = require('express');
const path = require('path');

const {
  openConnection,
  closeConnection
} = require('./src/services/connection');

const apiModule = require('./src/api');
const viewModule = require('./src/views');

const PORT = config.port || 3000;

(async () => {
  await openConnection();
})();

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views', 'templates'));
app.use('/assets', express.static(path.join(__dirname, 'src', 'assets')));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', apiModule);
app.use('/', viewModule);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on('SIGINT', async () => {
  try {
    await closeConnection();
    process.exit(0);
  } catch (error) {
    console.error('Graceful shutdown error:', error);
  } finally {
    process.exit(0);
  }
});

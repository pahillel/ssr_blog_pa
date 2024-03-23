require('dotenv').config();
const config = require('./config');
const morgan = require('morgan');
const express = require('express');

const {
  openConnection,
  closeConnection
} = require('./src/services/connection');
const apiModule = require('./src/api');

const PORT = config.port || 3000;

(async () => {
  await openConnection();
})();

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use(apiModule);

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

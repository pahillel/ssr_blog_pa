const express = require('express');

const app = express();

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

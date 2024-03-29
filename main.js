require('dotenv').config();
const config = require('config');
const app = require('./src/server');
const { openConnection, closeConnection } = require('./src/connection');

const PORT = config.get('port');

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await openConnection();
});

process.on('SIGINT', async () => {
  try {
    closeConnection();
  } catch (error) {
    console.error('Error closing the db connection', error);
  } finally {
    console.log('Server stopped');
    process.exit(0);
  }
});
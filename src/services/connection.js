const mongoose = require('mongoose');
const config = require('../../config');

mongoose.connection.once('open', () => {
  console.log('Mongoose connected.');
});

const openConnection = async () => {
  try {
    await mongoose.connect(config.mongo.url, {
      ...config.mongo.options,
      config: { autoIndex: false }
    });
  } catch (error) {
    console.error('Error connecting to the database', error);
  }
};

const closeConnection = async () => {
  try {
    await mongoose.connection.close();
  } catch (error) {
    console.error('Mongoose close connection error', error);
  } finally {
    console.log('Mongoose disconnected.');
    process.exit(0);
  }
};

module.exports = {
  openConnection,
  closeConnection
};

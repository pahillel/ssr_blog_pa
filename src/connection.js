const config = require('config');
const mongoose = require('mongoose');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
  console.log('Mongoose connected to MongoDB');
});

const openConnection = async () => {
  try {
    await mongoose.connect(config.mongo.uri, {
      dbName: config.mongo.dbName,
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

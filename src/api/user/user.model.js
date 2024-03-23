const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userName: String,
  password: String,
  role: String
});

module.exports = mongoose.model('User', UserSchema);

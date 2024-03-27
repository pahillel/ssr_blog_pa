const mongoose = require('mongoose');

const patchSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true
    }
  },
  {
    collection: 'patches',
    timestamps: true
  }
);

const PatchModel = mongoose.model('Patch', patchSchema);

module.exports = PatchModel;

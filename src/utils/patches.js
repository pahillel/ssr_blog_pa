const PatchModel = require('../models/patch.model');

const checkApplied = async (name) => {};

const apply = async (name) => {
  const patch = new PatchModel({ name });
  await patch.save();
};

module.exports = {
  checkApplied,
  apply
};

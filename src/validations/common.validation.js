const Joi = require('joi');

const objectId = Joi.string()
  .trim()
  .regex(/[a-f0-9]{24}/i);

const requiredObjectId = objectId.required();

const baseString = Joi.string().trim().lowercase();

module.exports = {
  objectId,
  requiredObjectId,
  baseString
};

const Joi = require('joi');

module.exports = {
  payload: {
    response: Joi.string()
      .min(2)
      .max(8)
      .description('pong that back'),
  },
};

const Joi = require('joi');
const schemas = require('../schemas');
const testController = require('../controllers/testController');

module.exports = [
  {
    method: 'GET',
    path: '/',
    options: {
      tags: ['api'],
      handler: testController.get,
    },
  },
  {
    method: 'GET',
    path: '/examples/promise',
    options: {
      tags: ['api'],
      description: 'simple promise returned, handler with 0 params',
      handler: testController.getPromise,
    },
  },
  {
    method: 'POST',
    path: '/examples/simple',
    options: {
      tags: ['api'],
      description: 'simple object returned, handler with 0 params',
      validate: {
        payload: {
          error: Joi.boolean(),
        },
      },
      handler: testController.post,
    },
  },
  {
    method: 'POST',
    path: '/examples/default',
    options: {
      tags: ['api'],
      description: 'default route use with logging',
      validate: schemas.testSchema,
      handler: testController.postLog,
    },
  },
];

const Inert = require('inert');
const Vision = require('vision');
const Good = require('good');
const Mongo = require('hapi-mongodb');
const Swagger = require('hapi-swagger');

const Pack = require('../package.json');

const plugins = [Inert, Vision];

const logSqueezeArgs = [
  {
    log: '*',
    response: '*',
    request: '*',
    'request-internal': '*',
  },
];

plugins.push({
  plugin: Good,
  options: {
    reporters: {
      console: [
        {
          module: 'good-squeeze',
          name: 'Squeeze',
          args: logSqueezeArgs,
        },
        {
          module: 'good-console',
          args: [
            {
              format: 'HH:mm:ss DD.MM.YYYY',
            },
          ],
        },
        'stdout',
      ],
      file: [
        {
          module: 'good-squeeze',
          name: 'Squeeze',
          args: logSqueezeArgs,
        },
        {
          module: 'good-squeeze',
          name: 'SafeJson',
        },
        {
          module: 'rotating-file-stream',
          args: [
            'log',
            {
              interval: '1d',
              compress: 'gzip',
              path: './logs',
            },
          ],
        },
      ],
    },
  },
});

plugins.push({
  plugin: Mongo,
  options: {
    url: process.env.MONGO_URL,
    decorate: true,
  },
});

plugins.push({
  plugin: Swagger,
  options: {
    documentationPage: true, // boolean to enable/disable Swagger
    info: {
      title: 'API Documentation',
      version: Pack.version,
    },
    jsonEditor: true,
  },
});

module.exports = plugins;

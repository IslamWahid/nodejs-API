const Hapi = require('hapi');

const plugins = require('./plugins.js');
const routes = require('../src/routes');

const server = Hapi.server({
  host: '0.0.0.0',
  port: process.env.PORT || 3000,
});

const init = async () => {
  try {
    await server.register(plugins);
    server.route(routes);
    await server.start();
    server.log(['startup'], `Server running at ${server.info.uri}`);
  } catch (e) {
    server.log(['startup', 'error'], `Server start error ${e}`);
    process.exit(1);
  }
};

process.on('unhandledRejection', (err) => {
  server.log(['unhandledRejection', 'error'], err);
  process.exit(1);
});

init();

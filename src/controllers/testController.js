const Boom = require('boom');

module.exports = {
  get() {
    return {
      welcome: 'hi, there is an API here that talks JSON :-)',
    };
  },
  getPromise() {
    return Promise.resolve({
      promise: true,
    });
  },
  post(request) {
    let simpleReturn;

    if (request.payload.error) {
      simpleReturn = Boom.internal();
    } else {
      simpleReturn = {
        request: false,
        reply: false,
        works: true,
      };
    }

    return simpleReturn;
  },

  postLog(request) {
    request.log([request.method, request.path, 'info'], 'Just logging around');
    return request.payload;
  },
};

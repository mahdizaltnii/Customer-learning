const i18next = require('i18next');
const i18nextMiddleware = require('i18next-http-middleware');

i18next.use(i18nextMiddleware.LanguageDetector).init({
  preload: ['ar', 'en'],

});

const i18nextFastify = (fastify, opts, done) => {
  fastify.decorate('i18n', i18next);
  fastify.addHook('preHandler', i18nextMiddleware.handle(i18next, {
    ignoreRoutes: ['/foo']  
  }));
  done();
};

module.exports = i18nextFastify;

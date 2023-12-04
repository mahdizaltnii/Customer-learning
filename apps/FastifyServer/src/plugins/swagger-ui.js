const fp = require("fastify-plugin");
const swaggerUI = require("@fastify/swagger-ui");

/**
 * A Fastify plugin for serving Swagger UI.
 *
 * @see https://github.com/fastify/fastify-swagger-ui
 */
module.exports = fp(
  async (fastify) => {
    fastify.register(swaggerUI, {
      routePrefix: "/docs",

      uiConfig: {
        docExpansion: "none",
        deepLinking: false,
      },
    });
  },
  {
    name: "swagger-ui",
    dependencies: ["swagger"],
  }
);

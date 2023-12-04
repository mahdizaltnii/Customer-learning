const fp = require("fastify-plugin");
const swagger = require("@fastify/swagger");

/**
 * A Fastify plugin for serving Swagger (OpenAPI v2) or OpenAPI v3 schemas
 *
 * @see https://github.com/fastify/fastify-swagger
 */
module.exports = fp(
  async (fastify) => {
    fastify.register(swagger, {
      openapi: {
        info: {
          title: "swagger",
          description: "testing the fastify swagger api",
          version: "0.1.0",
        },
        servers: [
          {
            url: "http://localhost:3000",
          },
        ],
        components: {
          securitySchemes: {
            apiKey: {
              type: "apiKey",
              name: "Authorization",
              in: "header",
            },
          },
        },
      },
      hideUntagged: true,
    });
  },
  {
    name: "swagger",
  }
);

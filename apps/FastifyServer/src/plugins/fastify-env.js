const env = require("@fastify/env");
const fp = require("fastify-plugin");
const schema = {
    type: 'object',
    properties: {
      TOKEN_KEY: { type: 'string' }
    },
    required: ['TOKEN_KEY']
  };
  async function registerFastifyEnv(fastify, options) {
    await fastify.register(env, {
      confKey: "config",
      schema: schema,
      dotenv: true,
    });
  
    
  }
  
  module.exports = fp(registerFastifyEnv, {
    name: "fastify-env",
  });  
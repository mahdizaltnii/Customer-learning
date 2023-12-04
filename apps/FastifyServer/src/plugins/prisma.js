const prisma = require("database");
const fp = require("fastify-plugin");
  
async function fastifyPrisma(fastify, options) {
    fastify.decorate("prisma", prisma);
}
  
module.exports = fp(fastifyPrisma, {
    name: "prisma",
});
  
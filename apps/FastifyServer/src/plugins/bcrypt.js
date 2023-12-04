const bcrypt = require('bcrypt');
const fp = require("fastify-plugin");

async function fastifyBcrypt(fastify, options) {
	fastify.decorate("bcrypt", bcrypt);
}

module.exports = fp(fastifyBcrypt, {
	name: "bcrypt",
});
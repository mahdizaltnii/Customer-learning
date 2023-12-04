
const closeWithGrace = require("close-with-grace");
const app = require("./app");
const fastify = require("fastify")({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
  pluginTimeout: 20000,
});

fastify.register(require('@fastify/cors'), {
  // Optionally, put your CORS options here. Example:
  // origin: "*",  // Allow all origins
  // methods: ["GET", "POST", "PUT", "DELETE"],  // Allow specific HTTP methods
});

//register fastify app
fastify.register(app).ready((err) => {
  if (err) throw err;
  // delay is the number of milliseconds for the graceful close to finish
  const closeListeners = closeWithGrace(
    {
      delay: parseInt(process.env.FASTIFY_CLOSE_GRACE_DELAY) || 500,
    },
    async function ({ signal, err, manual }) {
      if (err) {
        fastify.log.error(err);
      }
      await fastify.close();
    },
  );
  fastify.addHook("onClose", async (_instance, done) => {
    closeListeners.uninstall();
    done();
  });
  //server listen
  const port = process.env.PORT || 3000;
  // Start listening.
  // Final catch-all route forwards back to the Vite server

  fastify.listen({ port: parseInt(port) }, (err) => {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
  });
});

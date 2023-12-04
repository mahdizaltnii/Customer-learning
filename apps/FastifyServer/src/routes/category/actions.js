module.exports = async function (fastify, opts) {
  fastify.get(
    "", {
      schema: {
        tags: ["category Operations"],
      },
    },
    async function (request, reply) {
      try {
        const {
          prisma
        } = fastify;
        const categorys = await prisma.category.findMany();
        fastify.log.info(categorys);
        return reply.status(200).send(categorys);
      } catch (err) {
        return err;
      }
    }
  );
  fastify.post(
    "", {
      schema: {
        tags: ["category Operations"],
        body: {
          type: "object",
          properties: {
            name: {
              type: "string"
            },
            description: {
              type: "string"
            },
            original_text: {
              type: "string"
            },
            language_code: {
              type: "string"
            }
          },
          required: ["name", "original_text", "language_code"],
        },
      },
    },
    async function (request, reply) {
      try {
        const {
          prisma
        } = fastify;
        const {
          name,
          original_text,
          language_code
        } = request.body;

        const categorys = await prisma.category.create({
          data: {
            name,
            text_content: {
              create: {
                original_text,
                language_code
              }
            }
          },
        });

        fastify.log.info(categorys);
        return reply.status(200).send(categorys);

      } catch (err) {
        return reply.status(500).send(err);
      }
    }
  );
  fastify.get(
    "/:id", {
      schema: {
        tags: ["category Operations"],
      },
    },
    async function (request, reply) {
      const {
        id
      } = request.params;
      const categoryId = parseInt(id, 10);
      try {
        const {
          prisma
        } = fastify;
        const categorys = await prisma.category.findUnique({
          where: {
            id: categoryId,
          },
        });
        fastify.log.info(categorys);
        return reply.status(200).send(categorys);
      } catch (err) {
        return err;
      }
    }
  );
  fastify.put(
    "/:id", {
      schema: {
        tags: ["category Operations"],
        params: {
          type: "object",
          properties: {
            id: {
              type: "integer"
            },
          },
          required: ["id"],
        },
        body: {
          type: "object",
          properties: {
            name: {
              type: "string"
            },
            description: {
              type: "string"
            },
          },
          required: ["name"],
        },
      },
    },
    async function (request, reply) {
      const {
        id
      } = request.params;

      const {
        name
      } = request.body;
      try {
        const {
          prisma
        } = fastify;
        const categoryId = parseInt(id, 10);
        const categorys = await prisma.category.update({
          where: {
            id: categoryId,
          },
          data: {
            name
          },
        });
        fastify.log.info(categorys);
        return reply.status(200).send(categorys);
      } catch (err) {
        return err;
      }
    }
  );

  fastify.delete(
    "/:id", {
      schema: {
        tags: ["category Operations"],
        params: {
          type: "object",
          properties: {
            id: {
              type: "integer"
            },
          },
          required: ["id"],
        },
      },
    },
    async function (request, reply) {
      const {
        id
      } = request.params;
      try {
        const {
          prisma
        } = fastify;
        const categoryId = parseInt(id, 10);
        const categorys = await prisma.category.delete({
          where: {
            id: categoryId,
          },
        });
        fastify.log.info(categorys);
        return reply.status(200).send(categorys);
      } catch (err) {
        return err;
      }
    }
  );
};
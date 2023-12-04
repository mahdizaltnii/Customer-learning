module.exports = async function (fastify, opts) {
  fastify.get(
    "",
    {
      schema: {
        tags: ["Course Operations"],
      },
    },
    async function (request, reply) {
      try {
        const { prisma } = fastify;
        const courses = await prisma.course.findMany();
        fastify.log.info(courses);
        return reply.status(200).send(courses);
      } catch (err) {
        return err;
      }
    }
  );
  fastify.post(
    "",
    {
      schema: {
        tags: ["Course Operations"],
        body: {
          // This defines the shape of the request body
          type: "object",
          properties: {
            title: {
              type: "string",
            },
            description: {
              type: "string",
            },
            full_description: {
              type: "string",   
          }
          },
          required: ["title", "description","full_description"],
        },
      },
    },

    async function (request, reply) {
      try {
        const { prisma } = fastify;
        const { title, description } = request.body;
        const courses = await prisma.course.create({
          data: {
            title,
            description,
            full_description
          },
        });
        fastify.log.info(courses);
        return reply.status(200).send(courses);
      } catch (err) {
        return err;
      }
    }
  );
  fastify.get(
    "/:id",
    {
      schema: {
        tags: ["Course Operations"],
        params: {
          type: "object",
          properties: {
            id: {
              type: "integer",
            },
          },
          required: ["id"],
        },
      },
    },
    async function (request, reply) {
      const { id } = request.params;
      const courseId = parseInt(id, 10);
      try {
        const { prisma } = fastify;
        const courses = await prisma.course.findUnique({
          where: {
            id: courseId,
          },
        });
        fastify.log.info(courses);
        return reply.status(200).send(courses);
      } catch (err) {
        return err;
      }
    }
  );
  fastify.put(
    "/:id",
    {
      schema: {
        tags: ["Course Operations"],
        params: {
          type: "object",
          properties: {
            id: {
              type: "integer",
            },
          },
          required: ["id"],
        },
        body: {
          // This defines the shape of the request body
          type: "object",
          properties: {
            title: {
              type: "string",
            },
            description: {
              type: "string",
            },
          },
          required: ["title", "description"],
        },
      },
    },
    async function (request, reply) {
      const { id } = request.params;
      const { title } = request.body;
      const { description } = request.body;
      try {
        const { prisma } = fastify;
        const courseId = parseInt(id, 10);
        const courses = await prisma.course.update({
          where: {
            id: courseId,
          },
          data: {
            title,
            description,
          },
        });
        fastify.log.info(courses);
        return reply.status(200).send(courses);
      } catch (err) {
        return err;
      }
    }
  );

  fastify.delete(
    "/:id",
    {
      schema: {
        tags: ["Course Operations"],
        params: {
          type: "object",
          properties: {
            id: {
              type: "integer",
            },
          },
          required: ["id"],
        },
      },
    },
    async function (request, reply) {
      const { id } = request.params;
      try {
        const { prisma } = fastify;
        const courseId = parseInt(id, 10);
        const courses = await prisma.course.delete({
          where: {
            id: courseId,
          },
        });
        fastify.log.info(courses);
        return reply.status(200).send(courses);
      } catch (err) {
        return err;
      }
    }
  );

  fastify.post(
    "/:categoryId",
    {
      schema: {
        tags: ["Course Operations"],
        body: {
          // This defines the shape of the request body
          type: "object",
          properties: {
            title: {
              type: "string",
            },
            description: {
              type: "string",
            },
            original_text: {
              type: "string",
            },
            language_code: {
              type: "string",
            },
            icon: {
              // Added the icon property
              type: "string",
            },
            color: {
              // Added the color property
              type: "string",
            },
            full_description: {
              type: "string",   
          }
          },
          required: [
            "title",
            "description",
            "original_text",
            "language_code",
            "icon",
            "color",
            "full_description",
          ],
        },
        params: {
          type: "object",
          properties: {
            categoryId: {
              type: "number",
            },
          },
          required: ["categoryId"],
        },
      },
    },
    async function (request, reply) {
      try {
        const { prisma } = fastify;

        const {
          title,
          description,
          original_text,
          language_code,
          icon,
          color,
          full_description
        } = request.body;

        const { categoryId } = request.params;

        const courses = await prisma.course.create({
          data: {
            title,
            description,
            icon,
            color,
            full_description,
            category: {
              connect: {
                id: Number(categoryId),
              },
            },
            text_content: {
              create: {
                original_text,
                language_code,
              },
            },
          },
        });

        fastify.log.info(courses);
        return reply.status(200).send(courses);
      } catch (err) {
        return reply.status(500).send(err);
      }
    }
  );
};

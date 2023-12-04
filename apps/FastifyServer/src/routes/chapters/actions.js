module.exports = async function (fastify, opts) {
  fastify.get(
    "",
    {
      schema: {
        tags: ["chapter Operations"],
      },
    },
    async function (request, reply) {
      try {
        const { prisma } = fastify;
        const chapters = await prisma.chapter.findMany();
        fastify.log.info(chapters);
        return reply.status(200).send(chapters);
      } catch (err) {
        return err;
      }
    }
  );
  fastify.post(
    "",
    {
      schema: {
        tags: ["chapter Operations"],
        body: {
          // This defines the shape of the request body
          type: "object",
          properties: {
            title: {
              type: "string",
            },
          },
          required: ["title"],
        },
      },
    },

    async function (request, reply) {
      try {
        const { prisma } = fastify;
        const { title } = request.body;
        const chapters = await prisma.chapter.create({
          data: {
            title,
          },
        });
        fastify.log.info(chapters);
        return reply.status(200).send(chapters);
      } catch (err) {
        return err;
      }
    }
  );
  fastify.get(
    "/:id",
    {
      schema: {
        tags: ["chapter Operations"],
      },
    },
    async function (request, reply) {
      const { id } = request.params;
      const chapterId = parseInt(id, 10);
      try {
        const { prisma } = fastify;
        const chapters = await prisma.chapter.findUnique({
          where: {
            id: chapterId,
          },
        });
        fastify.log.info(chapters);
        return reply.status(200).send(chapters);
      } catch (err) {
        return err;
      }
    }
  );
  fastify.put(
    "/:id",
    {
      schema: {
        tags: ["chapter Operations"],
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
          required: ["title"],
        },
      },
    },
    async function (request, reply) {
      const { id } = request.params;
      const { title } = request.body;

      try {
        const { prisma } = fastify;
        const chapterId = parseInt(id, 10);
        const chapters = await prisma.chapter.update({
          where: {
            id: chapterId,
          },
          data: {
            title,
          },
        });
        fastify.log.info(chapters);
        return reply.status(200).send(chapters);
      } catch (err) {
        return err;
      }
    }
  );

  fastify.delete(
    "/:id",
    {
      schema: {
        tags: ["chapter Operations"],
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
        const chapterId = parseInt(id, 10);
        const chapters = await prisma.chapter.delete({
          where: {
            id: chapterId,
          },
        });
        fastify.log.info(chapters);
        return reply.status(200).send(chapters);
      } catch (err) {
        return err;
      }
    }
  );
  fastify.post(
    "/:courseId",
    {
      schema: {
        tags: ["Chapter Operations"],
        params: {
          type: "object",
          properties: {
            courseId: { type: "number" },
          },
          required: ["courseId"],
        },
        body: {
          type: "object",
          properties: {
            title: { type: "string" },
            original_text: {
              type: "string",
            },
            language_code: {
              type: "string",
            },
          },
          required: ["title","original_text",
          "language_code"],
          
        },
      },
    },
    async function (request, reply) {
      try {
        const { prisma } = fastify;
        const { title,original_text,
          language_code } = request.body;
        const { courseId } = request.params;
        const existingCourse = await prisma.course.findUnique({
          where: { id: parseInt(courseId) },
        });
        if (!existingCourse) {
          reply.status(404).send("Course not found");
          return;
        }
        const newChapter = await prisma.chapter.create({
          data: {
            title,
            subject: {
              connect: { id: Number(courseId) },
            },
            text_content: {
              create: {
                original_text,
                language_code,
              },
            },
          },
        });
        fastify.log.info(newChapter);
        return reply.status(201).send(newChapter);
      } catch (err) {
        fastify.log.error(err);
        return reply.status(500).send({ error: 'Internal Server Error' });
      }
    }
  );

  fastify.get(
    "/:courseId/chapters",
    {
      schema: {
        tags: ["Chapter Operations"],
        params: {
          type: "object",
          properties: {
            courseId: { type: "number" },
          },
          required: ["courseId"],
        },
      },
    },
    
      async function (request, reply) {
        try {
          const { prisma } = fastify;
          const { courseId } = request.params;
  
          const chapters = await prisma.chapter.findMany({
            where: {
              subject: {
                id: Number(courseId),
              },
            },
          });
  
          if (!chapters.length) {
            reply.status(404).send("No chapters found for the provided course ID");
            return;
          }
  
          fastify.log.info(chapters);
          return reply.status(200).send(chapters);
        } catch (err) {
          fastify.log.error(err);
          return reply.status(500).send({ error: 'Internal Server Error' });
        }
      }
  );

  
  
};

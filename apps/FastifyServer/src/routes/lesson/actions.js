module.exports = async function (fastify, opts) {
  fastify.get(
    "",
    {
      schema: {
        tags: ["Lesson Operations"],
      },
    },
    async function (request, reply) {
      try {
        const { prisma } = fastify;
        const lessons = await prisma.lesson.findMany();
        fastify.log.info(lessons);
        return reply.status(200).send(lessons);
      } catch (err) {
        return err;
      }
    }
  );
  fastify.post(
    "AffectLessonToSubject/:subjectId",
    {
      schema: {
        tags: ["Lesson Operations"],
        params: {
            type: 'object',
            properties: {
              id: { type: 'integer' },
            },
            required: ['id']
          },
        body: {
          type: "object",
          properties: {
            title: {
              type: "string",
            },
            description: {
              type: "string",
            },
          },
          required: ["title", "content"],
        },
      },
    },

    async function (request, reply) {
      try {
        const { prisma } = fastify;
        const { title, content } = request.body;
        const { subjectId } = req.params;
        const existingSubject = await prisma.subject.findUnique({
            where: { id: parseInt(subjectId) },
          });
          if (!existingSubject) {
            res.status(404).send("Subject not found");
            return;
          }
        const lessons = await prisma.lesson.create({
          data: {
            title,
            content,
            subject: { connect: { id: parseInt(subjectId) } },
          },
        });
        fastify.log.info(lessons);
        return reply.status(200).send(lessons);
      } catch (err) {
        return err;
      }
    }
  );
  fastify.get(
    "/:id",
    {
      schema: {
        tags: ["Lesson Operations"],
      },
    },
    async function (request, reply) {
      const { id } = request.params;
      const lessonId = parseInt(id, 10);
      try {
        const { prisma } = fastify;
        const lessons = await prisma.lesson.findUnique({
          where: {
            id: lessonId,
          },
        });
        fastify.log.info(lessons);
        return reply.status(200).send(lessons);
      } catch (err) {
        return err;
      }
    }
  );
  fastify.put(
    "/:id",
    {
      schema: {
        tags: ["Lesson Operations"],
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
          required: ["title", "content"],
        },
      },
    },
    async function (request, reply) {
      const { id } = request.params;
      const { title } = request.body;
      const { content } = request.body;
      try {
        const { prisma } = fastify;
        const lessonId = parseInt(id, 10);
        const lessons = await prisma.lesson.update({
          where: {
            id: lessonId,
          },
          data: {
            title,
            content,
          },
        });
        fastify.log.info(lessons);
        return reply.status(200).send(lessons);
      } catch (err) {
        return err;
      }
    }
  );

  fastify.delete(
    "/:id",
    {
      schema: {
        tags: ["Lesson Operations"],
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
        const lessonId = parseInt(id, 10);
        const lessons = await prisma.lesson.delete({
          where: {
            id: lessonId,
          },
        });
        fastify.log.info(lessons);
        return reply.status(200).send(lessons);
      } catch (err) {
        return err;
      }
    }
  );
  fastify.post("/AffectLessonToChapter/:chapterId",
  {
    schema: {
      tags: ['Lesson Operations'],
      body: {  
        type: 'object',
        properties: {
          title: { type: 'string' },
          content: { type: 'string' },
        },
        required: ['title', 'content']
      }},
  },
  async function (request, reply) {
    try {
      const { prisma } = fastify;
      const { title, content } = request.body;
      const { chapterId } = request.params;
      const existingChapter = await prisma.chapter.findUnique({
        where: { id: parseInt(chapterId) },
      });
      if (!existingChapter) {
        reply.status(404).send("Chapter not found");
        return;
      }
      const newLesson = await prisma.lesson.create({
        data: {
          title,
          content,
          chapter: {
            connect: { id: parseInt(chapterId) },
          },
        },
      });
      fastify.log.info(newLesson);
      return reply.status(201).send(newLesson);
    } catch (err) {
      return err;
    }
  }
);

};

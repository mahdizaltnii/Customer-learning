const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

module.exports = async function (fastify, opts) {
  const { prisma, bcrypt,mailer } = fastify;
  fastify.post(
    "/register",
    {
      schema: {
        tags: ["Auth Operations"],
        body: {
          type: "object",
          properties: {
            email: {
              type: "string",
            },
            password: {
              type: "string",
            },
            name: {
              type: "string",
            },
            username: {
              type: "string",
            },
          },
          required: ["email", "password", "name", "username"],
        },
      },
    },
    async function (request, reply) {
      try {
        const { email, password, name, username } = request.body;
        const hash = await bcrypt.hash(password, 10);
        const role = "USER";
        const user = await prisma.user.create({
          data: {
            email,
            password: hash,
            name,
            username,
            role_id: 1,
          },
        });

        return reply.status(201).send({ user });
      } catch (err) {
        return err;
      }
    }
  );
  fastify.post(
    "/login",
    {
      schema: {
        tags: ["Auth Operations"],
        body: {
          type: "object",
          properties: {
            email: {
              type: "string",
            },
            password: {
              type: "string",
            },
          },
          required: ["email", "password"],
        },
      },
    },
    async function (request, reply) {
      try {
        const { email, password } = request.body;
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });
        if (!user) return reply.status(404).send({ message: "User not found" });
        const verifyPassword = await bcrypt.compare(password, user.password);
        if (!verifyPassword)
          return reply.status(401).send({ message: "Invalid password" });
        const token = fastify.jwt.sign(
          {
            exp: Math.floor(Date.now() / 1000) + 60 * 60,

            data: {
              id: user.id,
              email: user.email,
              name: user.name,
              username: user.username,
              role: user.role,
            },
          },
          "supersecret"
        );

        return reply.status(200).send({ token });
      } catch (err) {
        return err;
      }
    }
  );

  fastify.post(
    `/forgotPassword`,
    {
      schema: {
        tags: ["Auth Operations"],
        body: {
          type: "object",
          properties: {
            email: {
              type: "string",
            },
          },
          required: ["email"],
        },
      },
    },
    async function (request, reply) {
      const { email } = request.body;

      try {
        const userExist = await prisma.user.findFirst({
          where: {
            email: email,
          },
        });
        if (!userExist)
          return reply.status(403).send("wrong email or password");
        const verificationCode = crypto
          .randomBytes(Math.ceil(8 / 2))
          .toString("hex")
          .slice(0, 8)
          .toUpperCase();
        const resetLink = `http://localhost:5173/reset-password/${verificationCode}`;

        await prisma.passwordResetToken.create({
          data: {
            userId: userExist.id,
            token: verificationCode,
            expiresAt: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1 hour from now
          },
        });

        const emailContent = `
          <!DOCTYPE html>
          <html>
          <head>
          </head>
          <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
              <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 4px; padding: 20px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                  <div style="text-align: center; margin-bottom: 20px;">
                      <img src="https://www.joodbooking.com/assets/img/logo_en.svg" alt="Customer Learning Platform" style="max-width: 150px;">
                  </div>

                  <h2 style="color: #333366;">Hello, ${userExist.name}</h2>
                  <p>We recently received a request to reset the password for your <strong>Customer Learning Platform</strong> account.</p>

                  <div style="margin: 20px 0;">
                      <a href="${resetLink}" style="background-color: #4466FF; color: #ffffff; text-decoration: none; padding: 10px 15px; border-radius: 4px; display: inline-block;">Reset Password</a>
                  </div>

                  <p>This link will expire in 1 hour for security reasons. If you didn't request this password reset, please ignore this email or contact our support if you have concerns about the security of your account.</p>

                  <p>If you have any questions or face any issues, please don't hesitate to reach out. We're here to help!</p>

                  <p style="border-top: 1px solid #d4d4d4; padding-top: 10px; color: #777777;">
                      Warm regards,<br>
                      The <strong>Customer Learning Platform</strong> Team
                  </p>
              </div>
          </body>
          </html>
      `;
       
        const mailOptions = {
          from: "mahdi.zeo@gmail.com",
          to: userExist.email,
          subject: "Password Reset Request for Customer Learning Platform",
          html: emailContent,
        };

        await fastify.mailer.sendMail(mailOptions);
        reply.send({ message: "Email sent successfully" });
      } catch (error) {
        reply.send({ error: "Failed to send email" });
      }
    }
  );

  fastify.post(
    `/forgotPasswordd`,
    {
      schema: {
        tags: ["Auth Operations"],
        body: {
          type: "object",
          properties: {
            email: {
              type: "string",
            },
          },
          required: ["email"],
        },
      },
    },
    async function (request, reply) {
      const { email } = request.body;

      try {
        const userExist = await prisma.user.findFirst({
          where: {
            email: email,
          },
        });

        if (!userExist)
          return reply.status(403).send("wrong email or password");

        const verificationCode = crypto
          .randomBytes(Math.ceil(8 / 2))
          .toString("hex")
          .slice(0, 8)
          .toUpperCase();
        const resetLink = `http://localhost:5173/reset-password/${verificationCode}`;

        await prisma.passwordResetToken.create({
          data: {
            userId: userExist.id,
            token: verificationCode,
            expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000),
          },
        });

       
        const mailOptions = {
          from: "mahdi.zeo@gmail.com",
          to: userExist.email,
          subject: "reset password",
          text: `your verification code: ${resetLink}`,
        };

        await fastify.mailer.sendMail(mailOptions);
        reply.send({ message: "Email sent successfully" });
      } catch (error) {
        reply.send({ error: "Failed to send email" });
      }
    }
  );

  fastify.post(
    "/resetPassword/:token",
    {
      schema: {
        tags: ["Auth Operations"],
        params: {
          type: "object",
          properties: {
            token: {
              type: "string",
            },
          },
          required: ["token"],
        },
        body: {
          type: "object",
          properties: {
            newPassword: {
              type: "string",
            },
          },
          required: ["newPassword"],
        },
      },
    },
    async (request, reply) => {
      const { token } = request.params;

      const { newPassword } = request.body;
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

      // Validate the token
      const tokenData = await prisma.PasswordResetToken.findFirst({
        where: { token },
      });

      if (!tokenData || tokenData.used || tokenData.expired < new Date()) {
        return reply.status(400).send("Invalid or expired token");
      }

      // Update the user password
      await prisma.user.update({
        where: { id: tokenData.userId },
        data: { password: hashedPassword },
      });

      // Mark the token as used
      await prisma.PasswordResetToken.update({
        where: { token },
        data: { used: true },
      });

      reply.send({ message: "Password reset successfully" });
    }
  );
};

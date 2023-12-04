const nodemailer = require('nodemailer');

async function fastifyMailer(fastify, options) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mahdi.zeo@gmail.com',
            pass: 'mlkuobgojphhifkp'
        }
    });

    fastify.decorate('mailer', transporter);
}

module.exports = fastifyMailer;

const mailer = require('nodemailer');

const sendMail = async (to, subject, htmlContent, cc = '') => {
    console.log(to, 'to')
    const transporter = mailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false, // true for 465, false for other ports
        tls: {
            rejectUnauthorized: false,
        },
        auth: {
            user: process.env.EMAIL_USER, // generated ethereal user
            pass: process.env.EMAIL_PASS, // generated ethereal password
        },
    });
    const options = {
        from: process.env.EMAIL_FROM, // sender address
        to: to, // list of receivers
        cc: cc || '',
        subject: subject, // Subject line
        html: htmlContent, // html body
    };
    return transporter.sendMail(options);
}

module.exports = sendMail;

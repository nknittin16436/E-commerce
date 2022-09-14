const nodeMailer = require('nodemailer');


const sendEmail = async (options) => {

    const transporter = nodeMailer.createTransport({
        service: process.env.SMTP_SERVICE,
        host: 'smtp-mail.outlook.com',
        port: 587,
        tls: {
            ciphers:'SSLv3'
         },
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD
        },
    });

   



    const mailOptions = {
        from: process.env.SMTP_EMAIL,
        to: options.email,
        subject: options.subject,
        text: options.message
    };
    await transporter.sendMail(mailOptions);
}

module.exports = sendEmail
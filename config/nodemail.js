const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: process.env.EMAIL_SECURE === 'true', 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false, 
  },
});

async function sendEmail({ to, subject, text, html }) {
  const mailOptions = {
    from: '"Name of Your Shop" <' + process.env.EMAIL_USER + '>',
    to,
    subject,
    text,
    html,
  };
  return transporter.sendMail(mailOptions);
}

module.exports = { transporter, sendEmail };

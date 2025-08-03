const nodemailer = require('nodemailer');
require('dotenv').config();

async function sendTestEmail() {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  try {
    const info = await transporter.sendMail({
      from: `"ПДД Тест" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: 'Тестовая отправка письма',
      text: 'Это тестовое письмо для проверки SMTP.'
    });
    console.log('Письмо успешно отправлено:', info.response);
  } catch (error) {
    console.error('Ошибка при отправке письма:', error);
  }
}

sendTestEmail();

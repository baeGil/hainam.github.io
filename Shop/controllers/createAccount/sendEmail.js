const nodemailer = require("nodemailer");

exports.sendEmail = async (email, subject, htmlContent) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.Host,
      service: process.env.Service,
      port: 587,
      secure: false,
      auth: {
        user: process.env.Email,
        pass: process.env.Password,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    await transporter.sendMail({
      from: process.env.Email,
      to: email,
      subject: subject,
      html: htmlContent,
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.log(error, "Email not sent");
  }
};

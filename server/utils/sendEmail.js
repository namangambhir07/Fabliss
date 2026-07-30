import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const sendEmail = async ({ source, name, company, email, phone, quantity, occasion, message }) => {

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Fabliss Website" <${process.env.EMAIL_USER}>`,
    to: process.env.RECEIVER_EMAIL,
    replyTo: email,
    subject: `📩 New ${source} Form Inquiry`,
    html: `
      <h2>New Inquiry Received</h2>

      <p><strong>Source:</strong> ${source}</p>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Company:</strong> ${company || "N/A"}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Quantity:</strong> ${quantity}</p>
      <p><strong>Occasion:</strong> ${occasion}</p>

      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  });
};

export default sendEmail;
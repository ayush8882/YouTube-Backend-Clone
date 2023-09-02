const sgMail = require("@sendgrid/mail");
const client = require("@sendgrid/client");
require("dotenv").config();

const setupClient = async () => {
  client.setApiKey(process.env.SENDGRID_API_KEY || "");
  sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");
};

const sendEmail = async (body) => {
  try {
    await setupClient();
    const message = {
      from: process.env.SENDER_EMAIL,
      to: "ayushagrawalayush3@gmail.com",
      subject: "Password reset token",
      text: body,
    };
    await sgMail.send(message);
  } catch (error) {
    console.error("Error occured while sending email", error.message);
    return;
  }
};

module.exports = sendEmail;

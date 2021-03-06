const nodemailer = require("nodemailer");
require("dotenv").config();

interface FormValues {
  Name: string;
  Email: string;
  Subject: string;
  Message: string;
}

export const sendMail = async (values: FormValues) => {
  const transporter = await nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.USER,
      pass: process.env.PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.USER,
    to: process.env.USER,
    subject: `${values.Subject} | ${values.Name} | ${values.Email}`,
    text: values.Message,
    html: `<b>${values.Message}</b>`,
  });

  await transporter.sendMail({
    from: process.env.USER,
    to: values.Email,
    subject: "Confirmation de message",
    text: "Bonjour, Votre message a bien été pris en compte, je vous répondrai le plus rapidement possible. Cordialement, Jean-François Pann Kervignac Digital",
    html: "<b>Bonjour,<br/><br/> Votre message a bien été pris en compte,<br/> je vous répondrai le plus rapidement possible.<br/><br/> Cordialement,<br/>Jean-François PANN<br/>Kervignac Digital</b>",
  });
};

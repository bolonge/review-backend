import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";

export const secretThings = async () => {
  const randomNumber = Math.floor(Math.random() * 99999);
  const randomHash = await bcrypt.hash("364738", 10);
  return `${randomNumber} ${randomHash}`;
};

export const sendMail = email => {
  const options = {
    auth: {
      api_user: process.env.SENDGRID_USERNAME,
      api_key: process.env.SENDGRID_PASSWORD
    }
  };
  const client = nodemailer.createTransport(sgTransport(options));
  return client.sendMail(email);
};

export const sendSecretMail = (adress, secret) => {
  const email = {
    from: "bolong@reviewmaster.com",
    to: adress,
    subject: "리뷰 로그인 시크릿",
    html: `로그인 시크릿 <br/>${secret}`
  };
  return sendMail(email);
};

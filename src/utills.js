import bcrypt from "bcryptjs";

export const secretThings = async () => {
  const randomNumber = Math.floor(Math.random() * 99999);
  const randomHash = await bcrypt.hash("364738", 10);
  return `${randomNumber} ${randomHash}`;
};

export const sendMail = email => {};

export const sendSecretMail = () => {};

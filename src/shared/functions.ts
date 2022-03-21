import { Response } from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

export const sixDigitsCode = () => {
  let code: string = "";
  for (let i = 0; i < 6; i++) {
    code += Math.floor(Math.random() * 10).toString();
  }
  return code;
};

export const getTimestamp = () => {
  const d = new Date();
  return `${d.getFullYear()}-${
    d.getMonth() + 1
  }-${d.getDate()} ${d.getHours()}-${d.getMinutes()}-${d.getSeconds()}`;
};

export const sendCodeToEmail = (email: string, res: Response) => {
  dotenv.config();

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const code = sixDigitsCode();
  const options = {
    from: process.env.EMAIL_ADDRESS,
    to: `${email}`,
    subject: "Account verification code",
    text: `Please enter this code in the app to verify your account: ${code}`,
  };
  transporter.sendMail(options, (error, info) => {
    if (error) {
      res.send(error);
    } else {
      res.send({
        info,
        code,
      });
    }
  });
};

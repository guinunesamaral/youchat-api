import { Request, Response } from "express";
import nodemailer from "nodemailer";
import Database from "../shared/Database";

const getAll = async (_: Request, res: Response) => {
  const query = `SELECT * FROM user`;
  await Database.query(res, query, 204);
};

const getById = async (req: Request, res: Response) => {
  const query = `SELECT * FROM user WHERE id LIKE '${req.params.id}'`;
  await Database.query(res, query, 204);
};

const verifyEmail = async (req: Request, res: Response) => {
  const sixDigitsCode = () => {
    let code: string = "";
    for (let i = 0; i < 6; i++) {
      code += Math.floor(Math.random() * 10).toString();
    }
    return code;
  };

  if (req.body.email) {
    const transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      auth: {
        user: "youchatverify@outlook.com",
        pass: "Bjid58XAayA2eaV",
      },
    });
    transporter.sendMail(
      {
        from: "youchatverify@outlook.com",
        to: `${req.body.email}`,
        subject: "Account verification",
        text: `Please enter this code in the app to verify your account: ${sixDigitsCode()}`,
      },
      (err, info) => {
        if (err) {
          res.send(err);
        } else {
          res.send(info);
        }
      }
    );
  } else {
    res.status(400).send("the request body has no email");
  }
};

const login = async (req: Request, res: Response) => {
  if (req.body) {
    const query = `SELECT * FROM user WHERE email = '${req.body.email}' AND password = '${req.body.password}'`;
    await Database.query(res, query, 400);
  } else {
    res.status(400).send("there' no body in the request");
  }
};

const create = async (req: Request, res: Response) => {
  if (req.body.id === req.params.id) {
    const query = `INSERT INTO user (id, name, email, password) VALUES ('${req.body.id}', '${req.body.name}', '${req.body.email}', '${req.body.password}')`;
    await Database.query(res, query, 400);
  } else {
    res
      .status(400)
      .send("the request body's id is different from the params' id");
  }
};

const update = async (req: Request, res: Response) => {
  if (req.body) {
    const query = `UPDATE user SET name = ${req.body.name}, email = ${req.body.email}, photo = ${req.body.photo} WHERE id LIKE '${req.params.id}'`;
    await Database.query(res, query, 400);
  } else {
    res.status(400).send("the request has no body");
  }
};

const updateName = async (req: Request, res: Response) => {
  if (req.body.name) {
    const query = `UPDATE user SET name = ${req.body.name}`;
    await Database.query(res, query, 400);
  } else {
    res.status(400).send("the request has no name in the body");
  }
};

const updateEmail = async (req: Request, res: Response) => {
  if (req.body.email) {
    const query = `UPDATE user SET email = ${req.body.email}`;
    await Database.query(res, query, 400);
  } else {
    res.status(400).send("the request has no email in the body");
  }
};

const updatePhoto = async (req: Request, res: Response) => {
  if (req.body.photo) {
    const query = `UPDATE user SET email = ${req.body.email}`;
    await Database.query(res, query, 400);
  } else {
    res.status(400).send("the request has no email in the body");
  }
};

const exclude = async (req: Request, res: Response) => {
  const query = `DELETE FROM user WHERE id LIKE '${req.params.id}'`;
  await Database.query(res, query, 204);
};

export default {
  getAll,
  getById,
  verifyEmail,
  login,
  create,
  updateName,
  updateEmail,
  updatePhoto,
  update,
  exclude,
};

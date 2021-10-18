import { Request, Response } from "express";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import Database from "../shared/Database";

const getAll = async (_: Request, res: Response) => {
  const query = `SELECT * FROM user`;
  await Database.query(res, query, 204);
};

const getById = async (req: Request, res: Response) => {
  if (req.params.id) {
    const query = `SELECT * FROM user WHERE id = '${req.params.id}'`;
    await Database.query(res, query, 204);
  } else {
    res.status(400).send("the request params doesn't have the user id");
  }
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
    let query = `SELECT password FROM user WHERE email = '${req.body.email}'`;
    await Database.queryWithoutRes(query, async (_: any, results: any) => {
      if (results.length === 1) {
        const hashedPassword = results[0].password;
        const match = bcrypt.compareSync(req.body.password, hashedPassword);
        if (match) {
          query = `SELECT * FROM user WHERE email = '${req.body.email}' AND password = '${hashedPassword}'`;
          await Database.query(res, query, 400);
        } else {
          res
            .status(400)
            .send("the password provided doesn't with the database version");
        }
      } else {
        res.status(400).send("there's no user with this email and password");
      }
    });
  } else {
    res.status(400).send("the request has no body");
  }
};

const create = async (req: Request, res: Response) => {
  if (req.body) {
    let query = `SELECT * FROM user WHERE email = '${req.body.email}'`;
    await Database.queryWithoutRes(query, async (_: any, results: any) => {
      if (results.length !== 0) {
        res.status(400).send("there's already a user with this email");
      } else {
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(req.body.password, salt);
        console.log(hash);
        query = `INSERT INTO user (id, name, email, password) VALUES ('${uuidv4()}', '${
          req.body.name
        }', '${req.body.email}', '${hash}')`;
        await Database.query(res, query, 400);
      }
    });
  } else {
    res.status(400).send("the request has no body");
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
    res.status(400).send("the request body has no name");
  }
};

const updateEmail = async (req: Request, res: Response) => {
  if (req.body.email) {
    const query = `UPDATE user SET email = ${req.body.email}`;
    await Database.query(res, query, 400);
  } else {
    res.status(400).send("the request body has no email");
  }
};

const updatePhoto = async (req: Request, res: Response) => {
  if (req.body.photo) {
    const query = `UPDATE user SET email = ${req.body.email}`;
    await Database.query(res, query, 400);
  } else {
    res.status(400).send("the request body has no email");
  }
};

const exclude = async (req: Request, res: Response) => {
  if (req.params.id) {
    const query = `DELETE FROM user WHERE id = '${req.params.id}'`;
    await Database.query(res, query, 204);
  } else {
    res.status(400).send("the request params doesn't have the user id");
  }
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

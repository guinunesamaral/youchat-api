import { Request, Response } from "express";
import Database from "../shared/Database";

export default class UserController {
  public static async getAll(_req: Request, res: Response) {
    const sql = `SELECT * FROM user`;
    await Database.query(sql, 204, res);
  }

  public static async getById(req: Request, res: Response) {
    if (req.params.id) {
      const sql = `SELECT * FROM user WHERE id = '${req.params.id}'`;
      await Database.query(sql, 204, res);
    } else {
      res
        .status(400)
        .send({ error: "the request params doesn't have the user id" });
    }
  }

  public static async getByEmail(req: Request, res: Response) {
    if (req.body.email) {
      const sql = `SELECT * FROM user WHERE email = '${req.body.email}'`;
      await Database.query(sql, 204, res);
    } else {
      res
        .status(400)
        .send({ error: "the request params doesn't have the user's email" });
    }
  }

  public static async login(req: Request, res: Response) {
    const bcrypt = await import("bcrypt");

    if (req.body.email && req.body.password) {
      let sql = `SELECT password FROM user WHERE email = '${req.body.email}'`;

      await Database.queryWithCallback(sql, async (_err: any, results: any) => {
        if (results && results.length === 1) {
          const hashedPassword = results[0].password;
          const match = bcrypt.compareSync(req.body.password, hashedPassword);

          if (match) {
            sql = `SELECT * FROM user WHERE email = '${req.body.email}' AND password = '${hashedPassword}'`;
            await Database.query(sql, 400, res);
          } else {
            res.status(400).send({
              error: "the password provided doesn't match with the email",
            });
          }
        } else {
          res
            .status(400)
            .send({ error: "there's no user with this email and password" });
        }
      });
    } else {
      res.status(400).send({ error: "the request has no body" });
    }
  }

  public static async checkIfEmailIsAvailable(req: Request, res: Response) {
    if (req.body.email) {
      let sql = `SELECT * FROM user WHERE email = '${req.body.email}'`;
      await Database.queryWithCallback(sql, async (_err: any, results: any) => {
        if (results) {
          res
            .status(400)
            .send({ error: "there's already an user with this email" });
        }
      });
    } else {
      res.status(400).send({ error: "the request body has no email" });
    }
  }

  public static async resetPasswordSendCode(req: Request, res: Response) {
    const { sendCodeToEmail: sendCodeToEmail } = await import(
      "../shared/functions"
    );

    if (req.body.email) {
      sendCodeToEmail(req.body.email, res);
    } else {
      res.status(400).send({ error: "the request body has no email" });
    }
  }

  public static async verifyEmailIfAvailable(req: Request, res: Response) {
    const { sendCodeToEmail: sendCodeToEmail } = await import(
      "../shared/functions"
    );

    if (req.body.email) {
      const sql = `SELECT * FROM user WHERE email = '${req.body.email}'`;
      await Database.queryWithCallback(sql, async (_: any, results: any) => {
        if (results.length !== 0) {
          res
            .status(400)
            .send({ error: "there's already an user with this email" });
        } else {
          sendCodeToEmail(req.body.email, res);
        }
      });
    } else {
      res.status(400).send({ error: "the request body has no email" });
    }
  }

  public static async create(req: Request, res: Response) {
    const bcrypt = await import("bcrypt");
    const { v4: uuidv4 } = await import("uuid");

    if (req.body.name && req.body.email && req.body.password) {
      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(req.body.password, salt);
      const sql = `INSERT INTO user (id, name, email, password) VALUES ('${uuidv4()}', '${
        req.body.name
      }', '${req.body.email}', '${hashedPassword}')`;
      await Database.query(sql, 400, res);
    } else {
      res.status(400).send({ error: "the request is missing properties" });
    }
  }

  public static async update(req: Request, res: Response) {
    if (req.params.id && req.body.name && req.body.email && req.body.photo) {
      const sql = `UPDATE user SET name = '${req.body.name}', email = '${req.body.email}', photo = '${req.body.photo}' WHERE id LIKE '${req.params.id}'`;
      await Database.query(sql, 400, res);
    } else {
      res.status(400).send("the request has no body");
    }
  }

  public static async updateName(req: Request, res: Response) {
    if (req.params.id && req.body.name) {
      const sql = `UPDATE user SET name = '${req.body.name}' WHERE id = '${req.params.id}'`;
      await Database.query(sql, 400, res);
    } else {
      res.status(400).send("the request body has no name and/or user id");
    }
  }

  public static async updateEmail(req: Request, res: Response) {
    if (req.params.id && req.body.email) {
      const sql = `UPDATE user SET email = '${req.body.email}' WHERE id = '${req.params.id}'`;
      await Database.query(sql, 400, res);
    } else {
      res.status(400).send("the request body has no email and/or user id");
    }
  }

  public static async updatePassword(req: Request, res: Response) {
    const bcrypt = await import("bcrypt");

    // The user can't update the password using an equal password
    if (req.params.id && req.body.email && req.body.password) {
      let sql = `SELECT password FROM user WHERE email = '${req.body.email}'`;
      await Database.queryWithCallback(sql, async (_: any, results: any) => {
        const hashedPassword = results[0].password;
        const match = bcrypt.compareSync(req.body.password, hashedPassword);

        if (match) {
          res.status(400).send("you need to pass a different password");
        } else {
          const sql = `UPDATE user SET password = '${req.body.password}' WHERE id = '${req.params.id}'`;
          await Database.query(sql, 400, res);
        }
      });
    } else {
      res.status(400).send("the request body has no password");
    }
  }

  public static async updatePhoto(req: Request, res: Response) {
    const fs = await import("fs");

    if (req.params.id && req.file && req.file?.path) {
      const photo = fs.readFileSync(req.file.path);
      const sql = `UPDATE user SET photo = ? WHERE id = '${req.params.id}'`;
      await Database.queryWithPlaceholder(sql, photo, 400, res);
    } else {
      res.status(400).send("the request has no photo");
    }
  }

  public static async exclude(req: Request, res: Response) {
    if (req.params.id) {
      const sql = `DELETE FROM user WHERE id = '${req.params.id}'`;
      await Database.query(sql, 204, res);
    } else {
      res.status(400).send("the request params doesn't have the user id");
    }
  }
}

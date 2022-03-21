import { Request, Response } from "express";
import Database from "../shared/Database";

export default class ChatController {
  public static async getAll(_: Request, res: Response) {
    const sql = `SELECT * FROM chat`;
    await Database.query(sql, 204, res);
  }

  public static async getByUserId(req: Request, res: Response) {
    if (req.params.user_id) {
      const sql = `SELECT chat.id, user.id AS friend_id, user.name AS friend_name, user.email AS friend_email, user.photo AS friend_photo FROM chat INNER JOIN user ON user.id = IF (chat.user_id1 = '${req.params.user_id}', chat.user_id2, chat.user_id1) WHERE chat.user_id1 = '${req.params.user_id}' OR chat.user_id2 = '${req.params.user_id}'`;
      await Database.query(sql, 204, res);
    } else {
      res
        .status(400)
        .send({ error: "the request params doesn't have the user id" });
    }
  }

  public static async create(req: Request, res: Response) {
    const { v4: uuidv4 } = await import("uuid");

    if (req.body.user_id1 && req.body.user_id2) {
      let sql = `SELECT * FROM chat WHERE user_id1 = '${req.body.user_id1}' AND chat_user_id2 = '${req.body.user_id2}'`;

      await Database.queryWithCallback(sql, async (_: any, results: any) => {
        if (results && results.length > 0) {
          res.status(400).send("there is already a contact with these users");
        } else {
          sql = `INSERT INTO chat (id, user_id1, user_id2) VALUES ('${uuidv4()}', '${
            req.body.user_id1
          }', '${req.body.user_id2}')`;
          await Database.query(sql, 400, res);
        }
      });
    } else {
      res
        .status(400)
        .send({ error: "the request body doesn't have the users' ids" });
    }
  }

  public static async exclude(req: Request, res: Response) {
    if (req.params.id) {
      const sql = `DELETE FROM chat WHERE id = '${req.params.id}'`;
      await Database.query(sql, 204, res);
    } else {
      res
        .status(400)
        .send({ error: "the request params doesn't have the chat id" });
    }
  }
}

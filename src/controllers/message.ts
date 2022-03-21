import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import Database from "../shared/Database";
import { getTimestamp } from "../shared/functions";

export default class MessageController {
  public static async getAll(_req: Request, res: Response) {
    const sql = `SELECT * FROM message`;
    await Database.query(sql, 204, res);
  }

  public static async getByChatId(req: Request, res: Response) {
    if (req.params.chat_id) {
      const sql = `SELECT id, text, image, isStarry, wasReceived, dispatchTimestamp, lastEditionTimestamp, author_id FROM message WHERE chat_id = '${req.params.chat_id}' ORDER BY dispatchTimestamp ASC`;
      await Database.query(sql, 204, res);
    } else {
      res.status(400).send("the request params doesn't have the chat id");
    }
  }

  public static async getLastMessageByChatId(req: Request, res: Response) {
    if (req.params.chat_id) {
      const sql = `SELECT id, text, image, isStarry, wasReceived, dispatchTimestamp, lastEditionTimestamp, author_id FROM message WHERE chat_id = '${req.params.chat_id}' ORDER BY dispatchTimestamp DESC LIMIT 1`;
      await Database.query(sql, 204, res);
    } else {
      res.status(400).send("the request params doesn't have the chat id");
    }
  }

  public static async create(req: Request, res: Response) {
    if (req.body) {
      const sql = `INSERT INTO message (id, text, image, isStarry, wasReceived, dispatchTimestamp, author_id, chat_id) VALUES ('${uuidv4()}', '${
        req.body.text
      }', '${req.body.image}', ${false}, ${false}, '${
        req.body.dispatchTimestamp
      }', '${req.body.author_id}', '${req.body.chat_id}')`;
      await Database.query(sql, 400, res);
    } else {
      res.status(400).send("the request has no body");
    }
  }

  public static async updateText(req: Request, res: Response) {
    if (req.body.text) {
      const timestamp = getTimestamp();
      const sql = `UPDATE message SET text = '${req.body.text}', lastEditionTimestamp = '${timestamp}' WHERE id LIKE '${req.params.id}'`;
      await Database.query(sql, 400, res);
    } else {
      res.status(400).send("the request body has no text");
    }
  }

  // This method is responsible for star and unstar a message
  public static async star(req: Request, res: Response) {
    if (req.params.id) {
      let sql = `SELECT isStarry FROM message WHERE id = '${req.params.id}'`;
      await Database.queryWithCallback(sql, async (_: any, results: any) => {
        if (results[0].isStarry === 0) {
          sql = `UPDATE message SET isStarry = '${1}' WHERE id = '${
            req.params.id
          }'`;
        } else {
          sql = `UPDATE message SET isStarry = '${0}' WHERE id = '${
            req.params.id
          }'`;
        }
        await Database.query(sql, 400, res);
      });
    } else {
      res.status(400).send("the request params doesn't have the message id");
    }
  }

  public static async receive(req: Request, res: Response) {
    if (req.params.id) {
      let sql = `SELECT wasReceived FROM message WHERE id = '${req.params.id}'`;
      await Database.queryWithCallback(sql, async (_: any, results: any) => {
        const timestamp = getTimestamp();
        if (results[0].wasReceived === 0) {
          sql = `UPDATE message SET wasReceived = '${1}', lastEditionTimestamp = '${timestamp}' WHERE id = '${
            req.params.id
          }'`;
          await Database.query(sql, 400, res);
        } else {
          res.status(400).send("the message has already been received");
        }
      });
    } else {
      res.status(400).send("the request params doesn't have the message id");
    }
  }

  public static async exclude(req: Request, res: Response) {
    if (req.params.id) {
      const sql = `DELETE FROM message WHERE id = '${req.params.id}'`;
      await Database.query(sql, 204, res);
    } else {
      res.status(400).send("the request params doesn't have the message id");
    }
  }
}

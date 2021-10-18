import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import Database from "../shared/Database";

const getAll = async (_: Request, res: Response) => {
  const query = `SELECT * FROM message`;
  await Database.query(res, query, 204);
};

const getById = async (req: Request, res: Response) => {
  if (req.params.id) {
    const query = `SELECT * FROM message WHERE id LIKE '${req.params.id}'`;
    await Database.query(res, query, 204);
  } else {
    res.status(400).send("the request params doesn't have the message id");
  }
};

const create = async (req: Request, res: Response) => {
  if (req.body) {
    const query = `INSERT INTO message (id, text, image, isStarry, wasReceived, dispatchTimestamp, author_id, chat_id) VALUES ('${uuidv4()}', '${
      req.body.text
    }', '${req.body.image}', ${false}, ${false}, '${
      req.body.dispatchTimestamp
    }', '${req.body.author_id}', '${req.body.chat_id}')`;

    await Database.query(res, query, 400);
  } else {
    res.status(400).send("the request has no body");
  }
};

const getTimestamp = () => {
  const d = new Date();
  return `${d.getFullYear()}-${
    d.getMonth() + 1
  }-${d.getDate()} ${d.getHours()}-${d.getMinutes()}-${d.getSeconds()}`;
};

const updateText = async (req: Request, res: Response) => {
  if (req.body.text) {
    const timestamp = getTimestamp();

    const query = `UPDATE message SET text = '${req.body.text}', lastEditionTimestamp = '${timestamp}' WHERE id LIKE '${req.params.id}'`;
    await Database.query(res, query, 400);
  } else {
    res.status(400).send("the request body has no text");
  }
};

const star = async (req: Request, res: Response) => {
  if (req.params.id) {
    let query = `SELECT isStarry FROM message WHERE id = '${req.params.id}'`;
    await Database.queryWithoutRes(query, async (_: any, results: any) => {
      const timestamp = getTimestamp();

      if (results[0].isStarry === 0) {
        query = `UPDATE message SET isStarry = '${1}', lastEditionTimestamp = '${timestamp}' WHERE id = '${
          req.params.id
        }'`;
      } else {
        query = `UPDATE message SET isStarry = '${0}', lastEditionTimestamp = '${timestamp}' WHERE id = '${
          req.params.id
        }'`;
      }
      await Database.query(res, query, 400);
    });
  } else {
    res.status(400).send("the request params doesn't have the message id");
  }
};

const receive = async (req: Request, res: Response) => {
  if (req.params.id) {
    let query = `SELECT wasReceived FROM message WHERE id = '${req.params.id}'`;
    await Database.queryWithoutRes(query, async (_: any, results: any) => {
      const timestamp = getTimestamp();

      if (results[0].wasReceived === 0) {
        query = `UPDATE message SET wasReceived = '${1}', lastEditionTimestamp = '${timestamp}' WHERE id = '${
          req.params.id
        }'`;
        await Database.query(res, query, 400);
      } else {
        res.status(400).send("the message has already been received");
      }
    });
  } else {
    res.status(400).send("the request params doesn't have the message id");
  }
};

const exclude = async (req: Request, res: Response) => {
  if (req.params.id) {
    const query = `DELETE FROM message WHERE id = '${req.params.id}'`;
    await Database.query(res, query, 204);
  } else {
    res.status(400).send("the request params doesn't have the message id");
  }
};

export default {
  getAll,
  getById,
  create,
  updateText,
  star,
  receive,
  exclude,
};

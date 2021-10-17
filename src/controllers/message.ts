import { Request, Response } from "express";
import Database from "../shared/Database";

const getAll = async (_: Request, res: Response) => {
  const query = `SELECT * FROM message`;
  Database.query(res, query, 204);
};

const getById = async (req: Request, res: Response) => {
  const query = `SELECT * FROM message WHERE id LIKE '${req.params.id}'`;
  Database.query(res, query, 204);
};

const create = async (req: Request, res: Response) => {
  if (req.body.id === req.params.id) {
    const query = `INSERT INTO message (id, text, image, dispatchTimestamp, author_id, chat_id) VALUES ('${
      req.body.id
    }', ${`${req.body.text}` || null}, ${`${req.body.image}` || null}, ${
      req.body.dispatchTimestamp
    }, '${req.body.author_id}', '${req.body.chat_id}')`;

    Database.query(res, query, 400);
  } else {
    res
      .status(400)
      .send("the request body's id is different from the params' id");
  }
};

const update = async (req: Request, res: Response) => {
  if (req.body) {
    const query = `UPDATE message SET text = ${req.body.text}, isStarry = ${req.body.isStarry}, lastEditionTimestamp = ${req.body.lastEditionTimestamp} WHERE id LIKE '${req.params.id}'`;
    Database.query(res, query, 400);
  } else {
    res.status(400).send("the request has no body");
  }
};

const updateText = async (req: Request, res: Response) => {
  if (req.body) {
    const query = `UPDATE message SET text = ${req.body.text} WHERE id LIKE '${req.params.id}'`;
    Database.query(res, query, 400);
  } else {
    res.status(400).send("the request has no body");
  }
};

const updateLastEditionTimestamp = async (req: Request, res: Response) => {
  if (req.body) {
    const query = `UPDATE message SET text = ${req.body.text} WHERE id LIKE '${req.params.id}'`;
    Database.query(res, query, 400);
  } else {
    res.status(400).send("the request has no body");
  }
};

const exclude = async (req: Request, res: Response) => {
  const query = `DELETE FROM message WHERE id LIKE '${req.params.id}'`;
  Database.query(res, query, 204);
};

export default {
  getAll,
  getById,
  create,
  update,
  updateText,
  updateLastEditionTimestamp,
  exclude,
};

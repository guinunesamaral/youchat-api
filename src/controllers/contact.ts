import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import Database from "../shared/Database";

const getAll = async (_: Request, res: Response) => {
  const query = `SELECT * FROM contact`;
  Database.query(res, query, 204);
};

const getByUserId = async (req: Request, res: Response) => {
  if (req.params.user_id) {
    const query = `SELECT * FROM contact WHERE user_id1 = '${req.params.user_id}' OR user_id2 = '${req.params.user_id}'`;
    await Database.query(res, query, 204);
  } else {
    res.status(400).send("the request params doesn't have the user id");
  }
};

const create = async (req: Request, res: Response) => {
  if (req.body.user_id1 && req.body.user_id2) {
    let query = `SELECT * FROM contact WHERE user_id1 = '${req.body.user_id1}' AND user_id2 = '${req.body.user_id2}'`;

    await Database.queryWithoutRes(query, async (_: any, results: any) => {
      if (results.length > 0) {
        res.status(400).send("there is already a contact with these users");
      } else {
        query = `INSERT INTO contact (id, user_id1, user_id2) VALUES ('${uuidv4()}', '${
          req.body.user_id1
        }', '${req.body.user_id2}')`;
        await Database.query(res, query, 400);
      }
    });
  } else {
    res.status(400).send("the request body doesn't have the users' ids");
  }
};

const exclude = async (req: Request, res: Response) => {
  if (req.params.id) {
    const query = `DELETE FROM contact WHERE id = '${req.params.id}'`;
    Database.query(res, query, 400);
  } else {
    res.status(400).send("the request params doesn't have the contact id");
  }
};

export default {
  getAll,
  getByUserId,
  create,
  exclude,
};

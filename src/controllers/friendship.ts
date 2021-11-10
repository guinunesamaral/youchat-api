import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import Database from "../shared/Database";

const getAll = async (_: Request, res: Response) => {
  const query = `SELECT * FROM friendship`;
  Database.query(res, query, 204);
};

const getFriendData = async (req: Request, res: Response) => {
  if (req.params.user_id) {
    const query = `SELECT friendship.id, user.id AS friend_id, user.name AS friend_name, user.email AS friend_email, user.photo AS friend_photo 
    FROM friendship
    INNER JOIN user
    ON user.id = IF (user_id1 = '${req.params.user_id}', friendship.user_id2, friendship.user_id1)
    WHERE friendship.user_id1 = '${req.params.user_id}' 
    OR friendship.user_id2 = '${req.params.user_id}'`;
    await Database.query(res, query, 204);
  } else {
    res.status(400).send("the request params doesn't have the user id");
  }
};

const create = async (req: Request, res: Response) => {
  if (req.body.user_id1 && req.body.user_id2) {
    let query = `SELECT * FROM friendship WHERE user_id1 = '${req.body.user_id1}' AND user_id2 = '${req.body.user_id2}'`;
    await Database.queryWithoutRes(query, async (_: any, results: any) => {
      if (results && results.length > 0) {
        res.status(400).send("there is already a friendship with these users");
      } else {
        query = `INSERT INTO friendship (id, user_id1, user_id2) VALUES ('${uuidv4()}', '${
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
    const query = `DELETE FROM friendship WHERE id = '${req.params.id}'`;
    Database.query(res, query, 400);
  } else {
    res.status(400).send("the request params doesn't have the friendship id");
  }
};

export default {
  getAll,
  getFriendData,
  create,
  exclude,
};

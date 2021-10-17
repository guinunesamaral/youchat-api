import { Request, Response } from "express";
import Database from "../shared/Database";

const getAll = async (_: Request, res: Response) => {
  const query = `SELECT * FROM message`;
  Database.query(res, query, 204);
};

const getById = async (req: Request, res: Response) => {
  const query = `SELECT * FROM contact WHERE id LIKE '${req.params.id}'`;
  Database.query(res, query, 204);
};

const create = async (req: Request, res: Response) => {
  if (req.body.id === req.params.id) {
    const query = `INSERT INTO contact (user_id1, user_id2) VALUES ('${req.body.user_id1}', '${req.body.user_id2}')`;
    Database.query(res, query, 400);
  } else {
    res
      .status(400)
      .send("the request body's id is different from the params' id");
  }
};

const exclude = async (req: Request, res: Response) => {
  const query = `DELETE FROM contact WHERE id LIKE '${req.params.id}'`;
  Database.query(res, query, 204);
};

export default {
  getAll,
  getById,
  create,
  exclude,
};

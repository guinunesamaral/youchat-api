import { Request, Response } from "express";
import Database from "../shared/Database";

const database: Database = Database.getInstance();

const getAll = async (_: Request, res: Response) => {
  const query = `SELECT * FROM user`;
  await database.query(res, query, 204);
};

const getById = async (req: Request, res: Response) => {
  const query = `SELECT * FROM user WHERE id LIKE '${req.params.id}'`;
  await database.query(res, query, 204);
};

const create = async (req: Request, res: Response) => {
  if (req.body.id === req.params.id) {
    const query = `INSERT INTO user (id, name, email) VALUES ('${req.body.id}', '${req.body.name}', '${req.body.email}')`;
    await database.query(res, query, 400);
  } else {
    res
      .status(400)
      .send("the request body's id is different from the params' id");
  }
};

const update = async (req: Request, res: Response) => {
  if (req.body) {
    const query = `UPDATE user SET name = ${req.body.name}, email = ${req.body.email}, photo = ${req.body.photo} WHERE id LIKE '${req.params.id}'`;
    await database.query(res, query, 400);
  } else {
    res.status(400).send("the request has no body");
  }
};

const updateName = async (req: Request, res: Response) => {
  if (req.body.name) {
    const query = `UPDATE user SET name = ${req.body.name}`;
    await database.query(res, query, 400);
  } else {
    res.status(400).send("the request has no name in the body");
  }
};

const updateEmail = async (req: Request, res: Response) => {
  if (req.body.email) {
    const query = `UPDATE user SET email = ${req.body.email}`;
    await database.query(res, query, 400);
  } else {
    res.status(400).send("the request has no email in the body");
  }
};

const updatePhoto = async (req: Request, res: Response) => {
  if (req.body.photo) {
    const query = `UPDATE user SET email = ${req.body.email}`;
    await database.query(res, query, 400);
  } else {
    res.status(400).send("the request has no email in the body");
  }
};

const exclude = async (req: Request, res: Response) => {
  const query = `DELETE FROM user WHERE id LIKE '${req.params.id}'`;
  await database.query(res, query, 204);
};

export default {
  getAll,
  getById,
  create,
  updateName,
  updateEmail,
  updatePhoto,
  update,
  exclude,
};

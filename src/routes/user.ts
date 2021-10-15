import express, { Request, Response } from "express";
import Connection from "mysql2/typings/mysql/lib/Connection";
import { nextTick } from "process";
import Database from "../shared/Database";

const router = express.Router();
const connection: Connection = Database.getInstance().connection;

// get all users
router.get("/", async (_, res: Response, next: any) => {
  const sql = `SELECT * FROM user`;

  try {
    connection.query(sql, (err, result) => {
      if (err) res.status(204).send(err);
      res.status(200).send(result);
    });
  } catch (e) {
    next(e);
  }
});

// get user
router.get("/:id", async (req: Request, res: Response, next: any) => {
  const sql = `SELECT * FROM user WHERE id LIKE '${req.params.id}'`;

  try {
    connection.query(sql, (err, result) => {
      if (err) res.status(204).send(err);
      res.status(200).send(result);
    });
  } catch (e) {
    next(e);
  }
});

// create user
router.put("/:id", async (req: Request, res: Response, next: any) => {
  if (req.params.id === req.body.id) {
    const sql = `INSERT INTO user (id, name, email) VALUES ('${req.body.id}', '${req.body.name}', '${req.body.email}')`;

    try {
      connection.query(sql, (err, result) => {
        if (err) res.status(400).send(err);
        res.status(200).send(result);
      });
    } catch (e) {
      next(e);
    }
  }
});

router.patch("/:id", async (req: Request, res: Response, next: any) => {
  const sql = `UPDATE user SET (name, email, ) WHERE id LIKE '${req.params.id}'`;

  try {
    connection.query(sql, (err, result) => {
      if (err) res.status(204).send(err);
      res.status(200).send(result);
    });
  } catch (e) {
    next(e);
  }
});

// delete user
router.delete("/:id", async (req: Request, res: Response, next: any) => {
  const sql = `DELETE FROM user WHERE id LIKE '${req.params.id}'`;

  try {
    connection.query(sql, (err, result) => {
      if (err) res.status(204).send(err);
      res.status(200).send(result);
    });
  } catch (e) {
    next(e);
  }
});

export default router;

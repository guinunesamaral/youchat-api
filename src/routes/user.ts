import express, { Request, Response } from "express";
import Connection from "mysql2/typings/mysql/lib/Connection";
import Database from "../shared/Database";

const router = express.Router();
const database: Database = Database.getInstance();

// get all users
router.get("/", async (_, res: Response) => {
  const connection: Connection = await database.makeConnection();
  const sql = `SELECT * FROM user`;

  connection.query(sql, (err, result) => {
    if (err) {
      console.log("error while searching for all users", err);
      res.status(204).send({
        message: err.message || "error while searching for all users",
      });
    }
    res.send(result);
  });
});

// get user
router.get("/:id", async (req: Request, res: Response) => {
  const connection: Connection = await database.makeConnection();
  const sql = `SELECT * FROM user WHERE id LIKE '${req.params.id}'`;

  connection.query(sql, (err, result) => {
    if (err) {
      console.log("error while searching for user", err);
      res
        .status(204)
        .send({ message: err.message || "error while searching for user" });
    }
    res.send(result);
  });
});

// create user
router.put("/:id", async (req: Request, res: Response) => {
  if (req.body.id === req.params.id) {
    const connection: Connection = await database.makeConnection();
    const sql = `INSERT INTO user (id, name, email) VALUES ('${req.body.id}', '${req.body.name}', '${req.body.email}')`;

    connection.query(sql, (err, result) => {
      if (err) {
        console.log("error while inserting user", err);
        res
          .status(400)
          .send({ message: err.message || "error while inserting user" });
      }
      res.send(result);
    });
  } else {
    res
      .status(400)
      .send("the request body's id is different from the params' id");
  }
});

router.patch("/:id", async (req: Request, res: Response) => {
  if (req.body) {
    const connection: Connection = await database.makeConnection();
    const sql = `UPDATE user SET (name, email, ) WHERE id LIKE '${req.params.id}'`;

    connection.query(sql, (err, result) => {
      if (err) {
        console.log("error while updating user", err);
        res
          .status(204)
          .send({ message: err.message } || "error while updating user");
      }
      res.status(200).send(result);
    });
  } else {
    res.status(400).send("the request has no body");
  }
});

// delete user
router.delete("/:id", async (req: Request, res: Response) => {
  const connection: Connection = await database.makeConnection();
  const sql = `DELETE FROM user WHERE id LIKE '${req.params.id}'`;

  connection.query(sql, (err, result) => {
    if (err) {
      console.log("error while deleting user", err);
      res
        .status(204)
        .send({ message: err.message || "error while deleting user" });
    }
    res.status(200).send(result);
  });
});

export default router;

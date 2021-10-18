import mysql from "mysql2";
import Connection from "mysql2/typings/mysql/lib/Connection";
import dotenv from "dotenv";
import { Response } from "express";

export default class Database {
  private static instance: Database;

  private constructor() {}

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  private async makeConnection(): Promise<Connection> {
    dotenv.config();

    const connection = await mysql.createConnection({
      host: process.env.CONNECTION_HOST,
      user: process.env.CONNECTION_USER,
      password: process.env.CONNECTION_PASSWORD,
      database: process.env.CONNECTION_DATABASE,
    });
    connection.connect((err) => {
      if (err) console.error("error while connecting to db", err);
    });
    return connection;
  }

  public static async query(
    res: Response,
    query: string,
    errNumber: number
  ): Promise<void> {
    const connection: Connection =
      await Database.getInstance().makeConnection();

    connection.query(query, (err, results) => {
      if (err) res.status(errNumber).send(err);
      res.send(results);
    });
  }

  public static async queryWithoutRes(query: string, callback: Function) {
    const connection: Connection =
      await Database.getInstance().makeConnection();
    connection.query(query, callback);
  }
}

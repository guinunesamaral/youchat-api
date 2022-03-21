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
    const connection = mysql.createConnection({
      host: process.env.CONNECTION_HOST,
      user: process.env.CONNECTION_USER,
      password: process.env.CONNECTION_PASSWORD,
      database: process.env.CONNECTION_DATABASE,
    });
    connection.connect((err) => {
      if (err) {
        console.error("error while connecting to db", err);
      }
    });
    return connection;
  }

  public static async query(
    sql: string,
    errNbr: number,
    res: Response
  ): Promise<void> {
    const connection: Connection =
      await Database.getInstance().makeConnection();

    connection.query(sql, (err, results) => {
      if (err) res.status(errNbr).send(err);
      else res.send(results);
    });
    connection.end();
  }

  public static async queryWithPlaceholder(
    sql: string,
    values: any,
    errNbr: number,
    res: Response
  ): Promise<void> {
    const connection: Connection =
      await Database.getInstance().makeConnection();

    connection.query(sql, values, (err, results) => {
      if (err) res.status(errNbr).send(err);
      else res.send(results);
    });
    connection.end();
  }

  public static async queryWithCallback(
    sql: string,
    callback: Function
  ): Promise<void> {
    const connection: Connection =
      await Database.getInstance().makeConnection();
    connection.query(sql, callback);
    connection.end();
  }
}

import mysql from "mysql2";
import Connection from "mysql2/typings/mysql/lib/Connection";
import dotenv from "dotenv";

export default class Database {
  private static instance: Database;
  public connection: Connection;

  private constructor() {
    this.connection = Database.makeConnection();
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  private static makeConnection(): Connection {
    dotenv.config();

    const connection = mysql.createConnection({
      host: process.env.CONNECTION_HOST,
      user: process.env.CONNECTION_USER,
      password: process.env.CONNECTION_PASSWORD,
      database: process.env.CONNECTION_DATABASE,
    });
    connection.connect((err) => {
      if (err) console.error(err);
      console.log("Connected to db");
    });
    return connection;
  }
}

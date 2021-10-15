import express, { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import Database from "../shared/Database";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  res.status(200).send("message");
});

export default router;

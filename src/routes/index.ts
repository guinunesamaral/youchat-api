import express, { Response } from "express";
import path from "path";

const router = express.Router();

router.get("/", (_, res: Response) => {
  res.status(200).sendFile("files/index.html", { root: "." });
});

export default router;

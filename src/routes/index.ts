import express, { Response } from "express";
import path from "path";

const router = express.Router();

router.get("/", (_, res: Response) => {
  res.status(200).sendFile("files/index.html", { root: "." });
});

router.get("/favicon.PNG", (_, res: Response) => {
  res.status(200).sendFile("files/favicon.PNG", { root: "." });
});

export default router;

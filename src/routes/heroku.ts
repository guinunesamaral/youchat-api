import { Request, Response } from "express";

const defaultRoute = async (_: Request, res: Response) => {
  res.status(200).sendFile("files/index.html", { root: "." });
};

const faviconRoute = async (_: Request, res: Response) => {
  res.status(200).sendFile("files/favicon.ico", { root: "." });
};

export default { defaultRoute, faviconRoute };

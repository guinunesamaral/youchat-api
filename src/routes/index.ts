import { Request, Response } from "express";

const defaultRoute = (req: Request, res: Response) => {
  res.status(200).sendFile("files/index.html", { root: "." });
};

const faviconRoute = (req: Request, res: Response) => {
  res.status(200).sendFile("files/favicon.PNG", { root: "." });
};

export default { defaultRoute, faviconRoute };

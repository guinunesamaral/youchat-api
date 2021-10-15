import express, { Response } from "express";
import indexRouter from "./routes/index";
import userRouter from "./routes/user";
import chatRouter from "./routes/chat";
import messageRouter from "./routes/message";

const app = express();

app
  .use(express.json())
  .use("/user", userRouter)
  .use("/chat", chatRouter)
  .use("/message", messageRouter)
  .listen(process.env.PORT || 8000, () => console.log("listening"));

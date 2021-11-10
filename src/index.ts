import express from "express";
import herokuRouter from "./routes/heroku";
import userRouter from "./routes/user";
import chatRouter from "./routes/chat";
import messageRouter from "./routes/message";
import friendshipRouter from "./routes/friendship";

const app = express();

app
  .use(express.json())
  .use("/user", userRouter)
  .use("/chat", chatRouter)
  .use("/message", messageRouter)
  .use("/friendship", friendshipRouter)
  .get("/", herokuRouter.defaultRoute)
  .get("/favicon.ico", herokuRouter.faviconRoute)
  .listen(process.env.PORT || 9000, () => console.log("listening"));

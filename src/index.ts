import express from "express";
import indexRouter from "./routes/default";
import userRouter from "./routes/user";
import chatRouter from "./routes/chat";
import messageRouter from "./routes/message";
import contactRouter from "./routes/contact";

const app = express();

app
  .use(express.json())
  .use("/user", userRouter)
  .use("/chat", chatRouter)
  .use("/message", messageRouter)
  .use("/contact", contactRouter)
  .get("/", indexRouter.defaultRoute)
  .get("/favicon.ico", indexRouter.faviconRoute)
  .listen(process.env.PORT || 8000, () => console.log("listening"));

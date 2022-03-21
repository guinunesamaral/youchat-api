import express from "express";
import MessageController from "../controllers/message";

const router = express.Router();

router
  .get("/", MessageController.getAll)
  .get("/:chat_id", MessageController.getByChatId)
  .get("/last/:chat_id", MessageController.getLastMessageByChatId)
  .put("/", MessageController.create)
  .patch("/:id/text", MessageController.updateText)
  .patch("/:id/star", MessageController.star)
  .patch("/:id/receive", MessageController.receive)
  .delete("/:id", MessageController.exclude);

export default router;

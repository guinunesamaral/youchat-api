import express from "express";
import messageController from "../controllers/message";

const router = express.Router();

router
  .get("/", messageController.getAll)
  .get("/:chat_id", messageController.getByChatId)
  .get("/last/:chat_id", messageController.getLastMessageByChatId)
  .put("/", messageController.create)
  .patch("/:id/text", messageController.updateText)
  .patch("/:id/star", messageController.star)
  .patch("/:id/receive", messageController.receive)
  .delete("/:id", messageController.exclude);

export default router;

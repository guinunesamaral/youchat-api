import express from "express";
import messageController from "../controllers/message";

const router = express.Router();

router
  .get("/", messageController.getAll)
  .get("/:id", messageController.getById)
  .put("/:id", messageController.create)
  .patch("/:id", messageController.update)
  .patch("/:id/text", messageController.updateText)
  .patch("/:id/timestamp", messageController.updateLastEditionTimestamp)
  .delete("/:id", messageController.exclude);

export default router;

import express from "express";
import chatController from "../controllers/chat";

const router = express.Router();

router
  .get("/", chatController.getAll)
  .get("/:user_id", chatController.getByUserId)
  .put("/", chatController.create)
  .delete("/:id", chatController.exclude);

export default router;

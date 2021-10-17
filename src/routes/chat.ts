import express from "express";
import chatController from "../controllers/chat";

const router = express.Router();

router
  .get("/", chatController.getAll)
  .get("/:id", chatController.getById)
  .put("/:id", chatController.create)
  .delete("/:id", chatController.exclude);

export default router;

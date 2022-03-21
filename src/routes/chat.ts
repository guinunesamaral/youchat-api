import express from "express";
import ChatController from "../controllers/chat";

const router = express.Router();

router
  .get("/", ChatController.getAll)
  .get("/:user_id", ChatController.getByUserId)
  .put("/", ChatController.create)
  .delete("/:id", ChatController.exclude);

export default router;

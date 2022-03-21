import express from "express";
import FriendshipController from "../controllers/friendship";

const router = express.Router();

router
  .get("/", FriendshipController.getAll)
  .get("/:user_id", FriendshipController.getFriendData)
  .put("/", FriendshipController.create)
  .delete("/:id", FriendshipController.exclude);

export default router;

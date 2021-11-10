import express from "express";
import friendshipController from "../controllers/friendship";

const router = express.Router();

router
  .get("/", friendshipController.getAll)
  .get("/:user_id", friendshipController.getFriendData)
  .put("/", friendshipController.create)
  .delete("/:id", friendshipController.exclude);

export default router;

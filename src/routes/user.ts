import express from "express";
import userController from "../controllers/user";

const router = express.Router();

router
  .get("/", userController.getAll)
  .get("/:id", userController.getById)
  .put("/:id", userController.create)
  .patch("/:id", userController.update)
  .patch("/:id/name", userController.updateName)
  .patch("/:id/email", userController.updateEmail)
  .patch("/:id/photo", userController.updatePhoto)
  .delete("/:id", userController.exclude);

export default router;

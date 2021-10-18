import express from "express";
import contactController from "../controllers/contact";

const router = express.Router();

router
  .get("/", contactController.getAll)
  .get("/:user_id", contactController.getByUserId)
  .put("/", contactController.create)
  .delete("/:id", contactController.exclude);

export default router;

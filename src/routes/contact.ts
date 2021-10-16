import express from "express";
import contactController from "../controllers/contact";

const router = express.Router();

router
  .get("/", contactController.getAll)
  .get("/:id", contactController.getById)
  .put("/:id", contactController.create)
  .delete("/:id", contactController.exclude);

export default router;

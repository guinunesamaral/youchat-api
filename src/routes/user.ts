import express, { Request } from "express";
import UserController from "../controllers/user";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (
    _req: Request,
    _file: Express.Multer.File,
    callback: Function
  ) => {
    callback(null, "photos/");
  },
  filename: async (
    _req: Request,
    file: Express.Multer.File,
    callback: Function
  ) => {
    const fileType = file.originalname.split(".")[1];
    const fileNewName = (await import("crypto"))
      .randomBytes(10)
      .toString("hex");

    callback(null, `${fileNewName}.${fileType}`);
  },
});

const upload = multer({ storage });

router
  .get("/", UserController.getAll)
  .get("/:id", UserController.getById)
  .post("/email", UserController.getByEmail)
  .post("/login", UserController.login)
  .post("/email/check", UserController.checkIfEmailIsAvailable)
  .post("/reset-password/send-code", UserController.resetPasswordSendCode)
  .post("/email/verify", UserController.verifyEmailIfAvailable)
  .put("/", UserController.create)
  .patch("/:id", UserController.update)
  .patch("/:id/name", UserController.updateName)
  .patch("/:id/email", UserController.updateEmail)
  .patch("/:id/password", UserController.updatePassword)
  .patch("/:id/photo", upload.single("photo"), UserController.updatePhoto)
  .delete("/:id", UserController.exclude);

export default router;

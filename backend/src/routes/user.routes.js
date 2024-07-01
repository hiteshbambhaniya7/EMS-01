import { Router } from "express";
import { registerUser,updateUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/register").post(registerUser);

router
  .route("/update")
  .patch(upload.single("userPhoto"), updateUser);

export default router;

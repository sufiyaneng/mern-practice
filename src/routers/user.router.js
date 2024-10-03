import { Router } from "express";
import {
  registerUser,
  logInUser,
  logOutUser,
  newRefreshToken,
  changeCurrentPassword,
} from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJwt } from "../middleware/verifyJwt.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser,
);

router.route("/login").post(logInUser);
router.route("/logout").post(verifyJwt, logOutUser);
router.route("/refresh-token").post(newRefreshToken);
router.route("/password-change").post(verifyJwt, changeCurrentPassword);

export default router;

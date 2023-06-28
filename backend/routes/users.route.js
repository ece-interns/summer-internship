import express from "express";
import {
  authUser,
  getUser,
  logoutUser,
  signUpUser,
  updateUser,
} from "../controllers/users.controller.js";
import { protectUser } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/signup", signUpUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router.route("/profile").get(protectUser, getUser);
router.route("/profile").patch(protectUser, updateUser);

export default router;

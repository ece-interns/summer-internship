import express from "express";
import multer from "multer";
import {
  authRestaurant,
  logoutRestaurant,
  signUpRestaurant,
  updateRestaurant,
  uploadImages,
  deleteImages,
  uploadFeaturedImage,
  deleteFeaturedImage,
} from "../controllers/restaurants.controller.js";
import { protectRestaurant } from "../middleware/auth.middleware.js";
const router = express.Router();
const upload = multer();

router.post("/signup", signUpRestaurant);
router.post("/auth", authRestaurant);
router.post("/logout", logoutRestaurant);
router.route("/update").patch(protectRestaurant, updateRestaurant);

router.post("/upload-images", upload.array("images"), uploadImages);
router.post("/delete-images", deleteImages);
router.post(
  "/featured-image",
  upload.single("featuredImage"),
  uploadFeaturedImage
);
router.delete("/featured-image", deleteFeaturedImage);

export default router;

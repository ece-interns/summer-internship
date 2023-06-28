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
import cloudinaryConfig from "../utils/cloudinaryConfig.js";
const router = express.Router();
cloudinaryConfig();
const upload = multer();

router.post("/signup", signUpRestaurant);
router.post("/auth", authRestaurant);
router.post("/logout", logoutRestaurant);
router.route("/update").patch(protectRestaurant, updateRestaurant);

router.use(upload.array("images")).post("/upload-images", uploadImages);
router.post("/delete-images", deleteImages);
router
  .use(upload.single("featuredImage"))
  .post("/featured-image", uploadFeaturedImage);
router.delete("/featured-image", deleteFeaturedImage);

export default router;

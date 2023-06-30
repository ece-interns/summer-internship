import express from "express";
import multer from "multer";
import {
  createProduct,
  deleteImage,
  deleteProduct,
  getProductByRestaurantId,
  updateProduct,
  uploadImage,
} from "../controllers/products.controller.js";
import { protectRestaurant } from "../middleware/auth.middleware.js";

const router = express.Router();
const upload = multer();

router.route("/").post(protectRestaurant, createProduct);
router.route("/:product_id").patch(protectRestaurant, updateProduct);
router.route("/:produtct_id").delete(protectRestaurant, deleteProduct);
router.get("/:restaurant_id", getProductByRestaurantId);

router
  .use(protectRestaurant)
  .post("/image", upload.single("image"), uploadImage);
router.route("/image").delete(protectRestaurant, deleteImage);

export default router;

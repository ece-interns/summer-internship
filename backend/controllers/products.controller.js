import asyncHandler from "express-async-handler";
import Product from "../models/Product.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import deleteFromCloudinary from "../utils/deleteFromCloudinary.js";

// @method POST /api/products
export const createProduct = asyncHandler(async (req, res) => {
  const { restaurantId, name, cuisine, category, image, price, description } =
    JSON.parse(req.body);
  const product = await Product.create({
    restaurantId,
    name,
    cuisine,
    category,
    image,
    price,
    description,
  });
  if (product) {
    res.status(201).json({
      _id: product._id,
      restaurantId: product.restaurantId,
      name: product.name,
      cuisine: product.cuisine,
      category: product.category,
      image: product.image,
      price: product.price,
      description: product.description,
    });
  } else {
    res.status(400);
    throw new Error("Invalid product data");
  }
});

// @method POST /api/products/:product_id
export const updateProduct = asyncHandler(async (req, res) => {
  const productData = JSON.parse(req.body);
  const product = await Product.findById(req.params.product_id);
  if (product) {
    product.name = productData.name || product.name;
    product.cuisine = productData.cuisine || product.cuisine;
    product.category = productData.category || product.category;
    product.image = productData.image || product.image;
    product.price = productData.price || product.price;
    product.description = productData.description || product.description;

    const updatedProduct = await product.save();

    res.status(200).json({
      _id: updatedProduct._id,
      restaurantId: updatedProduct.restaurantId,
      name: updatedProduct.name,
      cuisine: updatedProduct.cuisine,
      category: updatedProduct.category,
      image: updatedProduct.image,
      price: updatedProduct.price,
      description: updatedProduct.description,
    });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @method DELETE /api/products/:product_id
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.product_id);
  return product;
});

// @method GET /api/products/:restaurant_id
export const getProductByRestaurantId = asyncHandler(async (req, res) => {
  const products = Product.find({ restaurantId: req.params.restaurant_id });
  return products;
});

// @method POST /api/products/image
export const uploadImage = async (req, res) => {
  try {
    // upload image to cloudinary
    const result = await uploadToCloudinary(req.file);
    if (result.secure_url) {
      return res.status(200).json({
        message: "success",
        image: {
          url: result.secure_url,
          public_id: result.public_id,
        },
      });
    } else {
      return res.status(400).send({ message: "Error while uploading image" });
    }
  } catch (err) {
    return res.status(500).send({ message: "Someting Went Wrong", error: err });
  }
};

// @method DELETE /api/products/image
export const deleteImage = async (req, res) => {
  try {
    const { public_id } = req.headers;
    if (public_id) {
      await deleteFromCloudinary(public_id);
      return res.status(200).send({ message: "success" });
    } else {
      return res.status(400).send({ message: "public_id is required" });
    }
  } catch (err) {
    return res.status(500).send({ message: "something went wrong" });
  }
};

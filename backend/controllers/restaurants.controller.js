import asyncHandler from "express-async-handler";
import slugify from "slugify";
import Restaurant from "../models/Restaurant.js";
import generateTokenRestaurant from "../utils/generateToken.restaurant.js";
import randomNumber from "../utils/randomNumber.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import deleteFromCloudinary from "../utils/deleteFromCloudinary.js";

// @method POST /api/restaurants/signup
export const signUpRestaurant = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    featuredImage,
    pin,
    address,
    description,
    images,
  } = req.body;
  const randomNum = randomNumber();
  const slug = `${slugify(name, { lower: true, trim: true })}-${randomNum}`;
  const restaurantExists = await Restaurant.findOne({ email });
  if (restaurantExists) {
    res.status(400);
    throw new Error("Email already exists");
  }
  const restaurant = await Restaurant.create({
    name,
    slug,
    email,
    password,
    featuredImage,
    pin,
    address,
    description,
    images,
  });
  if (restaurant) {
    generateTokenRestaurant(res, restaurant._id);
    res.status(201).json({
      _id: restaurant._id,
      name: restaurant.name,
      slug: restaurant.slug,
      email: restaurant.email,
      featuredImage: restaurant.featuredImage,
      pin: restaurant.pin,
      address: restaurant.address,
      description: restaurant.description,
      images: restaurant.images,
    });
  } else {
    res.status(400);
    throw new Error("Invalid information");
  }
});

// @method POST /api/restaurants/auth
export const authRestaurant = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const restaurant = await Restaurant.findOne({ email });
  if (restaurant && (await restaurant.matchPasswords(password))) {
    generateTokenRestaurant(res, restaurant._id);
    res.status(201).json({
      _id: restaurant._id,
      name: restaurant.name,
      slug: restaurant.slug,
      email: restaurant.email,
      featuredImage: restaurant.featuredImage,
      pin: restaurant.pin,
      address: restaurant.address,
      description: restaurant.description,
      images: restaurant.images,
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

// @method POST /api/restaurants/logout
export const logoutRestaurant = asyncHandler(async (req, res) => {
  res.cookie("jwt_restaurant", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "logged out successfully" });
});

// @method PATCH /api/restaurants
export const updateRestaurant = asyncHandler(async (req, res) => {
  const restaurantData = req.body;
  const restaurant = await Restaurant.findById(req.restaurant._id);
  if (restaurant) {
    restaurant.name = restaurantData.name || restaurant.name;
    restaurant.email = restaurantData.email || restaurant.email;
    restaurant.featuredImage =
      restaurantData.featuredImage || restaurant.featuredImage;
    restaurant.pin = restaurantData.pin || restaurant.pin;
    restaurant.address = restaurantData.address || restaurant.address;
    restaurant.description =
      restaurantData.description || restaurant.description;
    restaurant.images = restaurantData.images || restaurant.images;

    if (restaurantData.password) {
      restaurant.password = restaurantData.password;
    }
    if (restaurantData.name) {
      const randomNum = randomNumber();
      const slug = `${slugify(restaurantData.name, {
        lower: true,
        trim: true,
      })}-${randomNum}`;
      restaurant.slug = slug;
    }
    const updatedRestaurant = await restaurant.save();
    res.status(200).json({
      _id: updatedRestaurant._id,
      name: updatedRestaurant.name,
      slug: updatedRestaurant.slug,
      email: updatedRestaurant.email,
      featuredImage: updatedRestaurant.featuredImage,
      pin: updatedRestaurant.pin,
      address: updatedRestaurant.address,
      description: updatedRestaurant.description,
      images: updatedRestaurant.images,
    });
  } else {
    res.status(404);
    throw new Error("Restaurant not found");
  }
});

// @method POST /api/restaurants/upload-images
export const uploadImages = async (req, res) => {
  try {
    const images = [];
    for (let i = 0; i < req.files.length; i++) {
      const result = await uploadToCloudinary(req.files[i]);
      images.push({
        url: result.secure_url,
        public_id: result.public_id,
      });
    }
    if (images.length) {
      return res.status(200).json({ message: "success", images });
    } else {
      return res
        .status(500)
        .send({ message: "Error occured while uploading images" });
    }
  } catch (err) {
    return res.status(500).send({ message: "Someting Went Wrong" });
  }
};

// @method POST /api/restaurants/delete-images
export const deleteImages = async (req, res) => {
  try {
    const { public_ids } = req.body;
    if (public_ids) {
      for (let i = 0; i < public_ids.length; i++) {
        await deleteFromCloudinary(public_ids[i]);
      }
      return res.status(200).send({ message: "success" });
    } else {
      return res.status(400).send({ message: "public_ids are required" });
    }
  } catch (err) {
    return res.status(500).send({ message: "something went wrong" });
  }
};

// @method POST /api/restaurants/featured-image
export const uploadFeaturedImage = async (req, res) => {
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

// @method DELETE /api/restaurants/featured-image
export const deleteFeaturedImage = async (req, res) => {
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

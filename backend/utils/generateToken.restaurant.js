import jwt from "jsonwebtoken";

const generateTokenRestaurant = (res, restaurantId) => {
  const token = jwt.sign({ restaurantId }, process.env.JWT_SECRET, {
    expiresIn: "10d",
  });

  res.cookie("jwt_restaurant", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 10 * 24 * 60 * 60 * 1000,
  });
};

export default generateTokenRestaurant;

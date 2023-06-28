import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import db from "./config/db.js";
import usersRouter from "./routes/users.route.js";
import restaurantsRouter from "./routes/restaurants.route.js";
import productsRouter from "./routes/products.route.js";
import { notFound, errorHandler } from "./middleware/error.middleware.js";

dotenv.config();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;
db.connect(MONGODB_URI);
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/users", usersRouter);
app.use("/api/restaurants", restaurantsRouter);
app.use("/api/products", productsRouter);

app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Welcome to fresshmealnow",
  });
});

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server started on port ${PORT} ...`);
});

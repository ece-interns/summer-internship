import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    name: { type: String, required: true, index: true },
    cuisine: { type: String, required: true, index: true },
    category: { type: String, required: true, index: true },
    image: {
      url: { type: String, required: true },
      public_id: { type: String, required: true },
    },
    price: { type: Number, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;

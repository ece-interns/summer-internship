import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const restaurantSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    pin: { type: String, required: true },
    featuredImage: {
      url: { type: String, required: true },
      public_id: { type: String, required: true },
    },
    address: {
      state_district: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      county: { type: String },
      postcode: { type: String },
    },
    images: { type: Array },
    description: { type: String },
  },
  {
    timestamps: true,
  }
);

restaurantSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

restaurantSchema.methods.matchPasswords = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Restaurant =
  mongoose.models.Restaurant || mongoose.model("Restaurant", restaurantSchema);
export default Restaurant;

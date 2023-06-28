import { v2 as cloudinary } from "cloudinary";

const deleteFromCloudinary = async (public_id) => {
  const result = await cloudinary.uploader.destroy(public_id);
  return result;
};

export default deleteFromCloudinary;

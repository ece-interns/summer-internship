import multer from "multer";
import path from "path";
import randomNumber from "./randomNumber.js";

export const uploadPath = path.join("public", "uploads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const randomNum = randomNumber();
    cb(
      null,
      `${file.originalname.replace(
        path.extname(file.originalname),
        ""
      )}-${randomNum}${path.extname(file.originalname)}`
    );
  },
});
const upload = multer({ storage });

export default upload;

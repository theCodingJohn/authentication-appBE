import multer from "multer";
import path from "path";

// multer config
const storage = multer.diskStorage({
  storage: multer.diskStorage({}),
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
}).single("avatar");

export default upload;

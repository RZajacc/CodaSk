import multer from "multer";
import path from "path";

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
  console.log("req>>>", req);
  console.log("file :>> ", file);

  const extension = path.extname(file.originalname);
  if (
    extension !== ".png" &&
    extension !== ".jpg" &&
    extension !== ".jpeg" &&
    extension !== ".JPG "
  ) {
    cb(null, false);
  } else {
    cb(null, true);
  }
};

const multerUpload = multer({ storage, fileFilter });

export { multerUpload };

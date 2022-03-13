import { Router } from "express";
import { upload } from "../controllers/upload/upload";
import multer = require("multer");
import path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../public/"));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const up = multer({ storage: storage });
const fileUpload = up.single("file");

const router = Router();

router.post("/", fileUpload, upload);

export default router;

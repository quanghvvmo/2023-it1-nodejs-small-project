import multer, { diskStorage } from "multer";
import config from "../config/index.js";

const storage = diskStorage({
    destination: function (req, file, cb) {
        cb(null, config.produce_images_url);
    },
    filename: function (req, file, cb) {
        cb(null, `${req.body.name.toString()}.png`);
    },
});

const upload = multer({ storage: storage });

export default upload;

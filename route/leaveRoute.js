
import express from 'express';
const router = express.Router();
import {addLeave, getLeaves, updateLeaveStatus} from "../controller/leaveController.js"
import multer from 'multer'
import path from 'path'
import fs from 'fs';

const uploadsDir = path.resolve("public/uploads");
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});

const upload = multer({ storage });
router.post("/addLeaves", upload.single("document"), addLeave);
router.get("/allLeaves", getLeaves);
router.put("/update-leave-status/:id", updateLeaveStatus);
export default  router;

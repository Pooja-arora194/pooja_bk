import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import {
    addLeave,
    getLeaves,
    updateLeaveStatus
} from "../controller/leaveController.js";

const router = express.Router();

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

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Only PDF and image files are allowed"));
        }
    },
});

router.post("/addLeaves", (req, res, next) => {
    upload.single("document")(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ error: err.message });
        } else if (err) {
            return res.status(400).json({ error: err.message });
        }
        next();
    });
}, addLeave);

router.get("/allLeaves", getLeaves);
router.put("/update-leave-status/:id", updateLeaveStatus);

export default router;

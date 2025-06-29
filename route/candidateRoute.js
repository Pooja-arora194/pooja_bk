
import express from 'express';
const router = express.Router();
import {addCandidates,getCandidates,updateCandidateStatus,updateCandidate,deleteCandidate} from "../controller/candidate.js"
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


router.post("/add", upload.single("resume"), addCandidates);
router.get("/all", getCandidates);
router.put("/update-status/:id", updateCandidateStatus);
router.put("/edit/:id", updateCandidate);
router.delete("/delete/:id", deleteCandidate);
export default  router;

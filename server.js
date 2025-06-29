import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from "./route/authRoutes.js"
import candidateRoutes from "./route/candidateRoute.js"
import leaveRoutes from "./route/leaveRoute.js"
import path from 'path'
import { DATABASE_URI, PORT } from './config/index.js';
const app = express();
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors());
app.use(express.json());
app.use('/v2', authRoutes);
app.use('/', candidateRoutes);
app.use('/', leaveRoutes);

mongoose.connect(DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error.message);
    });

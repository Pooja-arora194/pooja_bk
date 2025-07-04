import express from 'express';
import { registerUser, loginUser } from '../controller/userController.js';
import { body } from 'express-validator';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.post('/register',  registerUser);

router.post('/login',  loginUser);



export default  router;

import express from 'express';
import { registerUser, loginUser } from '../controller/userController.js';
import { body } from 'express-validator';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', [
    body('fullName').notEmpty().withMessage('Full name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('confirmPassword').notEmpty().withMessage('Confirm password is required'),
], registerUser);

router.post('/login', [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
], loginUser);

router.get('/dashboard', authenticate, (req, res) => {
    res.json({ message: `Welcome ${req.user.email}, you're authorized.` });
});

export default  router;

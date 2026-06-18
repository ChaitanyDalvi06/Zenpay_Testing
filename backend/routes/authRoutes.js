import express from 'express';
import { signup, login, createProfile } from '../controllers/authController.js';
import { verifyJwt } from '../utils/jwt.js';
import User from '../models/User.js'; // User model for authentication
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/profile', createProfile);

export const protect = async (req, res, next) => {
    let token;
    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decoded = verifyJwt(token, process.env.JWT_SECRET || 'your_jwt_secret');
            req.user = await User.findById(decoded.userId).select('-password'); // Exclude password from the user info
            if (!req.user) {
                return res.status(401).json({ error: 'Not authorized, user not found' });
            }
            return next();
        } catch (error) {
            console.error(error);
            return res.status(401).json({ error: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        return res.status(401).json({ error: 'Not authorized, no token' });
    }
};

router.get('/me', protect, (req, res) => {
    res.json({ success: true, user: req.user });
});

export default router;
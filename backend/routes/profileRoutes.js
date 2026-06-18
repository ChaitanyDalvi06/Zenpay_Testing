import express from 'express';
import { createProfile, getProfile } from '../controllers/authController.js';

const router = express.Router();

router.post('/profile', createProfile);
router.get('/profile', getProfile);

// AI Advisor API endpoint for load testing
router.post('/ai/chat', (req, res) => {
  const { message } = req.body;
  res.status(200).json({
    success: true,
    reply: "This is a simulated AI advisor response for testing. You asked: " + (message || "nothing")
  });
});

// Rewards Spin API endpoint for load testing
router.post('/rewards/spin', (req, res) => {
  const coupons = [
    { label: "Spotify Premium", coupon: "SPOTIFYFREE", merchant: "Spotify" },
    { label: "Amazon ₹100", coupon: "AMZ100GIFT", merchant: "Amazon" },
    { label: "Swiggy 10% Off", coupon: "SWIGGY10", merchant: "Swiggy" },
    { label: "Starbucks Brew", coupon: "SBUXFREE", merchant: "Starbucks" }
  ];
  const win = coupons[Math.floor(Math.random() * coupons.length)];
  res.status(200).json({
    success: true,
    won: win.label,
    coupon: win.coupon,
    merchant: win.merchant
  });
});

export default router;
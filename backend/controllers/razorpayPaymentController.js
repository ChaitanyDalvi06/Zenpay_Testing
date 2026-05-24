import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";
// Load environment variables
dotenv.config();

const getRazorpayInstance = () => {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    throw new Error('Razorpay credentials are not configured');
  }

  return new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  });
};

export const createOrder = async (req, res) => {
    const { amount, currency } = req.body;
  
    const options = {
      amount: amount * 100, // Amount in the smallest currency unit (paise for INR)
      currency: currency || "INR",  // Default to INR if currency not provided
      receipt: `receipt_${Date.now()}`
    };
  
    try {
      const razorpayInstance = getRazorpayInstance();
      const order = await razorpayInstance.orders.create(options);
      console.log("Order created successfully: ", order);
      res.status(200).json(order);
    } catch (error) {
      console.error("Error while creating Razorpay order: ", error);
      res.status(500).json({ error: "Failed to create Razorpay order", details: error.message });
    }
  };
  

// Verify Razorpay payment
export const verifyPayment = (req, res) => {
    const { order_id, payment_id, razorpay_signature } = req.body;
    const body = order_id + "|" + payment_id;

    if (!process.env.RAZORPAY_KEY_SECRET) {
      return res.status(500).json({ message: "Razorpay secret key is not configured" });
    }

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
        res.status(200).json({ message: "Payment verified successfully" });
    } else {
        res.status(400).json({ message: "Invalid payment signature" });
    }
};

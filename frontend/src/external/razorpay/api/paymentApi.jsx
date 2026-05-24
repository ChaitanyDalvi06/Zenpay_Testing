import axios from "axios";

// Use relative path to the combined backend's razorpay routes
const instance = axios.create({
  baseURL: "/api/razorpay",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;

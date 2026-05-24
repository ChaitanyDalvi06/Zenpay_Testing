import React from "react";
import axios from "../api/paymentApi";
import { env_variable } from "../config/env";

const PaymentForm = ({ payeeName, mobileNumber, amount }) => {
  const handlePayment = async () => {
    try {
      // Step 1: Create the Razorpay order
      const { data: order } = await axios.post("/createOrder", {
        amount: amount, // Convert to paise
        currency: "INR",
      });

      // Step 2: Define Razorpay payment options
      const options = {
        key: env_variable?.razorpay_keyID,
        amount: order.amount,
        currency: order.currency,
        name: "ZenPay",
        description: "Test Transaction",
        order_id: order.id,
        handler: async function (response) {
          // Step 3: Verify the payment with the backend
          const paymentResult = {
            order_id: order.id,
            payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          };

          try {
            const verify = await axios.post("/verifyPayment", paymentResult);

            if (verify.data.message === "Payment verified successfully") {
              alert("Payment successful!");

              // Step 4: Save the successful payment to the database
              await axios.post("/savePayment", {
                payeeName,
                mobileNumber,
                amount,
                status: "successful",
              });
            } else {
              throw new Error("Payment verification failed");
            }
          } catch (error) {
            alert("Payment verification failed!");

            // Save the failed payment to the database
            await axios.post("/savePayment", {
              payeeName,
              mobileNumber,
              amount,
              status: "failed",
            });
          }
        },
        prefill: {
          name: payeeName,
          email: `${payeeName}@example.com`,
          contact: mobileNumber,
        },
      };

      // Step 5: Open the Razorpay payment popup
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Error initializing payment:", error.message);
      alert("Unable to initiate payment. Please try again later.");
    }
  };

  React.useEffect(() => {
    handlePayment();
  }, []);

  return <div>Redirecting to payment...</div>;
};

export default PaymentForm;

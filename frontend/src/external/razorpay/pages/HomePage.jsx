import React, { useState } from "react";
import PaymentForm from "../components/PaymentForm";
import "./HomePage.css";

const HomePage = () => {
  const [payeeName, setPayeeName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPaymentForm(true);
  };

  return (
    <div className="homepage-container">
      <div className="form-container">
        <h1 className="header">Payment Portal</h1>
        <form onSubmit={handleSubmit} className="payment-form">
          <div className="form-group">
            <label htmlFor="payeeName">Payee Name:</label>
            <input
              type="text"
              id="payeeName"
              value={payeeName}
              onChange={(e) => setPayeeName(e.target.value)}
              required
              placeholder="Enter payee name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="mobileNumber">Mobile Number:</label>
            <input
              type="text"
              id="mobileNumber"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              required
              placeholder="Enter mobile number"
            />
          </div>
          <div className="form-group">
            <label htmlFor="amount">Amount:</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              placeholder="Enter amount"
            />
          </div>
          <button type="submit" className="submit-button">Proceed with Payment</button>
        </form>
      </div>
      {showPaymentForm && (
        <PaymentForm payeeName={payeeName} mobileNumber={mobileNumber} amount={amount} />
      )}
    </div>
  );
};

export default HomePage;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  CreditCard,
  Smartphone,
  Building,
  Wallet,
  Check,
  Lock,
  ArrowRight,
  Loader2,
  CheckCircle2,
  ChevronRight,
  Info,
  DollarSign,
  User,
  Phone
} from "lucide-react";
import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();
  
  // Checkout flow step: 1 (Billing info), 2 (Payment Details), 3 (Processing Animation), 4 (Success Screen)
  const [step, setStep] = useState(1);
  
  // Billing details
  const [payeeName, setPayeeName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    const prefillData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
        const profileRes = await fetch('http://localhost:8000/api/profile', { headers });
        if (profileRes.ok) {
          const profileData = await profileRes.json();
          if (profileData) {
            if (profileData.firstName && profileData.lastName) {
              setPayeeName(`${profileData.firstName} ${profileData.lastName}`);
            }
            if (profileData.mobileNumber) {
              setMobileNumber(profileData.mobileNumber);
            }
            return;
          }
        }
      } catch (err) {
        console.error('Error fetching profile for prefill:', err);
      }

      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await fetch('http://localhost:8000/api/auth/me', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (res.ok) {
            const data = await res.json();
            if (data?.user?.name) {
              setPayeeName(data.user.name);
            }
          }
        } catch (err) {
          console.error('Error fetching user info for prefill:', err);
        }
      }
    };

    prefillData();
  }, []);
  
  // Payment methods selection
  const [paymentMethod, setPaymentMethod] = useState("card"); // card, upi, netbanking, wallet
  
  // Payment details inputs
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  
  const [upiId, setUpiId] = useState("");
  const [selectedBank, setSelectedBank] = useState("HDFC Bank");
  const [selectedWallet, setSelectedWallet] = useState("GPay");

  // Simulated processing state
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Securing gateway connection...");
  const [txnId, setTxnId] = useState("");

  // Auto-format card number: 1234 5678 1234 5678
  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    let matches = value.match(/\d{4,16}/g);
    let match = (matches && matches[0]) || "";
    let parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length > 0) {
      setCardNumber(parts.join(" "));
    } else {
      setCardNumber(value);
    }
  };

  // Auto-format expiry: MM/YY
  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/gi, "");
    if (value.length >= 2) {
      setCardExpiry(value.substring(0, 2) + "/" + value.substring(2, 4));
    } else {
      setCardExpiry(value);
    }
  };

  // Auto-format CVV: 3 digits limit
  const handleCvvChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/gi, "");
    setCardCvv(value.substring(0, 3));
  };

  // Submit Billing Form -> Step 2
  const handleBillingSubmit = (e) => {
    e.preventDefault();
    if (payeeName && mobileNumber && amount > 0) {
      setStep(2);
    }
  };

  // Submit payment form -> Trigger simulated loading
  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setStep(3);
    setProgress(0);
  };

  // Simulated loading effect and database logging
  useEffect(() => {
    if (step !== 3) return;

    const phrases = [
      { prg: 20, text: "Securing payment channel connection..." },
      { prg: 45, text: "Authorizing credentials with clearing bank..." },
      { prg: 70, text: "Verifying payment signature protocols..." },
      { prg: 90, text: "Finalizing ledger receipt details..." },
      { prg: 100, text: "Payment complete!" }
    ];

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 2;
      setProgress(currentProgress);

      const phrase = phrases.find(p => currentProgress <= p.prg);
      if (phrase) {
        setLoadingText(phrase.text);
      }

      if (currentProgress >= 100) {
        clearInterval(interval);
        
        // Generate a random transaction ID
        const newTxnId = `TXN-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        setTxnId(newTxnId);

        // Make the real backend API call to save this successful transaction into the database
        const backendUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";
        axios.post(`${backendUrl}/api/payment/payment`, {
          payeeName,
          mobileNumber,
          amount,
          status: "successful"
        })
        .then((res) => {
          console.log("Transaction successfully logged in database:", res.data);
          setStep(4);
        })
        .catch((err) => {
          console.error("Failed to log transaction in database, but finalizing success locally:", err);
          setStep(4);
        });
      }
    }, 60);

    return () => clearInterval(interval);
  }, [step]);

  return (
    <div className="checkout-page-wrapper">
      <div className="checkout-main-container">
        
        {/* Step 1 & 2 Left Box: Interactive Form Panel */}
        {step < 3 && (
          <div className="checkout-panel-left">
            <div className="checkout-progress-header">
              <span className={`step-badge ${step >= 1 ? "step-active" : ""}`}>1. Billing Info</span>
              <ChevronRight size={16} className="progress-arrow" />
              <span className={`step-badge ${step >= 2 ? "step-active" : ""}`}>2. Payment Method</span>
            </div>

            {step === 1 && (
              <div className="step-content-box animate-fade-in">
                <h2>Billing & Checkout Setup</h2>
                <p className="panel-desc">Define payee name, contact phone, and transaction amount to initialize payment.</p>
                
                <form onSubmit={handleBillingSubmit} className="checkout-form-grid">
                  <div className="checkout-input-group">
                    <label htmlFor="payeeName">Payee Name</label>
                    <div className="input-with-icon">
                      <User size={18} className="input-icon-left" />
                      <input
                        type="text"
                        id="payeeName"
                        value={payeeName}
                        onChange={(e) => setPayeeName(e.target.value)}
                        required
                        placeholder="e.g. John Doe"
                      />
                    </div>
                  </div>

                  <div className="checkout-input-group">
                    <label htmlFor="mobileNumber">Mobile Number</label>
                    <div className="input-with-icon">
                      <Phone size={18} className="input-icon-left" />
                      <input
                        type="tel"
                        id="mobileNumber"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        required
                        placeholder="e.g. 9876543210"
                        pattern="[0-9]{10}"
                        title="10-digit mobile number required"
                      />
                    </div>
                  </div>

                  <div className="checkout-input-group">
                    <label htmlFor="amount">Amount (INR)</label>
                    <div className="input-with-icon">
                      <span className="currency-symbol-left">₹</span>
                      <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                        min="1"
                        placeholder="e.g. 500"
                      />
                    </div>
                  </div>

                  <button type="submit" className="checkout-action-btn">
                    <span>Continue to Payment Method</span>
                    <ArrowRight size={16} />
                  </button>
                </form>
              </div>
            )}

            {step === 2 && (
              <div className="step-content-box animate-fade-in">
                <h2>Choose Payment Option</h2>
                <p className="panel-desc">Select a mock payment method and input dummy transaction parameters.</p>

                {/* Option Tabs Grid */}
                <div className="payment-options-selector">
                  <button
                    className={`method-tab-btn ${paymentMethod === "card" ? "active-method" : ""}`}
                    onClick={() => setPaymentMethod("card")}
                  >
                    <CreditCard size={18} />
                    <span>Card</span>
                  </button>

                  <button
                    className={`method-tab-btn ${paymentMethod === "upi" ? "active-method" : ""}`}
                    onClick={() => setPaymentMethod("upi")}
                  >
                    <Smartphone size={18} />
                    <span>UPI / GPay</span>
                  </button>

                  <button
                    className={`method-tab-btn ${paymentMethod === "netbanking" ? "active-method" : ""}`}
                    onClick={() => setPaymentMethod("netbanking")}
                  >
                    <Building size={18} />
                    <span>Netbanking</span>
                  </button>

                  <button
                    className={`method-tab-btn ${paymentMethod === "wallet" ? "active-method" : ""}`}
                    onClick={() => setPaymentMethod("wallet")}
                  >
                    <Wallet size={18} />
                    <span>Wallet</span>
                  </button>
                </div>

                <form onSubmit={handlePaymentSubmit} className="payment-details-form">
                  {/* Card payment detail block */}
                  {paymentMethod === "card" && (
                    <div className="details-sub-grid animate-slide-up">
                      <div className="checkout-input-group">
                        <label>Card Number</label>
                        <input
                          type="text"
                          placeholder="4111 2222 3333 4444"
                          value={cardNumber}
                          onChange={handleCardNumberChange}
                          required
                          maxLength="19"
                        />
                      </div>
                      <div className="expiry-cvv-row">
                        <div className="checkout-input-group">
                          <label>Expiry Date</label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            value={cardExpiry}
                            onChange={handleExpiryChange}
                            required
                            maxLength="5"
                          />
                        </div>
                        <div className="checkout-input-group">
                          <label>CVV</label>
                          <input
                            type="password"
                            placeholder="123"
                            value={cardCvv}
                            onChange={handleCvvChange}
                            required
                            maxLength="3"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* UPI detail block */}
                  {paymentMethod === "upi" && (
                    <div className="details-sub-grid animate-slide-up">
                      <div className="checkout-input-group">
                        <label>UPI Address (VPA)</label>
                        <input
                          type="text"
                          placeholder="e.g. johndoe@okaxis"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  )}

                  {/* Netbanking detail block */}
                  {paymentMethod === "netbanking" && (
                    <div className="details-sub-grid animate-slide-up">
                      <div className="checkout-input-group">
                        <label>Select Clearing Bank</label>
                        <select
                          value={selectedBank}
                          onChange={(e) => setSelectedBank(e.target.value)}
                          required
                        >
                          <option value="HDFC Bank">HDFC Bank</option>
                          <option value="State Bank of India">State Bank of India</option>
                          <option value="ICICI Bank">ICICI Bank</option>
                          <option value="Axis Bank">Axis Bank</option>
                          <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Wallet detail block */}
                  {paymentMethod === "wallet" && (
                    <div className="details-sub-grid animate-slide-up">
                      <div className="checkout-input-group">
                        <label>Select Wallet Service</label>
                        <select
                          value={selectedWallet}
                          onChange={(e) => setSelectedWallet(e.target.value)}
                          required
                        >
                          <option value="GPay">Google Pay Wallet</option>
                          <option value="PhonePe">PhonePe Wallet</option>
                          <option value="Paytm">Paytm Wallet</option>
                          <option value="Amazon Pay">Amazon Pay Wallet</option>
                        </select>
                      </div>
                    </div>
                  )}

                  <div className="security-notice-box">
                    <Lock size={14} className="text-emerald-600" />
                    <span>Mock sandbox transaction - No actual money will be charged.</span>
                  </div>

                  <div className="form-action-row">
                    <button
                      type="button"
                      className="back-step-btn"
                      onClick={() => setStep(1)}
                    >
                      Back
                    </button>
                    <button type="submit" className="pay-submit-btn">
                      <span>Secure Payment of ₹{parseFloat(amount || 0).toLocaleString()}</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* Processing Step 3 Panel */}
        {step === 3 && (
          <div className="checkout-processing-panel animate-fade-in">
            <div className="processing-ring-container">
              <svg className="processing-progress-ring" width="120" height="120">
                <circle
                  className="progress-ring-bg"
                  stroke="#e2e8f0"
                  strokeWidth="6"
                  fill="transparent"
                  r="52"
                  cx="60"
                  cy="60"
                />
                <circle
                  className="progress-ring-fill"
                  stroke="#4f46e5"
                  strokeWidth="6"
                  strokeDasharray={`${2 * Math.PI * 52}`}
                  strokeDashoffset={`${2 * Math.PI * 52 * (1 - progress / 100)}`}
                  strokeLinecap="round"
                  fill="transparent"
                  r="52"
                  cx="60"
                  cy="60"
                />
              </svg>
              <div className="progress-percentage-num">{progress}%</div>
            </div>

            <h3>Processing Transaction</h3>
            <p className="loading-status-text">{loadingText}</p>
            <Loader2 size={24} className="spinning-loader-icon animate-spin text-indigo-600" />
          </div>
        )}

        {/* Success Step 4 Panel */}
        {step === 4 && (
          <div className="checkout-success-panel animate-scale-up">
            <div className="success-checkmark-circle">
              <CheckCircle2 size={56} className="checkmark-icon text-emerald-500" />
            </div>

            <h2>Payment Successful!</h2>
            <p className="success-headline">Transaction successfully authorized and logged in ZenPay ledger databases.</p>

            <div className="transaction-receipt-card">
              <div className="receipt-row">
                <span>Receipt Ref</span>
                <strong className="receipt-ref-num">{txnId}</strong>
              </div>
              <div className="receipt-row">
                <span>Payee Name</span>
                <strong>{payeeName}</strong>
              </div>
              <div className="receipt-row">
                <span>Mobile Contact</span>
                <strong>{mobileNumber}</strong>
              </div>
              <div className="receipt-row">
                <span>Payment Mode</span>
                <strong className="capitalize">{paymentMethod}</strong>
              </div>
              <div className="receipt-row">
                <span>Amount Paid</span>
                <strong className="receipt-amount-success">₹{parseFloat(amount || 0).toLocaleString()}</strong>
              </div>
              <div className="receipt-row">
                <span>Status</span>
                <span className="success-badge-pill">Authorized</span>
              </div>
            </div>

            <button
              onClick={() => navigate("/dashboard")}
              className="return-dashboard-btn"
            >
              <span>Return to Dashboard</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* Right Side Order Summary Card (Only shown for input steps 1 & 2) */}
        {step < 3 && (
          <div className="checkout-panel-right">
            <div className="order-summary-card">
              <h3>Order Summary</h3>
              <p className="summary-subtitle">ZenPay Transaction Receipt Overview</p>
              
              <div className="summary-item-list">
                <div className="summary-item-row">
                  <span>Simulated Item Cost</span>
                  <strong>₹{parseFloat(amount || 0).toLocaleString()}</strong>
                </div>
                <div className="summary-item-row">
                  <span>Clearing Processing Fee</span>
                  <span className="fee-free">Free</span>
                </div>
                <div className="summary-item-row">
                  <span>Platform Commission</span>
                  <span className="fee-free">₹0.00</span>
                </div>
              </div>

              <div className="summary-total-divider" />
              
              <div className="summary-total-row">
                <span>Total Amount Payable</span>
                <strong>₹{parseFloat(amount || 0).toLocaleString()}</strong>
              </div>

              <div className="secure-badge-box">
                <Check size={14} className="text-indigo-600" />
                <span>SSL Secured Sandbox Environment</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default HomePage;

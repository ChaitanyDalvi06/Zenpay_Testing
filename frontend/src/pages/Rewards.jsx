import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import confetti from "canvas-confetti";
import {
  Gift,
  Coins,
  Trophy,
  Copy,
  Check,
  Sparkles,
  RefreshCw,
  AlertCircle,
  ArrowRight,
  ExternalLink
} from "lucide-react";
import "./Rewards.css";

const WHEEL_SECTORS = [
  { label: "Spotify Premium", color: "#6366f1", coupon: "SPOTIFYFREE", merchant: "Spotify" },
  { label: "Try Again", color: "#f1f5f9", coupon: "", merchant: "None" },
  { label: "Amazon ₹100", color: "#0ea5e9", coupon: "AMZ100GIFT", merchant: "Amazon" },
  { label: "Swiggy 10% Off", color: "#6366f1", coupon: "SWIGGY10", merchant: "Swiggy" },
  { label: "Better Luck!", color: "#f1f5f9", coupon: "", merchant: "None" },
  { label: "MyShow 15% Off", color: "#0ea5e9", coupon: "BMS15OFF", merchant: "BookMyShow" },
  { label: "Ajio ₹200 Off", color: "#6366f1", coupon: "AJIO200", merchant: "Ajio" },
  { label: "Starbucks Brew", color: "#10b981", coupon: "SBUXFREE", merchant: "Starbucks" }
];

const SCRATCH_CARD_REWARDS = [
  { label: "₹50 Cashback", code: "CASH50", merchant: "ZenPay Cashback" },
  { label: "Amazon ₹50 Off", code: "AMZ50OFF", merchant: "Amazon" },
  { label: "Spotify 1 Month", code: "SPOT1M", merchant: "Spotify" },
  { label: "Swiggy Free Delivery", code: "SWIGGYDEL", merchant: "Swiggy" },
  { label: "Better luck next time!", code: "", merchant: "None" }
];

export default function Rewards() {
  // Financial context / Coin balances
  const [coins, setCoins] = useState(500); // 500 welcome coins default
  const [totalSpent, setTotalSpent] = useState(0);
  const [unlockedCoupons, setUnlockedCoupons] = useState([]);
  const [copiedCode, setCopiedCode] = useState(null);
  const [profileData, setProfileData] = useState(null);

  // Wheel states
  const [isSpinning, setIsSpinning] = useState(false);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [wheelWinner, setWheelWinner] = useState(null);
  const wheelCanvasRef = useRef(null);

  // Scratch card states
  const [hasScratchCard, setHasScratchCard] = useState(false);
  const [scratchReward, setScratchReward] = useState(null);
  const [isScratched, setIsScratched] = useState(false);
  const scratchCanvasRef = useRef(null);
  const isDrawingRef = useRef(false);

  // Trigger rich multi-wave confetti on winning
  const triggerCelebrationConfetti = () => {
    // 1. Core explosion
    confetti({
      particleCount: 100,
      spread: 75,
      origin: { y: 0.6 }
    });

    // 2. Left side cannon
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 60,
        origin: { x: 0, y: 0.85 }
      });
    }, 200);

    // 3. Right side cannon
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 60,
        origin: { x: 1, y: 0.85 }
      });
    }, 400);
  };

  // Load transaction list and compute coin balance on mount
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const backendUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";
        const res = await axios.get(`${backendUrl}/api/payment/payments`);
        if (res.data && res.data.payments) {
          const successfulAmount = res.data.payments
            .filter(p => p.status === "successful")
            .reduce((sum, p) => sum + (p.amount || 0), 0);
          
          setTotalSpent(successfulAmount);
          // 1 Coin per ₹1 spent + 500 welcome coins
          setCoins(successfulAmount + 500);
        }
      } catch (err) {
        console.error("Error loading transaction coins:", err);
      }
    };

    const fetchProfile = async () => {
      try {
        const backendUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";
        const token = localStorage.getItem("token");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const res = await axios.get(`${backendUrl}/api/profile`, { headers });
        if (res.data) {
          setProfileData(res.data);
          if (res.data.unlockedCoupons && res.data.unlockedCoupons.length > 0) {
            setUnlockedCoupons(res.data.unlockedCoupons);
          }
        }
      } catch (err) {
        console.error("Error loading profile coupons:", err);
      }
    };

    fetchTransactions();
    fetchProfile();
  }, []);

  // Save coupons to localStorage and backend database whenever changed
  const saveCoupons = async (updatedList) => {
    setUnlockedCoupons(updatedList);
    localStorage.setItem("zenpay_unlocked_coupons", JSON.stringify(updatedList));

    try {
      const backendUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";
      const token = localStorage.getItem("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      
      const payload = profileData ? {
        ...profileData,
        unlockedCoupons: updatedList
      } : {
        firstName: "ZenPay",
        lastName: "User",
        age: 26,
        mobileNumber: "9876543210",
        occupation: "Job holder",
        monthlyIncome: 50000,
        monthlyExpenses: 15000,
        monthlySavings: 35000,
        aadharCardNumber: Array(12).fill('0'),
        unlockedCoupons: updatedList
      };

      const res = await axios.post(`${backendUrl}/api/profile`, payload, { headers });
      if (res.data) {
        setProfileData(res.data);
      }
    } catch (err) {
      console.error("Failed to sync unlocked coupons to backend:", err);
    }
  };

  // Draw the Roulette Canvas on Mount (incorporating High-DPI scaling)
  useEffect(() => {
    const canvas = wheelCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    
    // Scale backing canvas size relative to display DPI ratio
    const displayWidth = 280;
    const displayHeight = 280;
    const dpr = window.devicePixelRatio || 1;
    
    canvas.width = displayWidth * dpr;
    canvas.height = displayHeight * dpr;
    canvas.style.width = `${displayWidth}px`;
    canvas.style.height = `${displayHeight}px`;
    
    ctx.scale(dpr, dpr);

    const size = displayWidth;
    const center = size / 2;
    const radius = center - 8;

    ctx.clearRect(0, 0, size, size);

    const arcSize = (2 * Math.PI) / WHEEL_SECTORS.length;

    WHEEL_SECTORS.forEach((sec, i) => {
      const angle = i * arcSize;
      
      // Draw slice
      ctx.beginPath();
      ctx.fillStyle = sec.color;
      ctx.moveTo(center, center);
      ctx.arc(center, center, radius, angle, angle + arcSize);
      ctx.lineTo(center, center);
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Write text labels
      ctx.save();
      ctx.translate(center, center);
      ctx.rotate(angle + arcSize / 2);
      ctx.textAlign = "right";
      ctx.fillStyle = sec.color === "#f1f5f9" ? "#1e293b" : "#ffffff";
      ctx.font = "bold 11px Inter, sans-serif";
      ctx.fillText(sec.label, radius - 15, 4);
      ctx.restore();
    });

    // Outer ring decoration
    ctx.beginPath();
    ctx.arc(center, center, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = "#0f172a";
    ctx.lineWidth = 6;
    ctx.stroke();

    // Inner pin cover
    ctx.beginPath();
    ctx.arc(center, center, 15, 0, 2 * Math.PI);
    ctx.fillStyle = "#0f172a";
    ctx.fill();
  }, []);

  // Spin the Roulette
  const spinWheel = () => {
    if (isSpinning || coins < 100) return;

    // Deduct 100 coins
    setCoins(prev => prev - 100);
    setIsSpinning(true);
    setWheelWinner(null);

    // Randomize winning sector
    const totalSectors = WHEEL_SECTORS.length;
    const sectorIndex = Math.floor(Math.random() * totalSectors);
    const sectorAngle = 360 / totalSectors;
    
    // Correct landing calculation to point exactly at top pointer (270 degrees)
    // Formula: (270 - (sectorIndex * sectorAngle + sectorAngle / 2) + 360) % 360
    const targetRotation = (270 - (sectorIndex * sectorAngle + sectorAngle / 2) + 360) % 360;
    
    // Spin 5 full rounds forward relative to current angle wrapping
    const currentAngleMod = wheelRotation % 360;
    let additionalRotation = 1800 + targetRotation - currentAngleMod;
    if (additionalRotation < 1800) {
      additionalRotation += 360;
    }
    
    const targetAngle = wheelRotation + additionalRotation;
    setWheelRotation(targetAngle);

    setTimeout(() => {
      setIsSpinning(false);
      const wonSector = WHEEL_SECTORS[sectorIndex];
      setWheelWinner(wonSector);

      if (wonSector.coupon) {
        // Trigger multi-wave confetti blast
        triggerCelebrationConfetti();

        // Add to unlocked list
        const newCoupon = {
          id: Date.now().toString(),
          userId: profileData?.userId || null,
          merchant: wonSector.merchant,
          title: wonSector.label,
          code: wonSector.coupon,
          date: new Date().toLocaleDateString()
        };
        saveCoupons([newCoupon, ...unlockedCoupons]);
      }
    }, 5000); // 5 seconds slow transitions
  };

  // Purchase Scratch Card
  const buyScratchCard = () => {
    if (coins < 150) return;

    setCoins(prev => prev - 150);
    setHasScratchCard(true);
    setIsScratched(false);

    // Select random reward
    const randomReward = SCRATCH_CARD_REWARDS[Math.floor(Math.random() * SCRATCH_CARD_REWARDS.length)];
    setScratchReward(randomReward);

    // Give react time to mount canvas
    setTimeout(() => {
      initScratchCanvas();
    }, 100);
  };

  // Initialize Scratch Card canvas overlay
  const initScratchCanvas = () => {
    const canvas = scratchCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw metallic overlay gradient
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, "#cbd5e1");
    grad.addColorStop(0.5, "#94a3b8");
    grad.addColorStop(1, "#64748b");

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add decorative overlay text/dots
    ctx.fillStyle = "rgba(255,255,255,0.15)";
    for (let i = 0; i < canvas.width; i += 15) {
      for (let j = 0; j < canvas.height; j += 15) {
        ctx.beginPath();
        ctx.arc(i, j, 2, 0, 2 * Math.PI);
        ctx.fill();
      }
    }

    ctx.fillStyle = "#475569";
    ctx.font = "bold 14px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Scratch to Reveal!", canvas.width / 2, canvas.height / 2 + 5);
  };

  // Scratch card canvas draw handlers
  const getMousePos = (e) => {
    const canvas = scratchCanvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const handleScratchStart = (e) => {
    isDrawingRef.current = true;
    scratch(e);
  };

  const handleScratchMove = (e) => {
    if (!isDrawingRef.current) return;
    e.preventDefault();
    scratch(e);
  };

  const handleScratchEnd = () => {
    isDrawingRef.current = false;
    checkScratchPercentage();
  };

  const scratch = (e) => {
    const canvas = scratchCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const pos = getMousePos(e);

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 20, 0, 2 * Math.PI);
    ctx.fill();
  };

  // Check how much of the card has been scratched off
  const checkScratchPercentage = () => {
    const canvas = scratchCanvasRef.current;
    if (!canvas || isScratched) return;
    const ctx = canvas.getContext("2d");
    
    // Check cleared pixels count
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imgData.data;
    let clearedCount = 0;
    
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) {
        clearedCount++;
      }
    }

    const totalPixels = canvas.width * canvas.height;
    const percentage = clearedCount / totalPixels;

    // If more than 45% cleared, clear the whole overlay
    if (percentage > 0.45) {
      setIsScratched(true);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Trigger Confetti if won coupon
      if (scratchReward && scratchReward.code) {
        triggerCelebrationConfetti();

        // Save coupon
        const newCoupon = {
          id: Date.now().toString(),
          userId: profileData?.userId || null,
          merchant: scratchReward.merchant,
          title: scratchReward.label,
          code: scratchReward.code,
          date: new Date().toLocaleDateString()
        };
        saveCoupons([newCoupon, ...unlockedCoupons]);
      }
    }
  };

  // Copy code utility
  const copyToClipboard = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="rewards-page-container">
      
      {/* Header & Balance Dashboard Banner */}
      <div className="rewards-hero-banner">
        <div className="banner-content">
          <div className="hero-badge-wrap">
            <Trophy size={16} className="trophy-gold" />
            <span>ZenPay Rewards Hub</span>
          </div>
          <h1>Unlock Exclusive Rewards</h1>
          <p>
            Earn 1 coin for every Rupee spent on transactions. Play games to claim coupon codes.
          </p>
          <div className="rewards-stats-bar">
            <div className="stat-metric-box">
              <Coins size={22} className="icon-coin animate-pulse" />
              <div className="stat-meta">
                <span>Available Balance</span>
                <strong>{coins.toLocaleString()} Coins</strong>
              </div>
            </div>
            <div className="stat-divider" />
            <div className="stat-metric-box">
              <Sparkles size={20} className="icon-spark" />
              <div className="stat-meta">
                <span>Net Payments Tracked</span>
                <strong>₹{totalSpent.toLocaleString()}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="games-layout-grid">
        
        {/* Roulette Game Box */}
        <div className="rewards-game-card">
          <div className="game-card-header">
            <Gift size={20} className="game-icon-indigo" />
            <div>
              <h3>Roulette Spin & Win</h3>
              <p>Spin the wheel of fortune to claim high-value vouchers</p>
            </div>
            <span className="game-cost-badge">100 Coins / Spin</span>
          </div>

          <div className="wheel-game-body">
            <div className="wheel-outer-wrapper">
              <div className="wheel-pointer-indicator" />
              <canvas
                ref={wheelCanvasRef}
                className="wheel-canvas"
                style={{
                  transform: `rotate(${wheelRotation}deg)`,
                  transition: isSpinning ? "transform 5s cubic-bezier(0.2, 0.9, 0.1, 1)" : "none"
                }}
              />
            </div>

            <div className="wheel-controls-box">
              <button
                onClick={spinWheel}
                disabled={isSpinning || coins < 100}
                className="spin-action-btn"
              >
                {isSpinning ? (
                  <>
                    <RefreshCw className="animate-spin" size={16} />
                    <span>Spinning...</span>
                  </>
                ) : (
                  <span>Spin Wheel</span>
                )}
              </button>
              {coins < 100 && (
                <p className="insufficient-coins-note">
                  <AlertCircle size={12} />
                  <span>Insufficient coin balance</span>
                </p>
              )}
            </div>

            {wheelWinner && (
              <div className="game-outcome-alert animate-scale-up">
                {wheelWinner.coupon ? (
                  <div className="success-outcome">
                    <Sparkles size={18} className="text-yellow-600" />
                    <span>Won **{wheelWinner.label}**! Code saved below.</span>
                  </div>
                ) : (
                  <div className="neutral-outcome">
                    <AlertCircle size={18} className="text-slate-500" />
                    <span>Better luck next spin! Try again.</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Scratch Card Game Box */}
        <div className="rewards-game-card">
          <div className="game-card-header">
            <Gift size={20} className="game-icon-cyan" />
            <div>
              <h3>Scratch Card Vault</h3>
              <p>Buy a card and scratch to reveal surprise cashbacks</p>
            </div>
            <span className="game-cost-badge">150 Coins / Card</span>
          </div>

          <div className="scratch-game-body">
            {!hasScratchCard ? (
              <div className="scratch-empty-state">
                <div className="scratch-empty-icon-wrap">
                  <Gift size={42} />
                </div>
                <h4>Generate Scratch Card</h4>
                <p>Unlock a metallic card covered in secret rewards. Scratch with your cursor.</p>
                <button
                  onClick={buyScratchCard}
                  disabled={coins < 150}
                  className="buy-card-action-btn"
                >
                  Unlock Card
                </button>
                {coins < 150 && (
                  <p className="insufficient-coins-note text-center justify-center">
                    <AlertCircle size={12} />
                    <span>Need 150 coins to buy</span>
                  </p>
                )}
              </div>
            ) : (
              <div className="scratch-play-container animate-fade-in">
                <div className="scratch-canvas-card-wrapper">
                  
                  {/* Underlay Reward Details */}
                  <div className="scratch-card-underlay">
                    {scratchReward?.code ? (
                      <div className="scratch-reward-win animate-pulse">
                        <Trophy size={32} className="text-yellow-500 mb-2" />
                        <span className="underlay-merchant font-semibold text-slate-500 uppercase">{scratchReward.merchant}</span>
                        <strong className="underlay-reward-title">{scratchReward.label}</strong>
                        <span className="underlay-code-badge">{scratchReward.code}</span>
                      </div>
                    ) : (
                      <div className="scratch-reward-lose">
                        <AlertCircle size={32} className="text-slate-400 mb-2" />
                        <strong>Better Luck Next Time!</strong>
                        <span className="text-xs text-slate-400 mt-1">Keep scratching cards to win</span>
                      </div>
                    )}
                  </div>

                  {/* Interactive Scratch Canvas */}
                  {!isScratched && (
                    <canvas
                      ref={scratchCanvasRef}
                      width="200"
                      height="200"
                      className="scratch-canvas-layer"
                      onMouseDown={handleScratchStart}
                      onMouseMove={handleScratchMove}
                      onMouseUp={handleScratchEnd}
                      onMouseLeave={handleScratchEnd}
                      onTouchStart={handleScratchStart}
                      onTouchMove={handleScratchMove}
                      onTouchEnd={handleScratchEnd}
                    />
                  )}
                </div>

                {isScratched && (
                  <div className="scratch-finished-actions animate-scale-up">
                    <button
                      onClick={() => setHasScratchCard(false)}
                      className="unlock-another-btn"
                    >
                      Unlock Another Card
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Unlocked Coupons List Section */}
      <div className="unlocked-vouchers-section">
        <div className="section-header">
          <Gift size={20} className="text-indigo-600" />
          <h2>Unlocked Vouchers & Coupons</h2>
        </div>
        
        {unlockedCoupons.length === 0 ? (
          <div className="empty-wallet-card">
            <Gift size={32} className="text-slate-300" />
            <p>Your reward wallet is empty. Play games above to unlock premium discount vouchers.</p>
          </div>
        ) : (
          <div className="coupons-grid">
            {unlockedCoupons.map((coupon) => (
              <div key={coupon.id} className="coupon-item-card animate-scale-up">
                <div className="coupon-card-left-strip">
                  <Gift size={20} className="text-white" />
                </div>
                <div className="coupon-card-content">
                  <span className="coupon-card-merchant">{coupon.merchant}</span>
                  <h4>{coupon.title}</h4>
                  <div className="coupon-code-row">
                    <span className="coupon-code-string">{coupon.code}</span>
                    <button
                      onClick={() => copyToClipboard(coupon.code, coupon.id)}
                      className="copy-coupon-btn"
                    >
                      {copiedCode === coupon.id ? (
                        <Check size={14} className="text-emerald-600" />
                      ) : (
                        <Copy size={14} />
                      )}
                    </button>
                  </div>
                  <span className="coupon-expiry-text">Unlocked: {coupon.date}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

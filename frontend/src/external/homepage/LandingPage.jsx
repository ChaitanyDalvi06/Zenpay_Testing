import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

export default function LandingPage() {
  return (
    <div className="landing-page">
      {/* ==================== NAVBAR ==================== */}
      <nav className="landing-nav">
        <div className="landing-container">
          <div className="landing-nav-inner">
            <Link to="/" className="landing-nav-logo">
              <div className="landing-nav-logo-icon">Z</div>
              <span className="landing-nav-logo-text">ZenPay</span>
            </Link>

            <ul className="landing-nav-links">
              <li>
                <a href="#features">
                  Products
                  <svg className="chevron-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
                  </svg>
                </a>
              </li>
              <li>
                <a href="#features">
                  Services
                  <svg className="chevron-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
                  </svg>
                </a>
              </li>
              <li><a href="#pricing">Pricing</a></li>
              <li>
                <a href="#newsletter">
                  Resources
                  <svg className="chevron-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
                  </svg>
                </a>
              </li>
              <li><a href="#footer">About</a></li>
            </ul>

            <div className="landing-nav-actions">
              <Link to="/login" className="landing-btn-ghost">Log in</Link>
              <Link to="/signup" className="landing-btn-primary">Sign up</Link>
            </div>

            <button className="landing-nav-hamburger" aria-label="Menu">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* ==================== HERO ==================== */}
      <section className="landing-hero">
        <div className="landing-container">
          <div className="landing-hero-inner">
            <div className="landing-hero-content">
              <div className="landing-badge">
                <span className="landing-badge-label">
                  <span className="landing-badge-dot" style={{ display: 'inline-block', marginRight: 6 }} />
                  New feature
                </span>
                <span>AI-powered insights in-app</span>
                <span className="landing-badge-arrow">→</span>
              </div>

              <h1>
                Smart payments<br />
                tracking made easy
              </h1>

              <p className="landing-hero-subtitle">
                Designed for modern users. ZenPay gives you the tools, insights, and intelligence you need to manage your finances effortlessly.
              </p>

              <div className="landing-hero-buttons">
                <a href="#" className="landing-store-btn landing-store-btn--dark">
                  <svg className="landing-store-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  <span className="landing-store-text">
                    <small>Download on the</small>
                    <strong>App Store</strong>
                  </span>
                </a>

                <a href="#" className="landing-store-btn landing-store-btn--outline">
                  <svg className="landing-store-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 1.33c.576.334.576 1.038 0 1.372l-2.302 1.33-2.535-2.535 2.535-2.497zM5.864 3.471L16.8 9.804l-2.302 2.302-8.635-8.635z" />
                  </svg>
                  <span className="landing-store-text">
                    <small>GET IT ON</small>
                    <strong>Google Play</strong>
                  </span>
                </a>
              </div>
            </div>

            {/* Phone mockup */}
            <div className="landing-hero-visual">
              <div className="landing-phone-circle" />
              <div className="landing-phone-mockup">
                <div className="landing-phone-notch" />
                <div className="landing-phone-screen">
                  <div className="landing-phone-status">
                    <span>9:41</span>
                    <span>⦁ ⦁ ⦁</span>
                  </div>
                  <div className="landing-phone-greeting">Good morning, Alex 👋</div>
                  <div className="landing-phone-balance">₹1,24,500.00</div>
                  <div className="landing-phone-actions">
                    <button className="landing-phone-action-btn landing-phone-action-btn--primary">Send</button>
                    <button className="landing-phone-action-btn landing-phone-action-btn--ghost">Request</button>
                    <button className="landing-phone-action-btn landing-phone-action-btn--ghost">More</button>
                  </div>
                  <div className="landing-phone-card">
                    <div className="landing-phone-card-title">Portfolio Value</div>
                    <div className="landing-phone-card-row">
                      <span className="landing-phone-card-amount">₹3,42,800</span>
                      <span className="landing-phone-card-change">+12.4% ↑</span>
                    </div>
                  </div>
                  <div className="landing-phone-card">
                    <div className="landing-phone-card-title">Monthly Savings</div>
                    <div className="landing-phone-card-row">
                      <span className="landing-phone-card-amount">₹18,500</span>
                      <span className="landing-phone-card-change">+8.2% ↑</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== LOGO BAR ==================== */}
      <section className="landing-logos">
        <div className="landing-container">
          <p className="landing-logos-label">Trusted by leading companies worldwide</p>
          <div className="landing-logos-grid">
            <div className="landing-logo-item">
              <svg className="landing-logo-icon" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>
              OdeaoLabs
            </div>
            <div className="landing-logo-item">
              <svg className="landing-logo-icon" viewBox="0 0 24 24" fill="currentColor"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" /></svg>
              Kintsugi
            </div>
            <div className="landing-logo-item">
              <svg className="landing-logo-icon" viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="4" width="16" height="16" rx="3" /><rect x="7" y="7" width="4" height="4" rx="1" /><rect x="13" y="7" width="4" height="4" rx="1" /><rect x="7" y="13" width="4" height="4" rx="1" /></svg>
              Stackedlab
            </div>
            <div className="landing-logo-item">
              <svg className="landing-logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 15s2-3 4-3 4 3 4 3 2-3 4-3 4 3 4 3" /><path d="M4 9s2-3 4-3 4 3 4 3 2-3 4-3 4 3 4 3" /></svg>
              Magnolia
            </div>
            <div className="landing-logo-item">
              <svg className="landing-logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" /></svg>
              Warpspeed
            </div>
            <div className="landing-logo-item">
              <svg className="landing-logo-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              Sisyphus
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FEATURES ==================== */}
      <section className="landing-features" id="features">
        <div className="landing-container">
          <div className="landing-features-header">
            <p className="landing-features-label">Features</p>
            <h2 className="landing-features-title">Overflowing with useful features</h2>
            <p className="landing-features-subtitle">
              Powerful, self-serve financial tools and growth analytics to help you manage, track, and optimize your money. Trusted by over 4,000 users.
            </p>
          </div>

          <div className="landing-features-split">
            {/* LEFT: 2x2 Feature Cards */}
            <div className="landing-features-grid">
              {/* Card 1 */}
              <div className="landing-feature-card">
                <div className="landing-feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 00-3-3.87" />
                    <path d="M16 3.13a4 4 0 010 7.75" />
                  </svg>
                </div>
                <h3>Share team inboxes</h3>
                <p>Whether you have a team of 2 or 200, our shared team inboxes keep everyone on the same page and in the loop.</p>
              </div>

              {/* Card 2 */}
              <div className="landing-feature-card">
                <div className="landing-feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                </div>
                <h3>Deliver instant answers</h3>
                <p>An all-in-one customer service platform that helps you balance everything your customers need to be happy.</p>
              </div>

              {/* Card 3 */}
              <div className="landing-feature-card">
                <div className="landing-feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                </div>
                <h3>Manage your team with reports</h3>
                <p>Measure what matters with Untitled's easy-to-use reports. You can filter, export, and drilldown on the data in a couple clicks.</p>
              </div>

              {/* Card 4 */}
              <div className="landing-feature-card">
                <div className="landing-feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                  </svg>
                </div>
                <h3>Connect with customers</h3>
                <p>Solve a problem or close a sale in real-time with chat. If no one is available, customers are seamlessly routed to email without confusion.</p>
              </div>
            </div>

            {/* RIGHT: Phone + iPad Mockup */}
            <div className="landing-features-mockup">
              {/* iPad / Tablet frame (behind phone) */}
              <div className="landing-ipad-frame">
                <div className="landing-ipad-screen">
                  <div className="landing-ipad-topbar">
                    <div className="landing-ipad-topbar-left">
                      <div className="landing-nav-logo-icon" style={{ width: 30, height: 30, fontSize: '0.9rem', borderRadius: 6 }}>Z</div>
                      <span style={{ fontSize: '1.05rem', fontWeight: 700, color: '#1a1a2e' }}>ZenPay</span>
                    </div>
                    <div className="landing-ipad-search">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9d9dba" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                      <span>Search</span>
                    </div>
                    <div className="landing-ipad-topbar-right">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9d9dba" strokeWidth="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" /></svg>
                      <div className="landing-ipad-avatar">K</div>
                    </div>
                  </div>
                  <div className="landing-ipad-title">My dashboard</div>
                  <div className="landing-ipad-stats">
                    <div className="landing-ipad-stat-card">
                      <div className="landing-ipad-stat-icon" style={{ background: '#f0eeff' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                      </div>
                      <div className="landing-ipad-stat-info">
                        <div className="landing-ipad-stat-label">All revenue</div>
                        <div className="landing-ipad-stat-value">₹8,746.22</div>
                      </div>
                      <span className="landing-ipad-stat-badge">↗ 2.4%</span>
                    </div>
                    <div className="landing-ipad-stat-card">
                      <div className="landing-ipad-stat-icon" style={{ background: '#fdf2f8' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                      </div>
                      <div className="landing-ipad-stat-info">
                        <div className="landing-ipad-stat-label">Page views</div>
                        <div className="landing-ipad-stat-value">12,440</div>
                      </div>
                    </div>
                  </div>
                  <div className="landing-ipad-revenue-section">
                    <div style={{ marginBottom: 4 }}>
                      <div className="landing-ipad-stat-label">Net revenue ↓</div>
                      <div className="landing-ipad-stat-value">₹7,804.16 <span style={{ fontSize: '0.8rem', color: '#22c55e' }}>↗ 2.4%</span></div>
                    </div>
                    <div className="landing-ipad-chart">
                      <svg viewBox="0 0 300 60" fill="none" preserveAspectRatio="none" style={{ width: '100%', height: 60 }}>
                        <path d="M0 50 Q15 48 30 45 Q50 40 70 42 Q90 44 110 38 Q130 30 150 32 Q170 28 190 20 Q210 15 230 18 Q250 22 270 14 Q285 10 300 8" stroke="#4f46e5" strokeWidth="1.5" fill="none" />
                        <path d="M0 50 Q15 48 30 45 Q50 40 70 42 Q90 44 110 38 Q130 30 150 32 Q170 28 190 20 Q210 15 230 18 Q250 22 270 14 Q285 10 300 8 L300 60 L0 60Z" fill="url(#ipadChartGrad)" opacity="0.1" />
                        <path d="M0 52 Q20 50 40 48 Q60 45 80 47 Q100 49 120 44 Q140 38 160 40 Q180 36 200 30 Q220 26 240 28 Q260 30 280 24 Q290 20 300 18" stroke="#a78bfa" strokeWidth="1" strokeDasharray="3 3" fill="none" opacity="0.5" />
                        <defs><linearGradient id="ipadChartGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#4f46e5" /><stop offset="100%" stopColor="transparent" /></linearGradient></defs>
                      </svg>
                      <div className="landing-ipad-chart-labels">
                        <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span>
                      </div>
                    </div>
                  </div>
                  <div className="landing-ipad-customers">
                    <div className="landing-ipad-customers-header">
                      <span>Customers</span>
                      <div style={{ display: 'flex', gap: 16 }}>
                        <span>Customer ↕</span>
                        <span>Email ↕</span>
                      </div>
                    </div>
                    <div className="landing-ipad-customer-row">
                      <div className="landing-ipad-customer-info">
                        <div className="landing-dash-customer-avatar" style={{ background: '#ece9ff', width: 32, height: 32, fontSize: '0.8rem' }}>LR</div>
                        <div>
                          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1a1a2e' }}>Lily-Rose Chedjou</div>
                          <div style={{ fontSize: '0.7rem', color: '#9d9dba' }}>@lilyrose</div>
                        </div>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#64648a' }}>lilyrose@gmail.com</div>
                    </div>
                    <div className="landing-ipad-customer-row">
                      <div className="landing-ipad-customer-info">
                        <div className="landing-dash-customer-avatar" style={{ background: '#fce7f3', width: 32, height: 32, fontSize: '0.8rem' }}>CK</div>
                        <div>
                          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1a1a2e' }}>Caitlyn King</div>
                          <div style={{ fontSize: '0.7rem', color: '#9d9dba' }}>@caitlynk</div>
                        </div>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#64648a' }}>hi@caitlynking.com</div>
                    </div>
                    <div className="landing-ipad-customer-row">
                      <div className="landing-ipad-customer-info">
                        <div className="landing-dash-customer-avatar" style={{ background: '#dcfce7', width: 32, height: 32, fontSize: '0.8rem' }}>FC</div>
                        <div>
                          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1a1a2e' }}>Fleur Cook</div>
                          <div style={{ fontSize: '0.7rem', color: '#9d9dba' }}>@fleur_cook</div>
                        </div>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#64648a' }}>fleurcook@gmail.com</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phone mockup (overlaps iPad) */}
              <div className="landing-features-phone">
                <div className="landing-features-phone-notch" />
                <div className="landing-features-phone-screen">
                  <div className="landing-phone-status">
                    <span>9:41</span>
                    <span>⦁ ⦁ ⦁</span>
                  </div>
                  <div className="landing-fp-header">
                    <div className="landing-fp-logo">
                      <div className="landing-nav-logo-icon" style={{ width: 24, height: 24, fontSize: '0.7rem', borderRadius: 6 }}>Z</div>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1a1a2e' }}>ZenPay</span>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a1a2e" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
                  </div>
                  <div className="landing-fp-nav">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64648a" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
                    <span style={{ fontSize: '0.75rem', color: '#64648a' }}>Back</span>
                  </div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1a1a2e', marginBottom: 10 }}>My dashboard</div>
                  <div className="landing-fp-actions">
                    <button className="landing-fp-action-btn landing-fp-action-btn--primary">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>
                      Copy link
                    </button>
                    <button className="landing-fp-action-btn landing-fp-action-btn--outline">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                      Visit store
                    </button>
                  </div>
                  <div className="landing-fp-stats">
                    <div className="landing-fp-stat">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9d9dba" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                      <div>
                        <div style={{ fontSize: '0.65rem', color: '#9d9dba' }}>All revenue</div>
                        <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1a1a2e' }}>₹8,746.22</div>
                        <span style={{ fontSize: '0.6rem', color: '#22c55e' }}>↑ 2.4%</span>
                      </div>
                    </div>
                    <div className="landing-fp-stat">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9d9dba" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                      <div>
                        <div style={{ fontSize: '0.65rem', color: '#9d9dba' }}>Page views</div>
                        <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1a1a2e' }}>12,486</div>
                      </div>
                    </div>
                  </div>
                  <div style={{ marginTop: 8 }}>
                    <div style={{ fontSize: '0.65rem', color: '#9d9dba', marginBottom: 2 }}>Net revenue ↓</div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1a1a2e' }}>₹7,804.16 <span style={{ fontSize: '0.6rem', color: '#22c55e' }}>↑ 2.4%</span></div>
                  </div>
                  <div className="landing-fp-filter-row">
                    <span className="landing-fp-filter active">12m</span>
                    <span className="landing-fp-filter">30d</span>
                    <span className="landing-fp-filter">7d</span>
                    <span className="landing-fp-filter">24h</span>
                    <span className="landing-fp-filter">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>
                      Filters
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== APP PREVIEW ==================== */}
      <section className="landing-app-preview">
        <div className="landing-container">
          <div className="landing-app-preview-card">
            <div className="landing-app-preview-content">
              <h2>Start your free trial</h2>
              <p>Personal financial tracking made easy. Get real-time notifications and stay on top of every transaction.</p>
              <div className="landing-app-preview-buttons">
                <a href="#" className="landing-store-btn landing-store-btn--dark">
                  <svg className="landing-store-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  <span className="landing-store-text">
                    <small>Download on the</small>
                    <strong>App Store</strong>
                  </span>
                </a>
                <a href="#" className="landing-store-btn landing-store-btn--outline">
                  <svg className="landing-store-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 1.33c.576.334.576 1.038 0 1.372l-2.302 1.33-2.535-2.535 2.535-2.497zM5.864 3.471L16.8 9.804l-2.302 2.302-8.635-8.635z" />
                  </svg>
                  <span className="landing-store-text">
                    <small>GET IT ON</small>
                    <strong>Google Play</strong>
                  </span>
                </a>
              </div>
            </div>

            <div className="landing-notification-phone">
              <div className="landing-notif-list">
                <div className="landing-notif-card">
                  <div className="landing-notif-avatar" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>OR</div>
                  <div className="landing-notif-text">
                    <strong>Olivia Rhye</strong> <span>sent you ₹2,500</span>
                  </div>
                </div>
                <div className="landing-notif-card">
                  <div className="landing-notif-avatar" style={{ background: 'linear-gradient(135deg, #f59e0b, #ef4444)' }}>CW</div>
                  <div className="landing-notif-text">
                    <strong>Candice Wu</strong> <span>and 2 others split ₹1,200 bill</span>
                  </div>
                </div>
                <div className="landing-notif-card">
                  <div className="landing-notif-avatar" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>PB</div>
                  <div className="landing-notif-text">
                    <strong>Phoenix Baker</strong> <span>joined your ZenPay family</span>
                  </div>
                </div>
                <div className="landing-notif-card">
                  <div className="landing-notif-avatar" style={{ background: 'linear-gradient(135deg, #ec4899, #8b5cf6)' }}>LS</div>
                  <div className="landing-notif-text">
                    <strong>Lana Steiner</strong> <span>earned ₹500 cashback reward</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== PRICING ==================== */}
      <section className="landing-pricing" id="pricing">
        <div className="landing-container">
          <div className="landing-pricing-inner">
            {/* LEFT: Text */}
            <div className="landing-pricing-text">
              <p className="landing-pricing-label">Upgrade</p>
              <h2 className="landing-pricing-title">Pricing plans that scale</h2>
              <p className="landing-pricing-subtitle">
                Simple, transparent pricing that grows with you. Try any plan free for 30 days.
              </p>
            </div>

            {/* RIGHT: Cards */}
            <div className="landing-pricing-cards">
              {/* Basic Plan */}
              <div className="landing-pricing-card">
                <div className="landing-pricing-popular">
                  <span className="landing-pricing-popular-text">Most popular!</span>
                  <svg className="landing-pricing-popular-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 5v14" />
                    <path d="M5 12l7 7 7-7" />
                  </svg>
                </div>
                <div className="landing-pricing-price">₹799<span>/mth</span></div>
                <div className="landing-pricing-plan-name">Basic plan</div>
                <div className="landing-pricing-billed">Billed annually.</div>

                <ul className="landing-pricing-features">
                  <li>
                    <svg className="landing-pricing-check" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="12" fill="#22c55e" /><path d="M7 12.5l3 3 7-7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    Access to all basic features
                  </li>
                  <li>
                    <svg className="landing-pricing-check" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="12" fill="#22c55e" /><path d="M7 12.5l3 3 7-7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    Basic reporting and analytics
                  </li>
                  <li>
                    <svg className="landing-pricing-check" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="12" fill="#22c55e" /><path d="M7 12.5l3 3 7-7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    Up to 10 individual users
                  </li>
                  <li>
                    <svg className="landing-pricing-check" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="12" fill="#22c55e" /><path d="M7 12.5l3 3 7-7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    20 GB individual data
                  </li>
                  <li>
                    <svg className="landing-pricing-check" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="12" fill="#22c55e" /><path d="M7 12.5l3 3 7-7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    Basic chat and email support
                  </li>
                </ul>

                <Link to="/signup" className="landing-pricing-btn">Get started</Link>
              </div>

              {/* Business Plan */}
              <div className="landing-pricing-card">
                <div className="landing-pricing-price">₹1,599<span>/mth</span></div>
                <div className="landing-pricing-plan-name">Business plan</div>
                <div className="landing-pricing-billed">Billed annually.</div>

                <ul className="landing-pricing-features">
                  <li>
                    <svg className="landing-pricing-check" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="12" fill="#22c55e" /><path d="M7 12.5l3 3 7-7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    200+ integrations
                  </li>
                  <li>
                    <svg className="landing-pricing-check" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="12" fill="#22c55e" /><path d="M7 12.5l3 3 7-7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    Advanced reporting
                  </li>
                  <li>
                    <svg className="landing-pricing-check" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="12" fill="#22c55e" /><path d="M7 12.5l3 3 7-7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    Up to 20 individual users
                  </li>
                  <li>
                    <svg className="landing-pricing-check" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="12" fill="#22c55e" /><path d="M7 12.5l3 3 7-7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    40 GB individual data
                  </li>
                  <li>
                    <svg className="landing-pricing-check" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="12" fill="#22c55e" /><path d="M7 12.5l3 3 7-7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    Priority chat and email support
                  </li>
                </ul>

                <Link to="/signup" className="landing-pricing-btn">Get started</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== NEWSLETTER ==================== */}
      <section className="landing-newsletter" id="newsletter">
        <div className="landing-container">
          <div className="landing-newsletter-card">
            <div className="landing-newsletter-content">
              <h2>Be the first to know when we launch</h2>
              <p>We're still building. Subscribe for updates and 20% off when we launch. No spam, we promise!</p>
              <form className="landing-newsletter-form" onSubmit={e => e.preventDefault()}>
                <input type="email" className="landing-newsletter-input" placeholder="Enter your email" />
                <button type="submit" className="landing-btn-primary" style={{ padding: '0.8rem 1.5rem' }}>Subscribe</button>
              </form>
              <p className="landing-newsletter-hint">We care about your data in our <a href="#">privacy policy</a>.</p>
            </div>

            <div className="landing-dual-phones">
              <div className="landing-phone-sm">
                <div className="landing-phone-sm-screen" style={{ background: '#fafaff', padding: '24px 12px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    </div>
                    <div style={{ fontSize: '0.6rem', color: '#22c55e', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Success</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1a1a2e', marginTop: '4px' }}>₹2,500</div>
                    <div style={{ fontSize: '0.6rem', color: '#64648a', marginTop: '2px' }}>Sent to Olivia Rhye</div>
                  </div>
                  
                  <div style={{ width: '100%', background: '#ffffff', borderRadius: '8px', padding: '6px 8px', border: '1px solid #e8e8f0', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.5rem' }}>
                      <span style={{ color: '#9d9dba' }}>Bank</span>
                      <span style={{ color: '#1a1a2e', fontWeight: 600 }}>HDFC Bank</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.5rem' }}>
                      <span style={{ color: '#9d9dba' }}>Ref No.</span>
                      <span style={{ color: '#1a1a2e', fontWeight: 600 }}>#TXN-8492</span>
                    </div>
                  </div>
                  
                  <button style={{ width: '100%', padding: '5px', background: '#4f46e5', color: '#ffffff', border: 'none', borderRadius: '6px', fontSize: '0.55rem', fontWeight: 600, cursor: 'pointer' }}>
                    Done
                  </button>
                </div>
              </div>
              <div className="landing-phone-lg">
                <div className="landing-phone-lg-screen" style={{ background: '#ffffff', padding: '24px 12px 12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1a1a2e' }}>Spending</div>
                    <div style={{ fontSize: '0.55rem', color: '#4f46e5', fontWeight: 600 }}>This Month</div>
                  </div>
                  
                  <div style={{ background: '#f8fafc', borderRadius: '10px', padding: '8px', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.5rem', color: '#64648a' }}>Total Budget spent</div>
                    <div style={{ fontSize: '1rem', fontWeight: 800, color: '#1a1a2e', marginTop: '2px' }}>₹8,550.00</div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', marginTop: '4px' }}>
                      <span style={{ fontSize: '0.5rem', color: '#ef4444', fontWeight: 600 }}>↑ 12%</span>
                      <span style={{ fontSize: '0.45rem', color: '#9d9dba' }}>vs last month</span>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ fontSize: '0.55rem', fontWeight: 600, color: '#64648a' }}>Top Categories</div>
                    
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.5rem', marginBottom: '2px' }}>
                        <span style={{ color: '#1a1a2e', fontWeight: 500 }}>Food & Dining</span>
                        <span style={{ color: '#1a1a2e', fontWeight: 600 }}>₹4,250</span>
                      </div>
                      <div style={{ width: '100%', height: '4px', background: '#f0f0f5', borderRadius: '2px' }}>
                        <div style={{ width: '65%', height: '100%', background: '#ef4444', borderRadius: '2px' }} />
                      </div>
                    </div>

                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.5rem', marginBottom: '2px' }}>
                        <span style={{ color: '#1a1a2e', fontWeight: 500 }}>Shopping</span>
                        <span style={{ color: '#1a1a2e', fontWeight: 600 }}>₹2,800</span>
                      </div>
                      <div style={{ width: '100%', height: '4px', background: '#f0f0f5', borderRadius: '2px' }}>
                        <div style={{ width: '45%', height: '100%', background: '#6366f1', borderRadius: '2px' }} />
                      </div>
                    </div>

                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.5rem', marginBottom: '2px' }}>
                        <span style={{ color: '#1a1a2e', fontWeight: 500 }}>Travel</span>
                        <span style={{ color: '#1a1a2e', fontWeight: 600 }}>₹1,500</span>
                      </div>
                      <div style={{ width: '100%', height: '4px', background: '#f0f0f5', borderRadius: '2px' }}>
                        <div style={{ width: '25%', height: '100%', background: '#10b981', borderRadius: '2px' }} />
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop: 'auto', background: '#ece9ff', borderRadius: '8px', padding: '5px', textAlign: 'center', fontSize: '0.5rem', color: '#4f46e5', fontWeight: 600 }}>
                    💡 Saved ₹1,200 this week!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* ==================== FOOTER ==================== */}
      <footer className="landing-footer" id="footer">
        <div className="landing-container">
          <div className="landing-footer-top">
            <div className="landing-footer-brand">
              <div className="landing-footer-brand-logo">
                <div className="landing-nav-logo-icon">Z</div>
                <span className="landing-nav-logo-text">ZenPay</span>
              </div>
              <p>Smarter financial tools that create a better experience for everyone. Built with love in India.</p>
              <ul className="landing-footer-links">
                <li><a href="#features">Overview</a></li>
                <li><a href="#features">Features</a></li>
                <li><a href="#cta">Pricing</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Help</a></li>
                <li><a href="#">Privacy</a></li>
              </ul>
            </div>

            <div className="landing-footer-app">
              <p className="landing-footer-app-label">Get the app</p>
              <div className="landing-footer-app-btns">
                <a href="#" className="landing-footer-store-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  App Store
                </a>
                <a href="#" className="landing-footer-store-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 1.33c.576.334.576 1.038 0 1.372l-2.302 1.33-2.535-2.535 2.535-2.497zM5.864 3.471L16.8 9.804l-2.302 2.302-8.635-8.635z" />
                  </svg>
                  Google Play
                </a>
              </div>
            </div>
          </div>

          <div className="landing-footer-bottom">
            <p className="landing-footer-copy">© 2024 ZenPay. All rights reserved.</p>
            <div className="landing-footer-socials">
              {/* Twitter/X */}
              <a href="#" aria-label="Twitter">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="#" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              {/* Facebook */}
              <a href="#" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              {/* GitHub */}
              <a href="#" aria-label="GitHub">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </a>
              {/* Instagram */}
              <a href="#" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

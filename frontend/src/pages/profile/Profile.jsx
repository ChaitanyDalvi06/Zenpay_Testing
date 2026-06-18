import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  User,
  Phone,
  Briefcase,
  Calendar,
  ShieldCheck,
  ArrowLeft,
  Save,
  DollarSign,
  Heart
} from 'lucide-react';
import './Profile.css';

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    mobileNumber: '',
    occupation: '',
    monthlyIncome: '',
    monthlyExpenses: '',
    monthlySavings: 0,
    aadharCardNumber: Array(12).fill(''),
  });

  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
        const res = await fetch('http://localhost:8000/api/profile', { headers });
        if (res.ok) {
          const data = await res.json();
          if (data) {
            setFormData({
              firstName: data.firstName || '',
              lastName: data.lastName || '',
              age: data.age || '',
              mobileNumber: data.mobileNumber || '',
              occupation: data.occupation || '',
              monthlyIncome: data.monthlyIncome || '',
              monthlyExpenses: data.monthlyExpenses || '',
              monthlySavings: data.monthlySavings || 0,
              aadharCardNumber: Array.isArray(data.aadharCardNumber)
                ? data.aadharCardNumber
                : String(data.aadharCardNumber || '').split('').slice(0, 12),
            });
            return;
          }
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
      }

      // Do not prefill firstName and lastName from user auth/me to keep form empty for Selenium
      /*
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
              const nameParts = data.user.name.trim().split(' ');
              setFormData(prev => ({
                ...prev,
                firstName: nameParts[0] || '',
                lastName: nameParts.slice(1).join(' ') || '',
              }));
            }
          }
        } catch (err) {
          console.error('Error fetching user info:', err);
        }
      }
      */
    };

    fetchProfileData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('aadhar')) {
      const index = parseInt(name.split('-')[1], 10);
      const newAadhar = [...formData.aadharCardNumber];
      newAadhar[index] = value.slice(0, 1);  // Only allow one character
      setFormData({ ...formData, aadharCardNumber: newAadhar });
    } else {
      if (name === 'mobileNumber') {
        const cleaned = value.replace(/\D/g, '').slice(0, 10);
        setFormData(prev => {
          return { ...prev, mobileNumber: cleaned };
        });
      } else {
        setFormData((prevFormData) => {
          const updatedData = { ...prevFormData, [name]: value };

          if (name === 'monthlyIncome' || name === 'monthlyExpenses') {
            const income = parseFloat(updatedData.monthlyIncome) || 0;
            const expenses = parseFloat(updatedData.monthlyExpenses) || 0;
            updatedData.monthlySavings = income - expenses;
          }

          return updatedData;
        });
      }
    }
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
  
    // Log the form data to ensure it's correct
    console.log('Form Data:', formData);
  
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch('http://localhost:8000/api/profile', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          age: formData.age,
          mobileNumber: formData.mobileNumber,
          occupation: formData.occupation,
          monthlyIncome: formData.monthlyIncome,
          monthlyExpenses: formData.monthlyExpenses,
          monthlySavings: formData.monthlySavings,
          aadharCardNumber: formData.aadharCardNumber,
        }),
      });

      // Log the raw response text to inspect if it's HTML or JSON
      const responseText = await response.text();
      console.log('Response:', responseText);

      // Attempt to parse the response as JSON
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (error) {
        throw new Error('The response is not valid JSON.');
      }

      // Check if the response was successful
      if (!response.ok) {
        throw new Error(data.message || 'Failed to save profile');
      }
  
      console.log('Profile Updated:', data);
      toast.success('Profile updated successfully!');
      navigate('/dashboard'); 
    } catch (error) {
      console.error('Error:', error.message);
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <div className="profile-page-wrapper">
      <div className="profile-container">
        
        {/* Banner header */}
        <div className="profile-header-card">
          <div className="profile-avatar-large">
            <User size={28} />
          </div>
          <div className="profile-title-text">
            <h2>Financial Identity Profile</h2>
            <p>Define your credentials, occupation, and monthly budget parameters to personalize ZenPay algorithms.</p>
          </div>
        </div>

        <form onSubmit={handleSaveChanges} className="profile-form">
          
          {/* Section 1: Personal Credentials */}
          <div>
            <div className="form-section-title">Personal Credentials</div>
            <div className="form-fields-grid">
              
              {/* First Name */}
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <div className="input-with-icon">
                  <User size={16} className="input-icon-left" />
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Jane"
                    className="input-box"
                  />
                </div>
              </div>

              {/* Last Name */}
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <div className="input-with-icon">
                  <User size={16} className="input-icon-left" />
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Doe"
                    className="input-box"
                  />
                </div>
              </div>

              {/* Age */}
              <div className="form-group">
                <label htmlFor="age">Age (Years)</label>
                <div className="input-with-icon">
                  <Calendar size={16} className="input-icon-left" />
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    min="18"
                    required
                    placeholder="e.g. 26"
                    className="input-box"
                  />
                </div>
              </div>

              {/* Mobile Number */}
              <div className="form-group">
                <label htmlFor="mobileNumber">Mobile Number</label>
                <div className="input-with-icon">
                  <Phone size={16} className="input-icon-left" />
                  <input
                    type="text"
                    id="mobileNumber"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    required
                    pattern="[0-9]{10}"
                    title="Mobile number should be exactly 10 digits"
                    placeholder="e.g. 9876543210"
                    className="input-box"
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Section 2: Budgeting & Occupation */}
          <div>
            <div className="form-section-title">Occupation & Financial Parameters</div>
            <div className="form-fields-grid">

              {/* Occupation */}
              <div className="form-group">
                <label htmlFor="occupation">Occupation</label>
                <div className="input-with-icon">
                  <Briefcase size={16} className="input-icon-left" />
                  <select
                    id="occupation"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    required
                    className="input-box"
                  >
                    <option value="">Select Occupation</option>
                    <option value="Student">Student</option>
                    <option value="Job holder">Job holder</option>
                    <option value="Business professional">Business professional</option>
                  </select>
                </div>
              </div>

              {/* Monthly Income */}
              <div className="form-group">
                <label htmlFor="monthlyIncome">Monthly Income (INR)</label>
                <div className="input-with-icon">
                  <span className="currency-icon-left">₹</span>
                  <input
                    type="number"
                    id="monthlyIncome"
                    name="monthlyIncome"
                    value={formData.monthlyIncome}
                    onChange={handleChange}
                    required
                    placeholder="e.g. 45000"
                    className="input-box"
                  />
                </div>
              </div>

              {/* Monthly Expenses */}
              <div className="form-group">
                <label htmlFor="monthlyExpenses">Monthly Expenses (INR)</label>
                <div className="input-with-icon">
                  <span className="currency-icon-left">₹</span>
                  <input
                    type="number"
                    id="monthlyExpenses"
                    name="monthlyExpenses"
                    value={formData.monthlyExpenses}
                    onChange={handleChange}
                    required
                    placeholder="e.g. 20400"
                    className="input-box"
                  />
                </div>
              </div>

              {/* Monthly Savings Display Card */}
              <div className="form-group">
                <label>Calculated Net Savings</label>
                <div className="savings-display-box">
                  <span className="currency-icon-left" style={{ position: 'static', color: '#059669' }}>₹</span>
                  <div>
                    <span>Monthly Savings Output</span>
                    <strong>₹ {parseFloat(formData.monthlySavings || 0).toLocaleString()}</strong>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Section 3: Identity Verification */}
          <div className="aadhar-fields-container">
            <div className="aadhar-group-label-row">
              <div className="form-section-title" style={{ border: 'none', padding: '0', margin: '0' }}>Aadhar Card Verification</div>
              <div className="secure-badge">
                <ShieldCheck size={14} />
                <span>Encrypted Sandbox Storage</span>
              </div>
            </div>
            
            <div className="aadhar-input-group">
              {formData.aadharCardNumber.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  name={`aadhar-${index}`}
                  value={digit}
                  onChange={(e) => {
                    const { value } = e.target;
                    if (value.match(/^\d?$/)) { // Allow only one digit (0-9)
                      const newAadhar = [...formData.aadharCardNumber];
                      newAadhar[index] = value;
                      setFormData({ ...formData, aadharCardNumber: newAadhar });

                      // Automatically move focus to the next input
                      if (value && index < 11) {
                        e.target.nextSibling.focus();
                      }
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" && !formData.aadharCardNumber[index] && index > 0) {
                      e.target.previousSibling.focus();
                    }
                  }}
                  maxLength="1"
                  className={`aadhar-input-box ${(index === 3 || index === 7) ? 'margin-group' : ''}`}
                />
              ))}
            </div>
          </div>

          {/* Form Actions */}
          <div className="profile-actions-row">
            <button
              type="button"
              className="profile-back-btn"
              onClick={() => navigate('/')}
            >
              <ArrowLeft size={16} />
              <span>Back</span>
            </button>
            <button type="submit" className="profile-submit-btn">
              <Save size={16} />
              <span>Save Changes</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default ProfileForm;

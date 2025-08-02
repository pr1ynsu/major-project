import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
    vehicle: "",
    license: "",
    age: "",
    guardianName: "",
    guardianNumber: "",
    userType: "User",
    password: "",
    confirmPassword: "",
    agreeRules: false,
    agreeMonitoring: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agreeRules || !formData.agreeMonitoring) {
      alert("Please agree to all terms before signing up.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    navigate("/login/user");
  };

  return (
    <div className="signup-page">
      {/* Background Video */}
      <video autoPlay loop muted className="bg-video">
        <source src="/bg-video.mp4" type="video/mp4" />
      </video>

      {/* Blur Overlay */}
      <div className="overlay"></div>

      {/* Two-column layout */}
      <div className="signup-container">
        {/* Left - Why Choose Us */}
        <div className="info-box">
          <h2>Why Choose Us?</h2>
          <p>
            🚦 Join our Chalan Service to make roads safer!  
            ✅ Earn rewards for following traffic rules.  
            ⚡ Get notified of violations instantly.  
            🎯 Keep your driving record clean and win incentives.
          </p>
          <p>
            By signing up, you’re becoming a part of a community working 
            towards safe, smart, and responsible driving.
          </p>
           <h2>Why Choose Us?</h2>
  <p>🚦 Make roads safer by joining a responsible community.</p>
  <p>✅ Earn rewards for following traffic rules.</p>
  <p>⚡ Instant alerts for violations.</p>

  <h3 style={{ marginTop: "1rem", color: "#E3D095" }}>Incentives for You:</h3>
  <ul>
    <li>🏆 Cashback rewards for safe driving.</li>
    <li>🎯 Discount on penalties when you report violations.</li>
    <li>🌟 Priority support & premium features.</li>
  </ul>
        </div>

        {/* Right - Signup Form */}
        <form className="signup-box" onSubmit={handleSubmit}>
          <h2>Create Account</h2>

          <input name="name" placeholder="Full Name" onChange={handleChange} required />
          <input name="mobile" placeholder="Mobile Number" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email ID" onChange={handleChange} required />
          <input name="address" placeholder="Address" onChange={handleChange} required />
          <input name="vehicle" placeholder="Registered Vehicle Number" onChange={handleChange} required />
          <input name="license" placeholder="Driving License Number" onChange={handleChange} required />
          <input name="age" type="number" placeholder="Age" onChange={handleChange} required />
          <input name="guardianName" placeholder="Guardian Name" onChange={handleChange} />
          <input name="guardianNumber" placeholder="Guardian Number" onChange={handleChange} />

          <select name="userType" onChange={handleChange} value={formData.userType}>
            <option value="Government">Government</option>
            <option value="User">User</option>
            <option value="Developer">Developer</option>
          </select>

          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required />

          {/* Agreements */}
          <label>
            <input type="checkbox" name="agreeRules" checked={formData.agreeRules} onChange={handleChange} />
            I agree to follow traffic rules and accept penalties for violations.
          </label>
          <label>
            <input type="checkbox" name="agreeMonitoring" checked={formData.agreeMonitoring} onChange={handleChange} />
            I agree to allow my activity to be monitored for rewards & penalties.
          </label>

          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

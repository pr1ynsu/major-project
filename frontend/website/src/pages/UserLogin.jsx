import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserLogin.css";

export default function UserLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false); // Track wrong login

  const handleLogin = () => {
    // Pseudo authentication
    if (email === "test@example.com" && password === "12345") {
      navigate("/chalan");
    } else {
      setLoginError(true); // Show error
    }
  };

  return (
    <div className="login-page">
      {/* Background Video */}
      <video autoPlay loop muted className="bg-video">
        <source src="/bg-video.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="overlay"></div>

      {/* Login Box */}
      <div className="login-box">
        <h2>User Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>

        {/* Show error message with links if wrong login */}
        {loginError && (
          <div className="error-message">
            <p>Incorrect password!</p>
            <div className="error-links">
              <span onClick={() => navigate("/forgot-password")}>
                Forgot Password?
              </span>
              <span onClick={() => navigate("/signup")}>
                Register Now
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

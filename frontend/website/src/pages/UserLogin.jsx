import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserLogin.css";

export default function UserLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // ✅ Save user to localStorage
        localStorage.setItem("loggedInUser", JSON.stringify(data.user));

        // ✅ Automatically redirect without alert
        navigate("/chalan");
      } else {
        setLoginError(true);
      }
    } catch (error) {
      console.error("Login Error:", error);
      setLoginError(true);
    }
  };

  return (
    <div className="login-page">
      <video autoPlay loop muted className="bg-video">
        <source src="/bg-video.mp4" type="video/mp4" />
      </video>

      <div className="overlay"></div>

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

        {loginError && (
          <div className="error-message">
            <p>Incorrect email or password.</p>
            <div className="error-links">
              <span onClick={() => navigate("/forgot-password")}>Forgot Password?</span>
              <span onClick={() => navigate("/signup")}>Register Now</span>
            </div>
          </div>
        )}

        <div className="register-prompt">
          <p>
            New here? <span onClick={() => navigate("/signup")}>Register Now</span>
          </p>
        </div>
      </div>
    </div>
  );
}

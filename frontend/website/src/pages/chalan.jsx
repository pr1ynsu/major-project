import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Chalan() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user from localStorage
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      alert("Please login first");
      navigate("/login/user");
    }
  }, [navigate]);

  if (!user) return null;

  return (
    <div style={{ padding: "20px", color: "#fff", background: "#013220", height: "100vh" }}>
      <h1>🚦 Welcome to Chalan Page</h1>
      <h2>{user.name}</h2>
      <p><b>Vehicle:</b> {user.vehicle}</p>
      <p><b>License:</b> {user.license}</p>
      <p><b>Email:</b> {user.email}</p>
      <p><b>Mobile:</b> {user.mobile}</p>

      <h3 style={{ marginTop: "20px" }}>📄 Outstanding Dues: ₹0</h3>
      <h3>🏆 Rewards: 2</h3>
      <h3>⚠️ Fines: ₹0</h3>
    </div>
  );
}

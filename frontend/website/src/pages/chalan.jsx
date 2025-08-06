import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Chalan() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
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
    <div style={{ padding: "20px", backgroundColor: "#013220", color: "white", height: "100vh" }}>
      <h1>🚦 Welcome, {user.name}</h1>
      <p><strong>Vehicle:</strong> {user.vehicle}</p>
      <p><strong>License:</strong> {user.license}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Mobile:</strong> {user.mobile}</p>

      <h3 style={{ marginTop: "20px" }}>📄 Outstanding Dues: ₹0</h3>
      <h3>🏆 Rewards: 2</h3>
      <h3>⚠️ Fines: ₹0</h3>
    </div>
  );
}

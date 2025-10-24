import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Chalan() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [chalans, setChalans] = useState([]);

  // Check user login
  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    } else {
      alert("Please login first");
      navigate("/login/user");
    }
  }, [navigate]);

  // Fetch chalans using vehicle number
  useEffect(() => {
    const fetchChalans = async () => {
      // Corrected URL: Use port 5000 for Node.js and the correct endpoint
      if (user?.vehicle) {
        try {
          const res = await axios.get(`http://localhost:5000/api/violation/${user.vehicle}`);
          setChalans(res.data);
        } catch (error) {
          console.error("Failed to fetch chalans", error);
        }
      }
    };

    if (user) {
      fetchChalans();
    }
  }, [user]);

  if (!user) return null;

  return (
    <div style={{ padding: "20px", backgroundColor: "#013220", color: "white", minHeight: "100vh" }}>
      <h1>🚦 Welcome, {user.name}</h1>
      <p><strong>Vehicle:</strong> {user.vehicle}</p>
      <p><strong>License:</strong> {user.license}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Mobile:</strong> {user.mobile}</p>

      <h2 style={{ marginTop: "30px" }}>📋 Your Chalans</h2>
      {chalans.length === 0 ? (
        <p>No chalans found</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {chalans.map((c, i) => (
            <li key={i} style={{ backgroundColor: "#026440", margin: "20px 0", padding: "15px", borderRadius: "8px" }}>
              <img src={c.imageUrl} alt="Vehicle" width="300" style={{ borderRadius: "8px" }} />
              <p><strong>Violation:</strong> {c.violationType}</p>
              <p><strong>Date:</strong> {new Date(c.dateTime).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
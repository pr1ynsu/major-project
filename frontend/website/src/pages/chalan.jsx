import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Chalan() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [chalans, setChalans] = useState([]);

  // Load user from localStorage
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

  // Fetch chalans using license number
  useEffect(() => {
    const fetchChalans = async () => {
<<<<<<< HEAD
      // Corrected URL: Use port 5000 for Node.js and the correct endpoint
      if (user?.vehicle) {
=======
      if (user?.license) {
>>>>>>> 0c6380dbaeb3f169e85c27e4418a8b0e76501442
        try {
          const res = await axios.get(`http://localhost:5000/api/violations/license/${user.license}`);
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
      <div style={{ marginBottom: "20px" }}>
        <p><strong>Vehicle:</strong> {user.vehicle}</p>
        <p><strong>License:</strong> {user.license}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Mobile:</strong> {user.mobile}</p>
      </div>

      <h2>📋 Your Chalans</h2>
      {chalans.length === 0 ? (
        <p>No chalans found</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {chalans.map((c, i) => (
            <li
              key={i}
              style={{
                backgroundColor: "#026440",
                margin: "20px 0",
                padding: "15px",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
              }}
            >
              {c.image && (
                <img
                  src={`http://localhost:5000/uploads/${c.image}`}
                  alt="Violation"
                  width="300"
                  style={{ borderRadius: "8px", marginBottom: "10px" }}
                />
              )}
              <p><strong>Violation Type:</strong> {c.violation_type}</p>
              <p><strong>Date:</strong> {new Date(c.timestamp).toLocaleString()}</p>
              <p><strong>Vehicle:</strong> {c.vehicle}</p>
              <p><strong>License:</strong> {c.license}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
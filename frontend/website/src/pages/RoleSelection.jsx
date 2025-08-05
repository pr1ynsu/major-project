import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./RoleSelection.css";

export default function RoleSelection() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="role-selection">
      
      {/* Floating Menu Button */}
      <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>

      {/* Slide-out Nav */}
      <div className={`nav-menu ${menuOpen ? "open" : ""}`}>
        <ul>
          <li onClick={() => navigate("/")}>Home</li>
          <li onClick={() => navigate("/about")}>About</li>
          <li onClick={() => navigate("/gallery")}>Gallery</li>
          <li onClick={() => navigate("/contact")}>Contact</li>
        </ul>
      </div>

      {/* Title */}
      <h1>Choose Your Role</h1>

      {/* Role Circles */}
      <div className="roles">
        <div
          className="role-circle"
          onClick={() => navigate("/login/government")}
        >
          Government
        </div>
        <div
          className="role-circle"
          onClick={() => navigate("/login/user")}
        >
          User
        </div>
        <div
          className="role-circle"
          onClick={() => navigate("/login/developer")}
        >
          Developer
        </div>
      </div>
    </div>
  );
}

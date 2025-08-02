import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isHomePage = location.pathname === "/";

  return (
    <>
      {/* Full Navbar - Only on Home */}
      {isHomePage && (
        <nav className="navbar">
          <div className="navbar-top">
            <div className="logo-container">
              <img src="/logo.jpg" alt="Logo" className="logo" />
            </div>
            <Link to="/login">
              <button className="login-btn">Sign Up / Log In</button>
            </Link>
          </div>

          <div className="navbar-links">
            <ul>
              <li><Link to="/">HOME</Link></li>
              <li><a href="#">ABOUT</a></li>
              <li><a href="#">BLOG</a></li>
              <li><a href="#">PARTNER</a></li>
              <li><Link to="/gallery">GALLERY</Link></li>
              <li><a href="#">COMMUNITY</a></li>
              <li><Link to="/contact">CONTACT</Link></li>
            </ul>
          </div>
        </nav>
      )}

      {/* Floating Circle Menu - All other pages */}
      {!isHomePage && (
        <div className="floating-menu">
          <div className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>☰</div>
          {menuOpen && (
            <div className="menu-items">
              <Link to="/" onClick={() => setMenuOpen(false)}>HOME</Link>
              <Link to="/gallery" onClick={() => setMenuOpen(false)}>GALLERY</Link>
              <Link to="/contact" onClick={() => setMenuOpen(false)}>CONTACT</Link>
              <a href="#">ABOUT</a>
              <a href="#">BLOG</a>
              <a href="#">PARTNER</a>
              <a href="#">COMMUNITY</a>
            </div>
          )}
        </div>
      )}
    </>
  );
}

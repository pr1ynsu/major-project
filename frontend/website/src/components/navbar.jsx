import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      {/* Top Header Row */}
      <div className="navbar-top">
        {/* Logo */}
        <div className="logo-container">
          <img src="/logo.jpg" alt="Logo" className="logo" />
        </div>

        {/* Sign up / Log in */}
        <Link to="/login">
          <button className="login-btn">
            Sign Up / Log In
          </button>
        </Link>
      </div>

      {/* Nav Links */}
      <div className="navbar-links">
        <ul>
          <li><a href="#">HOME</a></li>
          <li><a href="#">ABOUT</a></li>
          <li><a href="#">BLOG</a></li>
          <li><a href="#">PARTNER</a></li>
          <li><a href="#">GALLERY</a></li>
          <li><a href="#">COMMUNITY</a></li>
          <li><Link to="/contact">CONTACT</Link></li>
        </ul>
      </div>
    </nav>
  );
}

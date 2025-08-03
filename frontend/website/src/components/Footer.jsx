import { Link, useLocation } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  const location = useLocation();

  // Paths where footer should NOT be shown
  const hideFooterPaths = [
    "/login",
    "/login/government",
    "/login/user",
    "/login/developer",
    "/signup"
  ];

  // Hide footer on login/signup pages
  if (hideFooterPaths.includes(location.pathname)) return null;

  return (
    <footer className="footer">
      <div className="footer-main">
        {/* Left Section: Logo & Description */}
        <div className="footer-section footer-logo-section">
          <img src="/logo.jpg" alt="CityWatch Logo" className="footer-logo-img" />
          <p className="footer-desc">
            CityWatch Technologies is dedicated to creating transparent, 
            innovative, and citizen-friendly solutions for urban management. 
            Our platform bridges the gap between citizens and authorities, 
            ensuring efficiency, accountability, and a safer community.
          </p>
        </div>

        {/* Middle Section: Quick Links */}
        <div className="footer-section">
          <h3>QUICK LINKS</h3>
          <ul>
            <li><Link to="/">HOME</Link></li>
            <li><a href="#about">ABOUT</a></li>
            <li><Link to="/blog">BLOG</Link></li>
            <li><a href="#partner">PARTNER</a></li>
            <li><Link to="/gallery">GALLERY</Link></li>
            <li><a href="#community">COMMUNITY</a></li>
            <li><Link to="/contact">CONTACT</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h3>CONTACT INFO</h3>
          <p>KIIT University<br/>School of Computer Science</p>
          <p><a href="mailto:contact@gmail.com">contact@gmail.com</a></p>
          <p>+91 1122334455</p>
        </div>

        {/* Social Links */}
        <div className="footer-section">
          <h3>FOLLOW US ON</h3>
          <div className="footer-icons">
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-medium"></i></a>
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-youtube"></i></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>COPYRIGHT CITYWATCH TECHNOLOGIES 2025. ALL RIGHTS RESERVED</p>
        <div className="footer-policies">
          <Link to="#">Privacy Policy</Link>
          <Link to="#">Annual Return</Link>
          <Link to="#">Posh Policy</Link>
        </div>
      </div>
    </footer>
  );
}

import { Link, useLocation } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  const location = useLocation();

  const hideFooterPaths = [
    "/login",
    "/login/government",
    "/login/user",
    "/login/developer",
    "/signup",
  ];

  if (hideFooterPaths.includes(location.pathname)) return null;

  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-section footer-logo-section">
          <img src="/logo.jpg" alt="CityWatch Logo" className="footer-logo-img" />
          <p className="footer-desc">
            CityWatch Technologies is dedicated to creating transparent,
            innovative, and citizen-friendly solutions for urban management.
            Our platform bridges the gap between citizens and authorities,
            ensuring efficiency, accountability, and a safer community.
          </p>
        </div>

        <div className="footer-section">
          <h3>QUICK LINKS</h3>
          <ul>
            <li><Link to="/" onClick={() => window.scrollTo(0, 0)}>HOME</Link></li>
            <li><Link to="/About" onClick={() => window.scrollTo(0, 0)}>ABOUT</Link></li> 
            <li><Link to="/Partner" onClick={() => window.scrollTo(0, 0)}>PARTNER</Link></li>
            <li><Link to="/gallery" onClick={() => window.scrollTo(0, 0)}>GALLERY</Link></li>
            <li><Link to="/Forum" onClick={() => window.scrollTo(0, 0)}>COMMUNITY</Link></li>
            <li><Link to="/contact" onClick={() => window.scrollTo(0, 0)}>CONTACT</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>CONTACT INFO</h3>
          <p>KIIT University<br />School of Computer Science</p>
          <p><a href="mailto:contact@gmail.com">contact@gmail.com</a></p>
          <p>+91 1122334455</p>
        </div>

        <div className="footer-section">
          <h3>FOLLOW US ON</h3>
          <div className="footer-icons">
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-medium"></i></a>
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-youtube"></i></a>
          </div>
        </div>
      </div>

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

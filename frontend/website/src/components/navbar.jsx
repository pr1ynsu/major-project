import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "./Navbar.css";

export default function Navbar() {
  const location = useLocation();
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    function handleScroll() {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current) {
        // Scrolling down → hide navbar
        setShowNavbar(false);
      } else {
        // Scrolling up → show navbar
        setShowNavbar(true);
      }

      lastScrollY.current = currentScrollY;
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {isHomePage && (
        <nav className={`navbar ${showNavbar ? "navbar-visible" : "navbar-hidden"}`}>
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
            <li><Link to="/About">ABOUT</Link></li>
            <li><Link to="/blog">BLOG</Link></li>
            <li><Link to="/Partner">PARTNER</Link></li>
            <li><Link to="/gallery">GALLERY</Link></li>
            <li><Link to="/Forum">COMMUNITY</Link></li>
            <li><Link to="/contact">CONTACT</Link></li>
            </ul>
          </div>
        </nav>
      )}
    </>
  );
}

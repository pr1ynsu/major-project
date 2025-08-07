import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home"; 
import RoleSelection from "./pages/RoleSelection";
import GovernmentLogin from "./pages/GovernmentLogin";
import UserLogin from "./pages/UserLogin";
import DeveloperLogin from "./pages/DeveloperLogin";
import Signup from "./pages/Signup";
import ContactPage from "./pages/Contact"; 
import Gallery from "./pages/Gallery";
import Chalan from "./pages/Chalan";
import Forum from "./pages/Forum";
import About from "./pages/About";
import Partner from "./pages/Partner";

// Chalan Page
function ChalanPage() {
  return (
    <div className="flex items-center justify-center h-screen text-3xl text-white bg-green-600">
      Welcome to Chalan Page 
    </div>
  );
}

function AppWrapper() {
  const location = useLocation();

  // Navbar should be shown
  const navbarPaths = ["/"];

  // Footer should be hidden
  const hideFooterPaths = [
    "/login",
    "/login/government",
    "/login/user",
    "/login/developer",
    "/signup"
  ];

  return (
    <>
      {/* Show Navbar only on Home */}
      {navbarPaths.includes(location.pathname) && <Navbar />}

      <Routes>
        {/* Home now contains Hero, About, Blog, Partner, Contact */}
        <Route path="/" element={<Home />} />  

        <Route path="/login" element={<RoleSelection />} />
        <Route path="/login/government" element={<GovernmentLogin />} />
        <Route path="/login/user" element={<UserLogin />} />
        <Route path="/login/developer" element={<DeveloperLogin />} />
        <Route path="/chalan" element={<ChalanPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/chalan" element={<Chalan />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/About" element={<About />} />
        <Route path="/partner" element={<Partner />} />
      </Routes>

      {/* Footer on all except login/signup */}
      {!hideFooterPaths.includes(location.pathname) && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

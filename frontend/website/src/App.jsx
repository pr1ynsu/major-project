import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import RoleSelection from "./pages/RoleSelection";
import GovernmentLogin from "./pages/GovernmentLogin";
import UserLogin from "./pages/UserLogin";
import DeveloperLogin from "./pages/DeveloperLogin";
import Signup from "./pages/Signup"; 

// Temporary page for Chalan redirection
function ChalanPage() {
  return (
    <div className="flex items-center justify-center h-screen text-3xl text-white bg-green-600">
      Welcome to Chalan Page ✅
    </div>
  );
}

function AppWrapper() {
  const location = useLocation();

  // Paths where navbar should be hidden
  const hideNavbarPaths = [
    "/login",
    "/login/government",
    "/login/user",
    "/login/developer",
    "/signup" // ✅ Hide navbar on signup page too
  ];

  return (
    <>
      {/* Show Navbar only if path is NOT in hideNavbarPaths */}
      {!hideNavbarPaths.includes(location.pathname) && <Navbar />}

      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Hero />} />
        
        {/* Role Selection & Login Pages */}
        <Route path="/login" element={<RoleSelection />} />
        <Route path="/login/government" element={<GovernmentLogin />} />
        <Route path="/login/user" element={<UserLogin />} />
        <Route path="/login/developer" element={<DeveloperLogin />} />
        
        {/* Chalan Page after successful login */}
        <Route path="/chalan" element={<ChalanPage />} />
        
        {/* Signup Page */}
        <Route path="/signup" element={<Signup />} /> {/* ✅ Real Signup Page */}
      </Routes>
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

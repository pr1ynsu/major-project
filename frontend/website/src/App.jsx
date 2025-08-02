import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/Footer";
import Hero from "./components/hero";
import RoleSelection from "./pages/RoleSelection";
import GovernmentLogin from "./pages/GovernmentLogin";
import UserLogin from "./pages/UserLogin";
import DeveloperLogin from "./pages/DeveloperLogin";
import Signup from "./pages/Signup"; 

// Temporary page for Chalan redirection
function ChalanPage() {
  return (
    <div className="flex items-center justify-center h-screen text-3xl text-white bg-green-600">
      Welcome to Chalan Page 
    </div>
  );
}

function AppWrapper() {
  const location = useLocation();

  // Paths where navbar & footer should be hidden
  const hidePaths = [
    "/login",
    "/login/government",
    "/login/user",
    "/login/developer",
    "/signup"
  ];

  return (
    <>
      {/* Navbar */}
      {!hidePaths.includes(location.pathname) && <Navbar />}

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
        <Route path="/signup" element={<Signup />} /> 
      </Routes>

      {/* Footer */}
      {!hidePaths.includes(location.pathname) && <Footer />}
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

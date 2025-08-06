import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

<<<<<<< HEAD
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        // ✅ Save token in localStorage
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("username", formData.username);

        setMessage(`✅ Login Successful!`);
        
        // Redirect to forum page
        navigate("/forum");
      } else {
        setMessage(`❌ ${data.error}`);
      }
    } catch (error) {
      setMessage("❌ Network Error");
=======
  const handleLogin = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok && data.success) {
      alert(data.message);
      localStorage.setItem("loggedInUser", JSON.stringify(data.user)); // Save user
      navigate("/chalan");
    } else {
      setLoginError(true);
      alert(data.message);
>>>>>>> 6af296c55be4b03704913233ba59210e297dac27
    }
  } catch (error) {
    console.error("Login Error:", error);
    alert("Something went wrong.");
  }
};



  return (
    <div style={{ padding: "20px", color: "white" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", maxWidth: "300px" }}>
        <input type="text" name="username" placeholder="Username" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        <button type="submit">Login</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

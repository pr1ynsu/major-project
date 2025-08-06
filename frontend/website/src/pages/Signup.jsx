import { useState } from "react";

export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    full_name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
<<<<<<< HEAD
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/auth/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(`✅ Registered Successfully! Token: ${data.token}`);
      } else {
        setMessage(`❌ Error: ${JSON.stringify(data)}`);
      }
    } catch (error) {
      setMessage("❌ Network Error");
    }
  };
=======
  e.preventDefault();
  if (!formData.agreeRules || !formData.agreeMonitoring) {
    alert("Please agree to all terms before signing up.");
    return;
  }
  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  const res = await fetch("http://localhost:5000/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const data = await res.json();
  if (res.ok) {
    alert(data.message);
    navigate("/login/user");
  } else {
    alert(data.message);
  }
};

>>>>>>> 6af296c55be4b03704913233ba59210e297dac27

  return (
    <div style={{ padding: "20px", color: "white" }}>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", maxWidth: "300px" }}>
        <input type="text" name="username" placeholder="Username" onChange={handleChange} />
        <input type="text" name="full_name" placeholder="Full Name" onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        <button type="submit">Register</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

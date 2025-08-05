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

import { useState, useEffect } from "react";

export default function Forum() {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  useEffect(() => {
    fetch("http://localhost:5000/api/forum/messages")
      .then((res) => res.json())
      .then((data) => setMessages(data));
  }, []);

  const postMessage = async () => {
    if (!newMsg.trim()) return;
    const res = await fetch("http://localhost:5000/api/forum/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: user.email, message: newMsg }),
    });
    const data = await res.json();
    if (data.success) {
      setMessages([...messages, data.newMessage]);
      setNewMsg("");
    } else {
      alert(data.message);
    }
  };

  return (
    <div style={{ background: "#013220", color: "white", minHeight: "100vh", padding: "20px" }}>
      <h1>💬 Forum</h1>
      <textarea
        value={newMsg}
        onChange={(e) => setNewMsg(e.target.value)}
        placeholder="Write your message..."
        style={{ width: "100%", padding: "10px", borderRadius: "8px" }}
      />
      <button onClick={postMessage} style={{ marginTop: "10px", padding: "8px 16px", backgroundColor: "#2E8B57", border: "none", color: "white", borderRadius: "5px" }}>
        Post
      </button>

      <div style={{ marginTop: "20px" }}>
        {messages.map((msg) => (
          <div key={msg.id} style={{ background: "#1A472A", padding: "10px", margin: "10px 0", borderRadius: "8px" }}>
            <strong>{msg.name}</strong> <span style={{ fontSize: "0.8em", color: "#bbb" }}>({msg.time})</span>
            <p>{msg.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

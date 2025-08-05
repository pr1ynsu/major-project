import { useEffect, useState, useRef } from "react";

export default function Forum() {
  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role"); // ✅ Store user role from login
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const wsRef = useRef(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    // ✅ Create WebSocket connection
    const ws = new WebSocket("ws://127.0.0.1:8000/ws/forum/");
    wsRef.current = ws;

    // ✅ Listen for incoming messages
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setMessages((prev) => [...prev, data]);
    };

    // ✅ Cleanup when component unmounts
    return () => ws.close();
  }, []);

  // ✅ Scroll to latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (message.trim()) {
      wsRef.current.send(
        JSON.stringify({
          message: message,
          username: username,
          role: role, // Send role along with message
        })
      );
      setMessage("");
    }
  };

  return (
    <div style={{ padding: "20px", color: "white", maxWidth: "600px", margin: "auto" }}>
      <h2 style={{ textAlign: "center" }}>Forum Chat</h2>

      {/* Chat Box */}
      <div style={{
        border: "1px solid white",
        padding: "10px",
        height: "300px",
        overflowY: "auto",
        backgroundColor: "rgba(0,0,0,0.4)",
        borderRadius: "10px",
        marginBottom: "10px"
      }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ marginBottom: "8px" }}>
            <strong style={{ color: "#E3D095" }}>
              {msg.username}
            </strong>
            <span style={{
              fontSize: "10px",
              backgroundColor: msg.role === "government" ? "red" :
                               msg.role === "developer" ? "blue" : "green",
              color: "white",
              padding: "2px 5px",
              borderRadius: "5px",
              marginLeft: "5px"
            }}>
              {msg.role?.toUpperCase()}
            </span>
            : <span>{msg.message}</span>
          </div>
        ))}
        <div ref={chatEndRef}></div>
      </div>

      {/* Input Box */}
      <div style={{ display: "flex", gap: "5px" }}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
          style={{
            flex: 1,
            padding: "8px",
            borderRadius: "5px",
            border: "none",
            outline: "none"
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            backgroundColor: "#E3D095",
            border: "none",
            padding: "8px 15px",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

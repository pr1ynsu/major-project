import { useState } from "react";
import emailjs from "emailjs-com";
import "./Contact.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("Sending...");

    emailjs
      .send(
        "service_lmtlbco",  // From EmailJS dashboard
        "template_os603jg", // From EmailJS template
        formData,
        "YUXqWTkLf7w6dJvyBd"   // From EmailJS account
      )
      .then(
        () => {
          setStatus("✅ Message Sent Successfully!");
          setFormData({ name: "", email: "", subject: "", message: "" });
        },
        () => {
          setStatus("❌ Failed to Send. Try Again.");
        }
      );
  };

  return (
    <div className="contact-page">
      {/* Background Video */}
      <video autoPlay loop muted className="bg-video">
        <source src="/bg-video.mp4" type="video/mp4" />
      </video>
      <div className="overlay"></div>

      <div className="contact-container">
        {/* Left Side Info */}
        <div className="info-box">
          <h2>Contact Us</h2>
          <p>We’d love to hear from you! Report issues, share feedback, or ask questions.</p>
          <p><strong>Email:</strong> support@citywatch.com</p>
          <p><strong>Phone:</strong> +91-9876543210</p>
        </div>

        {/* Right Side Form */}
        <form className="form-box" onSubmit={sendEmail}>
          <h2>Send a Message</h2>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          >
            <option value="">Select Subject</option>
            <option value="Feedback">Feedback</option>
            <option value="Bug Report">Bug Report</option>
            <option value="General Query">General Query</option>
          </select>
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit">Send</button>
          <p className="status">{status}</p>
        </form>
      </div>
    </div>
  );
}

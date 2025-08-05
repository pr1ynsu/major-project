import React from "react";
import Hero from "../components/hero";
import About from "./About";
import Blog from "./Blog"; // Pinterest-style blog section
import Partner from "./Partner"; // Create later
import ContactSection from "./Contact"; // Contact section for scroll

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Blog />
      <Partner />
      <ContactSection />
    </>
  );
}

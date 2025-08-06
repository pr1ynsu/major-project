import React from "react";
import About from "../pages/About";


export default function Hero() {
  return (
    <>
      {/* Hero Section */}
      <section
        id="home"
        className="relative w-full h-[80vh] flex flex-col justify-center items-center text-white"
      >
        {/* Background Video */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          src="/bg-video.mp4"
          autoPlay
          loop
          muted
          playsInline
        ></video>

        {/* Overlay for readability */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10"></div>

        {/* Hero Content */}
        <div className="relative z-20 text-center px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to Our Platform
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            A modern, transparent, and efficient solution for managing challans
            and streamlining communication.
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 z-20">
          <a href="/About">
            <div className="animate-bounce text-white text-2xl">↓</div>
          </a>
        </div>
      </section>

      {/* About Section comes right after Hero */}
      <About />
    </>
  );
}

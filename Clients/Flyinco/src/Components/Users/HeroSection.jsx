// src/Components/HeroSection.jsx
import React from "react";
import heroImg from "../../assets/HEro1.webp"; // adjust name/case to match your file

export default function HeroSection() {
  return (
    <section className="relative flex h-screen w-full items-center justify-center bg-black">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Luxury travel background"
          className="h-full w-full object-cover"
        />
        {/* Black overlay for dark theme */}
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl px-6 text-center text-white">
        <h1 className="mb-4 text-4xl font-bold sm:text-6xl">
          Premium Chauffeur Service
        </h1>
        <p className="mb-6 text-lg text-gray-300 sm:text-xl">
          Flyinco offers world-class chauffeur experiences with unmatched comfort and style.
        </p>
        <a
          href="/book"
          className="inline-block rounded-full bg-primary px-8 py-3 font-medium text-white shadow-lg transition hover:bg-primary/90"
        >
          Book Now
        </a>
      </div>
    </section>
  );
}

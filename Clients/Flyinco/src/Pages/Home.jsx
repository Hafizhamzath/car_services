// src/pages/Home.jsx
import React from "react";
import Navbar from "../Components/Users/Navbar.jsx";
import HeroSection from "../Components/Users/HeroSection.jsx";
import heroImg from "../assets/HEro1.webp"; // ✅ adjust case/path correctly
import ServicesCarousel from "../Components/Users/Services.jsx";
import WhyChooseUs from "../Components/Users/WhyChooseUs.jsx";
import Fleet from "../Components/Users/fleet.jsx";
import FAQ from "../Components/Users/FAQ.jsx";
import Contact from "../Components/Users/contact.jsx";
import Footer from "../Components/Users/Footer.jsx";

export default function Home() {
  return (
    <div
      className="min-h-screen bg-cover bg-center text-white relative"
      style={{ backgroundImage: `url(${heroImg})` }}
    >
      {/* optional overlay for readability */}
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative">
        <Navbar />
        <HeroSection />
        <ServicesCarousel/>
        <WhyChooseUs/>
        <Fleet/>
        <FAQ/>
        <Contact/>
        <Footer/>
        {/* Later you can add Services, About, Fleet sections here */}
      </div>
    </div>
  );
}

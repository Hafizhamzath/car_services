// src/pages/Home.jsx
import React from "react";
import Navbar from "../../components/Users/Navbar.jsx";
import HeroSection from "../../components/Users/HeroSection.jsx";
import heroImg from "../../assets/Cars/Header.png"; // ✅ adjust case/path correctly
import ServicesCarousel from "../../components/Users/Services.jsx";
import WhyChooseUs from "../../components/Users/WhyChooseUs.jsx";
import Fleet from "../../components/Users/fleet.jsx";
import FAQ from "../../components/Users/FAQ.jsx";
import Contact from "../../components/Users/contact.jsx";
import Footer from "../../components/Users/Footer.jsx";

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
        <Footer variant="default" />
        {/* Later you can add Services, About, Fleet sections here */}
      </div>
    </div>
  );
}

// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Future routes */}
      <Route path="/services" element={<div>Services page</div>} />
      <Route path="/about" element={<div>About page</div>} />
      <Route path="/fleet" element={<div>Fleet page</div>} />
      <Route path="/contact" element={<div>Contact page</div>} />
      <Route path="/book" element={<div>Book Now page</div>} />
    </Routes>
  );
}

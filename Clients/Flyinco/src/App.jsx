// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/User/Home.jsx";
import BookingForm from "./Pages/User/BookNow.jsx";
import AuthPage from "./Pages/User/authpage.jsx";

// Admin
import AdminLayout from "./components/admin/AdminLayout.jsx";
import Dashboard from "./Pages/admin/dashboard.jsx";
import Users from "./Pages/admin/user.jsx";
import Bookings from "./Pages/admin/Booking.jsx";
import Drivers from "./Pages/admin/Driver.jsx";

// Fallback
import NotAuthorized from "./Pages/User/NotAuthorised.jsx";
import Fleet from "./Pages/User/fleet.jsx";
import Services from "./Pages/User/Services.jsx";
import WhyChooseUsPage from "./Pages/User/Whychooseus.jsx";
import AboutUs from "./Pages/User/AboutUs.jsx";
import Contact from "./Pages/User/Contact.jsx";

export default function App() {
  const isAdmin = true; // 🔑 placeholder – later we’ll replace with real auth

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services/>} />
      <Route path="/why-choose-us" element={<WhyChooseUsPage/>} />
      <Route path="/about" element={<AboutUs/>} />
      <Route path="/contact" element={<Contact/>} />
      <Route path="/fleet" element={<Fleet/>} />
      <Route path="/login" element={<AuthPage />} />
      <Route path="/book" element={<BookingForm />} />

      {/* Admin routes */}
      {isAdmin ? (
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="drivers" element={<Drivers />} />
        </Route>
      ) : (
        <Route path="/admin/*" element={<NotAuthorized />} />
      )}
    </Routes>
  );
}

import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/User/Home.jsx";
import BookingForm from "./Pages/User/BookNow.jsx";
import AuthPage from "./Pages/User/authpage.jsx";
import ProfilePage from "./Pages/User/profile.jsx";

// Admin
import AdminLayout from "./components/admin/AdminLayout.jsx";
import Dashboard from "./Pages/admin/dashboard.jsx";
import Users from "./Pages/admin/user.jsx";
import Bookings from "./Pages/admin/Booking.jsx";
import Drivers from "./Pages/admin/Driver.jsx";

// Driver
import DriverDashboard from "./Pages/Driver/Dashboard.jsx"; // ✅ added

// Fallback
import NotAuthorized from "./Pages/User/NotAuthorised.jsx";
import Fleet from "./Pages/User/fleet.jsx";
import Services from "./Pages/User/Services.jsx";
import WhyChooseUsPage from "./Pages/User/WhyChooseUs.jsx";
import AboutUs from "./Pages/User/AboutUs.jsx";
import Contact from "./Pages/User/Contact.jsx";

export default function App() {
  // ✅ get user role from localStorage
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const isAdmin = userInfo?.role === "admin";

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/why-choose-us" element={<WhyChooseUsPage />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/fleet" element={<Fleet />} />
      <Route path="/login" element={<AuthPage />} />
      <Route path="/book" element={<BookingForm />} />
      <Route path="/profile" element={<ProfilePage />} />

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

      {/* Driver route (no protection for now) */}
      <Route path="/driver" element={<DriverDashboard />} />

      {/* Fallback redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

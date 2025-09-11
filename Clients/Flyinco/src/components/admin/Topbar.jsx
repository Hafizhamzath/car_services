// src/components/admin/Topbar.jsx
import React, { useState, useEffect } from "react";
import logo from "../../assets/Flyinco.png";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import NotificationBell from "../../components/admin/Notification";

export default function Topbar() {
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("en");
  const dir = language === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.setAttribute("dir", dir);
  }, [dir]);

  // sample data
  const [notifications, setNotifications] = useState([
    { id: "1", title: "New booking created", message: "PNR #1024 by Sarah W.", time: "2m ago", type: "info", read: false },
    { id: "2", title: "Driver approved", message: "Alex Johnson is now active", time: "15m ago", type: "success", read: false },
    { id: "3", title: "Payment failed", message: "Booking #1018", time: "1h ago", type: "warning", read: true },
  ]);

  const handleItemClick = (item) => {
    // e.g., navigate(`/admin/bookings/${item.id}`)
    setNotifications(prev => prev.map(n => n.id === item.id ? { ...n, read: true } : n));
  };

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src={logo} alt="Logo" className="h-10" />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-6">
        {/* Notifications (shadcn) */}
        <NotificationBell
          items={notifications}
          onItemClick={handleItemClick}
          onMarkAllRead={handleMarkAllRead}
          dir={dir}
        />

        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className={cn(
            "p-2 rounded-full border hover:bg-gray-100 transition",
            theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
          )}
        >
          {theme === "light" ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Language Toggle (EN / AR) */}
        <div className="relative flex items-center w-28 h-9 bg-gray-200 rounded-full shadow-inner">
          <span
            className={cn(
              "absolute w-1/2 h-full bg-gray-900 rounded-full transition-all",
              language === "en" ? "left-0" : "left-1/2"
            )}
          />
          <button
            onClick={() => setLanguage("en")}
            className={cn(
              "z-10 w-1/2 text-sm font-medium transition",
              language === "en" ? "text-white" : "text-gray-600"
            )}
          >
            EN
          </button>
          <button
            onClick={() => setLanguage("ar")}
            className={cn(
              "z-10 w-1/2 text-sm font-medium transition",
              language === "ar" ? "text-white" : "text-gray-600"
            )}
          >
            AR
          </button>
        </div>

        {/* Logout */}
        <Button variant="destructive" onClick={() => console.log("Logout")}>
          Logout
        </Button>
      </div>
    </header>
  );
}

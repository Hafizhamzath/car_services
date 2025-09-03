import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Users,
  CalendarCheck,
  Car,
  LayoutDashboard,
  LogOut,
  PanelLeftClose,
  PanelRightClose,
} from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { name: "User Management", path: "/admin/users", icon: Users },
  { name: "Booking Management", path: "/admin/bookings", icon: CalendarCheck },
  { name: "Driver Management", path: "/admin/drivers", icon: Car },
];

export default function Sidebar({ collapsed, setCollapsed }) {
  const location = useLocation();
  const [isRTL, setIsRTL] = useState(false);

  // detect current document direction
  useEffect(() => {
    setIsRTL(document.documentElement.dir === "rtl");
  }, []);

  return (
    <aside
      className={cn(
        "bg-gray-900 text-white h-screen flex flex-col transition-all duration-300 fixed top-0 left-0 z-40",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Top bar with title */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-700">
        {!collapsed && <span className="font-bold text-lg">Dashboard</span>}
      </div>

      {/* Collapse/Expand button (kept above Topbar, fixed positioning) */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className={cn(
          "fixed top-5 bg-gray-800 text-white p-1 rounded-full shadow hover:bg-gray-700 transition z-50",
          isRTL ? "left-[72px]" : "left-[248px]", // adjust positions
          collapsed && (isRTL ? "left-[16px]" : "left-[72px]")
        )}
      >
        {collapsed
          ? isRTL
            ? <PanelLeftClose size={18} />
            : <PanelRightClose size={18} />
          : isRTL
          ? <PanelRightClose size={18} />
          : <PanelLeftClose size={18} />}
      </button>

      {/* Nav links */}
      <div className="flex-1 px-2 py-4 space-y-2">
        {links.map(({ name, path, icon: Icon }) => (
          <Link
            key={path}
            to={path}
            className={cn(
              "group relative flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition",
              location.pathname === path && "bg-gray-700"
            )}
          >
            <Icon size={20} />
            {!collapsed && <span>{name}</span>}

            {/* Tooltip when collapsed */}
            {collapsed && (
              <span
                className={cn(
                  "absolute top-1/2 -translate-y-1/2 px-2 py-1 text-sm bg-gray-800 text-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition whitespace-nowrap",
                  isRTL ? "right-full -mr-3" : "left-full ml-3"
                )}
              >
                {name}
              </span>
            )}
          </Link>
        ))}
      </div>

      {/* Logout pinned at bottom */}
      <div className="p-3 border-t border-gray-700">
        <button
          onClick={() => console.log("Logout")}
          className="group relative flex items-center gap-2 w-full p-3 rounded-lg hover:bg-red-600 transition"
        >
          <LogOut size={20} />
          {!collapsed && <span>Logout</span>}

          {/* Tooltip for logout when collapsed */}
          {collapsed && (
            <span
              className={cn(
                "absolute top-1/2 -translate-y-1/2 px-2 py-1 text-sm bg-gray-800 text-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition whitespace-nowrap",
                isRTL ? "right-full -mr-3" : "left-full ml-3"
              )}
            >
              Logout
            </span>
          )}
        </button>
      </div>
    </aside>
  );
}

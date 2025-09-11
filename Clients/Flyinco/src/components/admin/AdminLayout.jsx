// src/layouts/AdminLayout.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [isRTL, setIsRTL] = useState(false);

  useEffect(() => {
    const el = document.documentElement;
    const update = () => setIsRTL(el.dir === "rtl");
    update();
    const obs = new MutationObserver(update);
    obs.observe(el, { attributes: true, attributeFilter: ["dir"] });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar is fixed */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Main content is shifted with margin */}
      <div
        className={cn(
          "flex flex-col flex-1 transition-all duration-300",
          isRTL
            ? collapsed
              ? "mr-20"
              : "mr-64"
            : collapsed
              ? "ml-20"
              : "ml-64"
        )}
      >
        {/* Topbar */}
        <div className="sticky top-0 z-30 bg-white border-b border-gray-200">
          <Topbar />
        </div>

        {/* Main outlet content */}
        <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

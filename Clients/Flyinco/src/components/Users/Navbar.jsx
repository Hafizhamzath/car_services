import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";

import logo from "../../assets/Flyinco White Logo.png";

// ---- Nav links ----
const leftLinks = [
  { label: "Services", to: "/services" },
  { label: "Why Choose Us", to: "/why-choose-us" },
  { label: "About", to: "/about" },
];
const rightLinks = [
  { label: "Fleet", to: "/fleet" },
  { label: "Contact", to: "/contact" }, // ✅ Replaced Login → Contact
];

// desktop link styling
function linkClasses(isActive) {
  return [
    "group inline-flex items-center rounded-md px-1.5 py-2 font-medium transition-colors",
    isActive ? "text-white" : "text-white/80 hover:text-white",
  ].join(" ");
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div
        className={[
          "w-full backdrop-blur-lg transition-all",
          scrolled ? "bg-black/50" : "bg-transparent",
        ].join(" ")}
      >
        <nav className="grid grid-cols-3 items-center px-4 py-2 sm:px-6 sm:py-3 relative">
          {/* Left links (desktop) */}
          <ul className="hidden md:flex items-center gap-6 text-sm justify-start">
            {leftLinks.map((item) => (
              <li key={item.label}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) => linkClasses(isActive)}
                >
                  <span>{item.label}</span>
                  <span className="block h-0.5 scale-x-0 bg-white/80 transition-transform duration-300 group-hover:scale-x-100" />
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Center logo (desktop only) */}
          <div className="hidden md:flex items-center justify-center">
            <Link to="/" aria-label="Flyinco home">
              <img
                src={logo}
                alt="Flyinco logo"
                className="h-12 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Right links (desktop) */}
          <div className="hidden md:flex items-center justify-end gap-6">
            <ul className="flex items-center gap-6 text-sm">
              {rightLinks.map((item) => (
                <li key={item.label}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) => linkClasses(isActive)}
                  >
                    <span>{item.label}</span>
                    <span className="block h-0.5 scale-x-0 bg-white/80 transition-transform duration-300 group-hover:scale-x-100" />
                  </NavLink>
                </li>
              ))}
            </ul>
            {/* ✅ Login button with #4b0082 bg */}
            <Button
              asChild
              size="sm"
              className="rounded-full px-5 text-white"
              style={{ backgroundColor: "#4b0082" }}
            >
              <Link to="/login" aria-label="Login">
                Login
              </Link>
            </Button>
          </div>

          {/* Mobile (logo + hamburger) */}
          <div className="md:hidden col-span-3 flex items-center justify-between relative">
            {/* Logo */}
            <Link
              to="/"
              aria-label="Flyinco home"
              className="flex items-center gap-2"
            >
              <img
                src={logo}
                alt="Flyinco logo"
                className="h-10 w-auto object-contain"
              />
            </Link>

            {/* Mobile menu */}
            <MobileMenu />
          </div>
        </nav>
      </div>
    </header>
  );
}

function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full">
      {/* Toggle button */}
      <div className="flex justify-end">
        <Button
          variant="ghost"
          size="icon"
          aria-label={open ? "Close menu" : "Open menu"}
          className="h-10 w-10 text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Full-width dropdown panel */}
      {open && (
        <div className="absolute left-0 right-0 top-full w-full bg-black/70 backdrop-blur-xl border-t border-white/20 shadow-md z-50">
          <nav className="flex flex-col space-y-2 p-4">
            {[...leftLinks, ...rightLinks].map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  [
                    "block rounded-md px-3 py-3 text-base font-medium transition-colors",
                    "hover:bg-white/10 hover:text-white",
                    isActive ? "text-white" : "text-white/80",
                  ].join(" ")
                }
              >
                {item.label}
              </NavLink>
            ))}

            {/* ✅ Login button in mobile with #4b0082 bg */}
            <Button
              asChild
              className="mt-4 w-full rounded-full text-base py-3 text-white"
              style={{ backgroundColor: "#4b0082" }}
              onClick={() => setOpen(false)}
            >
              <Link to="/login" aria-label="Login">
                Login
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import logo from "../../assets/Flyinco White Logo.png";

// ---- Nav links ----
const leftLinks = [
  { label: "Services", to: "/services" },
  { label: "Why Choose Us", to: "/why-choose-us" },
  { label: "About", to: "/about" },
];
const rightLinks = [
  { label: "Fleet", to: "/fleet" },
  { label: "Contact", to: "/contact" },
];

// white link styling
function linkClasses(isActive) {
  return [
    "group inline-flex items-center rounded-md px-1.5 py-2 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
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
    // full-width, sticks to screen edges
    <header className="sticky top-0 z-50 w-full">
      {/* transparent + blur only, no border, no shadow, no rounding */}
      <div
        className={[
          "w-full backdrop-blur-lg transition-all",
          // keep fully transparent even on scroll to avoid white tint
          scrolled ? "bg-transparent" : "bg-transparent",
        ].join(" ")}
      >
        <nav className="grid grid-cols-3 items-center px-4 py-2 sm:px-6 sm:py-3">
          {/* Left group */}
          <ul className="hidden md:flex items-center gap-6 text-sm justify-start">
            {leftLinks.map((item) => (
              <li key={item.label}>
                <NavLink to={item.to} className={({ isActive }) => linkClasses(isActive)}>
                  <span>{item.label}</span>
                  <span className="block h-0.5 scale-x-0 bg-white/80 transition-transform duration-300 group-hover:scale-x-100" />
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Center logo */}
          <div className="flex items-center justify-center">
            <Link to="/" className="flex items-center gap-2" aria-label="Flyinco home">
              <img src={logo} alt="Flyinco logo" className="h-12 w-auto object-contain" />
            </Link>
          </div>

          {/* Right group */}
          <div className="hidden md:flex items-center justify-end gap-6">
            <ul className="flex items-center gap-6 text-sm">
              {rightLinks.map((item) => (
                <li key={item.label}>
                  <NavLink to={item.to} className={({ isActive }) => linkClasses(isActive)}>
                    <span>{item.label}</span>
                    <span className="block h-0.5 scale-x-0 bg-white/80 transition-transform duration-300 group-hover:scale-x-100" />
                  </NavLink>
                </li>
              ))}
            </ul>
            <Button asChild size="sm" className="rounded-full px-5">
              <Link to="/book" aria-label="Book a ride now">Book Now</Link>
            </Button>
          </div>

          {/* Mobile menu trigger */}
          <div className="md:hidden col-start-1 flex items-center">
            <MobileMenu />
          </div>
          <div className="md:hidden col-start-3" />
        </nav>
      </div>
    </header>
  );
}

function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open menu" className="h-10 w-10">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[88vw] sm:w-[380px]">
        <SheetHeader>
          <SheetTitle>
            <div className="flex items-center gap-2">
              <img src={logo} alt="Flyinco logo" className="h-9 w-9 rounded-xl object-contain" />
              <span className="text-lg font-semibold">Flyinco</span>
            </div>
          </SheetTitle>
        </SheetHeader>
        <div className="mt-6">
          <nav className="flex flex-col">
            {[...leftLinks, ...rightLinks].map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) =>
                  [
                    "rounded-lg px-2 py-3 text-base font-medium transition-colors hover:bg-accent/30 hover:text-white",
                    isActive ? "text-white" : "text-white/90",
                  ].join(" ")
                }
              >
                {item.label}
              </NavLink>
            ))}
            <Button asChild className="mt-2 w-full rounded-full">
              <Link to="/book" aria-label="Book a ride now">Book Now</Link>
            </Button>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}

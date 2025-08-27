import React from "react";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import logo from "../../assets/Flyinco White Logo.png"; // adjust path

// Brand palette
const BRAND_LIGHT = "#e5e6fa";   // lavender
const BRAND_GOLD  = "#c7a55b";   // elegant gold

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#0a1020] text-white overflow-hidden">
      {/* Luxury backdrop like contact */}
      <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_-20%,rgba(79,70,229,0.2),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(50%_50%_at_80%_30%,rgba(199,165,91,0.15),transparent_80%)]" />
      <div className="absolute inset-0 bg-black/60" />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-white/5 [box-shadow:inset_0_0_120px_rgba(0,0,0,0.6)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6 py-12 md:py-16 text-center">
        {/* Logo */}
        <div className="flex justify-center">
          <img
            src={logo}
            alt="Flyinco"
            className="h-14 md:h-16 opacity-90"
            style={{ filter: "drop-shadow(0 6px 20px rgba(0,0,0,0.5))" }}
          />
        </div>

        {/* Gradient divider line */}
        <div
          className="mx-auto mt-6 h-[2px] w-40 rounded-full"
          style={{
            background: `linear-gradient(90deg, transparent, ${BRAND_GOLD}, transparent)`,
          }}
        />

        {/* Footer content */}
        <div className="mt-6 flex flex-col items-center gap-4">
          <p
            className="text-sm font-medium"
            style={{ color: BRAND_LIGHT }}
          >
            © 2025 Flyinco. All rights reserved.
          </p>

          {/* Social links */}
          <div className="flex items-center gap-6">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

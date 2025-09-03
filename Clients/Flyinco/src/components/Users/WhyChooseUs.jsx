import React, { useState } from "react";
import {
  ShieldCheck,
  Clock,
  Gem,
  UserCheck,
  SlidersHorizontal,
  Sparkles,
  ChevronDown,
  CheckCircle2,
} from "lucide-react";
import heroImg from "../../assets/Cars/footer.png"; // ✅ ensure path/case is correct

const BRAND_PRIMARY = "#4b0082"; // deep purple
const BRAND_LIGHT = "#e5e6fa";   // light lavender

// 4 consolidated features (professional grouping)
const ITEMS = [
  {
    icon: UserCheck,
    title: "Professional Chauffeurs & Safety Standards",
    desc: "Our chauffeurs are more than drivers—they are seasoned professionals trained in etiquette, discretion, and precision. Your well-being is safeguarded with rigorous safety protocols, advanced vehicle technology, and continuous training—so every mile feels assured, refined, and stress-free.",
    bullets: [
      "Expertly trained in etiquette & discretion",
      "Rigorous safety checks and SOPs",
      "Advanced vehicle safety technology",
    ],
  },
  {
    icon: Gem,
    title: "Luxury Fleet & On-Board Comforts",
    desc: "Travel in sophistication with a meticulously curated fleet, maintained to perfection for comfort, style, and presence. Thoughtful amenities elevate every journey.",
    bullets: [
      "Complimentary bottled water & facial tissues",
      "Curated newspapers and magazines",
      "On-board Wi-Fi (available in Bahrain)",
    ],
    accentIcon: Sparkles,
  },
  {
    icon: Clock,
    title: "Punctuality & Reliability",
    desc: "Your time is our highest priority. We guarantee on-time arrivals and departures, supported by real-time monitoring and precision planning, so your schedule remains seamless and uninterrupted.",
  },
  {
    icon: SlidersHorizontal,
    title: "Personalized Services",
    desc: "Every journey is tailored to you. From bespoke route planning to in-cabin preferences, we adapt our service to your exact requirements, creating an experience that feels uniquely yours.",
  },
];

export default function WhyChooseUs() {
  // single-open accordion
  const [openIndex, setOpenIndex] = useState(0);
  const toggle = (idx) => setOpenIndex((current) => (current === idx ? null : idx));

  return (
    <section
      className="relative py-12 sm:py-14"
      aria-labelledby="why-choose-us-heading"
      style={{
        backgroundImage: `url(${heroImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* overlay for readability */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-8">
        <div className="flex justify-center md:justify-end">
          <div
            className="
              w-full md:max-w-[620px]
              rounded-2xl
              bg-transparent
              backdrop-blur-xl backdrop-saturate-150
              shadow-[0_10px_30px_rgba(0,0,0,0.35)]
              ring-1 ring-white/20
              p-6 sm:p-8
              text-white
            "
          >
            <h2
              id="why-choose-us-heading"
              className="text-2xl sm:text-3xl font-semibold tracking-tight"
              style={{ color: BRAND_LIGHT }}
            >
              Why Choose Us
            </h2>

            <p className="mt-2 text-sm sm:text-base text-white/85">
              Excellence isn’t an upgrade — it’s the baseline. Here’s what you can expect on every journey.
            </p>

            <ul className="mt-6 space-y-6">
              {ITEMS.map(({ icon: Icon, title, desc, bullets, accentIcon: Accent }, idx) => {
                const isOpen = openIndex === idx;
                const panelId = `feature-panel-${idx}`;
                const btnId = `feature-button-${idx}`;

                return (
                  <li key={title} className="rounded-xl relative group">
                    <button
                      id={btnId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggle(idx)}
                      className="w-full flex items-center justify-between gap-4 px-3.5 py-3 rounded-xl relative"
                    >
                      <span className="flex items-center gap-3 text-left">
                        <Icon
                          className="h-6 w-6 flex-none drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)]"
                          strokeWidth={2}
                          style={{ color: BRAND_LIGHT }}
                        />
                        <span className="text-base font-semibold leading-tight">
                          {title}
                        </span>
                      </span>
                      <ChevronDown
                        className={`h-5 w-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    {/* left→right fade underline */}
                    <span
                      className={[
                        "pointer-events-none absolute bottom-0 left-0 h-[2px] w-full",
                        "origin-left transform will-change-transform",
                        "transition-transform transition-opacity duration-500 ease-out",
                        "bg-[linear-gradient(90deg,rgba(75,0,130,0)_0%,rgba(75,0,130,0.45)_55%,#4b0082_100%)]",
                        isOpen ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0",
                        "group-hover:scale-x-100 group-hover:opacity-100",
                      ].join(" ")}
                    />

                    {/* Collapsible content */}
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={btnId}
                      className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-3.5 pb-4 pt-0 text-sm text-white/95">
                          <p className="flex items-start gap-2">
                            {Accent && <Accent className="h-4 w-4 mt-0.5 flex-none" />}
                            <span>{desc}</span>
                          </p>
                          {bullets && (
                            <ul className="mt-3 space-y-2">
                              {bullets.map((b, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 mt-0.5 flex-none" />
                                  <span>{b}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

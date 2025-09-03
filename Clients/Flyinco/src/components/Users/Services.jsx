import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { motion } from "framer-motion";
import airportService from "../../assets/Cars/Airport service.jpg"
import HotelTransfer from "../../assets/Cars/Hotel Transfer service.jpg"
import ChaufferService from "../../assets/Cars/Chauffeur Services.jpg"
import corporateTransport from "../../assets/Cars/Corporate transportation.jpg"
import EventTransport from "../../assets/Cars/Event transportation.jpg"
import GroupTransport from "../../assets/Cars/Group transportation.jpg"

// ---- brand colors ----
const BRAND_PRIMARY = "#4b0082";   // deep purple
const BRAND_LIGHT   = "#e5e6fa";   // light lavender

// services (your updated copy left as-is)
const SERVICES = [
  {
    id: "01",
    name: "Airport Services",
    slug: "/services/airport",
    img: airportService,
    summary:
      "Command a flawless arrival with Flyinco. Your chauffeur tracks your flight, greets you the moment you land, and manages luggage with discreet precision. Enjoy a calm, private cabin and a seamless route to your destination—no queues, no delays, no stress. With a distinguished fleet and disciplined timing, your journey begins (or ends) exactly as it should: effortlessly, elegantly, on your schedule.",
  },
  {
    id: "02",
    name: "Hotel Transfer Services",
    slug: "/services/hotel-transfer",
    img: HotelTransfer,
    summary:
      "Glide between lobby and curbside with quiet efficiency. Your Flyinco chauffeur arrives precisely on time, assists with bags, and handles every detail behind the scenes. Settle into a refined interior, savor the stillness, and arrive composed. For departures, we coordinate with your concierge and confirm routes in advance. It’s the perfect blend of courtesy, discretion, and unshakable reliability.",
  },
  {
    id: "03",
    name: "Chauffeur Services",
    slug: "/services/chauffeur",
    img: ChaufferService,
    summary:
      "This is private travel perfected. Reserve by the hour or point-to-point and enjoy a dedicated Flyinco chauffeur who anticipates needs before you voice them. Doors opened, routes optimized, privacy protected. Sink into handcrafted comfort, charge devices, set the cabin mood, and let the city glide by. Precision, polish, and poise—every mile is intentionally elevated.",
  },
  {
    id: "04",
    name: "Corporate Transportation",
    slug: "/services/corporate",
    img: corporateTransport,
    summary:
      "Move like leadership. Flyinco delivers executive transfers, roadshows, and VIP movements with immaculate timing and airtight coordination. Quiet cabins for calls, consistent etiquette, and professional discretion are standard. Expect streamlined scheduling, centralized billing, and a single point of contact. We keep your agenda in motion so you arrive focused, prepared, and perfectly on time.",
  },
  {
    id: "05",
    name: "Event Transportation",
    slug: "/services/event",
    img: EventTransport,
    summary:
      "Make an entrance—then make it look effortless. From weddings and galas to conferences and premieres, Flyinco orchestrates vehicles, call times, and routes with backstage precision. Guests are met, seated, and delivered right on cue in impeccably presented cars. Every touchpoint feels considered, every transition feels smooth. Elegant, visible quality; invisible logistics.",
  },
  {
    id: "06",
    name: "Group Transportation",
    slug: "/services/group",
    img: GroupTransport,
    summary:
      "Travel together without compromise. Our premium vans and minibuses offer generous space, refined interiors, and serene ride quality, while Flyinco coordinates multi-stop itineraries and staggered departures in real time. Colleagues, family, or VIP guests arrive rested and aligned. It’s group movement with a private-jet mindset—cohesive, punctual, and unmistakably luxurious.",
  },
];

// --- Motion variants ---
const headerVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const trackVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 14, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45 } },
};

function ServiceCard({ id, name, slug, img, summary, isOpen, onToggle }) {
  return (
    <motion.div
      variants={cardVariants}
      className="relative isolate h-[32rem] w-[66vw] md:w-[22rem] flex-none snap-center rounded-2xl overflow-hidden will-change-transform"
    >
      {/* Subtle luxury border shimmer */}
      <div className="absolute inset-0 rounded-2xl [mask-image:linear-gradient(180deg,black,transparent_85%)]">
        <div className="absolute inset-0 rounded-2xl border border-white/15" />
        <div className="absolute inset-0 rounded-2xl pointer-events-none bg-[linear-gradient(120deg,rgba(255,255,255,0.18),transparent_30%)] opacity-10" />
      </div>

      <img
        src={img}
        alt={name}
        className="absolute inset-0 h-full w-full object-cover scale-[1.02]"
        loading="lazy"
      />

      {/* 45–50% black overlay for contrast with a soft gradient top glow */}
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/10 to-transparent" />

      {/* Top-left index label */}
      <div className="absolute left-4 top-4 z-10">
        <span className="select-none text-2xl font-extrabold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
          {id}
        </span>
      </div>

      {/* Top-right toggle button: Plus -> Cross (45°) */}
      <button
        type="button"
        aria-label={isOpen ? `Close ${name} summary` : `Open ${name} summary`}
        aria-expanded={isOpen}
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        className="
          absolute right-4 top-4 z-10
          flex items-center justify-center
          h-11 w-11 md:h-[52px] md:w-[52px]
          rounded-full transition
          ring-1 ring-black/10
          shadow-[0_8px_22px_rgba(0,0,0,0.35)]
          hover:shadow-[0_10px_28px_rgba(0,0,0,0.45)]
        "
        style={{
          background: isOpen ? BRAND_PRIMARY : "rgba(255,255,255,0.95)",
          color: isOpen ? "#ffffff" : "#000000",
        }}
        onMouseEnter={(e) => {
          if (!isOpen) e.currentTarget.style.background = BRAND_PRIMARY;
          e.currentTarget.style.color = "#ffffff";
        }}
        onMouseLeave={(e) => {
          if (!isOpen) {
            e.currentTarget.style.background = "rgba(255,255,255,0.95)";
            e.currentTarget.style.color = "#000000";
          }
        }}
      >
        <Plus
          className={`
            h-6 w-6 md:h-7 md:w-7
            transition-transform duration-300 ease-out
            ${isOpen ? "rotate-45" : "rotate-0"}
          `}
          strokeWidth={3}
        />
      </button>

      {/* Bottom-center caption */}
      <div className="absolute inset-x-0 bottom-6 z-10 flex justify-center px-4">
        <div className="max-w-[80%] text-center">
          <p className="text-[20px] font-semibold leading-tight text-white md:text-[28px] drop-shadow-[0_3px_10px_rgba(0,0,0,0.45)]">
            {name}
          </p>
        </div>
      </div>

      {/* Slide-up summary panel */}
      <div
        className={`absolute inset-x-0 bottom-0 z-20
          px-4 pt-4 pb-5 bg-black/60 text-white
          rounded-t-2xl backdrop-blur-sm
          transition-all duration-300 ease-out
          ${isOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"}
        `}
      >
        <p className="text-sm md:text-base leading-relaxed">{summary}</p>
        <div className="mt-3 flex justify-center">
          <Link
            to={slug}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ring-1 ring-white/20"
            style={{ backgroundColor: BRAND_PRIMARY, color: "#ffffff" }}
          >
            Learn more
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function ServicesCarousel() {
  const trackRef = useRef(null);
  const intervalRef = useRef(null);
  const isUserInteractingRef = useRef(false);
  const isReturningRef = useRef(false); // when doing slow sweep 6 -> 1
  const [openId, setOpenId] = useState(null); // which card is expanded

  const GAP = 24; // matches `gap-6`
  const step = () => {
    const track = trackRef.current;
    if (!track) return 384; // fallback
    const card = track.querySelector("div[role='card']");
    return card ? card.getBoundingClientRect().width + GAP : 384;
  };

  const maxLeft = () => {
    const s = step();
    return s * (SERVICES.length - 1);
  };

  // helpers
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  const currentIndex = () => {
    const s = step();
    const left = trackRef.current?.scrollLeft || 0;
    return Math.round(left / s);
  };

  // custom smooth scroll (control duration)
  const animateScrollTo = (targetLeft, duration = 1200, easing = (t) => 1 - Math.pow(1 - t, 3)) => {
    const track = trackRef.current;
    if (!track) return Promise.resolve();
    const start = track.scrollLeft;
    const delta = targetLeft - start;
    if (delta === 0) return Promise.resolve();

    return new Promise((resolve) => {
      const startTime = performance.now();
      const stepFrame = (now) => {
        const t = clamp((now - startTime) / duration, 0, 1);
        const eased = easing(t);
        track.scrollLeft = start + delta * eased;
        if (t < 1) requestAnimationFrame(stepFrame);
        else resolve();
      };
      requestAnimationFrame(stepFrame);
    });
  };

  const sweepBackToFirst = async () => {
    if (isReturningRef.current) return;
    isReturningRef.current = true;
    stopAuto();
    await animateScrollTo(0, 1400); // slow sweep 6 -> 1
    isReturningRef.current = false;
    if (!openId) startAuto();
  };

  const scrollByCard = async (dir = 1) => {
    const track = trackRef.current;
    if (!track) return;
    const s = step();
    const left = track.scrollLeft;
    const target = clamp(left + dir * s, 0, maxLeft());

    const atLast = Math.abs(left - maxLeft()) < 6; // tolerance
    if (dir > 0 && atLast) {
      await sweepBackToFirst();
      return;
    }

    track.scrollTo({ left: target, behavior: "smooth" });
  };

  // --- Auto-advance every 3 seconds ---
  const prefersReduced = () =>
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const startAuto = () => {
    if (prefersReduced()) return;
    if (openId) return; // don't start if a panel is open
    stopAuto();
    intervalRef.current = setInterval(async () => {
      if (!isUserInteractingRef.current && !openId && !isReturningRef.current) {
        await scrollByCard(1);
      }
    }, 3000);
  };

  const stopAuto = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    requestAnimationFrame(() => {
      trackRef.current?.scrollTo({ left: 0, behavior: "auto" });
      startAuto();
    });
    return () => stopAuto();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (openId) stopAuto();
    else startAuto();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openId]);

  const onPointerDown = () => {
    isUserInteractingRef.current = true;
    stopAuto();
  };
  const onPointerUp = () => {
    isUserInteractingRef.current = false;
    if (!openId && !isReturningRef.current) startAuto();
  };

  const ArrowButton = ({ onClick, children, ariaLabel }) => (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={async () => {
        stopAuto();
        await onClick();
        if (!openId && !isReturningRef.current) startAuto();
      }}
      className="
        group relative inline-flex items-center justify-center
        h-10 w-10 md:h-12 md:w-12
        rounded-full text-white
        transition
        focus:outline-none focus:ring-2 focus:ring-white/40
      "
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      {/* spinning dotted ring on hover */}
      <span
        className="
          pointer-events-none absolute inset-0 rounded-full
          border-2 border-dashed border-white/70
          opacity-0 group-hover:opacity-100
          [animation:spin_1s_linear_infinite]
        "
        aria-hidden="true"
      />
      <span className="relative z-10 flex items-center justify-center">
        {children}
      </span>
    </button>
  );

  return (
    <section className="relative py-16 bg-[#0a1a2f]">
      {/* Luxury backdrop: spotlight + overlay + vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_-10%,rgba(75,0,130,0.16),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(45%_45%_at_85%_20%,rgba(229,230,250,0.10),transparent_70%)]" />
      <div className="absolute inset-0 bg-black/50" />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-white/5 [box-shadow:inset_0_0_120px_rgba(0,0,0,0.55)]" />

      {/* content above overlay */}
      <div className="relative z-10">
        {/* Heading & Tagline */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="px-8 text-center"
        >
          <h2
            className="font-serif tracking-tight text-3xl sm:text-4xl md:text-5xl"
            style={{ color: BRAND_LIGHT }}
          >
            My Services
          </h2>
          <p className="mt-3 text-base sm:text-lg" style={{ color: BRAND_LIGHT }}>
            Redefining Journeys with Style, Comfort, and Excellence
          </p>
          {/* Elegant divider */}
          <div
            className="mx-auto mt-5 h-[2px] w-40 rounded-full opacity-70"
            style={{
              background: `linear-gradient(90deg, transparent, ${BRAND_LIGHT}, transparent)`,
            }}
          />
        </motion.div>

        {/* Carousel Controls (desktop) */}
        <div className="mt-6 hidden items-center justify-end gap-3 px-8 md:flex">
          <ArrowButton ariaLabel="Previous" onClick={() => scrollByCard(-1)}>
            <ChevronLeft className="h-5 w-5" />
          </ArrowButton>
          <ArrowButton ariaLabel="Next" onClick={() => scrollByCard(1)}>
            <ChevronRight className="h-5 w-5" />
          </ArrowButton>
        </div>

        {/* Carousel Track */}
        <motion.div
          variants={trackVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-6 px-8"
        >
          <div
            ref={trackRef}
            className="
              scrollbar-none
              flex gap-6 overflow-x-auto snap-x snap-mandatory pb-2
            "
            style={{ scrollBehavior: "smooth" }}
            onMouseEnter={stopAuto}
            onMouseLeave={() => {
              if (!openId && !isReturningRef.current) startAuto();
            }}
            onTouchStart={stopAuto}
            onTouchEnd={() => {
              if (!openId && !isReturningRef.current) startAuto();
            }}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
          >
            <style>{`.scrollbar-none::-webkit-scrollbar { display: none; }`}</style>

            {SERVICES.map((s) => {
              const isOpen = openId === s.id;
              return (
                <div key={s.id} role="card">
                  <ServiceCard
                    {...s}
                    isOpen={isOpen}
                    onToggle={() => setOpenId((prev) => (prev === s.id ? null : s.id))}
                  />
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

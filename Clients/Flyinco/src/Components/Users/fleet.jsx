import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Users, Luggage, ChevronLeft, ChevronRight } from "lucide-react";

const vehicles = [
  {
    id: "rr-cullinan-bb",
    name: "Rolls Royce Cullinan Black Badge",
    description:
      "Seats up to five with a serene, commanding ride. Whisper-quiet cabin and bespoke materials throughout.",
    passengers: 5,
    luggage: 8,
    imageBase:
      "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd",
    alt: "Three-quarter front view of Rolls Royce Cullinan Black Badge in a dark studio",
  },
  {
    id: "mb-s580-maybach",
    name: "Mercedes-Benz Maybach S 580",
    description:
      "Executive lounge comfort with extended legroom. Silky power and air suspension for tranquil cruising.",
    passengers: 4,
    luggage: 3,
    imageBase:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d",
    alt: "Three-quarter front view of Mercedes Maybach S 580 at dusk",
  },
  {
    id: "rr-ghost-e",
    name: "Rolls Royce Ghost Extended",
    description:
      "Magic-carpet ride with extra rear space. Impeccable craftsmanship for VIP transfers.",
    passengers: 4,
    luggage: 3,
    imageBase:
      "https://images.unsplash.com/photo-1619767886558-efdc259cde1b",
    alt: "Rolls Royce Ghost Extended in moody lighting",
  },
  {
    id: "bentley-bentayga",
    name: "Bentley Bentayga Speed",
    description:
      "Grand-touring pace with a richly crafted cabin. Confident stance for city or highway.",
    passengers: 5,
    luggage: 5,
    imageBase:
      "https://images.unsplash.com/photo-1636971181094-8f7ef0a2ab44",
    alt: "Bentley Bentayga with dramatic highlights",
  },
  // add more cars here up to 10+
];

function heroSrcSet(base) {
  const qs = (w) => `${base}?q=80&w=${w}&auto=format&fit=crop`;
  return `${qs(768)} 768w, ${qs(1024)} 1024w, ${qs(1440)} 1440w, ${qs(1920)} 1920w`;
}

export default function Fleet() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const selected = vehicles[selectedIndex];

  // refs to keep thumbnails in view
  const stripRef = React.useRef(null);
  const thumbRefs = React.useRef([]);

  const nextCar = () => {
    setSelectedIndex((prev) => (prev + 1) % vehicles.length);
  };
  const prevCar = () => {
    setSelectedIndex((prev) => (prev === 0 ? vehicles.length - 1 : prev - 1));
  };

  // Scroll the active thumbnail into view when selection changes
  React.useEffect(() => {
    const el = thumbRefs.current[selectedIndex];
    if (el && el.scrollIntoView) {
      el.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }, [selectedIndex]);

  return (
    <section className="w-full bg-black">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-10 md:py-14">
        {/* Header (centered) */}
        <header className="mb-8 md:mb-10 text-center">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-white">
            Our Fleet
          </h1>
          <p className="mt-2 max-w-2xl mx-auto text-base md:text-lg text-white/70">
            Discover and book from our curated collection of luxury vehicles,
            crafted for comfort, style, and distinction.
          </p>
        </header>

        {/* GRID: Left = full image, Right = dark panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 overflow-hidden rounded-2xl border border-slate-800">
          {/* LEFT: Hero image, full cover */}
          <div className="lg:col-span-7 relative min-h-[320px] md:min-h-[420px]">
            <AnimatePresence mode="wait">
              <motion.img
                key={selected.id}
                srcSet={heroSrcSet(selected.imageBase)}
                sizes="(min-width: 1024px) 56vw, 100vw"
                src={`${selected.imageBase}?q=80&w=1440&auto=format&fit=crop`}
                alt={selected.alt}
                className="absolute inset-0 h-full w-full object-cover"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
            </AnimatePresence>
          </div>

          {/* RIGHT: Details panel only */}
          <div className="lg:col-span-5 flex flex-col bg-slate-900 p-6 md:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected.id + "-info"}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col flex-1"
              >
                <h2 className="text-xl md:text-2xl font-semibold text-white">
                  {selected.name}
                </h2>
                <p className="mt-3 text-white/80">{selected.description}</p>

                <Separator className="my-6 bg-white/10" />

                <div className="space-y-3">
                  <div className="text-sm font-medium text-white/90">Specification:</div>
                  <ul className="grid grid-cols-2 gap-3 text-white">
                    <Spec label="Passengers" value={selected.passengers} icon={<Users className="h-4 w-4" />} />
                    <Spec label="Luggage" value={selected.luggage} icon={<Luggage className="h-4 w-4" />} />
                  </ul>
                </div>

                <div className="mt-auto pt-6">
                  <Button
                    size="lg"
                    className="w-full bg-[#4b0082] text-white hover:bg-[#5c0aa0] rounded-2xl py-6 text-base"
                  >
                    Book Now
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Thumbnails + controls */}
        <div className="mt-6 md:mt-8">
          {/* Thumbnail strip */}
          <div
            ref={stripRef}
            className="flex gap-2 md:gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory pr-1"
          >
            {vehicles.map((v, idx) => {
              const active = idx === selectedIndex;
              return (
                <button
                  key={v.id}
                  ref={(el) => (thumbRefs.current[idx] = el)}
                  onClick={() => setSelectedIndex(idx)}
                  className={`group relative shrink-0 w-[200px] md:w-[240px] snap-start rounded-xl border transition ${
                    active ? "border-white/70 ring-1 ring-white/50" : "border-slate-800 hover:border-slate-600"
                  }`}
                  aria-label={`Select ${v.name}`}
                >
                  <div className="aspect-[16/10] w-full overflow-hidden rounded-xl">
                    <img
                      src={`${v.imageBase}?q=70&w=640&auto=format&fit=crop`}
                      alt={`Thumbnail of ${v.name}`}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  {/* Only the name over image */}
                  <div className="absolute inset-x-0 bottom-0 p-2 bg-black/60 backdrop-blur-sm rounded-b-xl">
                    <div className="text-[13px] font-semibold text-white truncate">{v.name}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Rectangular controls aligned to bottom-right */}
          <div className="mt-3 flex justify-end gap-2">
            <button
              onClick={prevCar}
              className="inline-flex items-center gap-2 h-10 px-4 rounded-lg border border-white/15 bg-white/5 text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              aria-label="Previous car"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextCar}
              className="inline-flex items-center gap-2 h-10 px-4 rounded-lg border border-white/15 bg-white/5 text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              aria-label="Next car"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Spec({ label, value, icon }) {
  return (
    <li className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-3">
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border bg-black/40 border-white/10 text-white">
        {icon}
      </span>
      <div>
        <div className="text-white/60 text-xs uppercase tracking-wide">{label}</div>
        <div className="font-medium">{value}</div>
      </div>
    </li>
  );
}

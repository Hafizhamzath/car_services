// ContactLuxury.jsx
import React from "react";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

// Brand palette
const BRAND_PRIMARY = "#4b0082";  // deep purple
const BRAND_LIGHT   = "#e5e6fa";  // light lavender
const BRAND_GOLD    = "#c7a55b";  // elegant gold accent

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i = 1) => ({
    opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.07 }
  }),
};

export default function ContactLuxury() {
  return (
    <section className="relative w-full overflow-hidden bg-[#0a1020] text-white">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_-10%,rgba(79,70,229,0.25),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(40%_40%_at_80%_20%,rgba(199,165,91,0.12),transparent_70%)]" />
      <div className="absolute inset-0 bg-black/45" />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-white/5 [box-shadow:inset_0_0_120px_rgba(0,0,0,0.55)]" />

      {/* Tightened vertical padding so footer can join neatly */}
      <div className="relative z-10 container mx-auto px-4 pt-10 md:pt-14 pb-8 md:pb-10">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span
            className="inline-flex items-center justify-center rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em]"
            style={{
              color: BRAND_LIGHT,
              border: "1px solid rgba(255,255,255,0.18)",
              background: "rgba(255,255,255,0.04)",
            }}
          >
            Contact Us
          </span>
          <h2
            className="mt-3 text-3xl font-bold leading-tight md:text-5xl"
            style={{ color: BRAND_LIGHT }}
          >
            Concierge Access. <span style={{ color: BRAND_GOLD }}>Anytime.</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base md:text-lg text-gray-300">
            One message connects you to discreet, precision-timed chauffeur logistics.
            We’ll align the vehicle, route, and timing to your agenda—quietly and flawlessly.
          </p>
        </motion.header>

        {/* Contact Cards */}
        <div className="relative mx-auto mt-8 max-w-6xl grid gap-6 md:grid-cols-3 md:gap-8">
          {/* Phone */}
          <motion.div
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={itemVariants}
            className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 md:p-6 backdrop-blur-lg transition-transform duration-300 hover:-translate-y-1"
          >
            <div
              className="flex h-12 w-12 items-center justify-center rounded-xl shrink-0"
              style={{ background: BRAND_PRIMARY, boxShadow: "0 10px 30px rgba(75,0,130,0.35)" }}
            >
              <Phone className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold" style={{ color: BRAND_LIGHT }}>Phone</h3>
              <div className="mt-2 space-y-1.5">
                <a href="tel:+97333692021" className="block text-gray-200 hover:text-white">+973 33692021</a>
                <a href="tel:+97335016007" className="block text-gray-200 hover:text-white">+973 35016007</a>
              </div>
              <a
                href="tel:+97333692021"
                className="mt-3 inline-flex items-center gap-2 text-sm"
                style={{ color: BRAND_GOLD }}
                aria-label="Call Flyinco now"
              >
                Call now <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>

          {/* Email */}
          <motion.div
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={itemVariants}
            className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 md:p-6 backdrop-blur-lg transition-transform duration-300 hover:-translate-y-1"
          >
            <div
              className="flex h-12 w-12 items-center justify-center rounded-xl shrink-0"
              style={{ background: BRAND_PRIMARY, boxShadow: "0 10px 30px rgba(75,0,130,0.35)" }}
            >
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold" style={{ color: BRAND_LIGHT }}>Email</h3>
              <a
                href="mailto:limo@flyinco.com"
                className="mt-2 block break-all text-gray-200 hover:text-white"
              >
                limo@flyinco.com
              </a>
              <a
                href="mailto:limo@flyinco.com?subject=Chauffeur%20Inquiry"
                className="mt-3 inline-flex items-center gap-2 text-sm"
                style={{ color: BRAND_GOLD }}
                aria-label="Email Flyinco"
              >
                Send email <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>

          {/* Address */}
          <motion.div
            custom={3}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={itemVariants}
            className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 md:p-6 backdrop-blur-lg transition-transform duration-300 hover:-translate-y-1"
          >
            <div
              className="flex h-12 w-12 items-center justify-center rounded-xl shrink-0"
              style={{ background: BRAND_PRIMARY, boxShadow: "0 10px 30px rgba(75,0,130,0.35)" }}
            >
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold" style={{ color: BRAND_LIGHT }}>Address</h3>
              <p className="mt-2 text-gray-200 leading-relaxed">
                <span className="font-medium">Flyinco Travel & Tourism W.L.L</span><br />
                CR.No. 167235-1<br />
                Office : A0227. Zubara Avenue, Awal Street,<br />
                Al Qudaybiyah 0308, Manama,<br />
                Kingdom of Bahrain
              </p>
              <a
                href="https://maps.google.com/?q=Al+Qudaybiyah+0308+Manama+Kingdom+of+Bahrain"
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-2 text-sm"
                style={{ color: BRAND_GOLD }}
                aria-label="Open in Google Maps"
              >
                Open in Maps <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Removed logo block & large bottom margin to let footer start closer */}
      </div>
    </section>
  );
}

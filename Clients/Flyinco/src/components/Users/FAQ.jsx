// FAQ.jsx
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion"; // adjust path if needed
import { Card, CardContent } from "../ui/card"; // adjust path if needed
import { Plus, Minus } from "lucide-react";
import { motion } from "framer-motion";

// Brand colors (same as Services.jsx)
const BRAND_PRIMARY = "#4b0082"; // deep purple
const BRAND_LIGHT = "#e5e6fa";   // light lavender

// Motion variants
const headerVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const gridVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const colVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function FAQ() {
  const items = [
    {
      q: "What services does Flyinco offer?",
      a: "Flyinco provides a comprehensive range of premium chauffeur services designed for discerning travelers. From seamless airport transfers and executive corporate travel to event logistics, group movements, and bespoke journeys, every service is tailored to deliver comfort, discretion, and absolute reliability.",
    },
    {
      q: "How do I book a chauffeur service?",
      a: "Booking with Flyinco is effortless. Simply reserve your journey through our website or by calling the contact number provided, and our team will handle every detail with precision. Share your travel requirements, select your preferred vehicle, and enjoy the assurance of a flawlessly managed service.",
    },
    {
      q: "What areas do you serve?",
      a: "Flyinco proudly operates across the Kingdom of Bahrain, offering premium chauffeur services for individuals, groups, and corporate clients. Whether within city limits or long-distance transfers, we ensure every journey is managed with elegance and punctuality.",
    },
    {
      q: "What types of vehicles are available in your fleet?",
      a: "Our fleet has been carefully curated to meet diverse travel needs while maintaining uncompromising luxury. Options include executive sedans, premium SUVs, luxury minibuses, and full-size coaches—each impeccably maintained to guarantee comfort, safety, and sophistication.",
    },
    {
      q: "Can I request a specific vehicle?",
      a: "Yes. We understand that preference defines the experience. You may select from our range of sedans, SUVs, minibuses, or buses at the time of booking, and we will confirm availability to ensure your journey is tailored to your exact requirements.",
    },
    {
      q: "How are your chauffeurs trained?",
      a: "Every Flyinco chauffeur is a consummate professional, handpicked for skill, discretion, and service excellence. They undergo rigorous training in advanced driving, customer etiquette, and safety standards, ensuring that your journey is not only smooth but also secure and exceptionally refined.",
    },
  ];

  return (
    <section className="relative w-full py-10 md:py-16 bg-[#0a1a2f] text-white overflow-hidden">
      {/* Background layers (subtle, professional) */}
      <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_-10%,rgba(75,0,130,0.18),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(45%_45%_at_85%_20%,rgba(229,230,250,0.10),transparent_70%)]" />
      <div className="absolute inset-0 bg-black/50" />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-white/5 [box-shadow:inset_0_0_120px_rgba(0,0,0,0.55)]" />

      {/* Optional animated spotlight */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6, x: ["-10%", "10%", "-10%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(229,230,250,0.12), transparent)" }}
      />

      {/* content above overlay */}
      <div className="relative z-10 container mx-auto px-4">
        {/* Centered heading at top */}
        <motion.header
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="mx-auto mb-8 max-w-3xl text-center md:mb-12"
        >
          <p
            className="text-lg md:text-xl font-semibold uppercase tracking-widest"
            style={{ color: BRAND_LIGHT }}
          >
            FAQ
          </p>
          <h2
            className="mt-2 text-3xl font-bold leading-tight md:text-4xl"
            style={{ color: BRAND_LIGHT }}
          >
            Frequently Asked Questions
          </h2>

          {/* elegant divider */}
          <div
            className="mx-auto mt-5 h-[2px] w-40 rounded-full"
            style={{
              background: `linear-gradient(90deg, transparent, ${BRAND_LIGHT}, transparent)`,
              opacity: 0.6,
            }}
          />
        </motion.header>

        <Card className="border-0 shadow-none bg-transparent">
          <CardContent className="p-0">
            <motion.div
              variants={gridVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid gap-12 md:grid-cols-2 md:gap-16"
            >
              {/* Left column (supporting copy) */}
              <motion.aside variants={colVariants} className="max-w-xl">
                <p className="mb-5 text-gray-200 leading-relaxed">
                  Discover clear answers to the most common inquiries about our
                  chauffeur services. From effortless booking and bespoke vehicle
                  selections to the professionalism and discretion of our
                  chauffeurs, every detail is designed to inspire confidence.
                </p>
                <p className="text-gray-200 leading-relaxed">
                  If your question isn’t listed, our team is just a call away.
                  Contact us directly—we’ll be delighted to provide personal
                  assistance.
                </p>
              </motion.aside>

              {/* Right column (accordion) */}
              <motion.div variants={colVariants}>
                <Accordion type="single" collapsible className="w-full">
                  {items.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.15 }}
                      transition={{ duration: 0.45, delay: i * 0.03 }}
                    >
                      <AccordionItem
                        value={`item-${i + 1}`}
                        className="border-b border-white/20"
                      >
                        <AccordionTrigger
                          className="
                            group/trigger py-5 text-left pr-0 hover:no-underline
                            rounded-md
                            [&>svg]:hidden
                            focus:outline-none focus:ring-0 focus-visible:ring-0
                            data-[state=open]:bg-transparent
                            hover:bg-transparent
                          "
                        >
                          <div className="flex w-full items-start justify-between gap-6">
                            <span
                              className="
                                text-base font-medium md:text-lg transition-colors
                                group-data-[state=open]/trigger:text-white hover:text-white
                              "
                              style={{ color: BRAND_LIGHT }}
                            >
                              {item.q}
                            </span>
                            <span className="mt-1 inline-flex shrink-0 items-center">
                              <Plus
                                className="size-5 group-data-[state=open]/trigger:hidden"
                                style={{ color: BRAND_LIGHT }}
                              />
                              <Minus
                                className="size-5 hidden group-data-[state=open]/trigger:inline"
                                style={{ color: BRAND_PRIMARY }}
                              />
                            </span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pb-6 text-gray-300">
                          {item.a}
                        </AccordionContent>
                      </AccordionItem>
                    </motion.div>
                  ))}
                </Accordion>
              </motion.div>
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

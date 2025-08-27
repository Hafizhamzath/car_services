// FAQ.jsx
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion"; // adjust path
import { Card, CardContent } from "../ui/card"; // adjust path
import { Plus, Minus } from "lucide-react";
import { motion } from "framer-motion";

export default function FAQ() {
  return (
    <section className="relative w-full bg-neutral-900 text-white">
      {/* Background gradient (dark gray instead of pure black) */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-neutral-800 to-neutral-900" />

      <div className="container mx-auto px-4 py-16 md:py-24">
        <Card className="border-0 shadow-none bg-transparent">
          <CardContent className="p-0">
            <div className="grid gap-12 md:grid-cols-2 md:gap-16">
              {/* Left column */}
              <motion.aside
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5 }}
                className="max-w-xl"
              >
                <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
                  FAQ
                </p>
                <h2 className="mb-5 text-3xl font-bold leading-tight md:text-4xl">
                  Frequently Asked Questions
                </h2>
                <p className="mb-5 text-gray-300">
                  Discover clear answers to the most common inquiries about our
                  chauffeur services. From effortless booking and bespoke vehicle
                  selections to the professionalism and discretion of our
                  chauffeurs, every detail is designed to inspire confidence.
                </p>
                <p className="text-gray-300">
                  If your question isn’t listed, our team is just a call away.
                  Contact us directly—we’ll be delighted to provide personal
                  assistance.
                </p>
              </motion.aside>

              {/* Right column */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Accordion type="single" collapsible className="w-full">
                  {/* Q1 */}
                  <AccordionItem value="item-1" className="border-b border-gray-700">
                    <AccordionTrigger className="group/trigger py-5 text-left hover:no-underline">
                      <div className="flex w-full items-start justify-between gap-6">
                        <span className="text-base font-medium md:text-lg">
                          What services does Flyinco offer?
                        </span>
                        <span className="mt-1 inline-flex shrink-0 items-center">
                          <Plus className="size-5 group-data-[state=open]/trigger:hidden" />
                          <Minus className="size-5 hidden group-data-[state=open]/trigger:inline" />
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-6 text-gray-400">
                      Flyinco provides a comprehensive range of premium chauffeur
                      services designed for discerning travelers. From seamless
                      airport transfers and executive corporate travel to event
                      logistics, group movements, and bespoke journeys, every
                      service is tailored to deliver comfort, discretion, and
                      absolute reliability.
                    </AccordionContent>
                  </AccordionItem>

                  {/* Q2 */}
                  <AccordionItem value="item-2" className="border-b border-gray-700">
                    <AccordionTrigger className="group/trigger py-5 text-left hover:no-underline">
                      <div className="flex w-full items-start justify-between gap-6">
                        <span className="text-base font-medium md:text-lg">
                          How do I book a chauffeur service?
                        </span>
                        <span className="mt-1 inline-flex shrink-0 items-center">
                          <Plus className="size-5 group-data-[state=open]/trigger:hidden" />
                          <Minus className="size-5 hidden group-data-[state=open]/trigger:inline" />
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-6 text-gray-400">
                      Booking with Flyinco is effortless. Simply reserve your
                      journey through our website or by calling the contact
                      number provided, and our team will handle every detail with
                      precision. Share your travel requirements, select your
                      preferred vehicle, and enjoy the assurance of a flawlessly
                      managed service.
                    </AccordionContent>
                  </AccordionItem>

                  {/* Q3 */}
                  <AccordionItem value="item-3" className="border-b border-gray-700">
                    <AccordionTrigger className="group/trigger py-5 text-left hover:no-underline">
                      <div className="flex w-full items-start justify-between gap-6">
                        <span className="text-base font-medium md:text-lg">
                          What areas do you serve?
                        </span>
                        <span className="mt-1 inline-flex shrink-0 items-center">
                          <Plus className="size-5 group-data-[state=open]/trigger:hidden" />
                          <Minus className="size-5 hidden group-data-[state=open]/trigger:inline" />
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-6 text-gray-400">
                      Flyinco proudly operates across the Kingdom of Bahrain,
                      offering premium chauffeur services for individuals, groups,
                      and corporate clients. Whether within city limits or
                      long-distance transfers, we ensure every journey is managed
                      with elegance and punctuality.
                    </AccordionContent>
                  </AccordionItem>

                  {/* Q4 */}
                  <AccordionItem value="item-4" className="border-b border-gray-700">
                    <AccordionTrigger className="group/trigger py-5 text-left hover:no-underline">
                      <div className="flex w-full items-start justify-between gap-6">
                        <span className="text-base font-medium md:text-lg">
                          What types of vehicles are available in your fleet?
                        </span>
                        <span className="mt-1 inline-flex shrink-0 items-center">
                          <Plus className="size-5 group-data-[state=open]/trigger:hidden" />
                          <Minus className="size-5 hidden group-data-[state=open]/trigger:inline" />
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-6 text-gray-400">
                      Our fleet has been carefully curated to meet diverse travel
                      needs while maintaining uncompromising luxury. Options
                      include executive sedans, premium SUVs, luxury minibuses,
                      and full-size coaches—each impeccably maintained to
                      guarantee comfort, safety, and sophistication.
                    </AccordionContent>
                  </AccordionItem>

                  {/* Q5 */}
                  <AccordionItem value="item-5" className="border-b border-gray-700">
                    <AccordionTrigger className="group/trigger py-5 text-left hover:no-underline">
                      <div className="flex w-full items-start justify-between gap-6">
                        <span className="text-base font-medium md:text-lg">
                          Can I request a specific vehicle?
                        </span>
                        <span className="mt-1 inline-flex shrink-0 items-center">
                          <Plus className="size-5 group-data-[state=open]/trigger:hidden" />
                          <Minus className="size-5 hidden group-data-[state=open]/trigger:inline" />
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-6 text-gray-400">
                      Yes. We understand that preference defines the experience.
                      You may select from our range of sedans, SUVs, minibuses,
                      or buses at the time of booking, and we will confirm
                      availability to ensure your journey is tailored to your
                      exact requirements.
                    </AccordionContent>
                  </AccordionItem>

                  {/* Q6 */}
                  <AccordionItem value="item-6" className="border-b border-gray-700">
                    <AccordionTrigger className="group/trigger py-5 text-left hover:no-underline">
                      <div className="flex w-full items-start justify-between gap-6">
                        <span className="text-base font-medium md:text-lg">
                          How are your chauffeurs trained?
                        </span>
                        <span className="mt-1 inline-flex shrink-0 items-center">
                          <Plus className="size-5 group-data-[state=open]/trigger:hidden" />
                          <Minus className="size-5 hidden group-data-[state=open]/trigger:inline" />
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-2 text-gray-400">
                      Every Flyinco chauffeur is a consummate professional,
                      handpicked for skill, discretion, and service excellence.
                      They undergo rigorous training in advanced driving,
                      customer etiquette, and safety standards, ensuring that
                      your journey is not only smooth but also secure and
                      exceptionally refined.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

// src/pages/AuthPage.jsx
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

// shadcn ui select
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import api from "../../lib/api"; // ✅ axios instance

import bgimg from "../../assets/Cars/Header.png";
import flagUAE from "../../assets/flags/uae.svg";
import flagBahrain from "../../assets/flags/bahrain.svg";
import flagKSA from "../../assets/flags/saudi.svg";

const countries = [
  { code: "+971", abbr: "UAE", flag: flagUAE },
  { code: "+973", abbr: "BHR", flag: flagBahrain },
  { code: "+966", abbr: "KSA", flag: flagKSA },
];

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    countryCode: "+971",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone" && !/^\d*$/.test(value)) return; // only numbers
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCountryChange = (value) => {
    setFormData((prev) => ({ ...prev, countryCode: value }));
  };

  // ✅ Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.email ||
      !formData.password ||
      (!isLogin &&
        (!formData.firstName || !formData.lastName || !formData.phone))
    ) {
      alert("All fields are required!");
      return;
    }

    const fullPhone = `${formData.countryCode}${formData.phone}`;
    const payload = { ...formData, phone: fullPhone };

    try {
      const { data } = await api.post(
        isLogin ? "/auth/login" : "/auth/register",
        payload
      );

      // ✅ Save user info in localStorage
      localStorage.setItem("userInfo", JSON.stringify(data));

      alert(isLogin ? "Login successful ✅" : "Registration successful ✅");

      // ✅ Redirect based on role
      if (isLogin) {
        if (data.role === "admin") {
          window.location.href = "/admin";
        } else {
          window.location.href = "/dashboard";
        }
      } else {
        window.location.href = "/dashboard"; // after registration
      }
    } catch (err) {
      console.error("Auth Error:", err);
      const msg =
        err.response?.data?.message || "Something went wrong. Please try again.";
      alert(msg);
    }
  };

  return (
    <div className="relative h-screen w-screen">
      {/* Background Image with dark overlay */}
      <div className="absolute inset-0">
        <img src={bgimg} alt="Background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Auth Box */}
      <div className="relative z-10 flex items-center justify-end h-full pr-16">
        <Card className="w-full max-w-md rounded-2xl shadow-2xl border border-gray-200 bg-white p-6 text-gray-800">
          {/* Tabs */}
          <div className="relative flex mb-6 bg-gray-100 rounded-lg overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 h-full w-1/2 rounded-lg"
              style={{ backgroundColor: "#4b0082" }}
              initial={false}
              animate={{ left: isLogin ? "0%" : "50%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
            <button
              className={`relative z-10 w-1/2 py-2 text-lg font-semibold ${
                isLogin ? "text-white" : "text-gray-600"
              }`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={`relative z-10 w-1/2 py-2 text-lg font-semibold ${
                !isLogin ? "text-white" : "text-gray-600"
              }`}
              onClick={() => setIsLogin(false)}
            >
              Register
            </button>
          </div>

          {/* Forms */}
          <AnimatePresence mode="wait">
            {isLogin ? (
              <motion.form
                key="login"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="border-gray-300 text-gray-800 placeholder-gray-500"
                />
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="border-gray-300 text-gray-800 placeholder-gray-500"
                />
                <Button
                  type="submit"
                  className="w-full text-white"
                  style={{ backgroundColor: "#4b0082" }}
                >
                  Login
                </Button>
              </motion.form>
            ) : (
              <motion.form
                key="register"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <Input
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="border-gray-300 text-gray-800 placeholder-gray-500"
                />
                <Input
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="border-gray-300 text-gray-800 placeholder-gray-500"
                />

                {/* Phone input */}
                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                  <Select
                    value={formData.countryCode}
                    onValueChange={handleCountryChange}
                  >
                    <SelectTrigger className="min-w-[140px] bg-gray-100 border-none focus:ring-0 text-gray-800">
                      <SelectValue>
                        <div className="flex items-center gap-2">
                          <img
                            src={
                              countries.find(
                                (c) => c.code === formData.countryCode
                              )?.flag
                            }
                            alt="flag"
                            className="w-5 h-5"
                          />
                          <span>
                            {
                              countries.find(
                                (c) => c.code === formData.countryCode
                              )?.abbr
                            }{" "}
                            {formData.countryCode}
                          </span>
                        </div>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-200 text-gray-800">
                      {countries.map((c) => (
                        <SelectItem key={c.code} value={c.code}>
                          <div className="flex items-center gap-2">
                            <img src={c.flag} alt={c.abbr} className="w-5 h-5" />
                            <span>
                              {c.abbr} {c.code}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <div className="flex-1 flex items-center bg-white px-3">
                    <input
                      type="text"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      inputMode="numeric"
                      className="flex-1 bg-transparent ml-3 py-2 text-gray-800 placeholder-gray-500 outline-none"
                    />
                  </div>
                </div>

                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="border-gray-300 text-gray-800 placeholder-gray-500"
                />
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="border-gray-300 text-gray-800 placeholder-gray-500"
                />
                <Button
                  type="submit"
                  className="w-full text-white"
                  style={{ backgroundColor: "#4b0082" }}
                >
                  Register
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </Card>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Mail } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

const Contact = () => {
  const pathname = usePathname();
  console.log(pathname);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const validateForm = () => {
    // Clear any previous error message
    setErrorMessage("");

    // Name validation (should not be empty)
    if (!formData.name.trim()) {
      setErrorMessage("Please fill out all fields correctly.");
      return false;
    }

    // Email validation (simple regex for checking valid email format)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      setErrorMessage("Please fill out all fields correctly.");
      return false;
    } else if (!emailRegex.test(formData.email)) {
      setErrorMessage("Please enter a valid email address.");
      return false;
    }

    // Message validation (should not be empty)
    if (!formData.message.trim()) {
      setErrorMessage("Please fill out all fields correctly.");
      return false;
    }

    return true;
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Stop form submission if validation fails
    }

    try {
      await fetch("/api/contactUs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      // Handle response or display success message
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="bg-[#fff9ef] gap-10 w-full px-6 sm:px-10 md:px-20 lg:px-40 py-20 flex flex-col lg:flex-row items-center justify-between h-auto lg:mt-[60px] lg:h-[calc(100vh-60px)] overflow-hidden">
      {/* Right (Contact Information) */}
      <div className="flex flex-col items-start gap-8 lg:gap-10 pt-8 lg:pt-0 lg:w-1/2">
        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold">
            Contact Us
          </h1>
          <p className="text-sm sm:text-base">
            Have queries? feel free to{" "}
            <span className="text-[#ffb433]">connect</span>,<br />
            we are available here <span className="font-bold">24x7</span> to
            help you!
          </p>
        </div>

        {/* Info */}
        <div className="space-y-4">
          <Link
            href="mailto:info@chimanlalsureshkumartextiles.com"
            className="flex items-center gap-2 text-sm sm:text-base"
          >
            <Mail height={18} width={18} color="#ffb433" />
            <span className="hover-underline-lr">
              info@chimanlalsureshkumartextiles.com
            </span>
          </Link>
          <Link
            href="tel:+91 4024567139"
            className="flex items-center gap-2 text-sm sm:text-base"
          >
            <Mail height={18} width={18} color="#ffb433" />
            <span className="hover-underline-lr">+91 40 2456 7139</span>
          </Link>
          <Link
            href="https://maps.app.goo.gl/5kywR3VZhLgpHGkS9"
            className="flex items-center gap-2 text-sm sm:text-base"
          >
            <Mail height={18} width={18} color="#ffb433" />
            <span className="hover-underline-lr">
              web ref - Street No. 132, CSK Textile on 2nd Floor,
              <br /> Jhunsi, Prayagraj
            </span>
          </Link>
        </div>

        {/* FAQ */}
        <Link href="/contact#faqs" className="space-y-2 hover-underline-lr">
          <h4 className="flex items-center text-base sm:text-lg font-bold">
            Frequently Asked Questions <ChevronRight size={20} />
          </h4>
          <p className="text-sm sm:text-base">
            See all the most frequently asked
            <br /> questions by customers.
          </p>
        </Link>
      </div>

      {/* Left (Form Section) */}
      <div className="bg-white mt-10 lg:mt-0 scale-100 md:scale-110 lg:scale-125 w-full flex flex-col lg:w-1/2 max-w-md rounded-lg  p-5 space-y-5 drop-shadow-lg overflow-hidden">
        <h3 className="font-semibold text-lg sm:text-xl">Ask A Query</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full p-2.5 h-10 text-sm border rounded-lg"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-2.5 h-10 text-sm border rounded-lg"
            />
            <textarea
              id="message"
              name="message"
              rows={6}
              value={formData.message}
              onChange={handleChange}
              className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300"
              placeholder="How can we help you?"
            />
          </div>

          <div className="flex flex-row gap-10 items-center justify-between">
            <Button type="submit">Send</Button>
            {/* Common Error Message */}
            <div className="w-fit h-fit py-1">
              {errorMessage && (
                <p className="text-red-500 text-[10px] animate-slide-up">
                  {errorMessage}
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;




"use client";

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSendMessage = async () => {
    if (!name || !email || !mobile || !message) {
      toast.error("All fields are required.");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, mobile, message }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Your message has been sent successfully!");
        setName("");
        setEmail("");
        setMobile("");
        setMessage("");
        
      } else {
        toast.error(data.message || "Failed to send message.");
      }
    } catch (error) {
      toast.error("Something went wrong. Try again!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12 px-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-10">📩 Contact Us</h1>
      <div className="max-w-5xl w-full bg-white shadow-lg rounded-xl p-10 grid lg:grid-cols-2 gap-10">
      <Toaster />
        
        {/* Contact Information */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-700">Our Contact Information</h2>
          <p className="text-gray-500">Feel free to reach out to us.</p>
          <div className="space-y-4">
            <p className="flex items-center gap-3 text-lg">📍 123 Main Street, Surat, Gujarat</p>
            <p className="flex items-center gap-3 text-lg">📞 +1 987 654 3210</p>
            <p className="flex items-center gap-3 text-lg">📧 info@company.com</p>
            <p className="flex items-center gap-3 text-lg">🕒 Mon - Fri: 9 AM - 6 PM</p>
          </div>
          <iframe
            className="w-full h-48 rounded-lg border"
            src="https://maps.google.com/maps?q=Surat,India&t=&z=13&ie=UTF8&iwloc=&output=embed"
          ></iframe>
        </div>

        {/* Message Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-700">Send Us a Message</h2>
          <p className="text-gray-500">We’d love to hear from you!</p>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border text-black rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Your Name"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border text-black rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Your Email"
          />
          <input
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="w-full p-3 border text-black rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Your Mobile Number"
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-3 border text-black rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Your Message"
          ></textarea>

          <button onClick={handleSendMessage} className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700">
            Send Message
          </button>
          
          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
          {success && <p className="text-green-600 text-center mt-2">{success}</p>}
        </div>
      </div>
    </div>
  );
}

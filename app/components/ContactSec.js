


// "use client";

// import { useState } from "react";
// import toast, { Toaster } from "react-hot-toast";

// export default function ContactSec() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [mobile, setMobile] = useState("");
//   const [message, setMessage] = useState("");
//   const [success, setSuccess] = useState("");
//   const [error, setError] = useState("");

//   const handleSendMessage = async () => {
//     if (!name || !email || !mobile || !message) {
//       toast.error("All fields are required.");
//       return;
//     }

//     try {
//       const res = await fetch("/api/contact", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, email, mobile, message }),
//       });

//       const data = await res.json();
//       if (data.success) {
//         toast.success("Your message has been sent successfully!");
//         setName("");
//         setEmail("");
//         setMobile("");
//         setMessage("");
        
//       } else {
//         toast.error(data.message || "Failed to send message.");
//       }
//     } catch (error) {
//       toast.error("Something went wrong. Try again!");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#FDFCFB] flex flex-col items-center py-12 px-6">
//       <h1 className="text-4xl font-bold text-gray-800 mb-10">📩 Contact Us</h1>
//       <div className="max-w-5xl w-full bg-white shadow-lg rounded-xl p-10 grid lg:grid-cols-2 gap-10">
//       <Toaster />
        
//         {/* Contact Information */}
//         <div className="space-y-6">
//           <h2 className="text-2xl font-semibold text-gray-700">Our Contact Information</h2>
//           <p className="text-gray-500">Feel free to reach out to us.</p>
//           <div className="space-y-4">
//             <p className="flex items-center gap-3 text-lg">📍 123 Main Street, Surat, Gujarat</p>
//             <p className="flex items-center gap-3 text-lg">📞 +1 987 654 3210</p>
//             <p className="flex items-center gap-3 text-lg">📧 info@company.com</p>
//             <p className="flex items-center gap-3 text-lg">🕒 Mon - Fri: 9 AM - 6 PM</p>
//           </div>
//           <iframe
//             className="w-full h-48 rounded-lg border"
//             src="https://maps.google.com/maps?q=Surat,India&t=&z=13&ie=UTF8&iwloc=&output=embed"
//           ></iframe>
//         </div>

//         {/* Message Section */}
//         <div className="space-y-4">
//           <h2 className="text-2xl font-semibold text-gray-700">Send Us a Message</h2>
//           <p className="text-gray-500">We’d love to hear from you!</p>

//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="w-full p-3 border text-black rounded-lg focus:ring-2 focus:ring-blue-500"
//             placeholder="Your Name"
//           />
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full p-3 border text-black rounded-lg focus:ring-2 focus:ring-blue-500"
//             placeholder="Your Email"
//           />
//           <input
//             type="text"
//             value={mobile}
//             onChange={(e) => setMobile(e.target.value)}
//             className="w-full p-3 border text-black rounded-lg focus:ring-2 focus:ring-blue-500"
//             placeholder="Your Mobile Number"
//           />
//           <textarea
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             className="w-full p-3 border text-black rounded-lg focus:ring-2 focus:ring-blue-500"
//             placeholder="Your Message"
//           ></textarea>

//           <button onClick={handleSendMessage} className="w-full bg-[#AC7D88] text-white py-3 rounded-lg hover:bg-[#946b73]">
//             Send Message
//           </button>
          
//           {error && <p className="text-red-500 text-center mt-2">{error}</p>}
//           {success && <p className="text-green-600 text-center mt-2">{success}</p>}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client"
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { EMAIL_REGEX, PHONE_REGEX } from "../utils/constants";

export default function ContactSec() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // State to track validation
  const [nameValid, setNameValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [mobileValid, setMobileValid] = useState(true);
  const [messageValid, setMessageValid] = useState(true);

  const validateForm = () => {
    let valid = true;

    // Validate Name
    if (!name || /[^a-zA-Z\s]/.test(name)) {
      setNameValid(false);  // Invalid if it contains numbers or special characters
      valid = false;
    } else {
      setNameValid(true);
    }

    // Validate Email
    if (!EMAIL_REGEX.test(email)) {
      setEmailValid(false);
      valid = false;
    } else {
      setEmailValid(true);
    }

    // Validate Mobile (Ensure it's a valid 10-digit number)
    if (!PHONE_REGEX.test(mobile)) {
      setMobileValid(false);
      valid = false;
    } else {
      setMobileValid(true);
    }

    // Validate Message
    if (!message) {
      setMessageValid(false);
      valid = false;
    } else {
      setMessageValid(true);
    }

    return valid;
  };

  const handleSendMessage = async () => {
    if (!validateForm()) {
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
    <div className="min-h-screen bg-[#FDFCFB] flex flex-col items-center py-12 px-6">
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

          {/* Name Input */}
          <input
            type="text"
            value={name}
            onChange={(e) => {
              // Only allow letters and spaces in the name field
              const newName = e.target.value.replace(/[^a-zA-Z\s]/g, "");
              setName(newName);
            }}
            className={`w-full p-3 border text-black rounded-lg focus:ring-2 focus:ring-blue-500 ${!nameValid ? "border-red-500" : ""}`}
            placeholder="Your Name"
          />

          {/* Email Input */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full p-3 border text-black rounded-lg focus:ring-2 focus:ring-blue-500 ${!emailValid ? "border-red-500" : ""}`}
            placeholder="Your Email"
          />

          {/* Mobile Input */}
          <input
  type="text"
  value={mobile}
  onChange={(e) => {
    const value = e.target.value;
    // Allow only numbers and limit the length to 10 characters
    const numericValue = value.replace(/[^0-9]/g, '').slice(0, 10);
    setMobile(numericValue);
  }}
  className={`w-full p-3 border text-black rounded-lg focus:ring-2 focus:ring-blue-500 ${mobile.length > 0 && mobile.length !== 10 ? "border-red-500" : ""}`}
  placeholder="Your Mobile Number"
/>


          {/* Message Input */}
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`w-full p-3 border text-black rounded-lg focus:ring-2 focus:ring-blue-500 ${!messageValid ? "border-red-500" : ""}`}
            placeholder="Your Message"
          ></textarea>

          <button
            onClick={handleSendMessage}
            className="w-full bg-[#AC7D88] text-white py-3 rounded-lg hover:bg-[#946b73]"
          >
            Send Message
          </button>

          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
          {success && <p className="text-green-600 text-center mt-2">{success}</p>}
        </div>
      </div>
    </div>
  );
}

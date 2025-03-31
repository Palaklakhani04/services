// export default function ContactSec(){
//     return(
//         <div>
//             <div className="contact-section-22 section-padding">
//   <div className="container">
//     <div className="contact-wrapper-11">
//       <div className="row g-4 justify-content-between">
//         <div className="col-lg-5">
//           <div className="contact-content">
//             <h2 className="wow fadeInUp" data-wow-delay=".3s">
//               We would love to talk about <br /> you&nbsp;amazing ideas
//             </h2>
//             <p className="wow fadeInUp" data-wow-delay=".5s">
//               Mauris non dignissim purus, ac commodo diam. Donec sitamet lacinia nulla. Aliquam quis purus in justo pulvinar tempor. Aliquam tellusnulla, sollicitudin at euismod nec.
//             </p>
//           </div>
//         </div>
//         <div className="col-lg-6">
//           <div className="contact-form-area">
//             <form action="contact.php" id="contact-form" method="POST">
//               <div className="row g-4">
//                 <div className="col-lg-6 wow fadeInUp" data-wow-delay=".3s">
//                   <div className="form-clt">
//                     <input type="text" name="name" id="name" placeholder="Enter Name" />
//                   </div>
//                 </div>
//                 <div className="col-lg-6 wow fadeInUp" data-wow-delay=".5s">
//                   <div className="form-clt">
//                     <input type="text" name="email" id="email21" placeholder="Enter Email" />
//                   </div>
//                 </div>
//                 <div className="col-lg-12 wow fadeInUp" data-wow-delay=".3s">
//                   <div className="form-clt">
//                     <textarea name="message" id="message" placeholder="Enter Message" defaultValue={""} />
//                   </div>
//                 </div>
//                 <div className="col-lg-6 wow fadeInUp" data-wow-delay=".5s">
//                   <button type="submit" className="theme-btn ">
//                     Send Message<i className="fa-solid fa-arrow-right-long" />
//                   </button>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>

//         </div>
//     )
// }


// "use client";

// import { useState } from "react";
// import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from "react-icons/fa";

// export default function ContactPage() {
//   const [formData, setFormData] = useState({ name: "", email: "", message: "" });
//   const [errors, setErrors] = useState({});
//   const [success, setSuccess] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const validateForm = () => {
//     let tempErrors = {};
//     if (!formData.name) tempErrors.name = "Name is required";
//     if (!formData.email) tempErrors.email = "Email is required";
//     if (!formData.message) tempErrors.message = "Message cannot be empty";
//     setErrors(tempErrors);
//     return Object.keys(tempErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       setSuccess("Your message has been sent successfully!");
//       setFormData({ name: "", email: "", message: "" });
//       setErrors({});
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12 px-6">
//       <h1 className="text-4xl font-bold text-gray-800 mb-10">📩 Contact Us</h1>
//       <div className="max-w-5xl w-full bg-white shadow-lg rounded-xl p-10 grid lg:grid-cols-2 gap-10">
//         {/* Contact Form */}
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <h2 className="text-2xl font-semibold text-gray-700">Send Us a Message</h2>
//           <p className="text-gray-500">We’d love to hear from you!</p>

//           <div>
//             <label className="block font-medium">Full Name</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full p-3 border text-black rounded-lg focus:ring-2 focus:ring-blue-500"
//               placeholder="Your Name"
//             />
//             {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
//           </div>

//           <div>
//             <label className="block font-medium">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full p-3 border text-black rounded-lg focus:ring-2 focus:ring-blue-500"
//               placeholder="Your Email"
//             />
//             {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
//           </div>

//           <div>
//             <label className="block font-medium">Message</label>
//             <textarea
//               name="message"
//               value={formData.message}
//               onChange={handleChange}
//               className="w-full p-3 border text-black rounded-lg focus:ring-2 focus:ring-blue-500"
//               placeholder="Your Message"
//             ></textarea>
//             {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
//           </div>

//           <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700">
//             Send Message
//           </button>
//           {success && <p className="text-green-600 text-center mt-2">{success}</p>}
//         </form>

//         {/* Contact Info */}
//         <div className="space-y-6">
//           <h2 className="text-2xl font-semibold text-gray-700"> Our Contact Information</h2>
//           <p className="text-gray-500">Feel free to reach out to us.</p>
//           <div className="space-y-4">
//             <p className="flex items-center gap-3 text-lg"><FaMapMarkerAlt className="text-green-600" /> 123 Main Street, Surat, Gujarat</p>
//             <p className="flex items-center gap-3 text-lg"><FaPhoneAlt className="text-green-600" /> +1 987 654 3210</p>
//             <p className="flex items-center gap-3 text-lg"><FaEnvelope className="text-green-600" /> info@company.com</p>
//             <p className="flex items-center gap-3 text-lg"><FaClock className="text-green-600" /> Mon - Fri: 9 AM - 6 PM</p>
//           </div>
//           <iframe
//             className="w-full h-48 rounded-lg border"
//             src="https://maps.google.com/maps?q=Surat,India&t=&z=13&ie=UTF8&iwloc=&output=embed"
//           ></iframe>
//         </div>
//       </div>
//     </div>
//   );
// }


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




"use client";
import Link from "next/link";
import { FaCheckCircle, FaTools, FaUsers, FaShieldAlt } from "react-icons/fa";

export default function AboutUs() {
  return (
    // <div className="bg-gray-50 py-16">
    //   {/* Mission & Vision Section */}
    //   <section className="container mx-auto px-6 md:px-12">
    //     <div className="grid md:grid-cols-2 gap-12 items-center">
    //       {/* Mission */}
    //       <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-brown-600">
    //         <h2 className="text-3xl font-bold text-green-10">Our Mission</h2>
    //         <p className="mt-4 text-gray-700">
    //           At EaseMate, we aim to simplify home maintenance by connecting homeowners with trusted professionals. Our goal is to provide quick, efficient, and high-quality services.
    //         </p>
    //       </div>
    //       {/* Vision */}
    //       <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-brown-600">
    //         <h2 className="text-3xl font-bold text-green-70">Our Vision</h2>
    //         <p className="mt-4 text-gray-700">
    //           We envision a future where home repairs and maintenance are hassle-free. With a seamless booking experience and top-tier service providers, we’re making home care easier than ever.
    //         </p>
    //       </div>
    //     </div>
    //   </section>

    //   {/* Why Choose Us Section */}
    //   <section className="container mx-auto px-6 md:px-12 py-16">
    //     <h2 className="text-3xl font-bold text-center text-brown-700">Why Choose EaseMate?</h2>
    //     <p className="text-center text-gray-600 mt-4">
    //       We bring expertise, trust, and convenience to home maintenance.
    //     </p>
    //     <div className="grid md:grid-cols-4 gap-8 mt-12">
    //       {/* Feature 1 */}
    //       <div className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-md border-t-4 border-brown-600">
    //         <FaCheckCircle className="text-green-800 text-5xl hover:scale-110 transition-transform" />
    //         <h3 className="text-xl font-semibold mt-4">Reliable Services</h3>
    //         <p className="text-gray-600 mt-2">Verified experts for top-notch quality.</p>
    //       </div>
    //       {/* Feature 2 */}
    //       <div className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-md border-t-4 border-brown-600">
    //         <FaTools className="text-green-900 text-5xl hover:scale-110 transition-transform" />
    //         <h3 className="text-xl font-semibold mt-4">Skilled Professionals</h3>
    //         <p className="text-gray-600 mt-2">Experienced specialists for every task.</p>
    //       </div>
    //       {/* Feature 3 */}
    //       <div className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-md border-t-4 border-brown-600">
    //         <FaUsers className="text-green-900 text-5xl hover:scale-110 transition-transform" />
    //         <h3 className="text-xl font-semibold mt-4">Customer-Centric</h3>
    //         <p className="text-gray-600 mt-2">We prioritize your home’s needs.</p>
    //       </div>
    //       {/* Feature 4 */}
    //       <div className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-md border-t-4 border-brown-600">
    //         <FaShieldAlt className="text-green-900 text-5xl hover:scale-110 transition-transform" />
    //         <h3 className="text-xl font-semibold mt-4">Secure & Trusted</h3>
    //         <p className="text-gray-600 mt-2">Background-checked service providers.</p>
    //       </div>
    //     </div>
    //   </section>

    //   {/* Call to Action Section */}
    //   <section className="container mx-auto px-6 md:px-12 py-10 text-center">
    //     <h2 className="text-2xl font-bold text-brown-700">Ready to Experience Hassle-Free Home Services?</h2>
    //     <p className="text-gray-600 mt-4">Book a service today or reach out to us for inquiries.</p>
    //     <div className="mt-6 flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
    //       <Link href="/service" className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition">Explore Services</Link>
    //       <Link href="/contactus" className="bg-gray-800 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gray-700 transition">Contact Us</Link>
    //     </div>
    //   </section>
    // </div>

    <div className="bg-[#FDFCFB] py-16">
    {/* Mission & Vision Section */}
    <section className="container mx-auto px-6 md:px-12">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Mission */}
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#AC7D88]">
          <h2 className="text-3xl font-bold text-[#3B3B3B]">Our Mission</h2>
          <p className="mt-4 text-[#7A7A7A]">
            At EaseMate, we aim to simplify home maintenance by connecting homeowners with trusted professionals. Our goal is to provide quick, efficient, and high-quality services.
          </p>
        </div>
        {/* Vision */}
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#AC7D88]">
          <h2 className="text-3xl font-bold text-[#3B3B3B]">Our Vision</h2>
          <p className="mt-4 text-[#7A7A7A]">
            We envision a future where home repairs and maintenance are hassle-free. With a seamless booking experience and top-tier service providers, we’re making home care easier than ever.
          </p>
        </div>
      </div>
    </section>
  
    {/* Why Choose Us Section */}
    <section className="container mx-auto px-6 md:px-12 py-16">
      <h2 className="text-3xl font-bold text-center text-[#2F2F2F]">Why Choose EaseMate?</h2>
      <p className="text-center text-[#7A7A7A] mt-4">
        We bring expertise, trust, and convenience to home maintenance.
      </p>
      <div className="grid md:grid-cols-4 gap-8 mt-12">
        {/* Feature 1 */}
        <div className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-md border-t-4 border-[#AC7D88]">
          <FaCheckCircle className="text-[#AC7D88] text-5xl hover:scale-110 transition-transform" />
          <h3 className="text-xl font-semibold mt-4 text-[#3B3B3B]">Reliable Services</h3>
          <p className="text-[#7A7A7A] mt-2">Verified experts for top-notch quality.</p>
        </div>
        {/* Feature 2 */}
        <div className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-md border-t-4 border-[#AC7D88]">
          <FaTools className="text-[#AC7D88] text-5xl hover:scale-110 transition-transform" />
          <h3 className="text-xl font-semibold mt-4 text-[#3B3B3B]">Skilled Professionals</h3>
          <p className="text-[#7A7A7A] mt-2">Experienced specialists for every task.</p>
        </div>
        {/* Feature 3 */}
        <div className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-md border-t-4 border-[#AC7D88]">
          <FaUsers className="text-[#AC7D88] text-5xl hover:scale-110 transition-transform" />
          <h3 className="text-xl font-semibold mt-4 text-[#3B3B3B]">Customer-Centric</h3>
          <p className="text-[#7A7A7A] mt-2">We prioritize your home’s needs.</p>
        </div>
        {/* Feature 4 */}
        <div className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-md border-t-4 border-[#AC7D88]">
          <FaShieldAlt className="text-[#AC7D88] text-5xl hover:scale-110 transition-transform" />
          <h3 className="text-xl font-semibold mt-4 text-[#3B3B3B]">Secure & Trusted</h3>
          <p className="text-[#7A7A7A] mt-2">Background-checked service providers.</p>
        </div>
      </div>
    </section>
  
    {/* Call to Action Section */}
    <section className="container mx-auto px-6 md:px-12 py-10 text-center">
      <h2 className="text-2xl font-bold text-[#2F2F2F]">Ready to Experience Hassle-Free Home Services?</h2>
      <p className="text-[#7A7A7A] mt-4">Book a service today or reach out to us for inquiries.</p>
      <div className="mt-6 flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
        <Link href="/service" className="bg-[#AC7D88] text-white px-6 py-3 rounded-lg text-lg font-semibold hover:brightness-110 transition">
          Explore Services
        </Link>
        <Link href="/contactus" className="bg-[#3B3B3B] text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-[#2F2F2F] transition">
          Contact Us
        </Link>
      </div>
    </section>
  </div>
  

  );
}

"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import Header from "@/app/components/Header";  // Import Header
import FooterSection from "@/app/components/FooterSection"; 
import Servicebg from "@/app/components/Servicebg";

export default function ServiceDetail () {
    const { id } = useParams();;
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchService = async () => {
            if (!id) return;
            try {
                const response = await axios.get(`/api/services/${id}`);
                setService(response.data.services);
            } catch (err) {
                setError("Service not found!");
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchService();
    }, [id]);

    if (loading) return <p className="text-center text-gray-500">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (

        
<div>
<Header />
<Servicebg />
        <div className="max-w-full mx-auto  p-8 bg-green-50">
    {/* Image Section */}
    <div className="flex justify-center items-center">
    <img 
    src={service.filePath} 
    alt={service.title} 
    className="w-40 h-40 object-cover rounded-full border-4 border-gray-300  transition-all duration-500 hover:brightness-90 hover:scale-105"
/>

    </div>


    {/* Service Info */}
    <div className="p-6 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900">{service.title}</h1>
        <p className="text-gray-600 mt-4 text-lg leading-relaxed">{service.description}</p>

        {/* Price & Booking Button */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6">
            <span className="text-3xl font-extrabold text-green-600 bg-green-100 px-6 py-2 rounded-full shadow-md">
                ₹{service.price}
            </span>
            <button className="mt-4 sm:mt-0 px-8 py-3 bg-green-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105">
                ✅ Book Now
            </button>
        </div>
    </div>
</div>
<FooterSection />
</div>
    );
}

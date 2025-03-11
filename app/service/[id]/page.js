"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import Header from "@/app/components/Header";  // Import Header
import FooterSection from "@/app/components/FooterSection";
import ServiceDetailsbg from "@/app/components/ServiceDetailsbg";

export default function ServiceDetail() {
    const { id } = useParams();
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
            
            <div>
      <div className="breadcrumb-wrapper bg-cover" style={{ backgroundImage: 'url("/assets/img/breadcrumb/project-breadcrumb.jpg")' }}>
        <div className="container">
          <div className="page-heading">
            <h1 className="wow fadeInUp" data-wow-delay=".3s">{service.title}</h1>
            <ul className="breadcrumb-items wow fadeInUp" data-wow-delay=".5s">
              <li>
                <a href="/">
                  Home
                </a>
              </li>
              <li>
                <i className="fa-regular fa-chevrons-right" />
              </li>
              <li>
                <a href="/service" >
                  Services
                </a>
            </li>
              <li>
                <i className="fa-regular fa-chevrons-right" />
              </li>
              <li>
              <a >{service.title}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>


    </div>

            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-8 mb-8 mt-8">
                {/* Service Image */}
                <div className="relative flex justify-center">
                    <img
                    src={service.filePath}
                    alt={service.title}
                    className="w-52 h-52 object-cover rounded-full border-4 border-green-500 shadow-lg transition-transform duration-300 hover:scale-110"
                    />
                </div>

                {/* Service Info */}
                <div className="text-center mt-6">
                    <h1 className="text-4xl font-bold text-gray-900">{service.title}</h1>
                    <p className="text-gray-600 mt-3 text-lg leading-relaxed">{service.description}</p>
                </div>

                {/* Features Section */}
                <div className="bg-gray-100 p-6 rounded-lg shadow-md mt-6">
                    <h2 className="text-2xl font-bold text-gray-700 text-center mb-4">🔥 Service Features</h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service?.features?.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-3 bg-white p-4 rounded-md shadow-sm border-l-4 border-green-500">
                        <span className="text-green-600 text-xl">✔</span>
                        <span><strong>{feature.name}</strong> {feature.description}</span>
                        </li>
                    ))}
                    </ul>
                </div>

                {/* Price & Booking */}
                <div className="flex flex-col sm:flex-row justify-between items-center mt-8">
                    <span className="text-4xl font-bold text-green-600 bg-green-100 px-6 py-2 rounded-lg shadow-md">
                    ₹{service.price}
                    </span>
                    <button className="mt-4 sm:mt-0 px-10 py-3 bg-gradient-to-r from-green-500 to-green-700 text-white text-lg font-semibold rounded-lg shadow-lg hover:scale-105 transition-all duration-300">
                    ✅ Book Now
                    </button>
                </div>
            </div>

            <FooterSection />
        </div>
    );
}

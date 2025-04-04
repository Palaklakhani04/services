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
    const router = useRouter();

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



<div className="max-w-5xl mx-auto mt-8 mb-8">
  {/* Price at the Top-Right */}
 

  {/* Image & Title Section */}
  <div className="flex items-center mt-2 border-b pb-3">
    {/* Small Service Image */}
    <img
      src={service.filePath}
      alt={service.title}
      className="w-14 h-14  object-cover  "
    />
    
    {/* Service Title */}
    <h1 className="ml-3 text-2xl font-semibold text-gray-900">{service.title}</h1>

    
  </div>

  {/* Description */}
  <p className="text-gray-700 mt-3 text-sm leading-relaxed max-w-4xl">
    {service.description}
  </p>

  
  <div className="mt-6">
                    <h4 className="text-lg font-bold text-gray-700 text-left mb-4">🔥 Service Features</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service?.features?.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-3 bg-white p-4 rounded-md shadow-sm border-l-4 border-green-500">
                        <span className="text-green-600 text-lg">✔</span>
                        <span><strong>{feature.name}</strong> {feature.description}</span>
                        </li>
                    ))}
                    </ul>
                </div>


  {/* Booking Button */}
  <div className="flex justify-between mt-5">
  <div className="flex justify-end">
    <span className="text-xl font-bold justify-end text-green-700">₹{service.price}</span>
  </div>
    <button
      onClick={() => {
        if (service?._id) {
          router.push(`/booking/${service._id}`);
        } else {
          console.error("Service ID is undefined");
        }
      }}
      className="px-4 py-3 bg-green-600 text-white text-sm font-semibold rounded-md hover:bg-green-700 transition-all"
    >
      ✅ Book Now
    </button>
  </div>
</div>









            <FooterSection />
        </div>
    );
}
  
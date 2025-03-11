"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ServiceSection(){

  const [services, setServices] = useState([]);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get("/api/getservices");
  
      // Filter out only active services
      const activeServices = response.data.services.filter(service => service.active);
  
      setServices(activeServices); // Set only active services in state
    } catch (err) {
      console.error("Error fetching services:", err);
      setError("Failed to fetch services.");
    }
  };
  



    return(
        <div>

          <h1 className="text-center text-4xl font-extrabold text-gray-900 mb-10 mt-5">🚀 Our Premium Services 🚀</h1>
          {error && <p className="text-red-500 text-center">{error}</p>}

          <div className="grid m-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
            {services.map((service) => (
               <div 
                key={service._id} 
                className="bg-white rounded-2xl shadow-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl duration-300"
                onClick={() => router.push(`/service/${service._id}`)}
              >

                <div className="relative">
                  <img 
                    src={service.filePath} 
                    alt={service.title} 
                    className="w-full h-48 object-contain"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-10 rounded-t-2xl"></div>
                </div>

                <div className="p-5">
                  <h3 className="text-2xl font-semibold text-gray-800">{service.title}</h3>
                  <p className="text-gray-600 mt-2">{service.description}</p>

                  <div className="flex justify-between items-center mt-4">
                    <span className="font-bold text-green-500 text-xl">₹{service.price}</span>
                    <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>


        </div>
    )
}
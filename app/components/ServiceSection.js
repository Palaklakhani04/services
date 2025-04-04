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
      


//       <div className="py-12 bg-gray-50">
//   <h1 className="text-center text-4xl font-bold text-gray-900 mb-10">🚀 Our Premium Services 🚀</h1>
//   {error && <p className="text-red-500 text-center">{error}</p>}

//   <div className="grid max-w-6xl mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//     {services.map((service) => (
//       <div
//         key={service._id}
//         className="group bg-white rounded-xl shadow-lg border border-gray-200 p-6 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
//         onClick={() => router.push(`/service/${service._id}`)}>
//         {/* Centered Image */}
//         <div className="w-20 h-20 mx-auto bg-green-500 p-1 rounded-full shadow-lg flex items-center justify-center">
//           <img src={service.filePath} alt={service.title} className="w-16 h-16 object-contain rounded-full" />
//         </div>

//         {/* Content */}
//         <div className="mt-6">
//           <h3 className="text-lg font-semibold text-gray-900">{service.title}</h3>
//           <p className="text-sm text-gray-600 mt-2">{service.description}</p>

//           {/* Price & Button */}
//           <div className="flex justify-between items-center mt-4">
//             <span className="text-lg font-bold text-green-600">₹{service.price}</span>
//             <button
//               onClick={(event) => {
//                 event.stopPropagation();
//                 router.push(`/booking/${service._id}`);
//               }}
//               className="px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-300"
//             >
//               ✅ Book Now
//             </button>
//           </div>
//         </div>
//       </div>
//     ))}
//   </div>
// </div>


<div className="py-12 bg-[#FDFCFB]">
  <h1 className="text-center text-4xl font-bold text-[#3B3B3B] mb-10">🚀 Our Premium Services 🚀</h1>
  {error && <p className="text-red-500 text-center">{error}</p>}

  <div className="grid max-w-6xl mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
    {services.map((service) => (
      <div
        key={service._id}
        className="group bg-[#FFFFFF] rounded-xl shadow-md border border-[#E5E5E5] p-6 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-2"
        onClick={() => router.push(`/service/${service._id}`)}>

        {/* Centered Image */}
        <div className="w-20 h-20 mx-auto bg-[#E4DCCF] p-1 rounded-full shadow-md flex items-center justify-center">
          <img src={service.filePath} alt={service.title} className="w-16 h-16 object-contain rounded-full" />
        </div>

        {/* Content */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-[#2F2F2F]">{service.title}</h3>
          <p className="text-sm text-[#7A7A7A] mt-2">{service.description}</p>

          {/* Price & Button */}
          <div className="flex justify-between items-center mt-4">
            <span className="text-lg font-bold text-[#AC7D88]">₹{service.price}</span>
            <button
              onClick={(event) => {
                event.stopPropagation();
                router.push(`/booking/${service._id}`);
              }}
              className="px-4 py-2 bg-[#AC7D88] text-white text-sm font-semibold rounded-lg shadow-sm hover:bg-[#946b73] transition duration-300"
            >
              ✅ Book Now
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>


      )
}
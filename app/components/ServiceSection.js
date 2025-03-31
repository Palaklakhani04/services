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
        // <div>

        //   <h1 className="text-center text-4xl font-extrabold text-gray-900 mb-10 mt-5">🚀 Our Premium Services 🚀</h1>
        //   {error && <p className="text-red-500 text-center">{error}</p>}

        //   <div className="grid m-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
        //     {services.map((service) => (
        //        <div 
        //         key={service._id} 
        //         className="bg-white rounded-2xl shadow-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl duration-300"
        //         onClick={() => router.push(`/service/${service._id}`)}
        //       >

        //         <div className="relative">
        //           <img 
        //             src={service.filePath} 
        //             alt={service.title} 
        //             className="w-full h-48 object-contain"
        //           />
        //           <div className="absolute inset-0 bg-black bg-opacity-10 rounded-t-2xl"></div>
        //         </div>

        //         <div className="p-5">
        //           <h3 className="text-2xl font-semibold text-gray-800">{service.title}</h3>
        //           <p className="text-gray-600 mt-2">{service.description}</p>

        //           <div className="flex justify-between items-center mt-4">
        //             <span className="font-bold text-green-500 text-xl">₹{service.price}</span>
        //             <button
        //               onClick={(event) => {
        //                 event.stopPropagation();
        //                   if (service?._id) {
        //                       router.push(`/booking/${service._id}`);
        //                   } else {
        //                       console.error("Service ID is undefined");
        //                   }
        //               }}
        //               className="mt-2 sm:mt-0 px-10 py-3 bg-gradient-to-r from-green-500 to-green-700 text-white text-lg font-semibold rounded-lg shadow-lg hover:scale-105 transition-all duration-300"
        //           >
        //               ✅ Book Now
        //           </button>
        //           </div>
        //         </div>
        //       </div>
        //     ))}
        //   </div>


        // </div>
    
    
      //   <div className="py-10 bg-gray-50">
      //   <h1 className="text-center text-4xl font-bold text-gray-900 mb-8">🚀 Our Premium Services 🚀</h1>
      //   {error && <p className="text-red-500 text-center">{error}</p>}
      
      //   <div className="grid max-w-6xl mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      //     {services.map((service) => (
      //       <div
      //         key={service._id}
      //         className="group relative bg-white rounded-xl shadow-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg duration-300 border border-gray-200"
      //         onClick={() => router.push(`/service/${service._id}`)}
      //       >
      //         {/* Image Section */}
      //         <img
      //           src={service.filePath}
      //           alt={service.title}
      //           className="w-full h-40 object-contain rounded-t-xl"
      //         />
      
      //         {/* Content */}
      //         <div className="p-4">
      //           <h3 className="text-lg font-semibold text-gray-800">{service.title}</h3>
      //           <p className="text-sm text-gray-600 mt-1 line-clamp-2">{service.description}</p>
      
      //           {/* Price & Button */}
      //           <div className="flex justify-between items-center mt-4">
      //             <span className="text-lg font-bold text-green-600">₹{service.price}</span>
      //             <button
      //               onClick={(event) => {
      //                 event.stopPropagation();
      //                 if (service?._id) {
      //                   router.push(`/booking/${service._id}`);
      //                 } else {
      //                   console.error("Service ID is undefined");
      //                 }
      //               }}
      //               className="px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-md shadow-md hover:bg-green-700 transition duration-300"
      //             >
      //               ✅ Book
      //             </button>
      //           </div>
      //         </div>
      //       </div>
      //     ))}
      //   </div>
      // </div>
      


      <div className="py-12 bg-gray-50">
  <h1 className="text-center text-4xl font-bold text-gray-900 mb-10">🚀 Our Premium Services 🚀</h1>
  {error && <p className="text-red-500 text-center">{error}</p>}

  <div className="grid max-w-6xl mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
    {services.map((service) => (
      <div
        key={service._id}
        className="group bg-white rounded-xl shadow-lg border border-gray-200 p-6 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
        onClick={() => router.push(`/service/${service._id}`)}>
        {/* Centered Image */}
        <div className="w-20 h-20 mx-auto bg-green-500 p-1 rounded-full shadow-lg flex items-center justify-center">
          <img src={service.filePath} alt={service.title} className="w-16 h-16 object-contain rounded-full" />
        </div>

        {/* Content */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-900">{service.title}</h3>
          <p className="text-sm text-gray-600 mt-2">{service.description}</p>

          {/* Price & Button */}
          <div className="flex justify-between items-center mt-4">
            <span className="text-lg font-bold text-green-600">₹{service.price}</span>
            <button
              onClick={(event) => {
                event.stopPropagation();
                router.push(`/booking/${service._id}`);
              }}
              className="px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-300"
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
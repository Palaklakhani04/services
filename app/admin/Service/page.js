"use client"
import axios from "axios"
import { useRouter } from "next/navigation";
import { useState,useEffect } from "react";

export default function ServiceSection() {
    const [services, setServices] = useState([]);
    const [error, setError] = useState("");
    const [filterStatus, setFilterStatus] = useState("all"); 
    const router = useRouter();
  
    useEffect(() => {
      fetchServices();
    }, []);
  
    const fetchServices = async () => {
      try {
        const response = await axios.get("/api/getservices");
        console.log("API Response:", response.data.services);
        setServices(response.data.services);
      } catch (err) {
        console.error("Error fetching services:", err);
        setError("Failed to fetch services.");
      }
    };
  
    const handleDelete = async (id) => {
      if (!confirm("Are you sure you want to delete this service?")) return;
  
      try {
        await axios.delete(`/api/delete-service/${id}`);
        setServices(services.filter((service) => service._id !== id));
        alert("Service deleted successfully!");
      } catch (err) {
        console.error("Error deleting service:", err);
        alert("Failed to delete service.");
      }
    };
  
    const toggleActiveStatus = async (id, currentStatus) => {
      try {
        await axios.put(`/api/update-service/${id}`, { active: !currentStatus });
  
        setServices(
          services.map((service) =>
            service._id === id ? { ...service, active: !currentStatus } : service
          )
        );
        alert(`Service ${currentStatus ? "deactivated" : "activated"} successfully!`);
      } catch (err) {
        alert("Failed to update service status.");
      }
    };
  
   // ✅ Filtering Logic
const filteredServices = services.filter((service) => {
  if (filterStatus === "active") return service.active;
  if (filterStatus === "inactive") return !service.active;
  return true; // 'all' case
});
  
    return (
      <div>
        <h1 className="text-center text-4xl font-extrabold text-gray-900 mb-10 mt-5">
          🚀 Our Premium Services 🚀
        </h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
  
        <div className="flex justify-center space-x-4 mb-5">
      <button
        onClick={() => setFilterStatus("all")}
        className={`px-6 py-2 font-semibold rounded-lg transition duration-200 ${
          filterStatus === "all" ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-800 hover:bg-gray-400"
        }`}
      >
        All Services
      </button>

      <button
        onClick={() => setFilterStatus("active")}
        className={`px-6 py-2 font-semibold rounded-lg transition duration-200 ${
          filterStatus === "active" ? "bg-green-600 text-white" : "bg-gray-300 text-gray-800 hover:bg-gray-400"
        }`}
      >
        Active Services
      </button>

      <button
        onClick={() => setFilterStatus("inactive")}
        className={`px-6 py-2 font-semibold rounded-lg transition duration-200 ${
          filterStatus === "inactive" ? "bg-red-600 text-white" : "bg-gray-300 text-gray-800 hover:bg-gray-400"
        }`}
      >
        Inactive Services
      </button>
      <button 
          onClick={() => router.push("/admin/dashboard")} 
          className="px-6 py-2 font-semibold rounded-lg transition duration-200 bg-gray-300 text-black hover:bg-gray-400"
        >
        ← Go to Dashboard
      </button>
    </div>
  
        <div className="grid m-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service._id}
              className="relative bg-white bg-opacity-80 backdrop-blur-lg shadow-lg rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              {/* Status Badge */}
              {/* <div
                className={`absolute top-2 right-2  text-sm font-semibold rounded-full text-white ${
                  service.active ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {service.active ? "Active" : "Inactive"}
              </div> */}
  
              {/* Service Image */}
              <div className="relative">
                <img
                  src={service.filePath}
                  alt={service.title}
                  className="w-full h-48 object-contain rounded-t-2xl"
                />
                <div className="absolute inset-0 bg-black bg-opacity-10 rounded-t-2xl"></div>
              </div>
  
              {/* Service Details */}
              <div className="p-5">
                <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
                <p className="text-gray-600 mt-2">{service.description}</p>
  
                {/* Price & Booking */}
                <div className="flex justify-between items-center mt-4">
                  <span className="font-bold text-green-600 text-xl">₹{service.price}</span>
                  <button className="px-4 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold rounded-lg shadow-md hover:scale-105 transition duration-300">
                    🛍️ Menu Book Now
                  </button>
                </div>
  
                {/* Action Buttons */}
                <div className="flex justify-between items-center mt-4 space-x-2">
                  {/* Edit Button */}
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      router.push(`/admin/edit-service/${service._id}`);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-gray-900 font-semibold rounded-lg shadow-md hover:bg-yellow-500 hover:scale-105 transition-all duration-300"
                  >
                    ✏️ Edit
                  </button>
  
                  {/* Delete Button */}
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      handleDelete(service._id);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 hover:scale-105 transition-all duration-300"
                  >
                    🗑️ Delete
                  </button>
                </div>
  
                {/* Activate/Deactivate Button */}
                <div className="mt-4">
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      toggleActiveStatus(service._id, service.active);
                    }}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-2 font-semibold rounded-lg shadow-md transition duration-300 hover:scale-105 ${
                      service.active
                        ? "bg-red-500 text-white hover:bg-red-600"
                        : "bg-green-500 text-white hover:bg-green-600"
                    }`}
                  >
                    {service.active ? "Deactivate" : "Activate"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
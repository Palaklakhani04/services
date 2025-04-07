"use client"
import AdminDashboardLayout from "@/app/components/AdminDashboardLayout";
import axios from "axios"
import { useRouter } from "next/navigation";
import { useState,useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FiEdit, FiTrash, FiCheckCircle, FiXCircle, FiTrash2 } from "react-icons/fi"; 

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
        toast.success("Service deleted successfully!");
      } catch (err) {
        console.error("Error deleting service:", err);
        toast.error("Failed to delete service.");
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
        toast.success(`Service ${currentStatus ? "deactivated" : "activated"} successfully!`);
      } catch (err) {
        toast.error("Failed to update service status.");
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
      <AdminDashboardLayout title={"Services"}  />
    {/* Page Title */}
    <div className="ml-10 mr-10">
   

<div className="pt-20 sm:pt-24"> {/* Adjust padding to avoid navbar overlap */}
  <h1 className="text-center text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
    🚀 Our Premium Services 🚀
  </h1>
  <Toaster />

  {/* Responsive Filter Buttons */}
  <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
    {["all", "active", "inactive"].map((status) => (
      <button
        key={status}
        onClick={() => setFilterStatus(status)}
        className={`px-4 sm:px-5 py-2 text-xs sm:text-sm font-medium rounded-md transition 
          ${filterStatus === status 
            ? status === "active"
              ? "bg-green-500 text-white" 
              : status === "inactive"
              ? "bg-red-500 text-white"
              : "bg-blue-500 text-white"
            : "bg-gray-300 text-gray-700 hover:bg-gray-400"
          }`}
      >
        {status === "all" ? "All Services" : status === "active" ? "Active" : "Inactive"}
      </button>
    ))}
  </div>
</div>



    {/* Responsive Table */}
    <div className="overflow-x-auto shadow-sm rounded-lg">
      <table className="w-full bg-white border border-gray-200 rounded-lg">
        <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
          <tr>
            <th className="p-3 text-left">Service</th>
            <th className="p-3 text-left hidden md:table-cell">Description</th>
            <th className="p-3">Price</th>
            <th className="p-3">Status</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredServices.map((service) => (
            <tr key={service._id} className="border-b hover:bg-gray-50 transition">
              <td className="p-3 flex items-center space-x-3">
                <img src={service.filePath} alt={service.title} className="w-12 h-12 rounded-md object-cover" />
                <span className="font-medium text-gray-900">{service.title}</span>
              </td>
              <td className="p-3 text-gray-600 text-sm hidden md:table-cell">{service.description}</td>
              <td className="p-3 font-semibold text-green-600">₹{service.price}</td>
              <td className="p-3">
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    service.active ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                  }`}
                >
                  {service.active ? "Active" : "Inactive"}
                </span>
              </td>
              <td className="p-3 flex justify-center space-x-3">
                {/* Edit Button */}
                <button
                  onClick={() => router.push(`/admin/edit-service/${service._id}`)}
                  className="p-2 text-blue-500 hover:text-blue-600 transition"
                  title="Edit Service"
                >
                  <FiEdit size={18} />
                </button>

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(service._id)}
                  className="p-2 text-red-500 hover:text-red-600 transition"
                  title="Delete Service"
                >
                  <FiTrash2 size={18} />
                </button>

                {/* Toggle Status Button */}
                <button
                  onClick={() => toggleActiveStatus(service._id, service.active)}
                  className={`p-2 transition ${
                    service.active ? "text-red-500 hover:text-red-600" : "text-green-500 hover:text-green-600"
                  }`}
                  title={service.active ? "Deactivate" : "Activate"}
                >
                  {service.active ? <FiXCircle size={18} /> : <FiCheckCircle size={18} />}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  </div>
    );
  }
  
"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "@/app/components/DashboardLayout";

export default function ServiceStatus() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserServiceStatus = async () => {
            try {
                const token = localStorage.getItem("token"); // Retrieve token from localStorage

                if (!token) {
                    console.error("No token found, user not logged in.");
                    setLoading(false);
                    setError("User not logged in.");
                    return;
                }

                const response = await axios.get("/api/bookings/service-status", {
                    headers: { Authorization: `Bearer ${token}` }, // Include token in headers
                });

                if (response.data.success) {
                    setServices(response.data.data);
                } else {
                    console.error("Error:", response.data.message);
                    setError(response.data.message);
                }
            } catch (error) {
                console.error("Network error:", error);
                setError("Network error while fetching services.");
            } finally {
                setLoading(false);
            }
        };

        fetchUserServiceStatus();
    }, []);




    if (loading) return <p className="text-center text-gray-500">Loading service status...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;

    return (
        <div className="p-6 mt-6 bg-white/80 backdrop-blur-lg rounded-lg shadow-lg border border-gray-200">
            <DashboardLayout title={'Services Status'} />


            {services.length === 0 ? (
                <p className="text-gray-600 mt-4">No services found.</p>
            ) : (
                <div className="overflow-x-auto mt-4">
                    <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
                        <thead>
                            <tr className="bg-black text-white text-sm uppercase tracking-wider">
                                <th className="py-3 px-4 text-left">Service Name</th>
                                <th className="py-3 px-4 text-left">Service Date</th>
                                <th className="py-3 px-4 text-left">Time</th>
                                <th className="py-3 px-4 text-left">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {services.map((service, index) => (
                                <tr key={service._id} className={`text-gray-800 text-sm border-b transition-all duration-300 
                                    ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:scale-[1.02] hover:shadow-md`}>
                                    <td className="py-3 px-4 font-medium">{service.title}</td>
                                    <td className="py-3 px-4">{new Date(service.serviceDate).toLocaleDateString()}</td>
                                    <td className="py-3 px-4">{service.serviceTime}</td>
                                    <td className="py-3 px-4">
                                        <span className={`px-3 py-1 text-xs font-semibold rounded-full 
                                            ${service.status === "Completed" ? "bg-green-200 text-green-700" :
                                                service.status === "Cancelled" ? "bg-red-200 text-red-700" :
                                                    service.status === "Pending" ? "bg-yellow-200 text-yellow-700" :
                                                        "bg-gray-200 text-gray-700"}`}>
                                            {service.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

// "use client";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// const CancelService = () => {
//     const router = useRouter();
//     const [canceledBookings, setCanceledBookings] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchCanceledBookings = async () => {
//             const token = localStorage.getItem("token");

//             if (!token) {
//                 setError("User not authenticated");
//                 setLoading(false);
//                 return;
//             }

//             try {
//                 const response = await fetch("/api/bookings/cancel", {
//                     method: "GET",
//                     headers: {
//                         "Authorization": `Bearer ${token}`,
//                     },
//                 });

//                 if (!response.ok) throw new Error("Failed to fetch canceled bookings");

//                 const data = await response.json();
//                 setCanceledBookings(data.canceledBookings);
//             } catch (error) {
//                 setError(error.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchCanceledBookings();
//     }, []);

//     if (loading) return <p className="text-center text-gray-500">Loading canceled services...</p>;
//     if (error) return <p className="text-center text-red-500">Error: {error}</p>;

//     return (
//         <div className="p-6 mt-6 bg-white/80 backdrop-blur-lg rounded-lg shadow-lg border border-gray-200">
//             {/* ✅ Header with Back Button */}
//             <div className="flex items-center justify-between pb-4 border-b">
//                 <h2 className="text-2xl font-bold text-gray-800">Canceled Services</h2>
//                 <button 
//                     onClick={() => router.push("/dashboard")}
//                     className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg shadow-md"
//                 >
//                     ← Back
//                 </button>
//             </div>

//             {/* ✅ Display Canceled Data */}
//             {canceledBookings.length === 0 ? (
//                 <p className="text-gray-500 text-center py-6">No canceled bookings found.</p>
//             ) : (
//                 <div className="overflow-x-auto mt-4">
//                     <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
//                         <thead>
//                             <tr className="bg-black text-white text-sm uppercase tracking-wider">
//                                 <th className="py-3 px-4 text-left">Service Name</th>
//                                 <th className="py-3 px-4 text-left">Service Date</th>
//                                 <th className="py-3 px-4 text-left">Reason</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {canceledBookings.map((booking, index) => (
//                                 <tr key={booking._id} className={`text-gray-800 text-sm border-b transition-all duration-300 
//                                     ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:scale-[1.02] hover:shadow-md`}>
//                                     <td className="py-3 px-4 font-medium">{booking.title}</td>
//                                     <td className="py-3 px-4">{new Date(booking.serviceDate).toLocaleDateString()}</td>
//                                     <td className="py-3 px-4 text-red-600">{booking.cancelReason || "No reason provided"}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default CancelService;



// app/dashboard/cancel/page.js

'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

const CancelServicePage = () => {
    const [services, setServices] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                console.warn("No token found, redirecting to login...");
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get("/api/bookings/history", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                console.log("Services:", response.data);
                // setServices(response.data.bookings || []); // ✅ Ensure it's an array
            
                // ✅ Filter out services canceled by the admin
                const filteredServices = response.data.bookings.filter(service => service.status !== "Canceled");
                setServices(filteredServices);
            } catch (error) {
                console.error("Error fetching services:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    const handleCancel = async (serviceId) => {
        if (!confirm('Are you sure you want to cancel this service?')) return;

        try {
            await axios.put(`/api/bookings/cancel/${serviceId}`, { status: "Cancelled by Admin" }); // ✅ Update status
            setServices((prevServices) => prevServices.filter(service => service._id !== serviceId)); // ✅ Remove from UI
            alert('Service canceled successfully');
        } catch (error) {
            console.error('Error canceling service:', error);
            alert('Failed to cancel service');
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Cancel Service</h2>
            {services.length === 0 ? (
                <p>No booked services available.</p>
            ) : (
                <ul className="space-y-4">
                    {services.map((service) => (
                        <li key={service._id} className="p-4 border rounded flex justify-between items-center">
                            <span>{service.title} - {new Date(service.serviceDate).toLocaleDateString()}</span>
                            <button onClick={() => handleCancel(service._id)} className="bg-red-500 text-white px-4 py-2 rounded">
                                Cancel
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CancelServicePage;

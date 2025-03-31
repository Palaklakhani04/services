

// 'use client';

// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import DashboardLayout from '@/app/components/DashboardLayout';

// const CancelServicePage = () => {
//     const [services, setServices] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchServices = async () => {
//             const token = localStorage.getItem("token");
//             if (!token) {
//                 console.warn("No token found, redirecting to login...");
//                 setLoading(false);
//                 return;
//             }

//             try {
//                 const response = await axios.get("/api/bookings/history", {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });

//                 console.log("Services:", response.data);
//                 // setServices(response.data.bookings || []); // ✅ Ensure it's an array
            
//                 // ✅ Filter out services canceled by the admin
//                 const filteredServices = response.data.bookings.filter(service => service.status !== "Cancelled"  && service.status !== "Completed");
//                 setServices(filteredServices);
//             } catch (error) {
//                 console.error("Error fetching services:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchServices();
//     }, []);

//     const handleCancel = async (serviceId) => {
//         if (!confirm('Are you sure you want to cancel this service?')) return;

//         try {
//             await axios.delete(`/api/bookings/cancel/${serviceId}`, { status: "Cancelled by Admin" }); // ✅ Update status
//             setServices((prevServices) => prevServices.filter(service => service._id !== serviceId)); // ✅ Remove from UI
//             alert('Service canceled successfully');
//         } catch (error) {
//             console.error('Error canceling service:', error);
//             alert('Failed to cancel service');
//         }
//     };

//     if (loading) return <p>Loading...</p>;

//     return (
//         <div className="p-4">
//             <DashboardLayout title={'Cancel Services List'} />
//             {services.length === 0 ? (
//                 <p>No booked services available.</p>
//             ) : (
//                 <ul className="space-y-4">
//                     {services.map((service) => (
//                         <li key={service._id} className="p-4 border rounded flex justify-between items-center">
//                             <span>{service.title} - {new Date(service.serviceDate).toLocaleDateString()}</span>
//                             <button onClick={() => handleCancel(service._id)} className="bg-red-500 text-white px-4 py-2 rounded">
//                                 Cancel
//                             </button>
//                         </li>
//                     ))}
//                 </ul>
//             )}
//         </div>
//     );
// };

// export default CancelServicePage;


'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardLayout from '@/app/components/DashboardLayout';
import { Trash2, Calendar, DollarSign } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

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

                // ✅ Filter services (exclude cancelled & completed)
                const filteredServices = response.data.bookings.filter(service => service.status !== "Cancelled" && service.status !== "Completed");
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
            await axios.delete(`/api/bookings/cancel/${serviceId}`, { status: "Cancelled by Admin" });
            setServices((prevServices) => prevServices.filter(service => service._id !== serviceId));
            toast.success('Service canceled successfully');
        } catch (error) {
            console.error('Error canceling service:', error);
            toast.error('Failed to cancel service');
        }
    };

    if (loading) return <p className="text-center text-gray-500">Loading...</p>;

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <DashboardLayout title="Cancel Services List" />

            <Toaster />

            {services.length === 0 ? (
                <p className="text-center text-gray-500 mt-6 text-lg">No booked services available.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    {services.map((service) => (
                        <div key={service._id} className="bg-white shadow-md rounded-lg p-5 border border-gray-200 relative">
                            
                            {/* ✅ Service Title */}
                            <h3 className="text-lg font-semibold text-gray-700">{service.title}</h3>

                            {/* ✅ Service Date Badge */}
                            <div className="absolute top-3 right-3 bg-blue-500 text-white text-xs px-3 py-1 rounded-full">
                                <Calendar className="w-4 h-4 inline-block mr-1" />
                                {new Date(service.serviceDate).toLocaleDateString()}
                            </div>

                            {/* ✅ Service Price */}
                            <div className="flex items-center text-green-600 text-md font-bold mt-4">
                                
                                <span>₹{service.price}</span>
                            </div>

                            {/* ✅ Cancel Button */}
                            <button 
                                onClick={() => handleCancel(service._id)} 
                                className="mt-6 w-full p-3 rounded-lg bg-red-500 text-white hover:bg-red-600 transition duration-200 flex items-center justify-center"
                                title="Cancel Service"
                            >
                                <Trash2 className="w-5 h-5 mr-2" />
                                Cancel
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CancelServicePage;

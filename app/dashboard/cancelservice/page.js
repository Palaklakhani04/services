

'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardLayout from '@/app/components/DashboardLayout';

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
                const filteredServices = response.data.bookings.filter(service => service.status !== "Cancelled");
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
            await axios.delete(`/api/bookings/cancel/${serviceId}`, { status: "Cancelled by Admin" }); // ✅ Update status
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
            <DashboardLayout title={'Cancel Services List'} />
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

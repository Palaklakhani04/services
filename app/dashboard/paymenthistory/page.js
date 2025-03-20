"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const PaymentHistory = () => {
    const router = useRouter();
    const [paidBookings, setPaidBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPaidBookings = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setError("User not authenticated");
                    setLoading(false);
                    return;
                }

                const response = await fetch("/api/bookings/payment", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch payment history");
                }

                const data = await response.json();
                console.log("Payment Data:", data.paidBookings); // Debugging
                setPaidBookings(data.paidBookings);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPaidBookings();
    }, []);

    // 🔹 Get Current Date (Without Time)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // ✅ Function to Determine Status Based on Date
    const getStatus = (serviceDate) => {
        const serviceDateObj = new Date(serviceDate);
        serviceDateObj.setHours(0, 0, 0, 0);

        const diffTime = today.getTime() - serviceDateObj.getTime();
        const diffDays = diffTime / (1000 * 3600 * 24); // Convert ms to days

        if (diffDays === 0) return "Paid"; // If service date is today
        if (diffDays >= 1) return "Failed"; // If service date was in the past
        if (diffDays < 0) return "Pending"; // If service date is in the future

        return "Unknown";
    };

    if (loading) return <p className="text-center text-gray-500">Loading payment history...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;

    return (
        <div className="p-6 mt-6 bg-white/80 backdrop-blur-lg rounded-lg shadow-lg border border-gray-200">
            {/* ✅ Header with Back Button */}
            <div className="flex items-center justify-between pb-4 border-b">
                <h2 className="text-2xl font-bold text-gray-800">Payment History</h2>
                <button 
                    onClick={() => router.push("/dashboard")}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg shadow-md"
                >
                    ← Back
                </button>
            </div>

            {/* ✅ Display Payment Data */}
            {paidBookings?.length === 0 ? (
                <p className="text-gray-500 text-center py-6">No payment history found.</p>
            ) : (
                <div className="overflow-x-auto mt-4">
                    <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
                        <thead>
                            <tr className="bg-black text-white text-sm uppercase tracking-wider">
                                <th className="py-3 px-4 text-left">Service Name</th>
                                <th className="py-3 px-4 text-left">Service Date</th>
                                <th className="py-3 px-4 text-left">Time</th>
                                <th className="py-3 px-4 text-left">Amount</th>
                                <th className="py-3 px-4 text-left">Payment Method</th>
                                <th className="py-3 px-4 text-left">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paidBookings?.map((booking, index) => {
                                const status = getStatus(booking.serviceDate); // 🔹 Dynamically calculate status

                                return (
                                    <tr key={booking._id} className={`text-gray-800 text-sm border-b transition-all duration-300 
                                        ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:scale-[1.02] hover:shadow-md`}>
                                        <td className="py-3 px-4 font-medium">{booking.title}</td>
                                        <td className="py-3 px-4">{new Date(booking.serviceDate).toLocaleDateString()}</td>
                                        <td className="py-3 px-4">{booking.serviceTime}</td>
                                        <td className="py-3 px-4 font-semibold text-indigo-600">₹{booking.price}</td>
                                        <td className="py-3 px-4">{booking.servicePay}</td>
                                        <td className="py-3 px-4">
                                            <span className={`px-3 py-1 text-xs font-semibold rounded-full 
                                                ${status === "Paid" ? "bg-green-200 text-green-700" :
                                                    status === "Pending" ? "bg-yellow-200 text-yellow-700" :
                                                        status === "Failed" ? "bg-red-200 text-red-700" : "bg-gray-200 text-gray-700"}`}>
                                                {status}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default PaymentHistory;

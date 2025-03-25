// "use client";

// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// const ServiceHistory = () => {
//     const router = useRouter()
//     const [bookings, setBookings] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchBookings = async () => {
//             try {
//                 const token = localStorage.getItem("token"); // Get token from storage
//                 if (!token) {
//                     setError("User not authenticated");
//                     setLoading(false);
//                     return;
//                 }

//                 const response = await fetch("/api/bookings/history", {
//                     method: "GET",
//                     headers: {
//                         Authorization: `Bearer ${token}`, // Send token in headers
//                     },
//                 });

//                 if (!response.ok) {
//                     throw new Error("Failed to fetch booking history");
//                 }

//                 const data = await response.json();
//                 setBookings(data.bookings);
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchBookings();
//     }, []);

//     if (loading) return <p>Loading booking history...</p>;
//     if (error) return <p>Error: {error}</p>;

//     return (
//         <div className="p-6 mt-6 bg-white rounded-xl shadow-lg">
//             {/* ✅ Header with Back Button */}
//             <div className="flex items-center justify-between pb-4 border-b">
//             <h2 className="text-2xl font-bold text-gray-800">Service Booking History</h2>
//                 <button 
//                     onClick={() => router.push("/dashboard")}
//                     className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg shadow-md"
//                 >
//                     ← Back
//                 </button>

//             </div>
//     {/* <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-3">Service Booking History</h2> */}
//     {bookings.length === 0 ? (
//         <p className="text-gray-500 text-center py-4">No booking history found.</p>
//     ) : (
//         <div className="overflow-x-auto">
//             <table className="w-full border border-gray-200 rounded-lg shadow-sm">
//                 <thead>
//                     <tr className="bg-black text-white text-sm uppercase">
//                         <th className="py-3 px-4 text-left">Service Title</th>
//                         <th className="py-3 px-4 text-left">Booking Date</th>
//                         <th className="py-3 px-4 text-left">Service Date</th>
//                         <th className="py-3 px-4 text-left">Time</th>
//                         <th className="py-3 px-4 text-left">Price</th>
//                         <th className="py-3 px-4 text-left">Payment</th>
//                         <th className="py-3 px-4 text-left">Status</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {bookings.map((booking, index) => (
//                         <tr key={booking._id} className={`text-gray-700 text-sm border-b ${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100`}>
//                             <td className="py-3 px-4">{booking.title}</td>
//                             <td className="py-3 px-4">{new Date(booking.bookingDate).toLocaleDateString()}</td>
//                             <td className="py-3 px-4">{new Date(booking.serviceDate).toLocaleDateString()}</td>
//                             <td className="py-3 px-4">{booking.serviceTime}</td>
//                             <td className="py-3 px-4 font-medium text-indigo-600">₹{booking.price}</td>
//                             <td className="py-3 px-4">{booking.servicePay}</td>
//                             <td className="py-3 px-4">
//                                 <span className={`px-3 py-1 text-xs font-medium rounded-full 
//                                     ${booking.status === "Completed" ? "bg-green-100 text-green-700" :
//                                         booking.status === "Pending" ? "bg-yellow-100 text-yellow-700" :
//                                             "bg-red-100 text-red-700"}`}>
//                                     {booking.status}
//                                 </span>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     )}
// </div>


//     );
// };

// export default ServiceHistory;


"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { handleError } from "@/app/lib/HandelError";
import { Toaster } from "react-hot-toast";
import DashboardLayout from "@/app/components/DashboardLayout";

const ServiceHistory = () => {
    const router = useRouter();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setError("User not authenticated");
                    setLoading(false);
                    return;
                }

                const response = await fetch("/api/bookings/history", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });


                if (!response.ok) {
                    throw new Error("Failed to fetch booking history");
                }

                const data = await response.json();
                console.log("🔹 API Response:", data); // ✅ Debug API Response
                setBookings(data.bookings || []);
                // ✅ Filter out cancelled services
                // const filteredBookings = data.bookings.filter(booking => booking.status !== "Canceled");
                // setBookings(filteredBookings);


            } catch (err) {

                handleError(err)
                // setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    // 🔹 Get Current Date (Without Time)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Function to Determine Status
    const getStatus = (serviceDate, bookingStatus) => {
        console.log(`🔹 Checking Status for Booking: ${bookingStatus}, Date: ${serviceDate}`); // Debugging

        if (bookingStatus === "Cancelled") {
            return "Cancelled"; // ✅ Correctly show Canceled status
        }

        const serviceDateObj = new Date(serviceDate);
        serviceDateObj.setHours(0, 0, 0, 0);

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const diffTime = today.getTime() - serviceDateObj.getTime();
        const diffDays = diffTime / (1000 * 3600 * 24); // Convert ms to days

        if (diffDays === 0) return "Active";  // If service date is today
        if (diffDays > 0) return "Expired";   // If service date was in the past
        if (diffDays < 0) return "Pending";   // If service date is in the future

        return "Unknown";
    };


    


    if (loading) return <p>Loading booking history...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="p-6 mt-6 bg-white/80 backdrop-blur-lg rounded-lg shadow-lg border border-gray-200">
            {/* ✅ Header with Back Button */}
            <Toaster />
            <DashboardLayout title={'Services Boocking History'} />

            {/* ✅ Display Booking Data */}
            {bookings?.length === 0 ? (
                <p className="text-gray-500 text-center py-6">No booking history found.</p>
            ) : (
                <div className="overflow-x-auto mt-4">
                    <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
                        <thead>
                            <tr className="bg-black text-white text-sm uppercase tracking-wider">
                                <th className="py-3 px-4 text-left">Service Title</th>
                                {/* <th className="py-3 px-4 text-left">Booking Date</th> */}
                                <th className="py-3 px-4 text-left">Service Date</th>
                                <th className="py-3 px-4 text-left">Time</th>
                                <th className="py-3 px-4 text-left">Price</th>
                                <th className="py-3 px-4 text-left">Payment</th>
                                <th className="py-3 px-4 text-left">Status</th>
                                <th className="py-3 px-4 text-left"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings?.map((booking, index) => {
                                const status = getStatus(booking.serviceDate, booking.status); // ✅ FIXED

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
                                                ${status === "Active" ? "bg-green-200 text-green-700" :
                                                    status === "Pending" ? "bg-yellow-200 text-yellow-700" :
                                                        status === "Expired" ? "bg-red-200 text-red-700" :
                                                            status === "Cancelled" ? "bg-gray-300 text-gray-800" :
                                                                "bg-gray-200 text-gray-700"}`}>
                                                {status}
                                            </span>
                                        </td>
                                        <td><button onClick={() => router.push('/view')}  className="bg-blue-500 text-white px-3 py-1 rounded">View</button></td>

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

export default ServiceHistory;

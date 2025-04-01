


"use client";
import { FiCheckCircle, FiTrash2, FiX } from "react-icons/fi";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AdminDashboardLayout from "@/app/components/AdminDashboardLayout";
import toast, { Toaster } from "react-hot-toast";


const AdminDashboard = () => {
    const router = useRouter();
    const [bookings, setBookings] = useState([]);
    const [expanded, setExpanded] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await fetch("/api/admin/bookings");
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setBookings(data);
        } catch (err) {
            setError(err.message);
        }
    };

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcomingServices = bookings.filter(service => new Date(service.serviceDate) > today);
    const completedServices = bookings.filter(service => service.status === "Completed");
    const canceledServices = bookings.filter(service => service.status === "Cancelled");

    // Function to complete a service
    const completeService = async (bookingId) => {
        try {
            const response = await fetch(`/api/admin/bookings/complete/${bookingId}`, {
                method: "PUT",
            });

            if (!response.ok) {
                throw new Error("Failed to complete service");
            }

            toast.success("Service marked as completed!");
            fetchBookings(); // Refresh dashboard
        } catch (error) {
            toast.error("Error completing service:", error);
        }
    };

    // Function to cancel a service
    // const cancelService = async (bookingId) => {
    //     try {
    //         const response = await fetch(`/api/admin/bookings/cancel/${bookingId}`, {
    //             method: "PUT",
    //         });

    //         if (!response.ok) {
    //             throw new Error("Failed to cancel service");
    //         }

            
    //         alert("Service cancelled successfully!");
    //         fetchBookings(); // Refresh dashboard
    //     } catch (error) {
    //         console.error("Error cancelling service:", error);
    //     }
    // };

    const cancelService = async (bookingId) => {
        try {
            const response = await fetch(`/api/admin/bookings/cancel/${bookingId}`, {
                method: "PUT",
            });
    
            if (!response.ok) {
                throw new Error("Failed to cancel service");
            }
    
           // Update state: Keep canceled services in statistics but hide from table
        setBookings((prevBookings) => 
            prevBookings.map(service => 
                service._id === bookingId ? { ...service, status: "Cancelled" } : service
            )
        );
        toast.success("Service cancelled successfully!");
        } catch (error) {
            toast.error("Error cancelling service:", error);
        }
    };

     // Logout function
     const handleLogout = () => {
        // Add any cleanup logic if needed (e.g., removing tokens)
        router.push("/admin/login");
    };
    

//     return (
// <div>
// <AdminDashboardLayout title={"Admin Dashboard"}/>
// <div className={`p-8 bg-gray-50 min-h-screen `}>
// {/* ${expanded ? "min-w-screen ml-10" : "min-w-screen ml-90"} */}

//    {/* <h1 className="flex iteam-center justify-center text-xl mb-10">Admin Dashboard</h1> */}

//     {/* Dashboard Summary Cards */}
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10 mt-10">
//         {[
//             { label: "Upcoming", count: upcomingServices.length, color: "bg-blue-100", text: "text-blue-700" },
//             { label: "Completed", count: completedServices.length, color: "bg-green-100", text: "text-green-700" },
//             { label: "Cancelled", count: canceledServices.length, color: "bg-red-100", text: "text-red-700" },
//             { label: "Total", count: bookings.length, color: "bg-gray-200", text: "text-gray-800" },
//         ].map(({ label, count, color, text }) => (
//             <div key={label} className={`p-6 rounded-xl shadow-md flex flex-col items-center ${color}`}>
//                 <h2 className={`text-lg font-semibold ${text}`}>{label} Services</h2>
//                 <p className={`text-4xl font-bold ${text}`}>{count}</p>
//             </div>
//         ))}
//     </div>

//     {/* Services Table */}
    

//     <div className="bg-white shadow-md rounded-lg p-6">
//     <h2 className="text-xl font-semibold text-center mb-4 text-gray-800">All Booked Services</h2>
//     {error && <p className="text-red-500 font-medium">Error: {error}</p>}
//         <table className="w-full border-collapse border border-gray-200 rounded-lg">
//             <thead>
//                 <tr className="bg-gray-100 text-gray-700 text-left">
//                     {["Service Name", "User", "Date", "Time", "Price", "Payment", "Status", "Actions"].map((header) => (
//                         <th key={header} className="py-3 px-4">{header}</th>
//                     ))}
//                 </tr>
//             </thead>
//             <tbody>
//                 {bookings.filter(service => {const serviceDate = new Date(service.serviceDate);
//                         return service.status !== "Cancelled" && (serviceDate >= today || service.status === "Completed");
//                     }).map((service) => (
//                     <tr key={service._id} className="border-b hover:bg-gray-100 transition">
//                         <td className="py-3 px-4">{service.title}</td>
//                         <td className="py-3 px-4">{service.userId}</td>
//                         <td className="py-3 px-4">{new Date(service.serviceDate).toLocaleDateString()}</td>
//                         <td className="py-3 px-4">{service.serviceTime}</td>
//                         <td className="py-3 px-4 font-semibold text-indigo-500">₹{service.price}</td>
//                         <td className="py-3 px-4">{service.servicePay}</td>
//                         <td className="py-3 px-4">
//                             <span className={`px-3 py-1 rounded-md text-white text-sm 
//                                 ${service.status === "Completed" ? "bg-green-500" : 
//                                   service.status === "Cancelled" ? "bg-red-500" : "bg-yellow-500"}`}>
//                                 {service.status}
//                             </span>
//                         </td>
//                         <td className="py-3 px-4">
//                             <div className="flex items-center space-x-3">
//                                 {service.status !== "Completed" && service.status !== "Cancelled" && (
//                                     <>
//                                         <button
//                                             onClick={() => completeService(service._id)}
//                                             className="text-green-500 hover:text-green-700 transition flex items-center"
//                                         >
//                                             <FiCheckCircle size={20} />
//                                         </button>
//                                         <button
//                                             onClick={() => cancelService(service._id)}
//                                             className="text-red-500 hover:text-red-700 transition flex items-center"
//                                         >
//                                             <FiX size={20} className="text-red-500 text-2xl cursor-pointer hover:scale-110 transition" />
//                                         </button>
//                                     </>
//                                 )}
//                             </div>
//                         </td>

//                     </tr>
//                 ))}
//             </tbody>


//         </table>
//     </div>
// </div>
// </div>
//     );
return(
    <div>
  <AdminDashboardLayout title={"Admin Dashboard"} />
  <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">
    <Toaster />
    
    {/* Dashboard Summary Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6 sm:mb-10 mt-6 sm:mt-10">
      {[
        { label: "Upcoming", count: upcomingServices.length, color: "bg-blue-100", text: "text-blue-700" },
        { label: "Completed", count: completedServices.length, color: "bg-green-100", text: "text-green-700" },
        { label: "Cancelled", count: canceledServices.length, color: "bg-red-100", text: "text-red-700" },
        { label: "Total", count: bookings.length, color: "bg-gray-200", text: "text-gray-800" },
      ].map(({ label, count, color, text }) => (
        <div key={label} className={`p-4 sm:p-6 rounded-xl shadow-md flex flex-col items-center ${color}`}>
          <h2 className={`text-md sm:text-lg font-semibold  ${text}`}>{label} Services</h2>
          <p className={`text-3xl sm:text-4xl font-bold ${text}`}>{count}</p>
        </div>
      ))}
    </div>

    {/* Services Table */}
    <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 overflow-x-auto">
      <h2 className="text-lg sm:text-xl font-semibold text-center mb-4 text-gray-800">All Booked Services</h2>
      {error && <p className="text-red-500 font-medium">Error: {error}</p>}
      
      <table className="w-full border-collapse border border-gray-200 rounded-lg min-w-max">
        <thead>
          <tr className="bg-gray-100 text-gray-700 text-left text-sm sm:text-base">
            {["Service Name", "User", "Date", "Time", "Price", "Payment", "Status", "Actions"].map((header) => (
              <th key={header} className="py-2 sm:py-3 px-3 sm:px-4">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bookings
            .filter(service => {
              const serviceDate = new Date(service.serviceDate);
              return service.status !== "Cancelled" && (serviceDate >= today || service.status === "Completed");
            })
            .map((service) => (
              <tr key={service._id} className="border-b hover:bg-gray-100 transition text-sm sm:text-base">
                <td className="py-2 sm:py-3 px-3 sm:px-4">{service.title}</td>
                <td className="py-2 sm:py-3 px-3 sm:px-4">{service.userDetails.name}</td>
                <td className="py-2 sm:py-3 px-3 sm:px-4">{new Date(service.serviceDate).toLocaleDateString()}</td>
                <td className="py-2 sm:py-3 px-3 sm:px-4">{service.serviceTime}</td>
                <td className="py-2 sm:py-3 px-3 sm:px-4 font-semibold text-indigo-500">₹{service.price}</td>
                <td className="py-2 sm:py-3 px-3 sm:px-4">{service.servicePay}</td>
                <td className="py-2 sm:py-3 px-3 sm:px-4">
                  <span className={`px-2 sm:px-3 py-1 rounded-md text-white text-xs sm:text-sm 
                      ${service.status === "Completed" ? "bg-green-500" : 
                        service.status === "Cancelled" ? "bg-red-500" : "bg-yellow-500"}`}>
                    {service.status}
                  </span>
                </td>
                <td className="py-2 sm:py-3 px-3 sm:px-4">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    {service.status !== "Completed" && service.status !== "Cancelled" && (
                      <>
                        <button
                          onClick={() => completeService(service._id)}
                          className="text-green-500 hover:text-green-700 transition flex items-center"
                        >
                          <FiCheckCircle size={18} />
                        </button>
                        <button
                          onClick={() => cancelService(service._id)}
                          className="text-red-500 hover:text-red-700 transition flex items-center"
                        >
                          <FiX size={18} />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>

)

};



export default AdminDashboard;

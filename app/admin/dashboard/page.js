
// export default function dashboard(){
//     return(
//         <div>
//             <div>
//             <div className="logo">
//                         <a className="header-logo" href="/">
//                             <img src="/assets/img/logo/black-logo.svg" alt="logo-img" />
//                         </a>
//                     </div>
//   <div className="dash-heading">
//     <h2>Dashboard</h2>
//   </div>
//   <section className="counter-section fix section-padding">
//     <div className="container">
//       <div className="row g-4">
//         <div className="col-xl-3 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay=".2s">
//           <div className="counter-items">
//             {/* <div class="icon">
//                           <img src="assets/img/icon/12.svg" alt="img">
//                       </div> */}
//             <div className="content1">
//               <h3>Up Coming Services</h3>                             
//               <h2><span className="count">10</span></h2>
//             </div>
//           </div>
//         </div>
//         <div className="col-xl-3 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay=".4s">
//           <div className="counter-items">
//             {/* <div class="icon">
//                           <img src="assets/img/icon/13.svg" alt="img">
//                       </div> */}
//             <div className="content1">
//               <h3>Cancel Services</h3>
//               <h2><span className="count">3</span></h2>
//             </div>
//           </div>
//         </div>
//         <div className="col-xl-3 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay=".6s">
//           <div className="counter-items">
//             {/* <div class="icon">
//                           <img src="assets/img/icon/14.svg" alt="img">
//                       </div> */}
//             <div className="content1">
//               <h3>Complete Services </h3>                             
//               <h2><span className="count">100</span></h2>
//             </div>
//           </div>
//         </div>
//         <div className="col-xl-3 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay=".8s">
//           <div className="counter-items">
//             {/* <div class="icon">
//                           <img src="assets/img/icon/15.svg" alt="img">
//                       </div> */}
//             <div className="content1">
//               <h3>Total Service</h3>     
//               <h2><span className="count">10,000</span></h2>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </section>
// </div>
//      </div>
//     )
// }




// "use client";
// import { useState, useEffect } from "react";

// export default function Dashboard() {
//     const [bookings, setBookings] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");

//     // Fetch bookings from API
//     useEffect(() => {
//         const fetchBookings = async () => {
//             try {
//                 const response = await fetch("/api/bookings");
//                 const data = await response.json();

//                 if (data.success) {
//                     setBookings(data.bookings);
//                 } else {
//                     setError("Error fetching bookings!");
//                 }
//             } catch (err) {
//                 setError("Failed to fetch bookings.");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchBookings();
//     }, []);

//     // 📌 Categorizing Services
//     const upcomingServices = bookings.filter(b => new Date(b.serviceDate) > new Date()).length;
//     const completedServices = bookings.filter(b => new Date(b.serviceDate) <= new Date()).length;
//     const canceledServices = 3; // Placeholder value, replace with real data
//     const totalServices = bookings.length;

//     return (
//         <div className="min-h-screen bg-gray-50 p-6">
//             {/* Header */}
//             <div className="bg-white shadow-md p-4 rounded-lg flex justify-between items-center">
//                 <h1 className="text-2xl font-bold text-gray-700">Admin Dashboard</h1>
//                 <button 
//                     onClick={() => window.location.reload()}
//                     className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
//                 >
//                     Refresh
//                 </button>
//             </div>

//             {/* Stats Cards */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
//                 {[{
//                     title: "Upcoming Services",
//                     count: upcomingServices,
//                     color: "text-blue-600",
//                     bg: "bg-blue-100"
//                 }, {
//                     title: "Completed Services",
//                     count: completedServices,
//                     color: "text-green-600",
//                     bg: "bg-green-100"
//                 }, {
//                     title: "Canceled Services",
//                     count: canceledServices,
//                     color: "text-red-600",
//                     bg: "bg-red-100"
//                 }, {
//                     title: "Total Services",
//                     count: totalServices,
//                     color: "text-purple-600",
//                     bg: "bg-purple-100"
//                 }].map((item, index) => (
//                     <div key={index} className={`p-6 rounded-lg shadow-md ${item.bg}`}>
//                         <h2 className="text-gray-600 text-lg">{item.title}</h2>
//                         <p className={`text-2xl font-bold ${item.color}`}>{item.count}</p>
//                     </div>
//                 ))}
//             </div>

//             {/* Recent Bookings Table */}
//             <div className="mt-8 bg-white shadow-md rounded-lg p-6">
//                 <h2 className="text-xl font-bold text-gray-700 mb-4">Recent Bookings</h2>

//                 {loading ? (
//                     <p className="text-center text-gray-500">Loading...</p>
//                 ) : error ? (
//                     <p className="text-center text-red-500">{error}</p>
//                 ) : (
//                     <div className="overflow-x-auto">
//                         <table className="w-full border-collapse">
//                             <thead>
//                                 <tr className="bg-gray-200">
//                                     <th className="p-3 text-left text-gray-600">Service</th>
//                                     <th className="p-3 text-left text-gray-600">Date</th>
//                                     <th className="p-3 text-left text-gray-600">Time</th>
//                                     <th className="p-3 text-left text-gray-600">Payment</th>
//                                     <th className="p-3 text-left text-gray-600">Price</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {bookings.slice(0, 5).map((booking, index) => (
//                                     <tr key={index} className="border-b hover:bg-gray-100 transition">
//                                         <td className="p-3">{booking.title}</td>
//                                         <td className="p-3">{new Date(booking.serviceDate).toLocaleDateString()}</td>
//                                         <td className="p-3">{booking.serviceTime}</td>
//                                         <td className="p-3">{booking.servicePay}</td>
//                                         <td className="p-3">₹{booking.price}</td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }



// "use client";
// import { useState, useEffect } from "react";

// export default function AdminDashboard() {
//     const [bookings, setBookings] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");

//     useEffect(() => {
//         const fetchBookings = async () => {
//             try {
//                 const response = await fetch("/api/bookings");
//                 const data = await response.json();
//                 if (data.success) {
//                     setBookings(data.bookings);
//                 } else {
//                     setError("Error fetching bookings!");
//                 }
//             } catch (err) {
//                 setError("Failed to fetch bookings.");
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchBookings();
//     }, []);

//     const upcomingServices = bookings.filter(b => new Date(b.serviceDate) > new Date()).length;
//     const completedServices = bookings.filter(b => new Date(b.serviceDate) <= new Date()).length;
//     const canceledServices = 3; // Placeholder value
//     const totalServices = bookings.length;

//     return (
//         <div className="min-h-screen bg-gray-100 p-6">
//             {/* Sidebar */}
//             <div className="flex">
//                 <aside className="w-64 bg-gray-800 text-white p-6 min-h-screen">
//                     <h2 className="text-2xl text-white font-bold mb-6">Admin Panel</h2>
//                     <nav>
//                         <ul>
//                             <li className="mb-3"><a href="#" className="block text-white p-2 bg-gray-700 rounded-md">Dashboard</a></li>
//                             <li className="mb-3"><a href="#" className="block  text-white p-2 hover:bg-gray-700 rounded-md">Bookings</a></li>
//                             <li className="mb-3"><a href="#" className="block text-white p-2 hover:bg-gray-700 rounded-md">Services</a></li>
//                             <li><a href="#" className="block p-2 hover:bg-gray-700 text-white rounded-md">Settings</a></li>
//                         </ul>
//                     </nav>
//                 </aside>

//                 {/* Main Content */}
//                 <main className="flex-1 p-6">
//                     <div className="bg-white shadow-md rounded-lg p-6">
//                         <h1 className="text-3xl font-bold text-gray-700 mb-4">Dashboard Overview</h1>

//                         {/* Stats Cards */}
//                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//                             {[
//                                 { title: "Upcoming", count: upcomingServices, color: "bg-blue-500" },
//                                 { title: "Completed", count: completedServices, color: "bg-green-500" },
//                                 { title: "Canceled", count: canceledServices, color: "bg-red-500" },
//                                 { title: "Total", count: totalServices, color: "bg-purple-500" }
//                             ].map((item, index) => (
//                                 <div key={index} className={`p-6 rounded-lg text-white ${item.color} shadow-md`}>
//                                     <h2 className="text-lg">{item.title} Services</h2>
//                                     <p className="text-2xl font-bold">{item.count}</p>
//                                 </div>
//                             ))}
//                         </div>

//                         {/* Recent Bookings Table */}
//                         <div className="mt-8 bg-gray-50 shadow-md rounded-lg p-6">
//                             <h2 className="text-xl font-bold text-gray-700 mb-4">Recent Bookings</h2>

//                             {loading ? (
//                                 <p className="text-center text-gray-500">Loading...</p>
//                             ) : error ? (
//                                 <p className="text-center text-red-500">{error}</p>
//                             ) : (
//                                 <div className="overflow-x-auto">
//                                     <table className="w-full border-collapse">
//                                         <thead>
//                                             <tr className="bg-gray-200">
//                                                 <th className="p-3 text-left">Service</th>
//                                                 <th className="p-3 text-left">Date</th>
//                                                 <th className="p-3 text-left">Time</th>
//                                                 <th className="p-3 text-left">Payment</th>
//                                                 <th className="p-3 text-left">Price</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             {bookings.slice(0, 5).map((booking, index) => (
//                                                 <tr key={index} className="border-b hover:bg-gray-100 transition">
//                                                     <td className="p-3">{booking.title}</td>
//                                                     <td className="p-3">{new Date(booking.serviceDate).toLocaleDateString()}</td>
//                                                     <td className="p-3">{booking.serviceTime}</td>
//                                                     <td className="p-3">{booking.servicePay}</td>
//                                                     <td className="p-3">${booking.price}</td>
//                                                 </tr>
//                                             ))}
//                                         </tbody>
//                                     </table>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </main>
//             </div>
//         </div>
//     );
// }
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const AdminDashboard = () => {
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await fetch("/api/admin/bookings", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setBookings(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchBookings();
    }, []);

    // Categorize services by status
    const upcomingServices = bookings.filter(service => service.status === "Upcoming");
    const completedServices = bookings.filter(service => service.status === "Completed");
    const canceledServices = bookings.filter(service => service.status === "Canceled");

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

            {/* Dashboard Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="p-4 bg-blue-200 text-black rounded-lg">
                    <h2 className="text-lg">Upcoming Services</h2>
                    <p className="text-xl font-bold">{upcomingServices.length}</p>
                </div>
                <div className="p-4 bg-green-200 text-black rounded-lg">
                    <h2 className="text-lg">Completed Services</h2>
                    <p className="text-xl font-bold">{completedServices.length}</p>
                </div>
                <div className="p-4 bg-red-200 text-black rounded-lg">
                    <h2 className="text-lg">Canceled Services</h2>
                    <p className="text-xl font-bold">{canceledServices.length}</p>
                </div>
                <div className="p-4 bg-gray-200 text-black rounded-lg">
                    <h2 className="text-lg">Total Services</h2>
                    <p className="text-xl font-bold">{bookings.length}</p>
                </div>
            </div>

            {/* Links for Admin Actions */}
            <div className="mb-6 flex space-x-4">
                <Link href="/admin/addServices">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded">Add Service</button>
                </Link>
                <Link href="/admin/Service">
                    <button className="px-4 py-2 bg-green-600 text-white rounded">View Services</button>
                </Link>
            </div>

            {/* Services Table */}
            <h2 className="text-xl font-semibold mb-3">All Booked Services</h2>
            {error && <p className="text-red-500">Error: {error}</p>}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="py-3 px-4 text-left">Service Name</th>
                            <th className="py-3 px-4 text-left">User</th>
                            <th className="py-3 px-4 text-left">Service Date</th>
                            <th className="py-3 px-4 text-left">Time</th>
                            <th className="py-3 px-4 text-left">Price</th>
                            <th className="py-3 px-4 text-left">Payment</th>
                            <th className="py-3 px-4 text-left">Status</th>
                            <th className="py-3 px-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((service) => (
                            <tr key={service._id} className="border">
                                <td className="py-3 px-4">{service.title}</td>
                                <td className="py-3 px-4">{service.userId}</td>
                                <td className="py-3 px-4">{new Date(service.serviceDate).toLocaleDateString()}</td>
                                <td className="py-3 px-4">{service.serviceTime}</td>
                                <td className="py-3 px-4 font-semibold text-indigo-600">₹{service.price}</td>
                                <td className="py-3 px-4">{service.servicePay}</td>
                                <td className="py-3 px-4">{service.status}</td>
                                <td className="py-3 px-4">
                                    {service.status !== "Canceled" && (
                                        <button
                                            onClick={() => cancelService(service._id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded"
                                        >
                                            Cancel
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// Cancel Service Function
const cancelService = async (id) => {
    try {
        const response = await fetch(`/api/admin/bookings/cancel/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            throw new Error("Failed to cancel service");
        }

        alert("Service canceled successfully!");
        window.location.reload();
    } catch (error) {
        alert("Error canceling service: " + error.message);
    }
};

export default AdminDashboard;

// 'use client'
// import Link from "next/link";
// import {  useEffect, useState } from "react";
// import axios from "axios";

// export default function Dashboard() {
//     const [stats, setStats] = useState({
//         totalServices: 0,
//         completedServices: 0,
//         cancelledServices: 0,
//         upcomingServices: 0,
//     });

//     const fetchDashboardStats = async () => {
//       try {
//           const { data } = await axios.get("/api/dashboard");
//           console.log(data); // Debugging
//           setStats(data); // Update state with API data
//       } catch (error) {
//           console.error("Failed to fetch dashboard stats:", error);
//       }
//   };

//   useEffect(() => {
//     fetchDashboardStats();
// }, []);


//     return (
//         <div>
//             <div className="dash-heading">
//                 <h2>Dashboard</h2>
//                 <div>
//                     <h2>Dashboard</h2>
//                     <nav>
//                         <ul>
//                             <li><Link href="/dashboard/servicehistory">Service History</Link></li>
//                             <li><Link href="/dashboard/cancelservice">Cancelled Services</Link></li>
//                             <li><Link href="/dashboard/paymenthistory">Payment History</Link></li>
//                         </ul>
//                     </nav>
//                 </div>
//             </div>

//             <section className="counter-section fix section-padding">

//                 <div className="container">
//                     <div className="row g-4">
//                         <CounterCard title="Up Coming Services" count={stats.upcomingServices} />
//                         <CounterCard title="Cancel Services" count={stats.cancelledServices} />
//                         <CounterCard title="Complete Services" count={stats.completedServices} />
//                         <CounterCard title="Total Service" count={stats.totalServices} />
//                     </div>
//                 </div>
//             </section>
//         </div>
//     );
// }

// const CounterCard = ({ title, count }) => (
//     <div className="col-xl-3 col-lg-4 col-md-6">
//         <div className="counter-items">
//             <div className="content1">
//                 <h3>{title}</h3>
//                 <h2><span className="count">{count}</span></h2>
//             </div>
//         </div>
//     </div>
// );


'use client'
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "./DashboardLayout";

export default function Dashboard() {
    const [stats, setStats] = useState({
        totalServices: 0,
        completedServices: 0,
        cancelledServices: 0,
        upcomingServices: 0,
    });

    const fetchDashboardStats = async () => {
        const token = localStorage.getItem("token"); // Retrieve token
        if (!token) {
            console.error("🚨 No token found. Please log in.");
            return;
        }

        try {
            const { data } = await axios.get("/api/dashboard", {
                headers: { "Authorization": `Bearer ${token}` } // ✅ Send token in headers
            });
            setStats(data);
        } catch (error) {
            console.error("❌ Failed to fetch dashboard stats:", error);
        }
    };


    useEffect(() => {
        fetchDashboardStats();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-10 to-gray-200 pt-[130px] px-6">

            <DashboardLayout title={'Dashboard'} />
            {/* Dashboard Stats Section */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <CounterCard title="Upcoming Services" count={stats.upcomingServices} color="from-blue-50 to-blue-40" icon="📅" />
                <CounterCard title="Cancelled Services" count={stats.cancelledServices} color="from-red-50 to-red-40" icon="❌" />
                <CounterCard title="Completed Services" count={stats.completedServices} color="from-green-50 to-green-40" icon="✅" />
                <CounterCard title="Total Services" count={stats.totalServices} color="from-gray-70 to-gray-50" icon="📊" />
            </section>
        </div>
    );
}

const CounterCard = ({ title, count, color, icon }) => (
    <div className={`p-6 rounded-xl shadow-xl bg-gradient-to-r ${color} text-white transform hover:scale-105 transition-all duration-300`}>
        <h3 className="text-xl font-semibold flex items-center gap-2">
            <span className="text-3xl">{icon}</span> {title}
        </h3>
        <h2 className="text-5xl font-extrabold mt-2">{count}</h2>
    </div>
);


import Link from "next/link";



export default function DashboardLayout({ title }) {



    return (
        <>
            {/* Dashboard Header */}
            <div className="bg-white/70 backdrop-blur-md shadow-lg rounded-xl p-6 mb-6 flex justify-between items-center">
                <h2 className="text-4xl font-extrabold text-gray-900">{title}</h2>
                {title === "Dashboard" ? (
                    <span className="text-lg text-gray-600">📊 Overview of Your Services</span>
                ) : (
                    <a href="/dashboard" className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition">
                        Go to Dashboard
                    </a>
                )}
            </div>

            {/* Navigation Tabs */}
            <nav className="bg-white/70 backdrop-blur-md shadow-md rounded-xl p-4 flex justify-center mb-8">
                <ul className="flex gap-6 text-lg font-semibold text-gray-700">
                    <li>
                        <Link href="/dashboard/servicehistory" className="px-5 py-2 rounded-lg bg-blue-100 hover:bg-blue-200 transition-all shadow-md">
                            📜 Service History
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard/cancelservice" className="px-5 py-2 rounded-lg bg-red-100 hover:bg-red-200 transition-all shadow-md">
                            ❌ Cancelled Services
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard/paymenthistory" className="px-5 py-2 rounded-lg bg-green-100 hover:bg-green-200 transition-all shadow-md">
                            💳 Payment History
                        </Link>
                    </li>
                   
                </ul>
            </nav>
        </>
    );
}


// import Link from "next/link";

// export default function DashboardLayout({ title }) {
//     return (
//         <div className="min-h-screen bg-gray-50 flex flex-col items-center p-10">
//             {/* Header Card */}
//             <div className="w-full max-w-3xl bg-white shadow-md rounded-xl p-6 text-center">
//                 <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
//                 {title === "Dashboard" ? (
//                     <p className="text-md text-gray-600 mt-2">📊 Track and manage your services effortlessly</p>
//                 ) : (
//                     <a href="/dashboard" className="mt-4 inline-block bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition">
//                         Go to Dashboard
//                     </a>
//                 )}
//             </div>

//             {/* Navigation Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//                 <Link href="/dashboard/servicehistory" className="bg-blue-100 p-6 rounded-lg shadow-md text-center hover:bg-blue-200 transition">
//                     <span className="text-4xl">📜</span>
//                     <h3 className="text-lg font-semibold text-gray-700 mt-2">Service History</h3>
//                 </Link>
//                 <Link href="/dashboard/cancelservice" className="bg-red-100 p-6 rounded-lg shadow-md text-center hover:bg-red-200 transition">
//                     <span className="text-4xl">❌</span>
//                     <h3 className="text-lg font-semibold text-gray-700 mt-2">Cancelled Services</h3>
//                 </Link>
//                 <Link href="/dashboard/paymenthistory" className="bg-green-100 p-6 rounded-lg shadow-md text-center hover:bg-green-200 transition">
//                     <span className="text-4xl">💳</span>
//                     <h3 className="text-lg font-semibold text-gray-700 mt-2">Payment History</h3>
//                 </Link>
//             </div>
//         </div>
//     );
// }

"use client"
import Link from "next/link";
import { ArrowLeft, History, XCircle, CreditCard } from "lucide-react";


export default function DashboardLayout({ title }) {



    return (
        


// <>
//     Dashboard Header with Navigation
//     <div className="bg-white/70 backdrop-blur-md shadow-md rounded-lg p-4 mb-4 flex justify-between items-center">
//         {/* Title Section */}
//         <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>

//         {/* Navigation Tabs */}
//         <nav className="flex items-center gap-4">
//             <Link href="/dashboard/servicehistory" className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-100 hover:bg-blue-200 transition-all shadow-md transform hover:scale-105">
//                 <History className="w-5 h-5" /> <span className="font-medium">Service History</span>
//             </Link>
//             <Link href="/dashboard/cancelservice" className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-red-100 hover:bg-red-200 transition-all shadow-md transform hover:scale-105">
//                 <XCircle className="w-5 h-5" /> <span className="font-medium">Cancelled Services</span>
//             </Link>
//             <Link href="/dashboard/paymenthistory" className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-green-100 hover:bg-green-200 transition-all shadow-md transform hover:scale-105">
//                 <CreditCard className="w-5 h-5" /> <span className="font-medium">Payment History</span>
//             </Link>
//         </nav>

//         {/* Back to Dashboard Button */}
//         {title !== "Dashboard" && (
//             <Link href="/dashboard" className="flex items-center gap-2 px-4 py-1.5 rounded-md bg-gray-200 hover:bg-gray-300 transition-all shadow-md transform hover:scale-105">
//                 <ArrowLeft className="w-5 h-5" /> <span className="font-medium">Dashboard</span>
//             </Link>
//         )}
//     </div>
// </>

<div className="bg-white/70 backdrop-blur-md shadow-md rounded-lg px-4 py-3 mb-4">
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

    {/* Title */}
    <h2 className="text-lg sm:text-xl font-semibold text-gray-900 text-center sm:text-left">
      {title}
    </h2>

    {/* Navigation + Back Button */}
    <div className="flex flex-wrap justify-center sm:justify-end items-center gap-2 sm:gap-3">

      {/* Navigation Tabs */}
      <Link href="/dashboard/servicehistory" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm bg-blue-100 hover:bg-blue-200 rounded-md transition-all shadow hover:scale-105">
        <History className="w-4 h-4" />
        <span>History</span>
      </Link>

      <Link href="/dashboard/cancelservice" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm bg-red-100 hover:bg-red-200 rounded-md transition-all shadow hover:scale-105">
        <XCircle className="w-4 h-4" />
        <span>Cancelled</span>
      </Link>

      <Link href="/dashboard/paymenthistory" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm bg-green-100 hover:bg-green-200 rounded-md transition-all shadow hover:scale-105">
        <CreditCard className="w-4 h-4" />
        <span>Payments</span>
      </Link>

      {/* Back Button */}
      {title !== "Dashboard" && (
        <Link href="/dashboard" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm bg-gray-200 hover:bg-gray-300 rounded-md transition-all shadow hover:scale-105">
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </Link>
      )}
    </div>
  </div>
</div>



    );
}



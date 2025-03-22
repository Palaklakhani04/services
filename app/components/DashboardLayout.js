import Link from "next/link";



export default function DashboardLayout({ title }) {



    return (
        <>
            {/* Dashboard Header */}
            <div className="bg-white/70 backdrop-blur-md shadow-lg rounded-xl p-6 mb-6 flex justify-between items-center">
                <h2 className="text-4xl font-extrabold text-gray-900">{title}</h2>
                <span className="text-lg text-gray-600">📊 Overview of Your Services</span>
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
                    <li>
                        <Link href="/dashboard/servicestatus" className="px-5 py-2 rounded-lg bg-yellow-100 hover:bg-yellow-200 transition-all shadow-md">
                            ⚡ Service Status
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    );
}
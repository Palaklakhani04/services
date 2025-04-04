
"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaChartPie } from "react-icons/fa";
import { FiPlusCircle, FiGrid, FiUsers, FiLogOut, FiMessageSquare, FiHome, FiMenu } from "react-icons/fi";

export default function AdminDashboardLayout({ title }) {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        console.log("Logging out...");
        router.push('/admin/login')
        // Implement logout logic here
    };

    return (
        

        <div className="min-h-10 bg-gray-50 z-50">
            {/* Navbar */}
            <nav className="bg-white shadow-md fixed top-0 left-0 w-full flex items-center justify-between px-6 py-3 border-b border-gray-200 z-50">
                
                {/* Dashboard Title */}
                <h1 className="text-lg lg:text-xl font-semibold text-gray-800">{title}</h1>

                {/* Desktop Navigation (Hidden before 850px) */}
                <div className="hidden max-[850px]:hidden lg:flex space-x-6 text-gray-700 font-medium">
                    <Link href="/admin/dashboard">
                        <span className="flex items-center gap-2 cursor-pointer hover:text-blue-600 transition">
                            <FaChartPie className="text-lg" /> Dashboard
                        </span>
                    </Link>
                    <Link href="/admin/addServices">
                        <span className="flex items-center gap-2 cursor-pointer hover:text-blue-600 transition">
                            <FiPlusCircle className="text-lg" /> Add Service
                        </span>
                    </Link>
                    <Link href="/admin/Service">
                        <span className="flex items-center gap-2 cursor-pointer hover:text-green-600 transition">
                            <FiGrid className="text-lg" /> View Services
                        </span>
                    </Link>
                    <Link href="/admin/dashboard/users">
                        <span className="flex items-center gap-2 cursor-pointer hover:text-gray-600 transition">
                            <FiUsers className="text-lg" /> Users
                        </span>
                    </Link>
                    <Link href="/admin/inquiries">
                        <span className="flex items-center gap-2 cursor-pointer hover:text-purple-600 transition">
                            <FiMessageSquare className="text-lg" /> Inquiries
                        </span>
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 cursor-pointer text-red-500 hover:text-red-600 transition"
                    >
                        <FiLogOut className="text-lg" /> Logout
                    </button>
                </div>

                {/* Mobile Menu Button (Shows before 850px) */}
                <button 
                    className="lg:hidden max-[850px]:block text-gray-700 focus:outline-none"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <FiMenu className="text-2xl" />
                </button>
            </nav>

            {/* Mobile Dropdown Menu (Only Shows When Menu is Open) */}
            {isMenuOpen && (
                <div className="lg:hidden max-[850px]:block absolute top-14 left-0 w-full bg-white shadow-md z-40 p-4 space-y-3 border-b border-gray-200">
                    <Link href="/admin/dashboard">
                        <span className="block cursor-pointer hover:text-blue-600 transition">
                            <FaChartPie className="text-lg inline-block mr-2" /> Dashboard
                        </span>
                    </Link>
                    <Link href="/admin/addServices">
                        <span className="block cursor-pointer hover:text-blue-600 transition">
                            <FiPlusCircle className="text-lg inline-block mr-2" /> Add Service
                        </span>
                    </Link>
                    <Link href="/admin/Service">
                        <span className="block cursor-pointer hover:text-green-600 transition">
                            <FiGrid className="text-lg inline-block mr-2" /> View Services
                        </span>
                    </Link>
                    <Link href="/admin/dashboard/users">
                        <span className="block cursor-pointer hover:text-gray-600 transition">
                            <FiUsers className="text-lg inline-block mr-2" /> Users
                        </span>
                    </Link>
                    <Link href="/admin/inquiries">
                        <span className="block cursor-pointer hover:text-purple-600 transition">
                            <FiMessageSquare className="text-lg inline-block mr-2" /> Inquiries
                        </span>
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="block w-full text-left cursor-pointer text-red-500 hover:text-red-600 transition"
                    >
                        <FiLogOut className="text-lg inline-block mr-2" /> Logout
                    </button>
                </div>
            )}
        </div>
    );
}




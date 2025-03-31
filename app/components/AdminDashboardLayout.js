

// import Link from "next/link";

// export default function AdminDashboardLayout({title}) {


// return(
// <div>
   
   
//    {/* Dashboard Header */}
//     <div className="flex items-center justify-between mb-8">
//         <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
//         <div className="flex space-x-4">
            
//             <Link href="/admin/addServices">
//                 <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
//                     Add Service
//                 </button>
//             </Link>
//             <Link href="/admin/Service">
//                 <button className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition">
//                     View Services
//                 </button>
//             </Link>
//             <Link href="/admin/dashboard/users">
//                 <button className="px-4 py-2 bg-gray-600 text-white rounded-lg shadow hover:bg-gray-700 transition">
//                     User Detail
//                 </button>
//             </Link>
//             <button
//                         onClick={handleLogout}
//                         className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
//                     >
//                         Logout
//                     </button>
//         </div>
//     </div>

//     </div>
// )}

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
        // <div className="min-h-10 bg-gray-50 z-50">
        //     {/* Navbar */}
        //     <nav className="bg-white shadow-md fixed top-0 left-0 w-full flex items-center justify-between px-8 py-3 border-b border-gray-200 z-50">
                
        //         {/* Dashboard Title */}
        //         <h1 className="text-xl font-semibold text-gray-800">{title}</h1>

        //         {/* Navigation Links */}
        //         <div className="flex space-x-8 text-gray-700 font-medium">

        //         <Link href="/admin/dashboard">
        //                 <span className="flex items-center gap-2 cursor-pointer hover:text-blue-600 transition">
        //                     <FaChartPie className="text-lg" /> Dashboard
        //                 </span>
        //             </Link>
                    
        //             <Link href="/admin/addServices">
        //                 <span className="flex items-center gap-2 cursor-pointer hover:text-blue-600 transition">
        //                     <FiPlusCircle className="text-lg" /> Add Service
        //                 </span>
        //             </Link>

        //             <Link href="/admin/Service">
        //                 <span className="flex items-center gap-2 cursor-pointer hover:text-green-600 transition">
        //                     <FiGrid className="text-lg" /> View Services
        //                 </span>
        //             </Link>

        //             <Link href="/admin/dashboard/users">
        //                 <span className="flex items-center gap-2 cursor-pointer hover:text-gray-600 transition">
        //                     <FiUsers className="text-lg" /> Users
        //                 </span>
        //             </Link>

        //             <Link href="/admin/inquiries">
        //                 <span className="flex items-center gap-2 cursor-pointer hover:text-purple-600 transition">
        //                     <FiMessageSquare className="text-lg" /> Inquiries
        //                 </span>
        //             </Link>

        //             <button
        //                 onClick={handleLogout}
        //                 className="flex items-center gap-2 cursor-pointer text-red-500 hover:text-red-600 transition"
        //             >
        //                 <FiLogOut className="text-lg" /> Logout
        //             </button>
        //         </div>
        //     </nav>

            
        // </div>

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

// 'use client'

// import { useState } from 'react'
// import Link from 'next/link'
// import { usePathname } from 'next/navigation'
// import { FiMenu, FiX, FiHome, FiGrid, FiUser, FiSettings, FiLogOut, FiUsers, FiMessageSquare, FiPlusCircle } from 'react-icons/fi'
// import Image from 'next/image'
// import { FaChartPie } from 'react-icons/fa'

// export default function AdminDashboardLayout() {
//     const [expanded, setExpanded] = useState(true);
//     const path = usePathname();

//     const menuItems = [
//         { icon: <FaChartPie size={20} />, text: "dashboard", link: "/admin/dashboard" },
//         { icon: <FiPlusCircle size={20} />, text: "Add Services", link: "/admin/addServices" },
//         { icon: <FiGrid size={20} />, text: " View Services", link: "/admin/Service" },
//         { icon: <FiUsers size={20} />, text: "Users", link: "/admin/dashboard/users" },
//         { icon: <FiMessageSquare size={20} />, text: "Inquiries", link: "/admin/inquiries" },
//     ];

//     return (
            
//         <div className={`h-screen ${expanded ? "w-60" : "w-16"} bg-white border-r shadow-md transition-all duration-300 fixed z-50`}>
//             {/* Sidebar Header */}
//             <div className="flex items-center justify-between p-4 border-b">
//                 {expanded && (
//                     <Link href="/dashboard">
//                         <Image src="/assets/img/logo.png" alt="Logo" width={40} height={40} className="rounded-full" />
//                     </Link>
//                 )}
//                 <button onClick={() => setExpanded(!expanded)} className=" rounded-lg hover:bg-gray-100">
//                     {expanded ? <FiX size={20} /> : <FiMenu size={20} />}
//                 </button>
//             </div>

//             {/* Navigation Links */}
//             <ul className="mt-4">
//                 {menuItems.map((item, index) => (
//                     <li key={index} className={`relative flex items-center py-3 px-4 my-1 font-medium rounded-md cursor-pointer transition-all duration-300 group
//                         ${path === item.link ? "bg-indigo-100 text-indigo-800" : "hover:bg-indigo-50 text-gray-600"}`}>
//                         <Link className="flex items-center w-full" href={item.link}>
//                             <div className="w-6 h-6 flex items-center justify-center">
//                                 {item.icon}
//                             </div>
//                             <span className={`ml-3 transition-all ${expanded ? "block" : "hidden"}`}>
//                                 {item.text}
//                             </span>
//                         </Link>
//                     </li>
//                 ))}
//             </ul>

//             {/* Logout Button */}
//             <div className="absolute bottom-6 left-0 w-full">
//                 <button className="w-full flex items-center justify-start py-3 px-4 text-red-600 hover:bg-red-100 transition-all duration-300">
//                     <FiLogOut size={20} />
//                     <span className={`ml-3 ${expanded ? "block" : "hidden"}`}>Logout</span>
//                 </button>
//             </div>
//         </div>
    
//     );
// }


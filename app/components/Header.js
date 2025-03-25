// 'use client'
// import { FaUserCircle, FaPowerOff, FaSignInAlt, FaUserPlus, FaChartPie } from "react-icons/fa";
// import { useRouter } from "next/navigation";
// import { Toaster } from "react-hot-toast";
// import { useState } from "react";


// export default function Header() {
//   const [hovered, setHovered] = useState(null);
//   const router = useRouter()

//   const Logout = () => {
//     localStorage?.clear();
//     router.push('/');

//   }
//   return (
//     <div>
//       <Toaster />
//       <header id="header-sticky" className="header-2 style-2">
//         <div className="container">
//           <div className="mega-menu-wrapper">
//             <div className="header-main">
//               <div className="logo">
//                 <a className="header-logo" href="/">
//                   <img src="/assets/img/logo/black-logo.svg" alt="logo-img" />
//                 </a>
//               </div>
//               <div className="header-left">
//                 <div className="mean__menu-wrapper">
//                   <div className="main-menu">
//                     <nav id="mobile-menu">
//                       <ul>
//                         <li className="has-dropdown active menu-thumb">
//                           <a href="/" target="_self">
//                             Home
//                           </a>
                         
//                         </li>
                      
//                         <li>
//                           <a href="/about">About Us</a>
//                         </li>
                        
//                         <li>
//                           <a href="/service">
//                             Services
//                           </a>
//                           <ul className="submenu">
//                             <li><a href="/service">Services</a></li>
//                             <li><a href="/serviceDetails">Service Details</a></li>
//                           </ul>
//                         </li>
                       
//                         <li>
//                           <a href="/contactUs">Contact Us</a>
//                         </li>
//                       </ul>
//                     </nav>
//                   </div>
//                 </div>
//               </div>
        
             
//                 <div className="flex items-center space-x-6">
//                       {localStorage?.getItem("token") ? (
//                         <>
//                           {/* Dashboard */}
//                           <div 
//                             className="relative flex flex-col items-center cursor-pointer"
//                             onMouseEnter={() => setHovered("Dashboard")}
//                             onMouseLeave={() => setHovered(null)}
//                             onClick={() => router.push("/dashboard")}
//                           >
//                             <FaChartPie className="text-2xl text-blue-600 hover:text-blue-800 transition" />
//                             {hovered === "Dashboard" && (
//                               <span className="absolute top-10 bg-black text-white text-xs px-3 py-1 rounded-md transition">
//                                 Dashboard
//                               </span>
//                             )}
//                           </div>

//                           {/* Logout */}
//                           <div 
//                             className="relative flex flex-col items-center cursor-pointer"
//                             onMouseEnter={() => setHovered("Logout")}
//                             onMouseLeave={() => setHovered(null)}
//                             onClick={Logout}
//                           >
//                             <FaPowerOff className="text-2xl text-red-500 hover:text-red-700 transition" />
//                             {hovered === "Logout" && (
//                               <span className="absolute top-10 bg-black text-white text-xs px-3 py-1 rounded-md transition">
//                                 Logout
//                               </span>
//                             )}
//                           </div>
//                         </>
//                       ) : (
//                         <>
//                           {/* Login */}
//                           <div 
//                             className="relative flex flex-col items-center cursor-pointer"
//                             onMouseEnter={() => setHovered("Login")}
//                             onMouseLeave={() => setHovered(null)}
//                             onClick={() => router.push("/login")}
//                           >
//                             <FaSignInAlt className="text-3xl text-gray-600 hover:text-blue-600 transition" />
//                             {hovered === "Login" && (
//                               <span className="absolute top-10 bg-black text-white text-xs px-3 py-1 rounded-md transition">
//                                 Login
//                               </span>
//                             )}
//                           </div>

//                           {/* Register */}
//                           <div 
//                             className="relative flex flex-col items-center cursor-pointer"
//                             onMouseEnter={() => setHovered("Register")}
//                             onMouseLeave={() => setHovered(null)}
//                             onClick={() => router.push("/registration")}
//                           >
//                             <FaUserPlus className="text-3xl text-green-500 hover:text-green-700 transition" />
//                             {hovered === "Register" && (
//                               <span className="absolute top-10 bg-black text-white text-xs px-3 py-1 rounded-md transition">
//                                 Register
//                               </span>
//                             )}
//                           </div>
//                         </>
//                       )}
//                 </div>

//             </div>
//           </div>
//         </div>
//       </header>

//     </div>
//   )

// }

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";
import { 
  FaBars, FaTimes, FaHome, FaInfoCircle, FaTools, FaPhone, 
  FaPowerOff, FaSignInAlt, FaUserPlus, FaChartPie
} from "react-icons/fa";

export default function Header() {
  const [hovered, setHovered] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const Logout = () => {
    localStorage?.clear();
    router.push("/");
  };

  return (
    <div>
      <Toaster />
      <header className="bg-white shadow-md fixed w-full z-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between py-4">
            
            {/* Logo */}
            <div className="logo">
              <a href="/">
                <img src="/assets/img/logo/black-logo.svg" alt="EaseMate Logo" className="w-24 sm:w-28 md:w-36" />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl text-gray-700">
                {menuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>

            {/* Navbar */}
            <nav className={`absolute lg:relative top-full left-0 w-full lg:w-auto bg-white lg:bg-transparent lg:flex transition-all duration-300 ${menuOpen ? "block" : "hidden"}`}>
              <ul className="lg:flex space-y-4 lg:space-y-0 lg:space-x-6 text-gray-800 text-lg font-medium p-4 lg:p-0">
                <li className="flex items-center space-x-2">
                  <FaHome className="text-green-600" />
                  <a href="/" className="block hover:text-green-600 transition">Home</a>
                </li>
                <li className="flex items-center space-x-2">
                  <FaInfoCircle className="text-green-600" />
                  <a href="/about" className="block hover:text-green-600 transition">About Us</a>
                </li>
                <li className="relative group flex items-center space-x-2">
                  <FaTools className="text-green-600" />
                  <a href="/service" className="block hover:text-green-600 transition">Services</a>
                  {/* <ul className="absolute hidden group-hover:block bg-white shadow-md p-2 space-y-2 rounded-md">
                    <li><a href="/service" className="block px-4 py-2 hover:bg-gray-200 rounded-md">Services</a></li>
                    <li><a href="/serviceDetails" className="block px-4 py-2 hover:bg-gray-200 rounded-md">Service Details</a></li>
                  </ul> */}
                </li>
                <li className="flex items-center space-x-2">
                  <FaPhone className="text-green-600" />
                  <a href="/contactUs" className="block hover:text-green-600 transition">Contact Us</a>
                </li>

                {/* Mobile Authentication Icons */}
                <div className="lg:hidden flex flex-col space-y-4 mt-4">
                  {localStorage?.getItem("token") ? (
                    <>
                      <li 
                        className="flex items-center space-x-2 cursor-pointer"
                        onClick={() => router.push("/dashboard")}
                      >
                        <FaChartPie className="text-blue-600" />
                        <span>Dashboard</span>
                      </li>
                      <li 
                        className="flex items-center space-x-2 cursor-pointer"
                        onClick={Logout}
                      >
                        <FaPowerOff className="text-red-500" />
                        <span>Logout</span>
                      </li>
                    </>
                  ) : (
                    <>
                      <li 
                        className="flex items-center space-x-2 cursor-pointer"
                        onClick={() => router.push("/login")}
                      >
                        <FaSignInAlt className="text-gray-600" />
                        <span>Login</span>
                      </li>
                      <li 
                        className="flex items-center space-x-2 cursor-pointer"
                        onClick={() => router.push("/registration")}
                      >
                        <FaUserPlus className="text-green-500" />
                        <span>Register</span>
                      </li>
                    </>
                  )}
                </div>
              </ul>
            </nav>

            {/* Desktop Authentication Icons with Hover Effects */}
            <div className="hidden lg:flex items-center space-x-4">
              {localStorage?.getItem("token") ? (
                <>
                  {/* Dashboard */}
                  <div
                    className="group relative flex flex-col items-center cursor-pointer"
                    onMouseEnter={() => setHovered("Dashboard")}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => router.push("/dashboard")}
                  >
                    <FaChartPie className="text-2xl text-blue-600 group-hover:text-blue-800 group-hover:scale-110 transition-transform duration-200" />
                    {hovered === "Dashboard" && (
                      <span className="absolute top-10 bg-black text-white text-xs px-3 py-1 rounded-md transition-opacity">
                        Dashboard
                      </span>
                    )}
                  </div>

                  {/* Logout */}
                  <div
                    className="group relative flex flex-col items-center cursor-pointer"
                    onMouseEnter={() => setHovered("Logout")}
                    onMouseLeave={() => setHovered(null)}
                    onClick={Logout}
                  >
                    <FaPowerOff className="text-2xl text-red-500 group-hover:text-red-700 group-hover:scale-110 transition-transform duration-200" />
                    {hovered === "Logout" && (
                      <span className="absolute top-10 bg-black text-white text-xs px-3 py-1 rounded-md transition-opacity">
                        Logout
                      </span>
                    )}
                  </div>
                </>
              ) : (
                <>
                  {/* Login */}
                  <div
                    className="group relative flex flex-col items-center cursor-pointer"
                    onMouseEnter={() => setHovered("Login")}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => router.push("/login")}
                  >
                    <FaSignInAlt className="text-2xl text-gray-600 group-hover:text-blue-600 group-hover:scale-110 transition-transform duration-200" />
                    {hovered === "Login" && (
                      <span className="absolute top-10 bg-black text-white text-xs px-3 py-1 rounded-md transition-opacity">
                        Login
                      </span>
                    )}
                  </div>

                  {/* Register */}
                  <div
                    className="group relative flex flex-col items-center cursor-pointer"
                    onMouseEnter={() => setHovered("Register")}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => router.push("/registration")}
                  >
                    <FaUserPlus className="text-2xl text-green-500 group-hover:text-green-700 group-hover:scale-110 transition-transform duration-200" />
                    {hovered === "Register" && (
                      <span className="absolute top-10 bg-black text-white text-xs px-3 py-1 rounded-md transition-opacity">
                        Register
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

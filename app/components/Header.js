

"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  FaBars, FaTimes, FaHome, FaInfoCircle, FaTools, FaPhone, 
  FaPowerOff, FaSignInAlt, FaUserPlus, FaChartPie
} from "react-icons/fa";
import Link from "next/link";

export default function Header() {
  const [hovered, setHovered] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const Logout = () => {
    localStorage?.clear();
    router.push("/");
  };

  return (
    <div >
      
      <header id="header-sticky" className={`header-2 ${isScrolled ? "style-2 sticky": "style-2 "}`}>
       <div className="container">
         <div className="mega-menu-wrapper">
              <div className="header-main">
            
            {/* Logo */}
            <div className="logo">
              <a href="/">
                <img src="/assets/img/logo/logo1.png" alt="EaseMate Logo" className="w-24 sm:w-28 md:w-36" />
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
                  <Link href="/" className="block hover:text-green-600 transition">Home</Link>
                </li>
                <li className="flex items-center space-x-2">
                  <FaInfoCircle className="text-green-600" />
                  <Link href="/about" className="block hover:text-green-600 transition">About Us</Link>
                </li>
                <li className="relative group flex items-center space-x-2">
                  <FaTools className="text-green-600" />
                  <Link href="/service" className="block hover:text-green-600 transition">Services</Link>
                  
                </li>
                <li className="flex items-center space-x-2">
                  <FaPhone className="text-green-600" />
                  <Link href="/contactus" className="block hover:text-green-600 transition">Contact Us</Link>
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
        </div>
      </header>
      
    </div>
  );
}

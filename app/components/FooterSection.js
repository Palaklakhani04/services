
"use client"
import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function FooterSection() {
    return (
        <footer className="bg-gray-900 text-white py-2">
            <div className="container mx-auto flex items-center justify-between px-8">
                
                {/* Logo */}
                <div className="flex items-center space-x-2">
                <Link href="/">
                    <img src="/assets/img/logo/logo2.png" alt="EaseMate Logo" className="h-auto w-36 filter drop-shadow-lg  " />
                </Link>
                </div>

                {/* Copyright */}
                <div className="text-gray-400 text-sm text-center flex-1">
                    © {new Date().getFullYear()} <span className="text-white font-semibold tracking-wide">EaseMate</span>. All Rights Reserved.
                </div>

                {/* Social Media Links */}
                <div className="flex space-x-6">
                    {[
                        { icon: FaFacebook, href: "https://facebook.com", color: "hover:text-blue-500" },
                        { icon: FaInstagram, href: "https://instagram.com", color: "hover:text-pink-500" },
                        { icon: FaTwitter, href: "https://twitter.com", color: "hover:text-blue-400" },
                        { icon: FaLinkedin, href: "https://linkedin.com", color: "hover:text-blue-600" }
                    ].map(({ icon: Icon, href, color }, index) => (
                        <Link key={index} href={href} target="_blank">
                            <Icon className={`text-white text-2xl transition-all duration-300 transform hover:scale-110 ${color} hover:drop-shadow-lg`} />
                        </Link>
                    ))}
                </div>
            </div>
        </footer>
    );
}

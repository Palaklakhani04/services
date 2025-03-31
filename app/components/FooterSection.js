// export default function FooterSection(){
//     return(
//         <div>
//             <footer className="footer-section fix section-bg">
//   <div className="shape-1">
//     <img src="/assets/img/footer/shape-1.png" alt="img" />
//   </div>
//   <div className="shape-2">
//     <img src="/assets/img/footer/shape-2.png" alt="img" />
//   </div>
//   <div className="container">
//     <div className="footer-widgets-wrapper style-2">
//       <div className="row">
//         <div className="col-xl-4 col-sm-6 col-md-6 col-lg-4 wow fadeInUp" data-wow-delay=".2s">
//           <div className="single-footer-widget">
//             <div className="widget-head">
//               <a href="index.htm">
//                 <img src="/assets/img/logo/white-logo.svg" alt="logo-img" />
//               </a>
//             </div>
//             <div className="footer-content">
//               <p>
//                 Proin efficitur, mauris vel condimentum <br /> pulvinar, velit orci consectetur ligula, eget <br /> egestas magna mi ut arcu. 
//               </p>
//               <div className="social-icon d-flex align-items-center">
//                 <a href="#"><i className="fab fa-facebook-f" /></a>
//                 <a href="#"><i className="fab fa-twitter" /></a>
//                 <a href="#"><i className="fa-brands fa-linkedin-in" /></a>
//                 <a href="#"><i className="fa-brands fa-youtube" /></a>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="col-xl-2 col-sm-6 col-md- col-lg-4 wow fadeInUp" data-wow-delay=".4s">
//           <div className="single-footer-widget">
//             <div className="widget-head">
//               <h3>Quick Links</h3>
//             </div>
//             <ul className="list-items">
//               <li>
//                 <a href="about.html">
//                   <i className="fa-regular fa-arrow-right-long" />
//                   About Us
//                 </a>
//               </li>
//               {/* <li>
//                                   <a href='team.html'>
//                                       <i class="fa-regular fa-arrow-right-long"></i>
//                                       Our Team
//                                   </a>
//                               </li> */}
//               <li>
//                 <a href="service.html">
//                   <i className="fa-regular fa-arrow-right-long" />
//                   Our Services
//                 </a>
//               </li>
//               {/* <li>
//                                   <a href='news.html'>
//                                       <i class="fa-regular fa-arrow-right-long"></i>
//                                       Blogs
//                                   </a>
//                               </li> */}
//               <li>
//                 <a href="contact.html">
//                   <i className="fa-regular fa-arrow-right-long" />
//                   Contact
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>
//         {/* <div className="col-xl-3 ps-lg-4 col-sm-6 col-md-6 col-lg-4 wow fadeInUp" data-wow-delay=".6s">
//           <div className="single-footer-widget">
//             <div className="widget-head">
//               <h3>Recent Post</h3>
//             </div>
//             <div className="recent-post-area">
//               <div className="recent-post-items">
//                 <div className="thumb">
//                   <a href="news-details.html"><img src="/assets/img/news/pp1.jpg" alt="post-img" /></a>
//                 </div>
//                 <div className="content">
//                   <ul className="post-date">
//                     <li>
//                       <i className="fa-solid fa-calendar-days me-2" />
//                       Jun 30, 2024
//                     </li>
//                   </ul>
//                   <h6>
//                     <a href="news-details.html">
//                       Correct Execution Ensures Victory.
//                     </a>
//                   </h6>
//                 </div>
//               </div>
//               <div className="recent-post-items mb-0">
//                 <div className="thumb">
//                   <a href="news-details.html"><img src="/assets/img/news/pp2.jpg" alt="post-img" /></a>
//                 </div>
//                 <div className="content">
//                   <ul className="post-date">
//                     <li>
//                       <i className="fa-solid fa-calendar-days me-2" />
//                       Jun 30, 2024
//                     </li>
//                   </ul>
//                   <h6>
//                     <a href="news-details.html">
//                       Correct Execution Ensures Victory.
//                     </a>
//                   </h6>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div> */}
//         {/* <div className="col-xl-3 col-sm-6 col-md-6 col-lg-4 wow fadeInUp" data-wow-delay=".8s">
//           <div className="single-footer-widget">
//             <div className="widget-head">
//               <h3>Newsletter</h3>
//             </div>
//             <div className="footer-content">
//               <p>
//                 Proin efficitur, mauris vel condimentum pulvinar, velit orci consectetur ligula, eget egestas magna mi ut arcu. 
//               </p>
//               <form action="#" id="contact-form" method="POST" className="footer-input">
//                 <input type="email" id="email" placeholder="Your email address" />
//                 <button className="theme-btn" type="submit">
//                   Subscribe Now
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div> */}
//       </div>
//     </div>
//     <div className="footer-bottom">
//       <div className="container">
//         <div className="footer-bottom-wrapper">
//           <p>
//             © Copyright 2024 by <a href="index.htm">Nexava</a>. All rights Reserved
//           </p>
//         </div>
//       </div>
//     </div>
//   </div>
// </footer>

//         </div>
//     )
// }

import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-4">
            <div className="container mx-auto flex items-center justify-between px-8">
                
                {/* Logo */}
                <div className="flex items-center space-x-2">
                    <img src="/logo.png" alt="EaseMate Logo" className="h-12 filter drop-shadow-lg" />
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

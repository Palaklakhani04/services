// "use client"
// export default function HeroSection(){
//     return(
//         <div>
//             <section className="hero-section fix hero-3">
//   <div className="array-button">
//     {/* <button className="array-prev"><i className="fa-regular fa-arrow-left-long" /></button>
//     <button className="array-next"><i className="fa-regular fa-arrow-right-long" /></button> */}
//   </div>
//   <div className="swiper hero-slider">
//     <div className="swiper-wrapper">
//       <div className="swiper-slide">
//         <div className="slider-image bg-cover" style={{backgroundImage: 'url("/assets/img/hero/hero-6.jpg")'}}>
//         </div>
//         <div className="container">
//           <div className="row g-4 align-items-center">
//             <div className="col-lg-12">
//               <div className="hero-content">
//                 <h1 data-animation="fadeInUp" data-delay="1.3s">
//                 Reliable Home Services at<br/> Your Fingertips
//                 </h1>
               
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//     <div className="swiper-dot-2">
//       <div className="dot-2" />
//     </div>
//   </div>
// </section>

//         </div>
//     )
// }


'use client';
import { useEffect, useState } from 'react';

export default function HeroSection() {
  const images = [
    '/assets/img/hero/hero-6.jpg',
    '/assets/img/hero/hero-2.jpg',
    '/assets/img/hero/hero-1.jpg',
    '/assets/img/hero/hero-3.jpg',
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full min-h-[600px] bg-[#FDFCFB] flex flex-col md:flex-row items-center justify-between overflow-hidden px-6 md:px-20 py-10 md:py-0">
      {/* Left Content */}
      <div className="md:w-1/2 z-10 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-bold text-[#2F2F2F] leading-tight">
          Simplify Your <span className="text-[#AC7D88]">Home Maintenance</span>
        </h1>
        <p className="mt-4 text-[#7A7A7A] text-lg">
          Connect with trusted professionals in just a few clicks. Fast. Reliable. Hassle-free.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <a
            href="/service"
            className="bg-[#AC7D88] text-white px-6 py-3 rounded-lg font-semibold hover:brightness-110 transition"
          >
            Book a Service
          </a>
          <a
            href="/contactus"
            className="bg-white text-[#2F2F2F] border border-[#E5E5E5] px-6 py-3 rounded-lg font-semibold hover:bg-[#E5E5E5] transition"
          >
            Contact Us
          </a>
        </div>
      </div>

      {/* Right Image */}
      <div
        className="md:w-1/2 mt-10 md:mt-0 relative h-[300px] md:h-[500px] w-full rounded-xl overflow-hidden shadow-lg border border-[#E5E5E5] transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: `url(${images[currentImage]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: ' brightness(0.85)',
        }}
      />
    </section>
  );
}

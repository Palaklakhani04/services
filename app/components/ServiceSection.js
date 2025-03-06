"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ServiceSection(){

  const [services, setServices] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get("/api/getservices");
      console.log("API Response:", response.data.services);
      console.log("Services Array:", response.data.services);
      setServices(response.data.services);
    } catch (err) {
      console.error("Error fetching services:", err);
      setError("Failed to fetch services.");
    }
  };



    return(
        <div>
            {/* <section className="service-section-3 fix section-padding">
  <div className="service-bg-shape">
    <img src="assets/img/service/service-bg.png" alt="img" />
  </div>
  <div className="container">
    <div className="section-title">
      <span className="wow fadeInUp"><img src="assets/img/icon/07.svg" alt="img" />Every Time</span>
      <h2 className="wow fadeInUp" data-wow-delay=".3s">Quality Roofing Solutions <br />
        The Every Time</h2>
    </div>
    <div className="row">
      <div className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".3s">
        <div className="service-box-items style-2">
          <div className="content">
            <h3><a href="service-details.html">Roof Repair</a></h3>
            <p>Varied room types (standard, deluxe, suites) with amenities like beds, seating, wardrobe, and workspace.</p>
            <a href="service-details.html" className="link-btn">Read More <i className="fa-regular fa-angles-right" /></a>
          </div>
          <div className="icon">
            <img src="assets/img/icon/01.svg" alt="img" />
          </div>
        </div>
      </div>
      <div className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".5s">
        <div className="service-box-items style-2">
          <div className="content">
            <h3><a href="service-details.html">Green Flashing Repair</a></h3>
            <p>Indoor or outdoor pools, sometimes with additional features like a hot tub or sauna. Equipped with exercise machines</p>
            <a href="service-details.html" className="link-btn">Read More <i className="fa-regular fa-angles-right" /></a>
          </div>
          <div className="icon">
            <img src="assets/img/icon/02.svg" alt="img" />
          </div>
        </div>
      </div>
      <div className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".7s">
        <div className="service-box-items style-2">
          <div className="content">
            <h3><a href="service-details.html">Roofing Services</a></h3>
            <p>Indoor or outdoor pools, sometimes with additional features like a hot tub or sauna. Equipped with exercise machines</p>
            <a href="service-details.html" className="link-btn">Read More <i className="fa-regular fa-angles-right" /></a>
          </div>
          <div className="icon">
            <img src="assets/img/icon/04.svg" alt="img" />
          </div>
        </div>
      </div>
      <div className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".3s">
        <div className="service-box-items style-2">
          <div className="content">
            <h3><a href="service-details.html">Roof Inspection</a></h3>
            <p>Indoor or outdoor pools, sometimes with additional features like a hot tub or sauna. Equipped with exercise machines</p>
            <a href="service-details.html" className="link-btn">Read More <i className="fa-regular fa-angles-right" /></a>
          </div>
          <div className="icon">
            <img src="assets/img/icon/19.svg" alt="img" />
          </div>
        </div>
      </div>
      <div className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".5s">
        <div className="service-box-items style-2">
          <div className="content">
            <h3><a href="service-details.html">Roof Inspection</a></h3>
            <p>Indoor or outdoor pools, sometimes with additional features like a hot tub or sauna. Equipped with exercise machines</p>
            <a href="service-details.html" className="link-btn">Read More <i className="fa-regular fa-angles-right" /></a>
          </div>
          <div className="icon">
            <img src="assets/img/icon/20.svg" alt="img" />
          </div>
        </div>
      </div>
      <div className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".7s">
        <div className="service-box-items style-2">
          <div className="content">
            <h3><a href="service-details.html">Roof Inspection</a></h3>
            <p>Indoor or outdoor pools, sometimes with additional features like a hot tub or sauna. Equipped with exercise machines</p>
            <a href="service-details.html" className="link-btn">Read More <i className="fa-regular fa-angles-right" /></a>
          </div>
          <div className="icon">
            <img src="assets/img/icon/23.svg" alt="img" />
          </div>
        </div>
      </div>
    </div>
  </div>
</section> */}

<h1 className="text-center text-4xl font-extrabold text-gray-900 mb-10 mt-5">🚀 Our Premium Services 🚀</h1>
{error && <p className="text-red-500 text-center">{error}</p>}

<div className="grid m-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
  {services.map((service) => (
    <div 
      key={service._id} 
      className="bg-white rounded-2xl shadow-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl duration-300"
    >
      <div className="relative">
        <img 
          src={service.filePath} 
          alt={service.title} 
          className="w-full h-48 object-contain"
        />
        <div className="absolute inset-0 bg-black bg-opacity-10 rounded-t-2xl"></div>
      </div>

      <div className="p-5">
        <h3 className="text-2xl font-semibold text-gray-800">{service.title}</h3>
        <p className="text-gray-600 mt-2">{service.description}</p>

        <div className="flex justify-between items-center mt-4">
          <span className="font-bold text-green-500 text-xl">₹{service.price}</span>
          <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200">
            Book Now
          </button>
        </div>
      </div>
    </div>
  ))}
</div>


        </div>
    )
}
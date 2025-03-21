"use client";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function booking() {
    const { id } = useParams();
    //   const router = useRouter();

    const [service, setService] = useState(null);
    const [input, setInput] = useState({
        date: "",
        terms: false,
    });
    const [serviceTime, setServiceTime] = useState('Morning')
    const [servicePay, setServicePay] = useState('Cash')

    const [bookedSlots, setBookedSlots] = useState([]); // New state to store booked slots

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // useEffect(async () => {
    //     if (!id) {
    //         try {
    //             const response = await axios.get(/api/services/${id});
    //             setService(response.data.services);
    //         } catch (err) {
    //             setError("Service not found!");
    //         } finally {
    //             setLoading(false);
    //         }
    //     }

    // }, [id]);

    useEffect(() => {
        async function fetchService() {
            if (!id) return; // Ensure id is available before making a request

            try {
                const response = await axios.get(`/api/services/${id}`);
                setService(response.data.service || response.data.services); // Ensure correct key
                
            } catch (err) {
                setError("Service not found!");
            } finally {
                setLoading(false);
            }
        }

        fetchService();
    }, [id]);


    const handleInputs = (e) => {
        const { name, value, type, checked } = e.target;
        setInput((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleTime = () => alert("Time selected!");
    const handlePay = () => alert("Payment method selected!");

     // Function to check booked slots
    //  const checkBookings = async () => {
    //     if (!input.date) {
    //         alert("Please select a date first.");
    //         return;
    //     }

    //     try {
    //         const res = await fetch("/api/bookings", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({ serviceid: id, serviceDate: input.date, checkAvailability: true }),
    //         });

    //         const data = await res.json();
    //         setBookedSlots(data.bookedSlots || []);
    //         console.log("Booked Slots:", bookedSlots);



    //     } catch (error) {
    //         console.error("Error checking bookings:", error);
    //     }
    // };

   
    // const handleBooking = async () => {
    //     const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD
    
    //     if (input.date === today) {
    //         alert("You cannot book today's slot. Please select another date.");
    //         return;
    //     }
        
    
    //     try {
    //         const response = await fetch("/api/bookings", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({
    //                 serviceid: service?._id,
    //                 title: service?.title,
    //                 serviceDate: input.date,
    //                 serviceTime,
    //                 price: service?.price, 
    //                 servicePay,
    //             }),
    //         });
    
    //         const data = await response.json();
    
    //         if (data.success) {
    //             alert("Booking successful!");
    //             console.log("Booking Created:", data.booking);
    
    //             // 🌟 Store booking in localStorage 🌟
    //             const newBooking = {
    //                 id: data.booking._id, // Use the actual booking ID from the response
    //                 date: input.date,
    //                 time: serviceTime,
    //                 service: service?.title,
    //                 price: service?.price,
    //                 payment: servicePay,
    //                 status: "Pending",
    //             };
    
    //             const history = JSON.parse(localStorage.getItem("serviceHistory")) || [];
    //             history.push(newBooking);
    //             localStorage.setItem("serviceHistory", JSON.stringify(history));
    
    //         } else {
    //             alert("Error: " + data.error);
    //             console.error("Error:", data.error);
    //         }
    //     } catch (error) {
    //         console.error("Failed to create booking:", error);
    //         alert("Failed to create booking. Try again!");
    //     }
    // };


    const handleBooking = async () => {
        try {
            const token = localStorage.getItem("token"); // Retrieve the token
            console.log("🔑 Token Sent:", token);
    
            if (!token) {
                console.error("🚨 No token found! User might not be logged in.");
                alert("Please log in to book a service.");
                return;
            }
    
            // Decode token to check expiry
            let payload;
            try {
                payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
            } catch (err) {
                console.error("🚨 Invalid token format!");
                alert("Session expired. Please log in again.");
                return;
            }
    
            const expiryTime = new Date(payload.exp * 1000);
            const currentTime = new Date();
    
            console.log("⏳ Token Expiry Time:", expiryTime);
            console.log("⌚ Current Time:", currentTime);
    
            if (currentTime >= expiryTime) {
                console.error("🚨 Token has expired! Please re-login.");
                alert("Session expired. Please log in again.");
                return;
            }
    
            // Validate service object
            if (!service || !service._id) {
                console.error("🚨 Service ID is missing");
                alert("Invalid service selection.");
                return;
            }
    
            const bookingData = {
                serviceid: service._id,
                title: service.title,
                serviceDate: input.date,
                serviceTime,
                price: service.price,
                servicePay,
            };
    
            console.log("📨 Sending Booking Request with Data:", JSON.stringify(bookingData, null, 2));
    
            const response = await fetch("/api/bookings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,  // ✅ Include token in headers
                },
                body: JSON.stringify(bookingData),
            });
    
            console.log("API Response Status:", response.status);
    
            const responseData = await response.json();
    
            if (!response.ok) {
                console.error("🚨 Booking failed:", responseData);
                alert(`Booking failed: ${responseData.message || "Unknown error"}`);
                return;
            }
    
            console.log("✅ Booking Successful:", responseData);
            alert("Booking successful!");
    
        } catch (error) {
            console.error("⚠️ Error in handleBooking:", error);
            alert("Something went wrong. Please try again.");
        }
    };
    
    
    
    
    
    
    
    
    
    
    

    if (loading) return <p className="text-center text-gray-500">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="flex items-center justify-center min-h-screen  p-6">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg">
                {/* Header */}
                <div className="flex flex-col items-center mb-6">
                    <img src="/assets/img/logo/black-logo.svg" alt="logo" className="w-20" />
                    <h2 className="text-2xl font-bold text-gray-800 mt-4">Book a Service</h2>
                    <p className="text-gray-500 text-sm">Secure your appointment today.</p>
                </div>

                {/* Service Name */}
                <div className="relative mb-4">
                    <input
                        type="text"
                        value={service?.title || ""}
                        className="peer w-full px-3 py-3 border rounded-lg text-gray-700 bg-gray-100 cursor-not-allowed focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        disabled
                    />
                    <label className="absolute left-3 -top-2 text-sm text-gray-500 bg-white px-1">
                        Service Name
                    </label>
                </div>
                {/* Service Price */}
                <div className="relative mb-4">
                    <input
                        type="text"
                        value={service?.price ? `₹${service.price}` : ""}
                        className="peer w-full px-3 py-3 border rounded-lg text-gray-700 bg-gray-100 cursor-not-allowed focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        disabled
                    />
                    <label className="absolute left-3 -top-2 text-sm text-gray-500 bg-white px-1">
                        Service Price
                    </label>
                </div>


                {/* Date Picker
                <div className="relative mb-4">
                    <input
                        type="date"
                        name="date"
                        value={input.date}
                        onChange={handleInputs}
                        required
                        className="peer w-full px-3 py-3 border rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <label className="absolute left-3 -top-2 text-sm text-gray-500 bg-white px-1">
                        Select Date
                    </label>
                </div> */}

                 {/* Date Picker */}
                 <div className="relative mb-4">
                 <input
                    type="date"
                    name="date"
                    value={input.date}
                    onChange={handleInputs}
                    required
                    className="peer w-full px-3 py-3 border rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    min={new Date().toISOString().split("T")[0]} // Set min date to today
                />

                    <label className="absolute left-3 -top-2 text-sm text-gray-500 bg-white px-1">Select Date</label>
                    {/* <button onClick={checkBookings} className="mt-2 px-3 py-2 bg-blue-500 text-white rounded-lg">
                        Check Availability
                    </button> */}
                </div>

                {/* Show Booked Slots
                {bookedSlots.length > 0 ? (
                    <div className="mb-4">
                        <h3 className="text-gray-700 font-medium">Booked Slots:</h3>
                        <ul className="list-disc pl-5 text-red-500">
                            {bookedSlots.map((slot, index) => (
                                <li key={index}>{slot}</li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p className="text-gray-500">No bookings found.</p>
                )} */}

               {/* Ensure bookedSlots is not empty and filter by selected serviceDate */}
               {/* {bookedSlots.length > 0 && input.date ? (
    <div className="mb-4">
        <h3 className="text-gray-700 font-medium">Booked Slots for {input.date}:</h3>
        <ul className="list-disc pl-5 text-red-500">
            {bookedSlots
                .filter(slot => slot.date === input.date) 
                .map((slot, index) => (
                    <li key={index}>{slot.time}</li>
                ))
            }
        </ul>
    </div>
) : (
    <p className="text-gray-500">No bookings found for {input.date}.</p>
)} */}










                {/* Time Selection */}
                <div className="mb-4">
                    <label className="text-gray-700 font-medium block mb-2">Select Time</label>
                    <div className="grid grid-cols-2 gap-4">
                        <button onClick={() => setServiceTime('Morning')} className={`w-full py-2 border border-blue-500   font-semibold rounded-lg shadow transition ${serviceTime === 'Morning' ? 'bg-blue-500 text-white' : 'hover:bg-blue-500 hover:text-white text-blue-500'}`}>
                            Morning
                        </button>
                        <button onClick={() => setServiceTime('Afternoon')} className={`w-full py-2 border border-blue-500   font-semibold rounded-lg shadow transition ${serviceTime === 'Afternoon' ? 'bg-blue-500 text-white' : 'hover:bg-blue-500 hover:text-white text-blue-500'}`}>
                            Afternoon
                        </button>
                    </div>
                </div>

                {/* Payment Selection */}
                <div className="mb-4">
                    <label className="text-gray-700 font-medium block mb-2">Payment Method</label>
                    <div className="grid grid-cols-2 gap-4">
                        <button onClick={() => setServicePay('Cash')} className={`w-full py-2 border border-green-500   font-semibold rounded-lg shadow transition ${servicePay === 'Cash' ? 'bg-green-500 text-white' : 'hover:bg-green-500 hover:text-white text-green-500'}`}>
                            Cash
                        </button>
                        <button onClick={() => setServicePay('Online')} className={`w-full py-2 border border-green-500   font-semibold rounded-lg shadow transition ${servicePay === 'Online' ? 'bg-green-500 text-white ' : 'hover:bg-green-500 hover:text-white text-green-500'}`}>
                            Online
                        </button>
                    </div>
                </div>

                {/* Terms & Conditions */}
                <div className="flex items-center space-x-2 mb-6">
                    <input
                        type="checkbox"
                        name="terms"
                        checked={input.terms}
                        onChange={handleInputs}
                        required
                        className="w-4 h-4"
                    />
                    <label className="text-gray-600">I accept the Terms & Conditions</label>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-4">
                    {servicePay === 'Cash' ? 

                <button
                    onClick={handleBooking}
                    className={`w-full py-2  font-semibold rounded-lg shadow-lg transition ${servicePay !== 'Online' ? 'bg-indigo-500 text-white' : 'hover:bg-indigo-500 hover:text-white text-indigo-500 '}`}
                    disabled={!input.terms}
                    >
                    Confirm Booking
                </button>
                :
                <button
                    onClick={handleBooking}
                    className={`w-full py-2  font-semibold rounded-lg shadow-lg transition ${servicePay !== 'Cash' ? 'bg-purple-500 text-white' : 'hover:bg-purple-500 hover:text-white text-purple-500 '}`}
                    disabled={!input.terms}
                    >
                    Pay with Stripe
                </button>
                
}
            </div>
            <hr/>
            <div className="text-center mt-4">
            <a href="/service" className="text-blue-500 hover:underline">← Back to Services</a>
        </div>
        </div>
        </div >
    );
} 
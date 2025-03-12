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

    const handleBooking = () => {
        alert("Booking successful!");
        // router.push(/booking/confirmation?serviceId=${id});
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

                {/* Date Picker */}
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
                </div>

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
                        <button onClick={() => setServicePay('Cash') }className={`w-full py-2 border border-green-500   font-semibold rounded-lg shadow transition ${servicePay === 'Cash' ? 'bg-green-500 text-white' : 'hover:bg-green-500 hover:text-white text-green-500'}`}>
                            Cash
                        </button>
                        <button onClick={() => setServicePay('Online') } className={`w-full py-2 border border-green-500   font-semibold rounded-lg shadow transition ${servicePay === 'Online' ? 'bg-green-500 text-white ' : 'hover:bg-green-500 hover:text-white text-green-500'}`}>
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
                    <button
                        onClick={handleBooking}
                        className={`w-full py-2  font-semibold rounded-lg shadow-lg transition ${servicePay === 'Online' ? 'bg-indigo-500 text-white': 'hover:bg-indigo-500 hover:text-white text-indigo-500 '}`}
                        disabled={servicePay !== 'Online'}
                    >
                        Confirm Booking
                    </button>
                    <button
                        onClick={handleBooking}
                        className={`w-full py-2  font-semibold rounded-lg shadow-lg transition ${servicePay === 'Cash' ? 'bg-purple-500 text-white': 'hover:bg-purple-500 hover:text-white text-purple-500 '}`}
                        disabled={servicePay !== 'Cash'}
                    >
                        Pay with Stripe
                    </button>
                </div>
            </div>
        </div>
    );
} 
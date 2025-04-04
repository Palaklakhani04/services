"use client";

import { useRouter } from "next/navigation";
import { handleError } from "../lib/HandelError";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";



export default function successfullyPayment() {

  const [loading, setLoading] = useState(true)
  const [paymentDetails, setPaymentDetails] = useState({})
  const [packageDetails, setPackageDetails] = useState({})
  const [paymentStatus, setPaymentStatus] = useState('')
  const [bookingDetails, setBookingDetails] = useState({})
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== undefined) {
      const paymentData = localStorage?.getItem('payment')
      const packageData = localStorage?.getItem('services')
      // const timeData = localStorage?.getItem('timedetails')
      setPaymentDetails(paymentData ? JSON.parse(paymentData) : {})
      setPackageDetails(packageData ? JSON.parse(packageData) : {})
      // setTimeDetails(timeData ? JSON.parse(timeData) : {})
      if (!(paymentData)) {
        setLoading(false)
      }
      return () => {
        localStorage?.removeItem('payment')
        localStorage?.removeItem('services')
      }
    }
  }, [])

  console.log(paymentDetails, 'payment details')
  console.log(packageDetails, 'package details')
  // console.log(timeDetails, 'time details')



  useEffect(() => {
    (async () => {
      if (paymentDetails?.id) {
        try {
          const checkStatus = await axios.post(`/api/check-payment-status`, { id: paymentDetails.id }, {
            headers: {
              Authorization: localStorage.getItem('token'),
            }
          })
          console.log(checkStatus, 'status payment data')
          const statusData = checkStatus?.data?.updatedPaymentStatus?.status
          // setPaymentStatus(statusData.payment_status || '')
          // await addPayment(statusData, 'CONFIRMPAYMENT')
          if (statusData === 'paid') {
            handleBooking()
          }
        } catch (err) {
          console.log(err, 'errorrrrr status payment data')

          handleError(err)
        } finally {
          setLoading(false)
        }
      }
    })()
  }, [paymentDetails])

  const handleBooking = async () => {
    try {
      const token = localStorage?.getItem("token");

      const bookingData = {
        serviceid: packageDetails.serviceid,
        title: packageDetails.title,
        serviceDate: packageDetails.serviceDate,
        serviceTime: packageDetails.serviceTime,
        price: packageDetails.price,
        servicePay: "Online",
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
        toast.error(`Booking failed: ${responseData.message || "Unknown error"}`);
        return;
      }

      console.log("✅ Booking Successful:", responseData);
      toast.success("Booking successful!");
      setBookingDetails(responseData.data);

    } catch (error) {
      console.error("⚠️ Error in handleBooking:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };




  if (loading) return (
    <div className='flex w-full h-[100vh] fixed top-[0px] left-[0] justify-center items-center bg-primary-25 z-50'>
      <div className='w-[300px] text-center'>
        <h1>Loading...</h1>
      </div>
    </div>
  )

  if (!(paymentDetails.id)) return (
    <div className='flex w-full h-[100vh] fixed top-[0px] left-[0] justify-center items-center bg-primary-25 z-50'>
      <div className='w-[300px] text-center'>
        <h1>No Payment Found</h1>
        <button className='rounded-[10px] bg-primary-75 py-2 uppercase px-11 text-primary-0 btn1 mt-2' onClick={() => router.replace('/')}>Go Home</button>
      </div>
    </div>
  )

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-lg text-center max-w-md w-full">
        <h1 className="text-2xl font-bold text-green-600 mb-4">Payment Successful!</h1>

        <div className="bg-gray-50 p-4 rounded-lg shadow-inner text-left w-full">
          <p className="text-gray-700"><strong>Date: {bookingDetails?.bookingDate}</strong></p>
          <p className="text-gray-700"><strong>Name: {bookingDetails?.userId}</strong></p>
          <p className="text-gray-700"><strong>Package Name: {bookingDetails?.title}</strong></p>
          <p className="text-gray-700"><strong>Date: {bookingDetails?.serviceDate}</strong> </p>
          <p className="text-gray-700"><strong>Time Slot: {bookingDetails?.serviceTime}</strong> </p>
          <p className="text-gray-700"><strong>Payment Mode: {bookingDetails?.servicePay}</strong> </p>
          <p className="text-gray-700"><strong>Amount: {bookingDetails?.price}</strong> </p>
        </div>

        <button
          onClick={() => router.push("/")}
          className="mt-6 bg-green-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-700 transition"
        >
          Go to Home
        </button>
      </div>
    </div>
  )
}



'use client';

import { useEffect, useState } from 'react';
import { usePDF } from 'react-to-pdf';
import axios from 'axios';
import { handleError } from '@/app/lib/HandelError';
import { useSearchParams } from 'next/navigation';

export default function View() {
  const { toPDF, targetRef } = usePDF({ filename: "invoice.pdf" });
  const searchParams = useSearchParams();
  const [booking, setBooking] = useState(null);
  const [userData, setUserData] = useState({});

  console.log(booking?.userId, 'booking datatatatatat')

  // ✅ Define getUserDataw BEFORE useEffect
  const getUserDataw = async () => {
    
    const data = JSON.stringify(
      {
        _id: booking?.userId,
      });

    try {
      const res = await axios.post('/api/get-user-data', data);

      if (res.status === 200) {
        setUserData(res.data.services);
      } else {
        handleError(res);
      }
    } catch (error) {
      handleError(error);
    }
  };

  // ✅ Retrieve Data (From Query or Local Storage)
  useEffect(() => {

    const data = searchParams.get("data");
    if (data) {
      setBooking(JSON.parse(decodeURIComponent(data)));
    } else {
      const storedBooking = localStorage?.getItem("selectedBooking");
      if (storedBooking) {
        setBooking(JSON.parse(storedBooking));
      }
    }
    getUserDataw();

  }, []); // ✅ No need to add getUserDataw in dependencies
  useEffect(() => {
    getUserDataw();
  }, [booking]);

  if (!booking) return <p>Loading booking details...</p>;

  return (
    <div>
      {/* Booking Details */}
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-6" ref={targetRef}>
        <div className="logo">
          <a className="header-logo" href="/">
            <img src="/assets/img/logo/logo1.png" alt="logo-img" className='w-22 h-16' />
          </a>
        </div>

        {/* Service Details */}
        <div className="grid gap-4  mt-4 mb-4">

          <div>
            <p className="text-gray-600 text-lg"><strong>Service Name:</strong> {booking.title}</p>
            <p className="text-gray-600 text-lg"><strong>Date:</strong> {new Date(booking.serviceDate).toLocaleDateString()}</p>
            <p className="text-gray-600 text-lg"><strong>Time:</strong> {booking.serviceTime}</p>
          </div>
        </div>

        {/* Service Info */}
        <div className="grid mt-3 gap-4">
          <div>
            <p className="text-gray-600 text-lg"><strong>Invoice No.:</strong> #{userData?._id}</p>
            <p className="text-gray-600 text-lg"><strong>Name:</strong> {userData?.name || "N/A"}</p>
            <p className="text-gray-600 text-lg"><strong>Mobile:</strong> {userData?.mobile || "N/A"}</p>
            <p className="text-gray-600 text-lg"><strong>Email:</strong> {userData?.email || "N/A"}</p>
            <p className="text-gray-600 text-lg"><strong>Address:</strong> {userData?.address || "N/A"}</p>
          </div>
        </div>
      </div>

      {/* Download PDF Button */}
      <div className="mt-6 flex justify-center">
        <button onClick={() => toPDF()} className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition">
          📥 Download Invoice
        </button>
      </div>
    </div>
  );
}

"use client";

import AdminDashboardLayout from "@/app/components/AdminDashboardLayout";
import { useEffect, useState } from "react";

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    const fetchInquiries = async () => {
        try {
            const response = await fetch("/api/contact", {
                method: "GET", // Ensure this matches your API handler
            });

            if (!response.ok) {
                throw new Error("Failed to fetch inquiries");
            }

            const data = await response.json();
            setInquiries(data);
        } catch (error) {
            console.error(error);
        }
    };

    fetchInquiries();
}, []);


  return (
    <div  >
        <AdminDashboardLayout title={"📩 User Inquiries"} />
        {/* <h1 className="flex iteam-center justify-center text-xl mt-10">📩 User Inquiries</h1> */}
        <div className="p-10 ">
      {inquiries.length === 0 ? (
        <p>No inquiries yet.</p>
      ) : (
        <div className="space-y-4">
          {inquiries.map((inquiry) => (
            <div key={inquiry._id} className="border p-4 rounded-lg shadow-md bg-white">
              <p><strong>Name:</strong> {inquiry.name}</p>
              <p><strong>Email:</strong> {inquiry.email}</p>
              <p><strong>Mobile:</strong> {inquiry.mobile}</p>
              <p><strong>Message:</strong> {inquiry.message}</p>
              <p className="text-gray-500 text-sm"><strong>Received:</strong> {new Date(inquiry.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
}

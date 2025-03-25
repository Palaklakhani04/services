"use client";

import { useRouter } from "next/navigation";

export default function failPayment(){
    const router = useRouter();
    
    return(
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-lg text-center max-w-md w-full">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Payment Failed!</h1>

        <div className="bg-gray-50 p-4 rounded-lg shadow-inner text-left w-full">
          <p className="text-gray-700"><strong>Date:</strong> </p>
          <p className="text-gray-700"><strong>Name:</strong></p>
          <p className="text-gray-700"><strong>Package Name:</strong></p>
          <p className="text-gray-700"><strong>Date:</strong> </p>
          <p className="text-gray-700"><strong>Time Slot:</strong></p>
          <p className="text-gray-700"><strong>Payment Mode:</strong></p>
          <p className="text-gray-700"><strong>Amount:</strong></p>
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
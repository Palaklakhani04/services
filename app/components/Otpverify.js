"use client"
import axios from "axios"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react"
import toast, { Toaster } from "react-hot-toast";


export default function Otpverify() {

  const router = useRouter();
  const [message, setMessage] = useState('')
  const [otp, setOtp] = useState('')
  const [validations, setValidations] = useState(false)

  const handleValidation = () => {
  
      if (!otp) {
        setValidations(true);
        setMessage('Please enter valid 6 digit otp.');
        return;
      }
  
      handleSubmit()
    }

  const handleSubmit = async () => {
    const data = JSON.stringify(
      {
        email: localStorage?.getItem('email'),
        otp: otp,
      });
    try {
      const response = await axios.post("/api/otpverify", data);
      if (response.data.status === 200) {
        toast.success(response?.data?.message)
        console.log("Otp is correct", response);
        router.push('/setpsw');
      } else {
        toast.error('Something went wrong')
      }
    } catch (error) {
      console.log('Error in sending otp', error)
    }

  }




  return (

    <div className="flex items-center justify-center min-h-screen p-6">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-sm">
                {/* Header */}
                <div className="flex flex-col items-center mb-6">
                <Link href="/">
                        <img src="/assets/img/logo/logo1.png" alt="EaseMate Logo" className="w-24 h-auto sm:w-28 md:w-36" />
                </Link>
                    <h2 className="text-xl font-bold text-gray-800">OTP Verification</h2>
                    <p className="text-gray-500 text-sm text-center mt-2">
                        Enter the OTP sent to your email.
                    </p>
                </div>

                <Toaster />
            

                {/* Display Error or Success Message */}
                {validations && (
                    <p className={`text-sm text-center mb-4 ${message.includes("Successfully") ? "text-green-500" : "text-red-500"}`}>
                        {message}
                    </p>
                )}

                {/* Email Input (Disabled) */}
                <div className="relative mb-4">
                    <input
                        type="email"
                        name="email"
                        value={localStorage?.getItem('email')} 
                        onChange={(e) => setEmail(e.target.value)}
                        disabled
                        className="peer w-full px-3 py-2 border rounded-lg text-gray-700 bg-gray-100 cursor-not-allowed focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <label className="absolute left-3 -top-2 text-sm text-gray-500 bg-white px-1">
                        Email Address
                    </label>
                </div>

                {/* OTP Input */}
                <div className="relative mb-6">
                    <input
                        type="text"
                        name="otp"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => {
                            setOtp(e.target.value);
                            setValidations(false);
                        }}
                        maxLength={6}
                        required
                        className="peer w-full px-3 py-2 border rounded-lg text-black  focus:outline-none"
                    />
                    <label className="absolute left-3 -top-2 text-sm text-gray-500 bg-white px-1">
                        OTP Code
                    </label>
                </div>

                {/* Submit Button */}
                <button
                    onClick={handleValidation}
                    className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition"
                >
                    Submit
                </button>

                {/* Divider */}
                <hr className="my-6" />

                {/* Back to Home Link */}
                <div className="text-center">
                    <a href="/" className="text-blue-600 hover:underline font-medium">
                        Back to Home
                    </a>
                </div>
            </div>
        </div>
  );
}
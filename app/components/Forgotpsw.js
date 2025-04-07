"use client"
import axios from "axios"
import { useRouter } from "next/navigation";
import { useState } from "react"
import { EMAIL_REGEX } from "../utils/constants";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";


export default function Forgotpsw() {
  const router = useRouter();
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [validations, setValidations] = useState(false)

  const handleValidation = () => {

    if (!email) {
      setValidations(true);
      setMessage('Email is required.');
      return;
    }
    if (!EMAIL_REGEX.test(email)) {
      setValidations(true);
      setMessage('Please enter valid email address.');
      return;
    }
    handleOtp()
  }

  const handleOtp = async () => {
    try {
      const response = await axios.post("/api/forgot", { email });
      if (response.status === 200) {
        toast.success("OTP sent successfully!");
        console.log("Otp send to your email", response);
        localStorage?.setItem('email', response.data.email)
        router.push('/otpverify');
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
    <div className="flex flex-col items-center mb-4">
    <Link href="/">
            <img src="/assets/img/logo/logo1.png" alt="EaseMate Logo" className="w-24 h-auto sm:w-28 md:w-36" />
    </Link>
        <h2 className="text-xl font-bold text-gray-800">Forgot Password?</h2>
        <p className="text-gray-500 text-xs text-center mt-2">
            Enter your email to receive an OTP.
        </p>
    </div>
    <Toaster />


    {/* Display Error or Success Message */}
    {validations && (
        <p className={`text-sm text-center mb-4 ${message.includes("OTP") ? "text-green-500" : "text-red-500"}`}>
            {message}
        </p>
    )}

    {/* Email Input */}
    <div className="relative mb-6">
        <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => {
                setEmail(e.target.value);
                setValidations(false);
            }}
            required
            className="peer w-full px-3 py-2 border rounded-lg text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <label className="absolute left-3 -top-2 text-sm text-gray-500 bg-white px-1">
            Email Address
        </label>
    </div>

    {/* Send OTP Button */}
    <button
        onClick={handleValidation}
        className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition"
    >
        Send OTP
    </button>

    {/* Divider */}
    <div className="flex items-center my-2">
        <hr className="flex-grow border-gray-300" />
        <span className="mx-2 text-gray-500">OR</span>
        <hr className="flex-grow border-gray-300" />
    </div>

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
"use client"
import axios from "axios"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { EMAIL_REGEX } from "../utils/constants";
import toast, { Toaster } from "react-hot-toast";


export default function Registration() {

  const router = useRouter();

  const [message, setMessage] = useState()

  const [input, setInput] = useState({
    name: '',
    email: '',
    mobile: '',
    address: '',
    otp: '',
    password: '',
    confirmpassword: '',
  });

  const [validations, setValidations] = useState({
    name: false,
    email: false,
    mobile: false,
    address: false,
    password: false,
    confirmpassword: false,
  });

  const handleInputs = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setValidations({ ...validations, [e.target.name]: false });
  };



  const handleRegister = async () => {

    if (!input.name) {
      setValidations({ ...validations, name: true });
      setMessage('Name is required.');
      return;
    }

    if (!input.email) {
      setValidations({ ...validations, email: true });
      setMessage('Email is required.');
      return;
    }
    if (!EMAIL_REGEX.test(input.email)) {
      setValidations({ ...validations, email: true });
      setMessage('Please enter valid email address.');
      return;
    }

    if (!input.mobile) {
      setValidations({ ...validations, mobile: true });
      setMessage('Mobile number is required.');
      return;
    }

    if (!input.address) {
      setValidations({ ...validations, address: true });
      setMessage('Address is required.');
      return;
    }

    if (!input.password) {
      setValidations({ ...validations, password: true });
      setMessage('Password is required.');
      return;
    }

    if (input.password.length < 8) {
      setValidations({ ...validations, password: true });
      setMessage('Enter Valid Password minimum 8 character.');
      return;
    }

    if (!(input.confirmpassword === input.password)) {
      setValidations({ ...validations, confirmpassword: true });
      setMessage('Password Not Match.');
      return;
    }

    const data = JSON.stringify(
      {
        name: input.name,
        email: input.email,
        mobile: input.mobile,
        address: input.address,
        otp: '',
        password: input.password
      });


    try {
      const response = await axios.post('/api/register', data)
      if (response.status === 200) {
        // navigate('/dashboard')
        toast.success(response?.data?.message);
        console.log(response, 'register-response')
        router.push('/login');
      } else {
        console.log('Something went wrong')
      }
    } catch (error) {
      console.log('Error in login api', error)
    }


  }






  return (

    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm">
        {/* Header */}
        <div className="flex flex-col items-center mb-4">
            <img src="/assets/img/logo/logo1.png" alt="logo" className="w-18 h-14" />
            <h2 className="text-xl font-semibold text-gray-800">Register</h2>
            <p className="text-gray-500 text-xs">Create an account to continue.</p>
        </div>

        <Toaster />

        {/* Error Message */}
        {message && <p className="text-red-500 text-xs text-center mb-3">{message}</p>}

        {/* Name Field */}
        <div className="relative mb-3">
            <input
                type="text"
                name="name"
                placeholder="Enter Full Name"
                value={input.name}
                onChange={handleInputs}
                required
                className="peer w-full px-3 py-2 border rounded-md text-gray-700 text-sm"
            />
            <label className="absolute left-3 -top-2 text-xs text-gray-500 bg-white px-1">
                Full Name
            </label>
        </div>

        {/* Email Field */}
        <div className="relative mb-3">
            <input
                type="email"
                name="email"
                placeholder="Enter Email"
                value={input.email}
                onChange={handleInputs}
                required
                className="peer w-full px-3 py-2 border rounded-md text-gray-700 text-sm"
            />
            <label className="absolute left-3 -top-2 text-xs text-gray-500 bg-white px-1">
                Email Address
            </label>
        </div>

        {/* Contact Number */}
        <div className="relative mb-3">
            <input
                type="tel"
                name="mobile"
                placeholder="Enter Contact Number"
                value={input.mobile}
                onChange={handleInputs}
                maxLength={10}
                required
                className="peer w-full px-3 py-2 border rounded-md text-gray-700 text-sm"
            />
            <label className="absolute left-3 -top-2 text-xs text-gray-500 bg-white px-1">
                Contact Number
            </label>
        </div>

        {/* Address */}
        <div className="relative mb-3">
            <textarea
                name="address"
                placeholder="Enter Full Address"
                value={input.address}
                onChange={handleInputs}
                required
                className="peer w-full px-3 py-2 border rounded-md text-gray-700 text-sm"
            />
            <label className="absolute left-3 -top-2 text-xs text-gray-500 bg-white px-1">
                Address
            </label>
        </div>

        {/* Password */}
        <div className="relative mb-3">
            <input
                type="password"
                name="password"
                placeholder="Enter Password"
                value={input.password}
                onChange={handleInputs}
                required
                className="peer w-full px-3 py-2 border rounded-md text-gray-700 text-sm"
            />
            <label className="absolute left-3 -top-2 text-xs text-gray-500 bg-white px-1">
                Password
            </label>
        </div>

        {/* Confirm Password */}
        <div className="relative mb-4">
            <input
                type="password"
                name="confirmpassword"
                placeholder="Confirm Password"
                value={input.confirmpassword}
                onChange={handleInputs}
                required
                className="peer w-full px-3 py-2 border rounded-md text-gray-700 text-sm"
            />
            <label className="absolute left-3 -top-2 text-xs text-gray-500 bg-white px-1">
                Confirm Password
            </label>
        </div>

        {/* Register Button */}
        <button
            onClick={handleRegister}
            className="w-full py-2 bg-blue-500 text-white text-sm font-medium rounded-md shadow hover:bg-blue-600 transition"
        >
            Register
        </button>

        {/* Login Link */}
        <p className="text-gray-500 text-xs mt-3 text-center">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
                Login here
            </a>
        </p>

        {/* Back to Home */}
        <div className="text-center mt-3">
            <a href="/" className="text-blue-600 hover:underline text-xs font-medium">
                Back to Home
            </a>
        </div>
    </div>
</div>


  );
}
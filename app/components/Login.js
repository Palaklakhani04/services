"use client"
import axios from "axios"
import { useRouter } from "next/navigation";
import { useState } from "react"
import toast, { Toaster } from "react-hot-toast";
import { handleError } from "../lib/HandelError";
import Link from "next/link";


export default function Login() {

    const [message, setMessage] = useState()

    const [input, setInput] = useState({
        email: '',
        password: '',
    });

    const [validations, setValidations] = useState({
        email: false,
        password: false,
    });

    const handleInputs = (e) => {
        setInput({ ...input, [e.target.name]: [e.target.value] });
        setValidations({ ...validations, [e.target.name]: false });
    }

    const router = useRouter()

    const handleLogin = async () => {

        if (!input.email) {
            setValidations({ ...validations, email: true });
            setMessage('Email is required.');
            return;
        }

        if (!input.password) {
            setValidations({ ...validations, password: true });
            setMessage('Password is required.');
            return;
        }


        const data = JSON.stringify(
            {
                email: input.email,
                password: input.password
            });

        try {
            // alert('Login Successful')
            const response = await axios.post('/api/login', data)
            console.log('response', response)
            if (response.status === 200) {
                toast.success(response?.data?.message);
                // Store user ID in local storage
                localStorage?.setItem("userId", response.data.userid);
                localStorage?.setItem('token', response.data.token)

                router.push('/');
                console.log("Login Successful:", response.data);
            } else {
                toast.error(response?.data?.message);
                // alert('Something went wrong')
            }
        } catch (error) {
            handleError(error)
            console.log('Error in login api', error)
        }

    }

    return (


        <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm">
            {/* Logo */}
            <div className="flex flex-col items-center mb-4">
            <Link href="/">
                        <img src="/assets/img/logo/logo1.png" alt="EaseMate Logo" className="w-24 h-auto sm:w-28 md:w-36" />
                    </Link>
                <h2 className="text-xl font-semibold text-gray-800">Login</h2>
                <p className="text-gray-500 text-xs mt-1">Access your account securely.</p>
            </div>
    
            <Toaster />
    
            {/* Error Message */}
            {message && <p className="text-red-500 text-xs text-center mb-3">{message}</p>}
    
            {/* Email Field */}
            <div className="relative mb-3">
                <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={input.email}
                    onChange={handleInputs}
                    required
                    className="peer w-full px-3 py-2 border rounded-md text-gray-700  focus:outline text-sm"
                />
                <label className="absolute left-3 -top-2 text-xs text-gray-500 bg-white px-1">
                    Email Address
                </label>
            </div>
    
            {/* Password Field */}
            <div className="relative mb-3">
                <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    value={input.password}
                    onChange={handleInputs}
                    required
                    className="peer w-full px-3 py-2 border rounded-md text-gray-700  focus:outline text-sm"
                />
                <label className="absolute left-3 -top-2 text-xs text-gray-500 bg-white px-1">
                    Password
                </label>
            </div>
    
            {/* Forgot Password */}
            <p className="text-gray-500 text-xs mb-3 text-center">
                Forgot password?{" "}
                <Link href="/forgotpws" className="text-blue-500 hover:underline">
                    Reset Password
                </Link>
            </p>
    
            {/* Login Button */}
            <button
                onClick={handleLogin}
                className="w-full py-2 bg-blue-500 text-white text-sm font-medium rounded-md shadow hover:bg-blue-600 transition"
            >
                Login
            </button>
    
            {/* Registration Link */}
            <p className="text-gray-500 text-xs mt-3 text-center">
                New user?{" "}
                <Link href="/registration" className="text-blue-500 hover:underline">
                    Register here
                </Link>
            </p>
    
            {/* Back to Home */}
            <div className="text-center mt-3">
                <Link href="/" className="text-blue-600 hover:underline text-xs font-medium">
                    Back to Home
                </Link>
            </div>
        </div>
    </div>
    


    );
}
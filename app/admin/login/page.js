"use client"
import axios from "axios"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react"


export default function login() {
    const [message, setMessage] = useState()

    const [input, setInput] = useState({
        email:'',
        password:'',
    });

    const [validations, setValidations] = useState({
        email: false,
        password: false,
    });

    const handelInputs = (e) =>{
        setInput({...input, [e.target.name]:[e.target.value]});
        setValidations({...validations, [e.target.name]:false});
    }


    const router = useRouter()


    const handelLogin = async () => {

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
                password: input.password,
                usertype: 'admin'
            });

        try {
            const response = await axios.post('/api/admin-login', data)
            if (response.status === 200) {
                router.push('/admin/dashboard');
                console.log("Login Successful:", response.data);
            } else {
                alert('Something went wrong')
            }
        } catch (error) {
            console.log('Error in login api', error)
        }

    }

    return (
        
   
        <div className="flex items-center justify-center min-h-screen p-6 bg-gray-100">
    <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">

        {/* Header */}
        <div className="flex flex-col items-center mb-6">
            <img src="/assets/img/logo/logo1.png" alt="logo" className="w-36 h-auto" />
            <h2 className="text-2xl font-bold text-gray-800 mt-4">Admin Login</h2>
            {message && <p className="text-red-500 text-sm mt-2">{message}</p>}
        </div>

        {/* Email Input */}
        <div className="relative mb-4">
            <label className="absolute left-3 -top-2 text-sm text-gray-500 bg-white px-1">
                Email
            </label>
            <input
                type="email"
                name="email"
                value={input.email}
                onChange={handelInputs}
                className="w-full px-3 py-3 border rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter Email"
                required
            />
        </div>

        {/* Password Input */}
        <div className="relative mb-4">
            <label className="absolute left-3 -top-2 text-sm text-gray-500 bg-white px-1">
                Password
            </label>
            <input
                type="password"
                name="password"
                value={input.password}
                onChange={handelInputs}
                className="w-full px-3 py-3 border rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter Password"
                required
            />
        </div>

        {/* Login Button */}
        <button
            onClick={handelLogin}
            className="w-full py-2 bg-green-500 text-white font-semibold rounded-lg shadow-lg transition hover:bg-green-600"
        >
            Login
        </button>

        {/* Home Link */}
        <div className="text-center mt-4">
            <Link href="/" className="text-blue-500 hover:underline">← Back to Home</Link>
        </div>

    </div>
</div>

   
    );
}
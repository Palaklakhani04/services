"use client"
import axios from "axios"
import { useRouter } from "next/navigation";
import { useState } from "react"
import toast, { Toaster } from "react-hot-toast";
import { handleError } from "../lib/HandelError";


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
                //  localStorage.setItem("userId", response.data.user._id);
                localStorage.setItem('token', response.data.token)
                
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
        //       <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        //       <Toaster />

        //       {/* Login Card */}
        //       <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
        //         {/* Logo */}
        //         <div className="flex justify-center mb-6">
        //           <a href="/">
        //             <img src="/assets/img/logo/black-logo.svg" alt="logo-img" className="w-24" />
        //           </a>
        //         </div>

        //         {/* Heading */}
        //         <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
        //           Sign In
        //         </h2>
        //         <p className="text-center text-gray-500 mb-6">
        //           Enter your credentials to access your account
        //         </p>

        //         {/* Error Message */}
        //         {message && <p className="text-red-500 text-center mb-4">{message}</p>}

        //         {/* Email Input */}
        //         <div className="mb-4">
        //           <label className="block text-gray-700 font-medium">Email</label>
        //           <input 
        //             type="email" 
        //             name="email" 
        //             placeholder="Enter Email"
        //             value={input.email} 
        //             onChange={handleInputs} 
        //             required
        //             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        //           />
        //         </div>

        //         {/* Password Input */}
        //         <div className="mb-4">
        //           <label className="block text-gray-700 font-medium">Password</label>
        //           <input 
        //             type="password" 
        //             name="password" 
        //             placeholder="Enter Password"
        //             value={input.password} 
        //             onChange={handleInputs} 
        //             required
        //             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        //           />
        //         </div>

        //         {/* Forgot Password */}
        //         <div className="text-right mb-4">
        //           <a href="/forgotpws" className="text-blue-500 hover:underline text-sm">
        //             Forgot password?
        //           </a>
        //         </div>

        //         {/* Login Button */}
        //         <button 
        //           onClick={handleLogin}
        //           className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300"
        //         >
        //           Sign In
        //         </button>

        //         {/* Divider */}
        //         <div className="flex items-center my-6">
        //           <hr className="flex-grow border-gray-300" />
        //           <span className="mx-2 text-gray-500">OR</span>
        //           <hr className="flex-grow border-gray-300" />
        //         </div>

        //         {/* Register Link */}
        //         <p className="text-center text-gray-600">
        //           Don't have an account? 
        //           <a href="/registration" className="text-blue-500 hover:underline ml-1">
        //             Sign up
        //           </a>
        //         </p>
        //       </div>
        //     </div>
        //   );
        // }



        // <div>
        //     <div className="registration">
        //         <div className="logo">
        //             <a className="header-logo" href="/">
        //                 <img src="/assets/img/logo/black-logo.svg" alt="logo-img" />
        //             </a>
        //         </div>
        //         <Toaster />
        //         <div>

        //             <div className="container">
        //                 <h2 onClick={()=> navigate('/')} className="cursor-pointer">Login</h2>
        //                 {message && 
        //                 <p className="text-[#ff5555] text-lg">{message}</p>
        //                 }
        //                 <hr />
        //                 <label htmlFor="email"><b>Email</b></label>
        //                 <input type="email" placeholder="Enter Email" name="email" value={input.email} onChange={handleInputs} required />
        //                 <label htmlFor="psw"><b>Password</b></label>
        //                 <input type="password" placeholder="Enter Password" name="password" value={input.password} onChange={handleInputs} required />
        //                 <p>forget password <a href="/forgotpws">Reset password</a>.</p>
        //                 <button className="loginbtn" onClick={() => handleLogin()} >Login</button>
        //                 <p>New user<a href="/registration"> Registration</a>.</p>
        //                 <hr />
        //                 <a href="/" className="centerhome">Home</a>
        //             </div>
        //         </div>
        //     </div>
        // </div>


        <div className="flex items-center justify-center min-h-screen p-6 bg-gray-100">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
                {/* Logo */}
                <div className="flex flex-col items-center mb-6">
                    <img src="/assets/img/logo/black-logo.svg" alt="logo" className="w-20" />
                    <h2 className="text-2xl font-bold text-gray-800 mt-4">Login</h2>
                    <p className="text-gray-500 text-sm mt-2">Access your account securely.</p>
                </div>

                <Toaster />

                {/* Display Error Message */}
                {message && <p className="text-red-500 text-sm text-center mb-3">{message}</p>}

                {/* Email Field */}
                <div className="relative mb-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        value={input.email}
                        onChange={handleInputs}
                        required
                        className="peer w-full px-3 py-3 border rounded-lg text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <label className="absolute left-3 -top-2 text-sm text-gray-500 bg-white px-1">
                        Email Address
                    </label>
                </div>

                {/* Password Field */}
                <div className="relative mb-4">
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        value={input.password}
                        onChange={handleInputs}
                        required
                        className="peer w-full px-3 py-3 border rounded-lg text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <label className="absolute left-3 -top-2 text-sm text-gray-500 bg-white px-1">
                        Password
                    </label>
                </div>

                {/* Forgot Password Link */}
                <p className="text-gray-600 text-sm mb-4 text-center">
                    Forgot password?{" "}
                    <a href="/forgotpws" className="text-blue-500 hover:underline">
                        Reset Password
                    </a>
                </p>

                {/* Login Button */}
                <button
                    onClick={handleLogin}
                    className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition"
                >
                    Login
                </button>

                {/* Registration Link */}
                <p className="text-gray-600 text-sm mt-4 text-center">
                    New user?{" "}
                    <a href="/registration" className="text-blue-500 hover:underline">
                        Register here
                    </a>
                </p>

                {/* Back to Home Link */}
                <hr className="my-4" />
                <div className="text-center">
                    <a href="/" className="text-blue-600 hover:underline font-medium">
                        Back to Home
                    </a>
                </div>
            </div>
        </div>

    );
}
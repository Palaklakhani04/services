"use client"
import axios from "axios"
import { useRouter } from "next/navigation";
import { useState } from "react"
import toast, { Toaster } from "react-hot-toast";


export default function Login() {

    const [message, setMessage] = useState()

    const [input, setInput] = useState({
        email:'',
        password:'',
    });

    const [validations, setValidations] = useState({
        email:false,
        password:false,
    });

    const handleInputs = (e) =>{
        setInput({...input, [e.target.name]:[e.target.value]});
        setValidations({...validations, [e.target.name]:false});
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
            const response = await axios.post('/api/login', data)
            if (response.status === 200) {
                toast.success(response?.data?.message);
                router.push('/');
                console.log("Login Successful:", response.data);
            } else {
                alert('Something went wrong')
            }
        } catch (error) {
            console.log('Error in login api', error)
        }

    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <Toaster />
        
        {/* Login Card */}
        <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <a href="/">
              <img src="/assets/img/logo/black-logo.svg" alt="logo-img" className="w-24" />
            </a>
          </div>
  
          {/* Heading */}
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
            Sign In
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Enter your credentials to access your account
          </p>
  
          {/* Error Message */}
          {message && <p className="text-red-500 text-center mb-4">{message}</p>}
  
          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Email</label>
            <input 
              type="email" 
              name="email" 
              placeholder="Enter Email"
              value={input.email} 
              onChange={handleInputs} 
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
  
          {/* Password Input */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Password</label>
            <input 
              type="password" 
              name="password" 
              placeholder="Enter Password"
              value={input.password} 
              onChange={handleInputs} 
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
  
          {/* Forgot Password */}
          <div className="text-right mb-4">
            <a href="/forgotpws" className="text-blue-500 hover:underline text-sm">
              Forgot password?
            </a>
          </div>
  
          {/* Login Button */}
          <button 
            onClick={handleLogin}
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300"
          >
            Sign In
          </button>
  
          {/* Divider */}
          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-gray-500">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>
  
          {/* Register Link */}
          <p className="text-center text-gray-600">
            Don't have an account? 
            <a href="/registration" className="text-blue-500 hover:underline ml-1">
              Sign up
            </a>
          </p>
        </div>
      </div>
    );
  }
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
        //                 <input type="email" placeholder="Enter Email" name="email" value={input.email} onChange={handelInputs} required />
        //                 <label htmlFor="psw"><b>Password</b></label>
        //                 <input type="password" placeholder="Enter Password" name="password" value={input.password} onChange={handelInputs} required />
        //                 <p>forget password <a href="/forgotpws">Reset password</a>.</p>
        //                 <button className="loginbtn" onClick={() => handleLogin()} >Login</button>
        //                 <p>New user<a href="/registration"> Registration</a>.</p>
        //                 <hr />
        //                 <a href="/" className="centerhome">Home</a>
        //             </div>
        //         </div>
        //     </div>
        // </div>

//     )
// }
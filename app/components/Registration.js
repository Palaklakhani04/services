"use client"
import axios from "axios"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { EMAIL_REGEX } from "../utils/constants";


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
    <div className="flex items-center justify-center min-h-screen p-6">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg">
                {/* Header */}
                <div className="flex flex-col items-center mb-6">
                    <img src="/assets/img/logo/black-logo.svg" alt="logo" className="w-20" />
                    <h2 className="text-2xl font-bold text-gray-800 mt-4">Register</h2>
                    <p className="text-gray-500 text-sm">Create an account to continue.</p>
                </div>

                {/* Display Error Message */}
                {message && <p className="text-red-500 text-sm text-center mb-3">{message}</p>}

                {/* Name Field */}
                <div className="relative mb-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter Full Name"
                        value={input.name}
                        onChange={handleInputs}
                        required
                        className="peer w-full px-3 py-3 border rounded-lg text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <label className="absolute left-3 -top-2 text-sm text-gray-500 bg-white px-1">
                        Full Name
                    </label>
                </div>

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

                {/* Contact Number Field */}
                <div className="relative mb-4">
                    <input
                        type="tel"
                        name="mobile"
                        placeholder="Enter Contact Number"
                        value={input.mobile}
                        onChange={handleInputs}
                        maxLength={10}
                        required
                        className="peer w-full px-3 py-3 border rounded-lg text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <label className="absolute left-3 -top-2 text-sm text-gray-500 bg-white px-1">
                        Contact Number
                    </label>
                </div>

                {/* Address Field */}
                <div className="relative mb-4">
                    <textarea
                        name="address"
                        placeholder="Enter Full Address"
                        value={input.address}
                        onChange={handleInputs}
                        required
                        className="peer w-full px-3 py-3 border rounded-lg text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <label className="absolute left-3 -top-2 text-sm text-gray-500 bg-white px-1">
                        Address
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

                {/* Confirm Password Field */}
                <div className="relative mb-6">
                    <input
                        type="password"
                        name="confirmpassword"
                        placeholder="Confirm Password"
                        value={input.confirmpassword}
                        onChange={handleInputs}
                        required
                        className="peer w-full px-3 py-3 border rounded-lg text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <label className="absolute left-3 -top-2 text-sm text-gray-500 bg-white px-1">
                        Confirm Password
                    </label>
                </div>

                {/* Terms & Conditions */}
                <div className="flex items-center space-x-2 mb-6">
                    <input
                        type="checkbox"
                        name="terms"
                        checked={input.terms}
                        onChange={handleInputs}
                        required
                        className="w-4 h-4"
                    />
                    <label className="text-gray-600">I accept the Terms & Conditions</label>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-4">
                    <button
                        onClick={handleRegister}
                        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition"
                        disabled={!input.terms}
                    >
                        Register
                    </button>
                </div>

                {/* Login Link */}
                <p className="text-gray-600 text-sm mt-4 text-center">
                    Already have an account?{" "}
                    <a href="/login" className="text-blue-500 hover:underline">
                        Login here
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


    // <div>
    //   <div className="registration">
    //     <div className="logo">
    //       <a className="header-logo" href="/">
    //         <img src="assets/img/logo/black-logo.svg" alt="logo-img" />
    //       </a>
    //     </div>
    //     <div>
    //       <div className="container">
    //         <h2>Register</h2>
    //         <p>Please fill this form to create an account.</p>
    //         {message &&
    //           <p className="text-[#ff5555] text-lg">{message}</p>
    //         }
    //         <hr />
    //         <label htmlFor="name"><b>Name</b></label>
    //         <input type="text" placeholder="Enter Full Name" value={input.name} onChange={handleInputs} name="name" id="name" required />
    //         <label htmlFor="email"><b>Email</b></label>
    //         <input type="email" placeholder="Enter Email" name="email" value={input.email} onChange={handleInputs} required />
    //         <label htmlFor="contact"><b>Contact Number</b></label>
    //         <input size="number" placeholder="Enter contact number" name="mobile" value={input.mobile} onChange={handleInputs} maxLength={10} required />
    //         <label htmlFor="address"><b>Address</b></label>
    //         <textarea name="address" placeholder="Enter Your Full Address " value={input.address} onChange={handleInputs} defaultValue={""} />
    //         <label htmlFor="psw"><b>Password</b></label>
    //         <input type="password" placeholder="Enter Password" name="password" value={input.password} onChange={handleInputs} required />
    //         <label htmlFor="psw-confim"><b>Confirm Password</b></label>
    //         <input type="password" placeholder="confirm Password" name="confirmpassword" value={input.confirmpassword} onChange={handleInputs} required />
    //         <button onClick={() => handleRegister()} className="registerbtn">Register</button>
    //         <p>Already have an account? <a href="/login">login</a>.</p>
    //         <hr />
    //         <a href="/" className="centerhome">Home</a>
    //       </div>
    //     </div>
    //   </div>

    // </div>
  );
}
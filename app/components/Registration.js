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
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
   

    {/* Registration Card */}
    <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <a href="/">
          <img src="/assets/img/logo/black-logo.svg" alt="logo-img" className="w-24" />
        </a>
      </div>

      {/* Heading */}
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
        Create an Account
      </h2>
      <p className="text-center text-gray-500 mb-6">
        Fill in the details to register
      </p>

      {/* Error Message */}
      {message && <p className="text-red-500 text-center mb-4">{message}</p>}

      {/* Name Input */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Full Name</label>
        <input 
          type="text" 
          name="name" 
          placeholder="Enter Full Name"
          value={input.name} 
          onChange={handleInputs} 
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

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

      {/* Contact Number */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Contact Number</label>
        <input 
          type="number" 
          name="mobile" 
          placeholder="Enter Contact Number"
          value={input.mobile} 
          onChange={handleInputs} 
          maxLength={10}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Address */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Address</label>
        <textarea 
          name="address" 
          placeholder="Enter Your Full Address"
          value={input.address} 
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

      {/* Confirm Password Input */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Confirm Password</label>
        <input 
          type="password" 
          name="confirmpassword" 
          placeholder="Confirm Password"
          value={input.confirmpassword} 
          onChange={handleInputs} 
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Register Button */}
      <button 
        onClick={handleRegister}
        className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300"
      >
        Sign Up
      </button>

      {/* Divider */}
      <div className="flex items-center my-6">
        <hr className="flex-grow border-gray-300" />
        <span className="mx-2 text-gray-500">OR</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      {/* Login Link */}
      <p className="text-center text-gray-600">
        Already have an account? 
        <a href="/login" className="text-blue-500 hover:underline ml-1">
          Sign In
        </a>
      </p>
    </div>
  </div>
);
}
//     <div>
//       <div className="registration">
//         <div className="logo">
//           <a className="header-logo" href="/">
//             <img src="assets/img/logo/black-logo.svg" alt="logo-img" />
//           </a>
//         </div>
//         <div>
//           <div className="container">
//             <h2>Register</h2>
//             <p>Please fill this form to create an account.</p>
//             {message &&
//               <p className="text-[#ff5555] text-lg">{message}</p>
//             }
//             <hr />
//             <label htmlFor="name"><b>Name</b></label>
//             <input type="text" placeholder="Enter Full Name" value={input.name} onChange={handelInputs} name="name" id="name" required />
//             <label htmlFor="email"><b>Email</b></label>
//             <input type="email" placeholder="Enter Email" name="email" value={input.email} onChange={handelInputs} required />
//             <label htmlFor="contact"><b>Contact Number</b></label>
//             <input size="number" placeholder="Enter contact number" name="mobile" value={input.mobile} onChange={handelInputs} maxLength={10} required />
//             <label htmlFor="address"><b>Address</b></label>
//             <textarea name="address" placeholder="Enter Your Full Address " value={input.address} onChange={handelInputs} defaultValue={""} />
//             <label htmlFor="psw"><b>Password</b></label>
//             <input type="password" placeholder="Enter Password" name="password" value={input.password} onChange={handelInputs} required />
//             <label htmlFor="psw-confim"><b>Confirm Password</b></label>
//             <input type="password" placeholder="confirm Password" name="confirmpassword" value={input.confirmpassword} onChange={handelInputs} required />
//             <button onClick={() => handleRegister()} className="registerbtn">Register</button>
//             <p>Already have an account? <a href="/login">login</a>.</p>
//             <hr />
//             <a href="/" className="centerhome">Home</a>
//           </div>
//         </div>
//       </div>

//     </div>
//   )
// }
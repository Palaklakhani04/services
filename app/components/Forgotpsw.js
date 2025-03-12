"use client"
import axios from "axios"
import { useRouter } from "next/navigation";
import { useState } from "react"
import { EMAIL_REGEX } from "../utils/constants";


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
        console.log("Otp send to your email", response);
        localStorage.setItem('email', response.data.email)
        router.push('/otpverify');
      } else {
        alert('Something went wrong')
      }
    } catch (error) {
      console.log('Error in sending otp', error)
    }

  }



  return (
//     <div>
//       <div className="registration">
//         <div className="logo">
//           <a className="header-logo" href="/">
//             <img src="/assets/img/logo/black-logo.svg" alt="logo-img" />
//           </a>
//         </div>
//         <div>
//           <div className="container">
//             <h2>Forget Password</h2>
//             {validations &&
//               <p className="text-[#ff5555] text-lg">{message}</p>
//             }
//             <hr />
//             <label htmlFor="email"><b>Email</b></label>
//             <input type="text" placeholder="Enter Email" name="email" value={email} onChange={(e) => { setEmail(e.target.value), setValidations(false) }} id="email" required />
//             <button onClick={() => handelValidation()} className="loginbtn">Send OTP</button>
//             <hr />
//             <a href="/" className="centerhome">Home</a>
//           </div>
//         </div>
//       </div>

//     </div>
//   );
// }
<div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">


{/* Forget Password Card */}
<div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
  {/* Logo */}
  <div className="flex justify-center mb-6">
    <a href="/">
      <img src="/assets/img/logo/black-logo.svg" alt="logo-img" className="w-24" />
    </a>
  </div>

  {/* Heading */}
  <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
    Forgot Password?
  </h2>
  <p className="text-center text-gray-500 mb-6">
    Enter your email to receive an OTP
  </p>

  {/* Error Message */}
  {validations && <p className="text-red-500 text-center mb-4">{message}</p>}

  {/* Email Input */}
  <div className="mb-4">
    <label className="block text-gray-700 font-medium">Email</label>
    <input 
      type="email" 
      name="email" 
      placeholder="Enter Email"
      value={email} 
      onChange={(e) => { setEmail(e.target.value); setValidations(false); }}
      required
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
    />
  </div>

  {/* Send OTP Button */}
  <button 
    onClick={handleValidation}
    className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300"
  >
    Send OTP
  </button>

  {/* Divider */}
  <div className="flex items-center my-6">
    <hr className="flex-grow border-gray-300" />
    <span className="mx-2 text-gray-500">OR</span>
    <hr className="flex-grow border-gray-300" />
  </div>

  {/* Home Link */}
  <p className="text-center text-gray-600">
    <a href="/" className="text-blue-500 hover:underline">
      Back to Home
    </a>
  </p>
</div>
</div>
);
}
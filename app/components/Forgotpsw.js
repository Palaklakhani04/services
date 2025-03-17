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

<div className="flex items-center justify-center min-h-screen p-6">
<div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg">
    {/* Header */}
    <div className="flex flex-col items-center mb-6">
        <img src="/assets/img/logo/black-logo.svg" alt="logo" className="w-20" />
        <h2 className="text-2xl font-bold text-gray-800 mt-4">Forgot Password?</h2>
        <p className="text-gray-500 text-sm text-center mt-2">
            Enter your email to receive an OTP.
        </p>
    </div>


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
            className="peer w-full px-3 py-3 border rounded-lg text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <label className="absolute left-3 -top-2 text-sm text-gray-500 bg-white px-1">
            Email Address
        </label>
    </div>

    {/* Send OTP Button */}
    <button
        onClick={handleValidation}
        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition"
    >
        Send OTP
    </button>

    {/* Divider */}
    <div className="flex items-center my-6">
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
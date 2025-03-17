"use client"
import axios from "axios"
import { useRouter } from "next/navigation";
import { useState } from "react"


export default function Otpverify() {

  const router = useRouter();
  const [message, setMessage] = useState('')
  const [otp, setOtp] = useState('')
  const [validations, setValidations] = useState(false)

  const handleValidation = () => {
  
      if (!otp) {
        setValidations(true);
        setMessage('Please enter valid 6 digit otp.');
        return;
      }
  
      handleSubmit()
    }

  const handleSubmit = async () => {
    const data = JSON.stringify(
      {
        email: localStorage?.getItem('email'),
        otp: otp,
      });
    try {
      const response = await axios.post("/api/otpverify", data);
      if (response.data.status === 200) {
        console.log("Otp is correct", response);
        router.push('/setpsw');
      } else {
        alert('Something went wrong')
      }
    } catch (error) {
      console.log('Error in sending otp', error)
    }

  }




  return (
    // <div>
    //   <div className="registration">
    //     <div className="logo">
    //       <a className="header-logo" href="/">
    //         <img src="assets/img/logo/black-logo.svg" alt="logo-img" />
    //       </a>
    //     </div>
    //     <div>
    //       <div className="container">
    //         <h2>OTP Verify</h2>
    //         {validations &&
    //           <p className="text-[#ff5555] text-lg">{message}</p>
    //         }
    //         <hr />
    //         <label htmlFor="email"><b>Email</b></label>
    //         <input type="email" placeholder="Enter Email" name="email" className="email" value={localStorage?.getItem('email')} onChange={(e) => setEmail(e.target.value)} disabled />
    //         <label htmlFor="email"><b>OTP</b></label>
    //         <input size="number" placeholder="Enter OTP" name="otp" className="otp" value={otp} onChange={(e) => {setOtp(e.target.value),setValidations(false)}} maxLength={6} required />
    //         <button onClick={() => handelValidation()} className="loginbtn">Submit</button>
    //         <hr />
    //         <a href="/" className="centerhome">Home</a>
    //       </div>
    //     </div>
    //   </div>

    // </div>

    <div className="flex items-center justify-center min-h-screen p-6">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg">
                {/* Header */}
                <div className="flex flex-col items-center mb-6">
                    <img src="/assets/img/logo/black-logo.svg" alt="logo" className="w-20" />
                    <h2 className="text-2xl font-bold text-gray-800 mt-4">OTP Verification</h2>
                    <p className="text-gray-500 text-sm text-center mt-2">
                        Enter the OTP sent to your email.
                    </p>
                </div>

            

                {/* Display Error or Success Message */}
                {validations && (
                    <p className={`text-sm text-center mb-4 ${message.includes("Successfully") ? "text-green-500" : "text-red-500"}`}>
                        {message}
                    </p>
                )}

                {/* Email Input (Disabled) */}
                <div className="relative mb-4">
                    <input
                        type="email"
                        name="email"
                        value={localStorage?.getItem('email')} 
                        onChange={(e) => setEmail(e.target.value)}
                        disabled
                        className="peer w-full px-3 py-3 border rounded-lg text-gray-700 bg-gray-100 cursor-not-allowed focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <label className="absolute left-3 -top-2 text-sm text-gray-500 bg-white px-1">
                        Email Address
                    </label>
                </div>

                {/* OTP Input */}
                <div className="relative mb-6">
                    <input
                        type="text"
                        name="otp"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => {
                            setOtp(e.target.value);
                            setValidations(false);
                        }}
                        maxLength={6}
                        required
                        className="peer w-full px-3 py-3 border rounded-lg text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <label className="absolute left-3 -top-2 text-sm text-gray-500 bg-white px-1">
                        OTP Code
                    </label>
                </div>

                {/* Submit Button */}
                <button
                    onClick={handleValidation}
                    className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition"
                >
                    Submit
                </button>

                {/* Divider */}
                <hr className="my-6" />

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
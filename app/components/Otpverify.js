"use client"
import axios from "axios"
import { useRouter } from "next/navigation";
import { useState } from "react"


export default function Otpverify() {

  const router = useRouter();
  const [message, setMessage] = useState('')
  const [otp, setOtp] = useState('')
  const [validations, setValidations] = useState(false)

  const handelValidation = () => {
  
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
    <div>
      <div className="registration">
        <div className="logo">
          <a className="header-logo" href="/">
            <img src="assets/img/logo/black-logo.svg" alt="logo-img" />
          </a>
        </div>
        <div>
          <div className="container">
            <h2>OTP Verify</h2>
            {validations &&
              <p className="text-[#ff5555] text-lg">{message}</p>
            }
            <hr />
            <label htmlFor="email"><b>Email</b></label>
            <input type="email" placeholder="Enter Email" name="email" className="email" value={localStorage?.getItem('email')} onChange={(e) => setEmail(e.target.value)} disabled />
            <label htmlFor="email"><b>OTP</b></label>
            <input size="number" placeholder="Enter OTP" name="otp" className="otp" value={otp} onChange={(e) => {setOtp(e.target.value),setValidations(false)}} maxLength={6} required />
            <button onClick={() => handelValidation()} className="loginbtn">Submit</button>
            <hr />
            <a href="/" className="centerhome">Home</a>
          </div>
        </div>
      </div>

    </div>
  )
}
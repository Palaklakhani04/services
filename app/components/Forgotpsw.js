"use client"
import axios from "axios"
import { useRouter } from "next/navigation";
import { useState } from "react"


export default function Forgotpsw() {
  const router = useRouter();

  const [email, setEmail] = useState('')

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
    <div>
      <div className="registration">
        <div className="logo">
          <a className="header-logo" href="/">
            <img src="assets/img/logo/black-logo.svg" alt="logo-img" />
          </a>
        </div>
        <div>
          <div className="container">
            <h2>Forget Password</h2>
            <hr />
            <label htmlFor="email"><b>Email</b></label>
            <input type="text" placeholder="Enter Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email" required />
            <button onClick={() => handleOtp()} className="loginbtn">Send OTP</button>
            <hr />
            <a href="/" className="centerhome">Home</a>
          </div>
        </div>
      </div>

    </div>
  );
}
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

  const handelValidation = () => {

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
            {validations &&
              <p className="text-[#ff5555] text-lg">{message}</p>
            }
            <hr />
            <label htmlFor="email"><b>Email</b></label>
            <input type="text" placeholder="Enter Email" name="email" value={email} onChange={(e) => { setEmail(e.target.value), setValidations(false) }} id="email" required />
            <button onClick={() => handelValidation()} className="loginbtn">Send OTP</button>
            <hr />
            <a href="/" className="centerhome">Home</a>
          </div>
        </div>
      </div>

    </div>
  );
}